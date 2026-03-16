/**
 * Registration Validator Service
 * 
 * Enforces all business rules for club registration to competitions
 * Implements validation for:
 * - Roster size (min/max players)
 * - Player age compliance
 * - Player eligibility verification
 * - Payment requirement
 * - Slot availability
 * 
 * @since 2026-03-16
 * @version 1.0.0
 */

import type {
  Registration,
  Player,
  Competition,
  Club,
  ValidationResult,
  ValidationCheckResult,
  ValidationError,
  CompetitionConstraints,
} from "@/types/registration";

/**
 * Context object containing all data needed for validation
 */
interface ValidationContext {
  registration: Registration;
  competition: Competition;
  club: Club;
  players: Player[];
  competitionConstraints: CompetitionConstraints;
}

/**
 * RegistrationValidator
 * 
 * Core validation service implementing all business rules
 * for club registrations to competitions
 */
class RegistrationValidator {
  /**
   * Master validation orchestrator
   * Runs all validators in parallel and aggregates results
   * 
   * @param registrationId - ID of registration to validate
   * @param context - Validation context with all required data
   * @returns Complete validation result with errors, warnings, and details
   */
  async validateRegistration(
    registrationId: string,
    context: ValidationContext
  ): Promise<ValidationResult> {
    // Initialize result object
    const result: ValidationResult = {
      registrationId,
      isValid: true,
      timestamp: new Date().toISOString(),
      errors: [],
      warnings: [],
      validations: {
        rosterSize: {} as any,
        playerAges: {} as any,
        playerEligibility: {} as any,
        payment: {} as any,
        slotAvailability: {} as any,
      },
    };

    try {
      // Run all validations in parallel for performance
      const [
        rosterValidation,
        ageValidation,
        eligibilityValidation,
        paymentValidation,
        slotValidation,
      ] = await Promise.all([
        this.validateRosterSize(context),
        this.validatePlayerAges(context),
        this.validatePlayerEligibility(context),
        this.validatePayment(context),
        this.validateSlotAvailability(context),
      ]);

      // Store individual validation results
      result.validations.rosterSize = rosterValidation;
      result.validations.playerAges = ageValidation;
      result.validations.playerEligibility = eligibilityValidation;
      result.validations.payment = paymentValidation;
      result.validations.slotAvailability = slotValidation;

      // Aggregate errors - if ANY validator failed, overall is invalid
      if (!rosterValidation.valid) result.isValid = false;
      if (!ageValidation.valid) result.isValid = false;
      if (!eligibilityValidation.valid) result.isValid = false;
      if (!paymentValidation.valid) result.isValid = false;
      if (!slotValidation.valid) result.isValid = false;

      // Collect all errors
      result.errors = [
        ...rosterValidation.errors,
        ...ageValidation.errors,
        ...eligibilityValidation.errors,
        ...paymentValidation.errors,
        ...slotValidation.errors,
      ];

      // Collect all warnings
      result.warnings = [
        ...rosterValidation.warnings,
        ...ageValidation.warnings,
        ...eligibilityValidation.warnings,
        ...paymentValidation.warnings,
        ...slotValidation.warnings,
      ];
    } catch (error) {
      // Unexpected validation error
      result.isValid = false;
      result.errors.push({
        code: "VALIDATION_SYSTEM_ERROR",
        message: `Unexpected error during validation: ${error instanceof Error ? error.message : String(error)}`,
        severity: "error",
        field: "system",
      });
    }

    return result;
  }

  /**
   * VALIDATOR 1: Roster Size
   * 
   * Validates that team has sufficient and not excessive players
   * Rule: minRosterSize <= playerCount <= maxRosterSize
   * 
   * Impact: BLOCKING (if invalid, registration cannot be approved)
   */
  private async validateRosterSize(
    context: ValidationContext
  ): Promise<ValidationCheckResult> {
    const { players, competitionConstraints } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    const playerCount = players.length;
    const { minRosterSize, maxRosterSize } = competitionConstraints;

    result.details = {
      playerCount,
      minRosterSize,
      maxRosterSize,
      percentage: ((playerCount / maxRosterSize) * 100).toFixed(1),
    };

    // ─── BLOCKING: Minimum roster check ──────────────────────────────
    if (playerCount < minRosterSize) {
      result.valid = false;
      result.errors.push({
        code: "ROSTER_TOO_SMALL",
        message: `Insufficient players. Required minimum: ${minRosterSize}, Registered: ${playerCount}`,
        severity: "error",
        field: "playerCount",
        details: {
          required: minRosterSize,
          provided: playerCount,
          missing: minRosterSize - playerCount,
        },
      });
    }

    // ─── BLOCKING: Maximum roster check ──────────────────────────────
    if (playerCount > maxRosterSize) {
      result.valid = false;
      result.errors.push({
        code: "ROSTER_TOO_LARGE",
        message: `Too many players. Maximum allowed: ${maxRosterSize}, Registered: ${playerCount}`,
        severity: "error",
        field: "playerCount",
        details: {
          maximum: maxRosterSize,
          provided: playerCount,
          excess: playerCount - maxRosterSize,
        },
      });
    }

    // ─── WARNING: Close to minimum ──────────────────────────────────
    if (playerCount > 0 && playerCount <= minRosterSize + 2 && playerCount >= minRosterSize) {
      result.warnings.push({
        code: "ROSTER_CLOSE_TO_MINIMUM",
        message: `Roster size is close to minimum. Only ${playerCount - minRosterSize} backup player(s) available.`,
        severity: "warning",
        field: "playerCount",
        details: {
          buffer: playerCount - minRosterSize,
          recommendedMinimum: minRosterSize + 3,
        },
      });
    }

    // ─── SUCCESS: Roster size valid ──────────────────────────────────
    if (result.valid && result.warnings.length === 0) {
      result.details.status = `✓ Valid roster (${playerCount}/${maxRosterSize})`;
    }

    return result;
  }

