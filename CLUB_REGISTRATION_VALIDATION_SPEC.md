# Club Registration Validation - Technical Specification

**Document Type:** Technical Implementation Specification  
**Module:** Registration Validation Layer  
**Status:** Draft - Ready for Implementation  
**Priority:** 🔴 Critical Path

---

## SECTION 1: VALIDATION SERVICE ARCHITECTURE

### 1.1 Core Validation Service Structure

```typescript
// src/services/registrationValidator.ts

import type { Registration, ValidationResult, ValidationError } from "@/types/registration";

interface ValidationContext {
  registration: Registration;
  competition: Competition;
  club: Club;
  players: Player[];
  competitionConstraints: CompetitionConstraints;
}

class RegistrationValidator {
  /**
   * Master validation function - orchestrates all validations
   * Returns detailed validation report with pass/fail and error details
   */
  async validateRegistration(
    registrationId: string,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const results = {
      isValid: true,
      errors: [] as ValidationError[],
      warnings: [] as ValidationError[],
      validations: {
        rosterSize: {} as any,
        playerAges: {} as any,
        playerEligibility: {} as any,
        payment: {} as any,
        slotAvailability: {} as any,
      },
    };

    // Run all validations in parallel
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

    // Aggregate results
    if (!rosterValidation.valid) results.isValid = false;
    if (!ageValidation.valid) results.isValid = false;
    if (!eligibilityValidation.valid) results.isValid = false;
    if (!paymentValidation.valid) results.isValid = false;
    if (!slotValidation.valid) results.isValid = false;

    results.errors = [
      ...rosterValidation.errors,
      ...ageValidation.errors,
      ...eligibilityValidation.errors,
      ...paymentValidation.errors,
      ...slotValidation.errors,
    ];

    results.warnings = [
      ...rosterValidation.warnings,
      ...ageValidation.warnings,
      ...eligibilityValidation.warnings,
      ...paymentValidation.warnings,
      ...slotValidation.warnings,
    ];

    return results;
  }

  // ─── VALIDATOR 1: ROSTER SIZE ──────────────────────────────────────────
  async validateRosterSize(context: ValidationContext) {
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
    };

    // Check minimum roster
    if (playerCount < minRosterSize) {
      result.valid = false;
      result.errors.push({
        code: "ROSTER_TOO_SMALL",
        message: `Insufficient players. Required: ${minRosterSize}, Provided: ${playerCount}`,
        severity: "error",
        field: "playerCount",
        details: { 
          required: minRosterSize, 
          provided: playerCount, 
          missing: minRosterSize - playerCount 
        },
      });
    }

    // Check maximum roster
    if (playerCount > maxRosterSize) {
      result.valid = false;
      result.errors.push({
        code: "ROSTER_TOO_LARGE",
        message: `Too many players. Maximum: ${maxRosterSize}, Provided: ${playerCount}`,
        severity: "error",
        field: "playerCount",
        details: {
          maximum: maxRosterSize,
          provided: playerCount,
          excess: playerCount - maxRosterSize,
        },
      });
    }

    // Recommendation if near boundary
    if (playerCount <= minRosterSize + 2) {
      result.warnings.push({
        code: "ROSTER_CLOSE_TO_MINIMUM",
        message: `Roster size is close to minimum. Consider adding backup players.`,
        severity: "warning",
        field: "playerCount",
        details: { buffer: minRosterSize + 2 - playerCount },
      });
    }

    return result;
  }

  // ─── VALIDATOR 2: PLAYER AGE ──────────────────────────────────────────
  async validatePlayerAges(context: ValidationContext) {
    const { players, competition } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    // Extract age limit from competition
    // "U13" -> 13, "U15" -> 15, "U12" -> 12
    const ageLimit = this.extractAgeLimit(competition.ageGroup);

    if (!ageLimit) {
      result.warnings.push({
        code: "UNABLE_TO_EXTRACT_AGE_LIMIT",
        message: `Could not parse age group: ${competition.ageGroup}`,
        severity: "warning",
        field: "competitionAge",
      });
      return result;
    }

    const invalidAgePlayers: any[] = [];
    const atLimitPlayers: any[] = [];

    for (const player of players) {
      if (player.age > ageLimit) {
        result.valid = false;
        invalidAgePlayers.push({
          playerId: player.id,
          name: player.name,
          age: player.age,
          exceeds: player.age - ageLimit,
        });
      } else if (player.age === ageLimit) {
        atLimitPlayers.push({
          playerId: player.id,
          name: player.name,
          age: player.age,
        });
      }
    }

    if (invalidAgePlayers.length > 0) {
      result.errors.push({
        code: "PLAYERS_EXCEED_AGE_LIMIT",
        message: `${invalidAgePlayers.length} player(s) exceed age limit of ${ageLimit}`,
        severity: "error",
        field: "playerAges",
        details: {
          ageLimit,
          invalidCount: invalidAgePlayers.length,
          invalidPlayers: invalidAgePlayers,
        },
      });
    }

    if (atLimitPlayers.length > 0) {
      result.warnings.push({
        code: "PLAYERS_AT_AGE_LIMIT",
        message: `${atLimitPlayers.length} player(s) at maximum age limit`,
        severity: "warning",
        field: "playerAges",
        details: {
          ageLimit,
          atLimitCount: atLimitPlayers.length,
          players: atLimitPlayers,
        },
      });
    }

    result.details = {
      ageLimit,
      totalPlayers: players.length,
      validPlayers: players.length - invalidAgePlayers.length,
      invalidCount: invalidAgePlayers.length,
      atLimitCount: atLimitPlayers.length,
    };

    return result;
  }

  // ─── VALIDATOR 3: PLAYER ELIGIBILITY ──────────────────────────────────
  async validatePlayerEligibility(context: ValidationContext) {
    const { players } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    const suspendedPlayers: any[] = [];
    const pendingPlayers: any[] = [];
    const verifiedPlayers: any[] = [];

    for (const player of players) {
      switch (player.eligibility) {
        case "Verified":
          verifiedPlayers.push(player);
          break;
        case "Pending":
          pendingPlayers.push(player);
          break;
        case "Suspended":
          suspendedPlayers.push(player);
          result.valid = false;
          break;
      }
    }

    // BLOCKING: Suspended players
    if (suspendedPlayers.length > 0) {
      result.errors.push({
        code: "SUSPENDED_PLAYERS",
        message: `${suspendedPlayers.length} suspended player(s) cannot compete`,
        severity: "error",
        field: "playerEligibility",
        details: {
          suspendedCount: suspendedPlayers.length,
          players: suspendedPlayers.map((p) => ({
            id: p.id,
            name: p.name,
          })),
        },
      });
    }

    // WARNING: Pending eligibility
    if (pendingPlayers.length > 0) {
      result.warnings.push({
        code: "PENDING_ELIGIBILITY",
        message: `${pendingPlayers.length} player(s) with pending eligibility verification`,
        severity: "warning",
        field: "playerEligibility",
        details: {
          pendingCount: pendingPlayers.length,
          players: pendingPlayers.map((p) => ({
            id: p.id,
            name: p.name,
          })),
        },
      });
    }

    result.details = {
      totalPlayers: players.length,
      verifiedCount: verifiedPlayers.length,
      pendingCount: pendingPlayers.length,
      suspendedCount: suspendedPlayers.length,
    };

    return result;
  }

  // ─── VALIDATOR 4: PAYMENT ──────────────────────────────────────────────
  async validatePayment(context: ValidationContext) {
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
    };

    // BLOCKING: Unpaid required
    if (registration.paymentStatus === "Unpaid") {
      result.valid = false;
      result.errors.push({
        code: "PAYMENT_NOT_VERIFIED",
        message: `Payment of Rp ${this.formatCurrency(registration.fee)} is required`,
        severity: "error",
        field: "payment",
        details: {
          amount: registration.fee,
          status: registration.paymentStatus,
        },
      });
    }

    // WARNING: Partial payment
    if (registration.paymentStatus === "Partial") {
      result.valid = false;
      result.warnings.push({
        code: "PARTIAL_PAYMENT",
        message: `Partial payment detected. Full payment of Rp ${this.formatCurrency(registration.fee)} required`,
        severity: "warning",
        field: "payment",
        details: {
          amount: registration.fee,
          status: registration.paymentStatus,
        },
      });
    }

    return result;
  }

  // ─── VALIDATOR 5: SLOT AVAILABILITY ────────────────────────────────────
  async validateSlotAvailability(context: ValidationContext) {
    const { competitionConstraints } = context;
    const result: ValidationCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
      details: {},
    };

    const { maxTeams, currentRegistrations, slotsAvailable } =
      competitionConstraints;

    result.details = {
      maxTeams,
      currentRegistrations,
      slotsAvailable,
      utilizationRate: (currentRegistrations / maxTeams) * 100,
    };

    // BLOCKING: No slots available
    if (slotsAvailable <= 0) {
      result.valid = false;
      result.errors.push({
        code: "NO_SLOTS_AVAILABLE",
        message: `Competition is full. Join waiting list.`,
        severity: "error",
        field: "slots",
        details: {
          maxTeams,
          currentRegistrations,
          available: slotsAvailable,
        },
      });
    }

    // WARNING: Limited slots
    if (slotsAvailable <= 2) {
      result.warnings.push({
        code: "LIMITED_SLOTS",
        message: `Only ${slotsAvailable} slot(s) remaining`,
        severity: "warning",
        field: "slots",
        details: {
          available: slotsAvailable,
          maxTeams,
          utilizationRate: (currentRegistrations / maxTeams) * 100,
        },
      });
    }

    return result;
  }

  // ─── UTILITIES ─────────────────────────────────────────────────────────
  private extractAgeLimit(ageGroup: string): number | null {
    // "U13" -> 13, "U15" -> 15, etc.
    const match = ageGroup.match(/U(\d+)/i);
    return match ? parseInt(match[1]) : null;
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

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
   * Generate human-readable validation report
   */
  generateReport(validationResult: ValidationResult): string {
    const lines: string[] = [];
    lines.push("═══ VALIDATION REPORT ═══\n");

    if (validationResult.isValid) {
      lines.push("✅ ALL VALIDATIONS PASSED\n");
    } else {
      lines.push("❌ VALIDATION FAILED\n");
    }

    if (validationResult.errors.length > 0) {
      lines.push("ERRORS:");
      validationResult.errors.forEach((err) => {
        lines.push(`  ✗ ${err.message}`);
      });
      lines.push("");
    }

    if (validationResult.warnings.length > 0) {
      lines.push("WARNINGS:");
      validationResult.warnings.forEach((warn) => {
        lines.push(`  ⚠ ${warn.message}`);
      });
      lines.push("");
    }

    return lines.join("\n");
  }
}

export const registrationValidator = new RegistrationValidator();
```

