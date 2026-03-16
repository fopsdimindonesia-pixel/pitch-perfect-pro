import { RegistrationData } from "../context/CompetitionContext";

/**
 * Eligibility Service
 * Handles bulk operations for team eligibility management
 */

export interface BulkOperationResult {
  success: boolean;
  message: string;
  affectedTeams: string[];
  timestamp: Date;
}

export interface EligibilityAction {
  type: "suspend" | "approve" | "flag" | "clear";
  targetTeams: string[];
  reason: string;
  performedBy: string;
  timestamp: Date;
}

// ─── Team Status Operations ──────────────────────────────────────────
/**
 * Auto-suspend teams with critical eligibility issues
 */
export async function autoSuspendTeams(
  teams: string[],
  reason: string,
  performedBy: string = "system"
): Promise<BulkOperationResult> {
  try {
    // In a real implementation, this would call an API
    // For now, we'll simulate the operation
    
    const result: BulkOperationResult = {
      success: true,
      message: `${teams.length} team(s) suspended due to: ${reason}`,
      affectedTeams: teams,
      timestamp: new Date(),
    };

    // Log the action
    logEligibilityAction({
      type: "suspend",
      targetTeams: teams,
      reason,
      performedBy,
      timestamp: new Date(),
    });

    return result;
  } catch (error) {
    return {
      success: false,
      message: `Failed to suspend teams: ${error instanceof Error ? error.message : "Unknown error"}`,
      affectedTeams: [],
      timestamp: new Date(),
    };
  }
}

/**
 * Auto-approve teams that meet all requirements
 */
export async function autoApproveTeams(
  teams: string[],
  performedBy: string = "system"
): Promise<BulkOperationResult> {
  try {
    const result: BulkOperationResult = {
      success: true,
      message: `${teams.length} team(s) approved for competition`,
      affectedTeams: teams,
      timestamp: new Date(),
    };

    logEligibilityAction({
      type: "approve",
      targetTeams: teams,
      reason: "Met all eligibility requirements",
      performedBy,
      timestamp: new Date(),
    });

    return result;
  } catch (error) {
    return {
      success: false,
      message: `Failed to approve teams: ${error instanceof Error ? error.message : "Unknown error"}`,
      affectedTeams: [],
      timestamp: new Date(),
    };
  }
}

/**
 * Flag teams for manual review
 */
export async function flagTeamsForReview(
  teams: string[],
  reason: string,
  performedBy: string = "system"
): Promise<BulkOperationResult> {
  try {
    const result: BulkOperationResult = {
      success: true,
      message: `${teams.length} team(s) flagged for review: ${reason}`,
      affectedTeams: teams,
      timestamp: new Date(),
    };

    logEligibilityAction({
      type: "flag",
      targetTeams: teams,
      reason,
      performedBy,
      timestamp: new Date(),
    });

    return result;
  } catch (error) {
    return {
      success: false,
      message: `Failed to flag teams: ${error instanceof Error ? error.message : "Unknown error"}`,
      affectedTeams: [],
      timestamp: new Date(),
    };
  }
}

/**
 * Clear flags/issues for teams
 */
export async function clearTeamIssues(
  teams: string[],
  reason: string,
  performedBy: string = "system"
): Promise<BulkOperationResult> {
  try {
    const result: BulkOperationResult = {
      success: true,
      message: `Cleared issues for ${teams.length} team(s): ${reason}`,
      affectedTeams: teams,
      timestamp: new Date(),
    };

    logEligibilityAction({
      type: "clear",
      targetTeams: teams,
      reason,
      performedBy,
      timestamp: new Date(),
    });

    return result;
  } catch (error) {
    return {
      success: false,
      message: `Failed to clear issues: ${error instanceof Error ? error.message : "Unknown error"}`,
      affectedTeams: [],
      timestamp: new Date(),
    };
  }
}

// ─── Audit Trail Logging ────────────────────────────────────────────
const auditLog: EligibilityAction[] = [];

/**
 * Log an eligibility action for audit trail
 */
export function logEligibilityAction(action: EligibilityAction): void {
  auditLog.push(action);

  // Persist to localStorage for demo (in production, would be API call)
  try {
    localStorage.setItem(
      "eligibility_audit_log",
      JSON.stringify(auditLog.slice(-100)) // Keep last 100
    );
  } catch (error) {
    console.error("Failed to persist audit log:", error);
  }
}

/**
 * Get audit trail for a specific team
 */
export function getTeamAuditTrail(teamId: string): EligibilityAction[] {
  return auditLog.filter((action) => action.targetTeams.includes(teamId));
}

/**
 * Get all audit log entries
 */
export function getAuditLog(limit: number = 50): EligibilityAction[] {
  return auditLog.slice(-limit).reverse();
}

/**
 * Clear audit log (admin only)
 */
export function clearAuditLog(): void {
  auditLog.length = 0;
  localStorage.removeItem("eligibility_audit_log");
}

// ─── Initialize from localStorage ───────────────────────────────────
try {
  const stored = localStorage.getItem("eligibility_audit_log");
  if (stored) {
    auditLog.push(
      ...JSON.parse(stored).map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp),
      }))
    );
  }
} catch (error) {
  console.error("Failed to load audit log from storage:", error);
}