  /**
   * VALIDATOR 2: Player Age
   * 
   * Validates all players meet age requirements for competition
   * Rule: ALL player.age <= competition.ageLimit
   * 
   * Impact: BLOCKING (overage players cannot compete)
   */
  private async validatePlayerAges(
    context: ValidationContext
  ): Promise<ValidationCheckResult> {
    const { players, competition, competitionConstraints } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    // Extract age limit from competition
    const ageLimit = competitionConstraints.ageLimit;

    if (!ageLimit) {
      result.warnings.push({
        code: "UNABLE_TO_EXTRACT_AGE_LIMIT",
        message: `Could not determine age limit from competition: ${competition.ageGroup}`,
        severity: "warning",
        field: "competitionAge",
      });
      return result;
    }

    // Classify players by age status
    const invalidAgePlayers: any[] = [];
    const atLimitPlayers: any[] = [];
    const validPlayers: any[] = [];

    for (const player of players) {
      const ageStatus = {
        playerId: player.id,
        name: player.name,
        age: player.age,
        dob: player.dob,
      };

      if (player.age > ageLimit) {
        invalidAgePlayers.push({
          ...ageStatus,
          exceeds: player.age - ageLimit,
        });
      } else if (player.age === ageLimit) {
        atLimitPlayers.push(ageStatus);
      } else {
        validPlayers.push(ageStatus);
      }
    }

    result.details = {
      ageLimit,
      competitionAgeGroup: competition.ageGroup,
      totalPlayers: players.length,
      validPlayers: validPlayers.length,
      atLimitPlayers: atLimitPlayers.length,
      ovageCount: invalidAgePlayers.length,
    };

    // ─── BLOCKING: Overage players ──────────────────────────────────
    if (invalidAgePlayers.length > 0) {
      result.valid = false;
      result.errors.push({
        code: "PLAYERS_EXCEED_AGE_LIMIT",
        message: `${invalidAgePlayers.length} player(s) exceed age limit of ${ageLimit} years (${competition.ageGroup})`,
        severity: "error",
        field: "playerAges",
        details: {
          ageLimit,
          ageGroup: competition.ageGroup,
          invalidCount: invalidAgePlayers.length,
          invalidPlayers: invalidAgePlayers,
        },
      });
    }

    // ─── WARNING: At age limit ──────────────────────────────────────
    if (atLimitPlayers.length > 0) {
      result.warnings.push({
        code: "PLAYERS_AT_AGE_LIMIT",
        message: `${atLimitPlayers.length} player(s) at maximum age limit (${ageLimit} years)`,
        severity: "warning",
        field: "playerAges",
        details: {
          ageLimit,
          atLimitCount: atLimitPlayers.length,
          players: atLimitPlayers,
          recommendation: "Consider confirming player birthdate is correct",
        },
      });
    }

    // ─── SUCCESS: All ages valid ────────────────────────────────────
    if (result.valid && result.warnings.length === 0) {
      result.details.status = `✓ All ${players.length} players within age limit`;
    }

    return result;
  }