---

## SECTION 2: TYPE DEFINITIONS

```typescript
// src/types/registration.ts

// ─── REGISTRATION TYPES ────────────────────────────────────────────────
export interface Registration {
  id: string;
  clubId: string;
  clubName: string;
  competitionId: string;
  competitionName: string;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  registeredAt: string;
  fee: number;

  // Enhanced fields
  playerCount: number;
  players: RegistrationPlayer[];
  validationStatus: ValidationStatus;
  validationErrors: ValidationError[];
  competitionConstraints: CompetitionConstraints;

  // Approval tracking
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvalNotes?: string;
  rejectionReason?: string;
}

export type RegistrationStatus =
  | "Draft"
  | "Submitted"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Cancelled";

export type PaymentStatus = "Unpaid" | "Partial" | "Paid";

export interface RegistrationPlayer {
  playerId: string;
  name: string;
  age: number;
  position: string;
  dob: string;
  eligibility: PlayerEligibility;
  ageValid: boolean;
  eligibilityValid: boolean;
}

export type PlayerEligibility = "Verified" | "Pending" | "Suspended";

// ─── VALIDATION TYPES ─────────────────────────────────────────────────
export interface ValidationStatus {
  rosterSize: ValidationCheckStatus;
  playerAges: ValidationCheckStatus;
  playerEligibility: ValidationCheckStatus;
  payment: ValidationCheckStatus;
  slots: ValidationCheckStatus;
}

export type ValidationCheckStatus = "valid" | "invalid" | "warning" | "pending";

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  validations: {
    rosterSize: ValidationCheckResult;
    playerAges: ValidationCheckResult;
    playerEligibility: ValidationCheckResult;
    payment: ValidationCheckResult;
    slotAvailability: ValidationCheckResult;
  };
}

export interface ValidationError {
  code: string;
  message: string;
  severity: "error" | "warning" | "info";
  field: string;
  details?: Record<string, any>;
}

export interface ValidationCheckResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  details: Record<string, any>;
}

// ─── COMPETITION CONSTRAINTS ────────────────────────────────────────────
export interface CompetitionConstraints {
  minRosterSize: number;
  maxRosterSize: number;
  ageLimit: number;
  maxTeams: number;
  currentRegistrations: number;
  slotsAvailable: number;
  registrationDeadline: string;
}

// ─── RELATED ENTITIES ───────────────────────────────────────────────────
export interface Player {
  id: string;
  clubId: string;
  name: string;
  age: number;
  dob: string;
  position: string;
  eligibility: PlayerEligibility;
  number: number;
}

export interface Competition {
  id: string;
  name: string;
  ageGroup: string; // "U13", "U15", etc.
  format: "League" | "Knockout" | "Group+KO";
  status: "Draft" | "Active" | "Finished";
  startDate: string;
  endDate: string;
}

export interface Club {
  id: string;
  name: string;
  city: string;
  status: "Verified" | "Pending" | "Suspended";
}
```

