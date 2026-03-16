/**
 * Registration Validator - Integration Guide
 * 
 * Shows how to use the validation service in your React components
 * Examples for common use cases
 * 
 * @since 2026-03-16
 */

// ═══════════════════════════════════════════════════════════════════════════
// BASIC SETUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * STEP 1: Import the validator and types
 */
import { registrationValidator } from "@/services/registrationValidator";
import type { Registration, ValidationResult, Player, Competition } from "@/types/registration";

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLE 1: SIMPLE VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Validate a registration and log results
 */
async function validateRegistration(registrationId: string) {
  try {
    // Build validation context
    const context = {
      registration: getRegistration(registrationId),
      competition: getCompetition("comp-1"),
      club: getClub("club-1"),
      players: getPlayers("club-1"),
      competitionConstraints: getConstraints("comp-1"),
    };

    // Run validation
    const result = await registrationValidator.validateRegistration(registrationId, context);

    // Handle results
    if (result.isValid) {
      console.log("✅ Registration is valid and can be approved");
    } else {
      console.log("❌ Validation failed:");
      result.errors.forEach((err) => {
        console.log(`  - ${err.message}`);
      });
    }

    return result;
  } catch (error) {
    console.error("Validation error:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLE 2: IN REACT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Example: Enhanced ClubRegistrations component with validation
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toast } from "@/hooks/use-toast";

export function ClubRegistrationsWithValidation() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});

  /**
   * Handle approve button click - validates first
   */
  async function handleApprove(registrationId: string, clubName: string, competitionName: string) {
    setIsValidating(true);

    try {
      // Get registration data
      const registration = registrations.find((r) => r.id === registrationId);
      if (!registration) {
        Toast.error("Registration not found");
        return;
      }

      // Build context
      const context = {
        registration,
        competition: getCompetition(registration.competitionId),
        club: getClub(registration.clubId),
        players: registration.players,
        competitionConstraints: registration.competitionConstraints,
      };

      // Run validation
      const result = await registrationValidator.validateRegistration(registrationId, context);
      setValidationResults((prev) => ({ ...prev, [registrationId]: result }));

      // BLOCKING: If validation failed, don't proceed
      if (!result.isValid) {
        Toast.error(`Validation failed: ${result.errors[0].message}`);
        setIsValidating(false);
        return;
      }

      // SUCCESS: Show approval confirmation
      if (registrationValidator.canAutoApprove(result)) {
        Toast.success("✓ Ready for auto-approval");
      } else if (registrationValidator.canManuallyApprove(result)) {
        Toast.warning("⚠ Warnings present, manual review recommended");
      }

      // Update status
      setRegistrations((prev) =>
        prev.map((r) => (r.id === registrationId ? { ...r, status: "Approved" } : r))
      );

      Toast.success(`Registration approved for ${clubName}`);
    } catch (error) {
      Toast.error("Validation error occurred");
      console.error(error);
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="space-y-4">
      {registrations.map((reg) => {
        const result = validationResults[reg.id];
        return (
          <Card key={reg.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{reg.clubName}</h3>
                <p className="text-sm text-muted-foreground">{reg.competitionName}</p>

                {/* Show validation status if available */}
                {result && (
                  <div className="mt-2">
                    {result.isValid ? (
                      <p className="text-sm text-green-600">✓ Validation passed</p>
                    ) : (
                      <p className="text-sm text-red-600">✗ Validation failed</p>
                    )}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleApprove(reg.id, reg.clubName, reg.competitionName)}
                disabled={isValidating}
              >
                {isValidating ? "Validating..." : "Approve"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLE 3: ERROR HANDLING PATTERNS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Pattern: Check specific validation errors
 */
function checkSpecificError(registrationId: string) {
  const context = buildContext(registrationId);
  const result = await registrationValidator.validateRegistration(registrationId, context);

  // Check for specific blocking error
  const paymentError = registrationValidator.getErrorByCode(result, "PAYMENT_NOT_VERIFIED");
  if (paymentError) {
    console.log("Payment still needed:", paymentError.details);
    // Show payment reminder UI
    return;
  }

  // Check for overage players
  const ageError = registrationValidator.getErrorByCode(result, "PLAYERS_EXCEED_AGE_LIMIT");
  if (ageError) {
    console.log("Overage players:", ageError.details.invalidPlayers);
    // Show warning with player names
    return;
  }

  // If we get here, registration is valid
  console.log("All validations passed!");
}

/**
 * Pattern: Get all error messages
 */
function displayAllErrors(registrationId: string) {
  const result = validate(registrationId);
  const messages = registrationValidator.getErrorMessages(result);

  return (
    <div className="bg-red-50 p-4 rounded">
      <h3 className="font-semibold text-red-900">Validation Errors:</h3>
      <ul className="mt-2 space-y-1">
        {messages.map((msg, i) => (
          <li key={i} className="text-sm text-red-800">
            • {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Pattern: Handle warnings differently from errors
 */
function handleValidationResults(registrationId: string, onApprove: () => void) {
  const result = validate(registrationId);

  // Errors = block approval
  if (result.errors.length > 0) {
    return (
      <div className="bg-red-50 p-4">
        <h3 className="font-semibold">Cannot Approve - Fix These Issues:</h3>
        {result.errors.map((err) => (
          <p key={err.code} className="text-sm mt-1">
            {err.message}
          </p>
        ))}
      </div>
    );
  }

  // Warnings = show but allow override
  if (result.warnings.length > 0) {
    return (
      <div className="bg-yellow-50 p-4">
        <h3 className="font-semibold">Warnings - Proceed with Caution:</h3>
        {result.warnings.map((warn) => (
          <p key={warn.code} className="text-sm mt-1">
            {warn.message}
          </p>
        ))}
        <Button onClick={onApprove} className="mt-4">
          Approve Anyway
        </Button>
      </div>
    );
  }

  // No issues = auto-approve
  return (
    <div className="bg-green-50 p-4">
      <p className="text-sm font-semibold">✓ Ready for auto-approval</p>
      <Button onClick={onApprove} className="mt-2" variant="default">
        Auto-Approve
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLE 4: BATCH VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Validate multiple registrations at once
 */
async function validateMultipleRegistrations(registrationIds: string[]) {
  const results = await Promise.all(
    registrationIds.map((id) => {
      const context = buildContext(id);
      return registrationValidator.validateRegistration(id, context);
    })
  );

  // Summary
  const approved = results.filter((r) => r.isValid && r.errors.length === 0);
  const warnings = results.filter((r) => r.isValid && r.warnings.length > 0);
  const failed = results.filter((r) => !r.isValid);

  console.log(`Summary:`);
  console.log(`  ✓ Ready for approval: ${approved.length}`);
  console.log(`  ⚠ Warnings: ${warnings.length}`);
  console.log(`  ✗ Failed: ${failed.length}`);

  return { approved, warnings, failed };
}

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLE 5: VALIDATION REPORT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate and display detailed validation report
 */
function showValidationReport(registrationId: string) {
  const result = validate(registrationId);
  const report = registrationValidator.generateReport(result);

  return (
    <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
      {report}
    </pre>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Build validation context from registration ID
 */
function buildContext(registrationId: string) {
  const registration = getRegistration(registrationId);
  return {
    registration,
    competition: getCompetition(registration.competitionId),
    club: getClub(registration.clubId),
    players: registration.players,
    competitionConstraints: registration.competitionConstraints,
  };
}

/**
 * Get registration from database/store
 * @returns Registration object
 */
function getRegistration(id: string): Registration {
  // Implementation: fetch from API or store
  // return registrations.find(r => r.id === id)
  throw new Error("Implement getRegistration");
}

/**
 * Get competition from database/store
 * @returns Competition object
 */
function getCompetition(id: string) {
  // Implementation
  throw new Error("Implement getCompetition");
}

/**
 * Get club from database/store
 * @returns Club object
 */
function getClub(id: string) {
  // Implementation
  throw new Error("Implement getClub");
}

/**
 * Get players in registration
 * @returns Player array
 */
function getPlayers(clubId: string): Player[] {
  // Implementation
  throw new Error("Implement getPlayers");
}

/**
 * Get competition constraints
 * @returns CompetitionConstraints object
 */
function getConstraints(competitionId: string) {
  // Implementation
  throw new Error("Implement getConstraints");
}

// ═══════════════════════════════════════════════════════════════════════════
// KEY VALIDATOR METHODS REFERENCE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Main validation method - runs all 5 validators
 * 
 * @param registrationId - ID of registration to validate
 * @param context - Validation context with all required data
 * @returns ValidationResult with isValid, errors, warnings, and details
 */
// await registrationValidator.validateRegistration(id, context)

/**
 * Check if registration can be auto-approved
 * Returns true only if ALL validations pass with NO warnings
 * 
 * @param result - ValidationResult from validateRegistration
 * @returns boolean
 */
// registrationValidator.canAutoApprove(result)

/**
 * Check if registration can be manually approved
 * Returns true if NO errors (but warnings are ok)
 * 
 * @param result - ValidationResult
 * @returns boolean
 */
// registrationValidator.canManuallyApprove(result)

/**
 * Generate human-readable validation report
 * 
 * @param result - ValidationResult
 * @returns string (multiline report text)
 */
// registrationValidator.generateReport(result)

/**
 * Get all error messages as array
 * 
 * @param result - ValidationResult
 * @returns string[]
 */
// registrationValidator.getErrorMessages(result)

/**
 * Get all warning messages as array
 * 
 * @param result - ValidationResult
 * @returns string[]
 */
// registrationValidator.getWarningMessages(result)

/**
 * Get specific error by code
 * 
 * @param result - ValidationResult
 * @param code - Error code (e.g., "PAYMENT_NOT_VERIFIED")
 * @returns ValidationError | undefined
 */
// registrationValidator.getErrorByCode(result, code)

/**
 * Get specific warning by code
 * 
 * @param result - ValidationResult
 * @param code - Warning code (e.g., "PENDING_ELIGIBILITY")
 * @returns ValidationError | undefined
 */
// registrationValidator.getWarningByCode(result, code)

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION ERROR CODES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * BLOCKING ERRORS (prevent approval):
 * 
 * Roster Size Validators:
 *   - ROSTER_TOO_SMALL: Player count < minimum
 *   - ROSTER_TOO_LARGE: Player count > maximum
 * 
 * Age Validators:
 *   - PLAYERS_EXCEED_AGE_LIMIT: One or more players over age limit
 * 
 * Eligibility Validators:
 *   - SUSPENDED_PLAYERS: One or more suspended players
 * 
 * Payment Validators:
 *   - PAYMENT_NOT_VERIFIED: Payment status is "Unpaid"
 * 
 * Slot Validators:
 *   - NO_SLOTS_AVAILABLE: Competition is full (0 slots left)
 */

/**
 * WARNINGS (allow override):
 * 
 * Roster Size Validators:
 *   - ROSTER_CLOSE_TO_MINIMUM: Few backup players available
 * 
 * Age Validators:
 *   - PLAYERS_AT_AGE_LIMIT: Players at maximum allowed age
 * 
 * Eligibility Validators:
 *   - PENDING_ELIGIBILITY: Players awaiting eligibility verification
 * 
 * Payment Validators:
 *   - PARTIAL_PAYMENT: Partial payment received
 * 
 * Slot Validators:
 *   - LIMITED_SLOTS: Only 1-2 slots remaining
 */

export {};