  /**
   * VALIDATOR 3: Player Eligibility
   * 
   * Validates player eligibility status
   * Rule: NO suspended players, WARN on pending
   * 
   * Impact: BLOCKING on suspended, WARNING on pending
   */
  private async validatePlayerEligibility(
    context: ValidationContext
  ): Promise<ValidationCheckResult> {
    const { players } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    // Classify players by eligibility
    const suspendedPlayers: any[] = [];
    const pendingPlayers: any[] = [];
    const verifiedPlayers: any[] = [];

    for (const player of players) {
      const playerInfo = {
        playerId: player.id,
        name: player.name,
        position: player.position,
      };

      switch (player.eligibility) {
        case "Verified":
          verifiedPlayers.push(playerInfo);
          break;
        case "Pending":
          pendingPlayers.push(playerInfo);
          break;
        case "Suspended":
          suspendedPlayers.push(playerInfo);
          result.valid = false;
          break;
      }
    }

    result.details = {
      totalPlayers: players.length,
      verifiedCount: verifiedPlayers.length,
      pendingCount: pendingPlayers.length,
      suspendedCount: suspendedPlayers.length,
    };

    // ─── BLOCKING: Suspended players ────────────────────────────────
    if (suspendedPlayers.length > 0) {
      result.errors.push({
        code: "SUSPENDED_PLAYERS",
        message: `${suspendedPlayers.length} suspended player(s) cannot compete`,
        severity: "error",
        field: "playerEligibility",
        details: {
          suspendedCount: suspendedPlayers.length,
          players: suspendedPlayers.map((p) => ({
            id: p.playerId,
            name: p.name,
          })),
          action: "Wait for reinstatement or replace player",
        },
      });
    }

    // ─── WARNING: Pending eligibility ───────────────────────────────
    if (pendingPlayers.length > 0) {
      result.warnings.push({
        code: "PENDING_ELIGIBILITY",
        message: `${pendingPlayers.length} player(s) have pending eligibility verification`,
        severity: "warning",
        field: "playerEligibility",
        details: {
          pendingCount: pendingPlayers.length,
          players: pendingPlayers.map((p) => ({
            id: p.playerId,
            name: p.name,
          })),
          action: "Follow up with identification verification",
        },
      });
    }

    // ─── SUCCESS: All eligible ──────────────────────────────────────
    if (result.valid && result.warnings.length === 0) {
      result.details.status = `✓ All ${verifiedPlayers.length} players eligible`;
    }

    return result;
  }

  /**
   * VALIDATOR 4: Payment
   * 
   * Validates payment status before approval
   * Rule: paymentStatus === "Paid"
   * 
   * Impact: BLOCKING on unpaid, WARNING on partial
   */
  private async validatePayment(
    context: ValidationContext
  ): Promise<ValidationCheckResult> {
    const { registration } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    result.details = {
      paymentStatus: registration.paymentStatus,
      fee: registration.fee,
      formattedFee: this.formatCurrency(registration.fee),
    };

    // ─── BLOCKING: Unpaid required ──────────────────────────────────
    if (registration.paymentStatus === "Unpaid") {
      result.valid = false;
      result.errors.push({
        code: "PAYMENT_NOT_VERIFIED",
        message: `Payment of ${this.formatCurrency(registration.fee)} is required before approval`,
        severity: "error",
        field: "payment",
        details: {
          amount: registration.fee,
          currency: "IDR",
          status: registration.paymentStatus,
          action: "Collect payment before approving registration",
        },
      });
    }

    // ─── WARNING: Partial payment ───────────────────────────────────
    if (registration.paymentStatus === "Partial") {
      result.warnings.push({
        code: "PARTIAL_PAYMENT",
        message: `Partial payment detected. Full amount of ${this.formatCurrency(registration.fee)} required`,
        severity: "warning",
        field: "payment",
        details: {
          amount: registration.fee,
          currency: "IDR",
          status: registration.paymentStatus,
          action: "Complete payment for approval",
        },
      });
    }

    // ─── SUCCESS: Payment verified ──────────────────────────────────
    if (result.valid && result.warnings.length === 0) {
      result.details.status = `✓ Payment verified (${this.formatCurrency(registration.fee)})`;
    }

    return result;
  }

  /**
   * VALIDATOR 5: Slot Availability
   * 
   * Validates competition has available slots
   * Rule: slotsAvailable > 0 OR waitlistEnabled === true
   * 
   * Impact: BLOCKING on full, WARNING on limited slots
   */
  private async validateSlotAvailability(
    context: ValidationContext
  ): Promise<ValidationCheckResult> {
    const { competitionConstraints } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    const { maxTeams, currentRegistrations, slotsAvailable } =
      competitionConstraints;
    const utilizationRate = (currentRegistrations / maxTeams) * 100;

    result.details = {
      maxTeams,
      currentRegistrations,
      slotsAvailable,
      utilizationPercentage: utilizationRate.toFixed(1),
      utilizationBar: this.createUtilizationBar(utilizationRate),
    };

    // ─── BLOCKING: No slots available ───────────────────────────────
    if (slotsAvailable <= 0) {
      result.valid = false;
      result.errors.push({
        code: "NO_SLOTS_AVAILABLE",
        message: `Competition is full (${currentRegistrations}/${maxTeams} teams). Consider waiting list.`,
        severity: "error",
        field: "slots",
        details: {
          maxTeams,
          currentRegistrations,
          available: slotsAvailable,
          action: "Add to waiting list or choose different competition",
        },
      });
    }

    // ─── WARNING: Limited slots ────────────────────────────────────
    if (slotsAvailable > 0 && slotsAvailable <= 2) {
      result.warnings.push({
        code: "LIMITED_SLOTS",
        message: `Only ${slotsAvailable} slot(s) remaining out of ${maxTeams}. Register soon.`,
        severity: "warning",
        field: "slots",
        details: {
          available: slotsAvailable,
          maxTeams,
          utilization: utilizationRate.toFixed(1),
          action: "Immediate approval recommended",
        },
      });
    }

    // ─── SUCCESS: Slots available ───────────────────────────────────
    if (result.valid && result.warnings.length === 0) {
      result.details.status = `✓ Slots available (${slotsAvailable}/${maxTeams})`;
    }

    return result;
  }