---

## SECTION 3: INTEGRATION POINTS

### 3.1 Enhanced ClubRegistrations Component

```typescript
// src/modules/eo/registrations/ClubRegistrations.tsx (UPDATED)

import { registrationValidator } from "@/services/registrationValidator";
import type { ValidationResult } from "@/types/registration";

export default function ClubRegistrations() {
  const { toast } = useToast();
  const [regs, setRegs] = useState(mockRegistrations);
  const [confirm, setConfirm] = useState<ConfirmState>({ open: false });
  const [validationResults, setValidationResults] = useState<
    Record<string, ValidationResult>
  >({});
  const [isValidating, setIsValidating] = useState(false);

  // NEW: Pre-validate before approval
  const handleApproveClick = async (
    id: string,
    clubName: string,
    competitionName: string
  ) => {
    setIsValidating(true);

    try {
      // Get registration details
      const registration = regs.find((r) => r.id === id);
      if (!registration) return;

      // Build validation context
      const context = {
        registration,
        competition: {
          /* ... */
        },
        club: {
          /* ... */
        },
        players: registration.players,
        competitionConstraints: registration.competitionConstraints,
      };

      // Run validations
      const result = await registrationValidator.validateRegistration(
        id,
        context
      );
      setValidationResults((prev) => ({ ...prev, [id]: result }));

      // Block if validation failed
      if (!result.isValid) {
        toast({
          title: "Validation Failed",
          description: result.errors[0].message,
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }

      // Show confirmation
      setConfirm({
        open: true,
        action: "approve",
        registrationId: id,
        clubName,
        competitionName,
        isLoading: false,
        validationResult: result,
      });
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Could not validate registration",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Update status only if validation passed
  const updateStatus = (status: "Approved" | "Rejected") => {
    if (!confirm.registrationId) return;

    setConfirm((prev) => ({ ...prev, isLoading: true }));

    setTimeout(() => {
      setRegs((prev) =>
        prev.map((r) =>
          r.id === confirm.registrationId ? { ...r, status } : r
        )
      );

      toast({
        title: status === "Approved" ? "Registrasi Disetujui" : "Registrasi Ditolak",
        description: `${confirm.clubName} untuk ${confirm.competitionName} berhasil ${
          status === "Approved" ? "disetujui" : "ditolak"
        }.`,
      });

      setConfirm({ open: false });
    }, 500);
  };

  return (
    // Render with validation results displayed
    // Show validation errors as alerts before approval
  );
}
```

