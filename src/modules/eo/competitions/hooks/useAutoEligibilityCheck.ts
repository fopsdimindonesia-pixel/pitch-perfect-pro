import { useCallback, useRef } from "react";
import { RegistrationData } from "../context/CompetitionContext";
import { checkTeamEligibility } from "../lib/eligibilityValidation";
import { logEligibilityAction } from "../services/eligibilityService";
import { notifyEligibilityCheck } from "../services/webhookService";

/**
 * Hook for automated eligibility checks on registration submission
 * Integrates eligibility validation into the registration workflow
 */

export interface AutoCheckConfig {
  enabled: boolean;
  autoSuspendOnErrors: boolean;
  notifyOnIssues: boolean;
  competitionId: string;
}

export interface CheckResult {
  success: boolean;
  teamId: string;
  compliant: boolean;
  issues: any[];
  message: string;
}

/**
 * Hook: Run automatic eligibility checks on registration submission
 */
export function useAutoEligibilityCheck(config: AutoCheckConfig) {
  const checkInProgressRef = useRef(false);

  /**
   * Check a newly registered team
   */
  const checkTeamOnSubmission = useCallback(
    async (team: RegistrationData, competitionConfig: any): Promise<CheckResult> => {
      if (!config.enabled || checkInProgressRef.current) {
        return { success: false, teamId: team.clubId, compliant: true, issues: [], message: "Check disabled" };
      }

      checkInProgressRef.current = true;

      try {
        // Perform eligibility check
        const result = checkTeamEligibility(team, competitionConfig);

        // Log the automatic check
        logEligibilityAction({
          type: "flag",
          targetTeams: [team.clubId],
          reason: `Automatic eligibility check on registration: ${result.issues.length} issues found`,
          performedBy: "auto-check-system",
          timestamp: new Date(),
        });

        // Auto-suspend if configured and errors found
        if (config.autoSuspendOnErrors && result.issues.some((i) => i.type === "error")) {
          logEligibilityAction({
            type: "suspend",
            targetTeams: [team.clubId],
            reason: "Auto-suspended due to critical eligibility issues found on registration",
            performedBy: "auto-suspend-system",
            timestamp: new Date(),
          });
        }

        // Send notifications if configured
        if (config.notifyOnIssues && result.issues.length > 0) {
          try {
            await notifyEligibilityCheck(config.competitionId, [result]);
          } catch (error) {
            console.error("Failed to send eligibility notification:", error);
          }
        }

        return {
          success: true,
          teamId: team.clubId,
          compliant: result.compliant,
          issues: result.issues,
          message: result.compliant
            ? "Team meets all eligibility requirements"
            : `Team has ${result.issues.length} eligibility issue(s)`,
        };
      } catch (error) {
        console.error("Eligibility check error:", error);
        return {
          success: false,
          teamId: team.clubId,
          compliant: false,
          issues: [],
          message: `Check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      } finally {
        checkInProgressRef.current = false;
      }
    },
    [config]
  );

  /**
   * Check multiple teams (batch)
   */
  const checkTeamsOnSubmission = useCallback(
    async (
      teams: RegistrationData[],
      competitionConfig: any
    ): Promise<CheckResult[]> => {
      return Promise.all(
        teams.map((team) => checkTeamOnSubmission(team, competitionConfig))
      );
    },
    [checkTeamOnSubmission]
  );

  /**
   * Validate team before submission (pre-check)
   */
  const validateBeforeSubmission = useCallback(
    (team: RegistrationData, competitionConfig: any): boolean => {
      const result = checkTeamEligibility(team, competitionConfig);

      // Return false if critical errors exist
      return !result.issues.some((i) => i.type === "error");
    },
    []
  );

  return {
    checkTeamOnSubmission,
    checkTeamsOnSubmission,
    validateBeforeSubmission,
    isCheckInProgress: checkInProgressRef.current,
  };
}

/**
 * Hook: Setup automatic eligibility check on registration form submission
 */
export function useRegistrationEligibilityMonitor(
  competitionId: string,
  competitionConfig: any
) {
  const config: AutoCheckConfig = {
    enabled: true,
    autoSuspendOnErrors: false, // Disabled by default (admin approval required)
    notifyOnIssues: true,
    competitionId,
  };

  const checks = useAutoEligibilityCheck(config);

  /**
   * Intercept registration submission
   */
  const onRegistrationSubmit = useCallback(
    async (team: RegistrationData): Promise<{ canProceed: boolean; result: CheckResult }> => {
      // Pre-check: validate before submission
      const isValid = checks.validateBeforeSubmission(team, competitionConfig);

      if (!isValid) {
        // Pre-check failed - show warnings but allow submission
        const result = await checks.checkTeamOnSubmission(team, competitionConfig);
        return {
          canProceed: false,
          result,
        };
      }

      // Full check after submission
      const result = await checks.checkTeamOnSubmission(team, competitionConfig);

      return {
        canProceed: result.compliant,
        result,
      };
    },
    [checks, competitionConfig]
  );

  return {
    onRegistrationSubmit,
    ...checks,
  };
}

/**
 * Hook: Setup scheduled eligibility checks
 * Useful for periodic compliance verification
 */
export function useScheduledEligibilityCheck(
  teams: RegistrationData[],
  competitionConfig: any,
  intervalMs: number = 6 * 60 * 60 * 1000 // 6 hours
) {
  const checkIntervalRef = useRef<NodeJS.Timeout>();
  const checks = useAutoEligibilityCheck({
    enabled: true,
    autoSuspendOnErrors: false,
    notifyOnIssues: true,
    competitionId: competitionConfig?.id || "default",
  });

  const startScheduledChecks = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    checkIntervalRef.current = setInterval(async () => {
      try {
        const results = await checks.checkTeamsOnSubmission(
          teams,
          competitionConfig
        );

        // Log scheduled check
        const issueTeams = results.filter((r) => !r.compliant);
        if (issueTeams.length > 0) {
          console.log(
            `Scheduled check: ${issueTeams.length}/${teams.length} teams have issues`
          );
        }
      } catch (error) {
        console.error("Scheduled eligibility check failed:", error);
      }
    }, intervalMs);
  }, [teams, competitionConfig, intervalMs, checks]);

  const stopScheduledChecks = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = undefined;
    }
  }, []);

  return {
    startScheduledChecks,
    stopScheduledChecks,
    ...checks,
  };
}