  // ═══════════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Check if registration can be auto-approved (all validations pass)
   */
  canAutoApprove(validationResult: ValidationResult): boolean {
    return (
      validationResult.isValid &&
      validationResult.errors.length === 0 &&
      validationResult.warnings.length === 0
    );
  }

  /**
   * Check if registration can be manually approved (only warnings, no errors)
   */
  canManuallyApprove(validationResult: ValidationResult): boolean {
    return validationResult.errors.length === 0;
  }

  /**
   * Generate human-readable validation report
   */
  generateReport(validationResult: ValidationResult): string {
    const lines: string[] = [];
    lines.push("═══════════════════════════════════════════════════════════");
    lines.push("                   VALIDATION REPORT                        ");
    lines.push("═══════════════════════════════════════════════════════════\n");

    // Overall status
    if (validationResult.isValid) {
      lines.push("✅ ✓ ALL VALIDATIONS PASSED\n");
    } else {
      lines.push("❌ ✗ VALIDATION FAILED\n");
    }

    // Timestamp
    lines.push(`Report Generated: ${validationResult.timestamp}\n`);

    // Errors
    if (validationResult.errors.length > 0) {
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push("BLOCKING ERRORS:");
      validationResult.errors.forEach((err, idx) => {
        lines.push(`  ${idx + 1}. [${err.code}] ${err.message}`);
        if (err.details?.action) {
          lines.push(`     → Action: ${err.details.action}`);
        }
      });
      lines.push("");
    }

    // Warnings
    if (validationResult.warnings.length > 0) {
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push("WARNINGS:");
      validationResult.warnings.forEach((warn, idx) => {
        lines.push(`  ${idx + 1}. [${warn.code}] ${warn.message}`);
        if (warn.details?.action) {
          lines.push(`     → Action: ${warn.details.action}`);
        }
      });
      lines.push("");
    }

    // Summary
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("SUMMARY:");
    lines.push(`  Errors:   ${validationResult.errors.length}`);
    lines.push(`  Warnings: ${validationResult.warnings.length}`);
    lines.push(`  Status:   ${validationResult.isValid ? "Ready for approval" : "Cannot approve"}`);
    lines.push("");
    lines.push("═══════════════════════════════════════════════════════════\n");

    return lines.join("\n");
  }

  /**
   * Format number as Indonesian Rupiah currency
   */
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Create a visual representation of utilization rate
   */
  private createUtilizationBar(percentage: number): string {
    const filled = Math.round(percentage / 10);
    const empty = 10 - filled;
    const color = percentage > 90 ? "🔴" : percentage > 70 ? "🟡" : "🟢";
    return `[${color.repeat(filled)}${"⚪".repeat(empty)}] ${percentage.toFixed(0)}%`;
  }

  /**
   * Get all validation errors as a simple array of messages
   */
  getErrorMessages(validationResult: ValidationResult): string[] {
    return validationResult.errors.map((e) => e.message);
  }

  /**
   * Get all validation warnings as a simple array of messages
   */
  getWarningMessages(validationResult: ValidationResult): string[] {
    return validationResult.warnings.map((w) => w.message);
  }

  /**
   * Get specific validation error by code
   */
  getErrorByCode(validationResult: ValidationResult, code: string): ValidationError | undefined {
    return validationResult.errors.find((e) => e.code === code);
  }

  /**
   * Get specific validation warning by code
   */
  getWarningByCode(validationResult: ValidationResult, code: string): ValidationError | undefined {
    return validationResult.warnings.find((w) => w.code === code);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SINGLETON INSTANCE & EXPORT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Singleton instance of RegistrationValidator
 * Use this throughout the application for consistent validation
 */
export const registrationValidator = new RegistrationValidator();

/**
 * Export the class for testing or multiple instances if needed
 */
export default RegistrationValidator;