---

## SECTION 4: IMPLEMENTATION CHECKLIST

### Phase 1: Core Service (Timeline: 1-2 days)

- [ ] Create `src/services/registrationValidator.ts`
- [ ] Create `src/types/registration.ts`
- [ ] Implement `validateRosterSize()`
- [ ] Implement `validatePlayerAges()`
- [ ] Implement `validatePlayerEligibility()`
- [ ] Implement `validatePayment()`
- [ ] Implement `validateSlotAvailability()`
- [ ] Add utility functions (extractAgeLimit, formatCurrency)
- [ ] Create unit tests for all validators

### Phase 2: UI Integration (Timeline: 1-2 days)

- [ ] Create `ValidationErrorAlert.tsx` component
- [ ] Create `ValidationWarningAlert.tsx` component
- [ ] Create `RegistrationDetails.tsx` component
- [ ] Update `ClubRegistrations.tsx` with validation
- [ ] Add loading state during validation
- [ ] Add validation results to confirm dialog
- [ ] Create validation report display

### Phase 3: Testing (Timeline: 1 day)

- [ ] Unit tests for validation functions
- [ ] Integration tests for registration approval flow
- [ ] E2E tests for complete workflow
- [ ] Edge case testing
- [ ] Performance testing

---

## SECTION 5: SUCCESS CRITERIA

✅ **Acceptance Criteria:**

1. **Roster Validation**
   - Block approval if players < minRoster
   - Block approval if players > maxRoster
   - Display player count in UI
   - Show validation error with specific counts

2. **Age Validation**
   - Extract age limit from competition ageGroup
   - Validate each player's age
   - Block with "exceeds age limit" error
   - Warn if players at maximum age

3. **Eligibility Validation**
   - Block if any suspended player
   - Warn if any pending eligibility
   - Show player-by-player eligibility status

4. **Payment Validation**
   - Block if paymentStatus is "Unpaid"
   - Warn if paymentStatus is "Partial"
   - Display required payment amount

5. **Slot Validation**
   - Block if no slots available
   - Warn if less than 3 slots remaining
   - Show utilization rate

6. **UI/UX**
   - All validators run in < 500ms
   - Errors display clearly before approval
   - Warnings show but allow proceed
   - Toast notifications on all actions

---

## SECTION 6: ERROR CODES REFERENCE

| Code | Severity | Message | Fix |
|------|----------|---------|-----|
| ROSTER_TOO_SMALL | Error | Add more players | Club adds players |
| ROSTER_TOO_LARGE | Error | Remove players | Club removes players |
| ROSTER_CLOSE_TO_MINIMUM | Warning | Consider adding backups | Recommend but allow |
| PLAYERS_EXCEED_AGE_LIMIT | Error | Player age exceeds limit | Remove ineligible players |
| PLAYERS_AT_AGE_LIMIT | Warning | Backup players recommended | Warn but allow |
| SUSPENDED_PLAYERS | Error | Cannot use suspended player | Wait for reinstatement |
| PENDING_ELIGIBILITY | Warning | Pending verification | Wait or remove player |
| PAYMENT_NOT_VERIFIED | Error | Payment required | Process payment |
| PARTIAL_PAYMENT | Warning | Complete payment needed | Complete payment |
| NO_SLOTS_AVAILABLE | Error | Competition full | Add to waiting list |
| LIMITED_SLOTS | Warning | Few slots remaining | Warn but allow |

