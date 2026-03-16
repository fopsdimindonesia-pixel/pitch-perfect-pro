/**
 * Registration Module Type Definitions
 * 
 * Comprehensive TypeScript interfaces for the club registration system
 * Covers: registrations, players, competitions, validation results
 * 
 * @since 2026-03-16
 * @version 1.0.0
 */

// ═══════════════════════════════════════════════════════════════════════════
// REGISTRATION TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Main registration record linking club to competition
 */
export interface Registration {
  // Identifiers
  id: string;
  clubId: string;
  clubName: string;
  competitionId: string;
  competitionName: string;

  // Status tracking
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;

  // Financial
  fee: number;
  currency?: string; // Default: "IDR"

  // Timestamps
  registeredAt: string; // ISO 8601
  submittedAt?: string;
  reviewedAt?: string;
  appliedAt?: string;

  // Players & validation
  playerCount: number;
  players: RegistrationPlayer[];

  // Validation & constraints
  validationStatus?: ValidationStatus;
  validationErrors?: ValidationError[];
  validationWarnings?: ValidationError[];
  competitionConstraints: CompetitionConstraints;

  // Approval tracking
  status: RegistrationStatus;
  reviewedBy?: string; // EO staff ID
  approverId?: string; // Who approved it
  approverName?: string;
  approvalNotes?: string;
  rejectionReason?: string;
  rejectionReasonCode?: string;

  // Metadata
  slot?: number; // Team slot number if applicable
  bib?: string; // Starting bib number range
  teamGroup?: string; // Group assignment if applicable
}

/**
 * Registration status lifecycle
 */
export type RegistrationStatus =
  | "Draft" // Not yet submitted
  | "Submitted" // Submitted awaiting validation
  | "Pending" // Validated, awaiting approval
  | "Approved" // Approved by EO
  | "Rejected" // Rejected by EO
  | "Cancelled" // Cancelled by club or admin
  | "OnWaitlist" // On competition waiting list
  | "Confirmed"; // Final confirmation

/**
 * Payment status tracking
 */
export type PaymentStatus = "Unpaid" | "Partial" | "Paid" | "Refunded";

/**
 * Individual player in a registration
 */
export interface RegistrationPlayer {
  // Basic info
  playerId: string;
  name: string;
  position: string;
  dob: string; // Date of birth (ISO 8601)
  age: number; // Calculated age at competition start

  // Eligibility
  eligibility: PlayerEligibility;
  idNumber?: string; // National ID or license number
  licenseStatus?: "Valid" | "Expired" | "Pending";

  // Validation results
  ageValid: boolean; // Within competition age limit
  eligibilityValid: boolean; // Not suspended
  documentsComplete?: boolean;

  // Jersey
  shirtNumber?: number;
  captainFlag?: boolean;

  // Player metadata
  height?: number; // cm
  weight?: number; // kg
  markedForDeletion?: boolean; // Marked but not yet removed
}

/**
 * Player eligibility status for competition
 */
export type PlayerEligibility = "Verified" | "Pending" | "Suspended" | "Unknown";

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Complete validation result
 * Contains all errors, warnings, and detailed check results
 */
export interface ValidationResult {
  // Identifiers
  registrationId: string;

  // Overall status
  isValid: boolean;
  timestamp: string; // ISO 8601

  // Collections
  errors: ValidationError[];
  warnings: ValidationError[];

  // Individual validation results
  validations: {
    rosterSize: ValidationCheckResult;
    playerAges: ValidationCheckResult;
    playerEligibility: ValidationCheckResult;
    payment: ValidationCheckResult;
    slotAvailability: ValidationCheckResult;
  };
}

/**
 * Individual validation error or warning
 */
export interface ValidationError {
  // Identification
  code: string; // Machine-readable code (e.g., "ROSTER_TOO_SMALL")
  message: string; // Human-readable message
  severity: ValidationSeverity;

  // Context
  field: string; // Which field caused the error
  details?: Record<string, any>; // Additional data specific to error

  // Remediation
  hint?: string; // Suggestion to fix
  action?: string; // Specific action to take
}

/**
 * Severity levels for validation issues
 */
export type ValidationSeverity = "error" | "warning" | "info";

/**
 * Result of a single validation check
 */
export interface ValidationCheckResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  details: Record<string, any>; // Validator-specific details
}

/**
 * Overall validation status summary
 */
export interface ValidationStatus {
  rosterSize: ValidationCheckStatus;
  playerAges: ValidationCheckStatus;
  playerEligibility: ValidationCheckStatus;
  payment: ValidationCheckStatus;
  slots: ValidationCheckStatus;
}

/**
 * Status of a single validation check
 */
export type ValidationCheckStatus = "valid" | "invalid" | "warning" | "pending" | "skipped";

// ═══════════════════════════════════════════════════════════════════════════
// COMPETITION CONSTRAINTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Competition constraints for validation
 */
export interface CompetitionConstraints {
  // Roster limits
  minRosterSize: number; // Minimum players (e.g., 11)
  maxRosterSize: number; // Maximum players (e.g., 25)

  // Age
  ageLimit: number; // Maximum player age (e.g., 13 for U13)
  ageLimitType?: "exact" | "under" | "range"; // How to interpret age group

  // Slots
  maxTeams: number; // Max registrations for competition
  currentRegistrations: number; // Current count
  slotsAvailable: number; // Remaining slots

  // Timeline
  registrationDeadline?: string; // ISO 8601
  registrationClosed?: boolean;
  waitlistEnabled?: boolean;

  // Documents
  requiredDocuments?: string[];
}

// ═══════════════════════════════════════════════════════════════════════════
// ENTITY TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Player entity
 */
export interface Player {
  // Identifiers
  id: string;
  clubId: string;

  // Personal info
  name: string;
  dob: string; // Date of birth (ISO 8601)
  age: number; // Calculated age

  // Football info
  position: string; // GK, CB, LB, RB, CM, DM, AM, LW, RW, ST, SS, etc.
  shirtNumber?: number;
  idNumber?: string; // National ID or license

  // Status
  eligibility: PlayerEligibility;
  licenseStatus?: "Valid" | "Expired" | "Pending";
  suspension?: {
    status: "Active" | "Expired";
    reason: string;
    expiryDate: string;
  };

  // Metadata
  photo?: string; // Photo URL
  joinDate?: string; // ISO 8601
  lastUpdated?: string; // ISO 8601

  // Performance (optional)
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  appearances?: number;
}

/**
 * Competition entity
 */
export interface Competition {
  // Identifiers
  id: string;
  eoId: string; // Event Organizer ID

  // Basic info
  name: string;
  ageGroup: string; // "U13", "U15", "Adult", etc.
  format: CompetitionFormat; // League, Knockout, etc.

  // Status
  status: CompetitionStatus;

  // Timeline
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  registrationDeadline?: string; // ISO 8601

  // Description
  description?: string;

  // Metadata
  rules?: CompetitionRules;
  location?: string;
  contact?: string;
}

/**
 * Competition format
 */
export type CompetitionFormat = "League" | "Knockout" | "Group+KO" | "Round-Robin" | "Swiss";

/**
 * Competition status
 */
export type CompetitionStatus = "Draft" | "Registration" | "Active" | "Finished" | "Cancelled";

/**
 * Competition rules
 */
export interface CompetitionRules {
  minPlayers?: number;
  maxPlayers?: number;
  matchDuration?: number; // In minutes
  substitutions?: number;
  yellowCardSuspension?: number; // Cards before suspension
  offside?: boolean;
  VAR?: boolean;
}

/**
 * Club entity
 */
export interface Club {
  // Identifiers
  id: string;
  eoId: string; // Event Organizer ID

  // Basic info
  name: string;
  city: string;
  province?: string;

  // Status
  status: ClubStatus;

  // Contact
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;

  // Metadata
  foundedYear?: number;
  registeredAt: string; // ISO 8601
  players?: number; // Current player count
}

/**
 * Club status
 */
export type ClubStatus = "Verified" | "Pending" | "Suspended";

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Approval decision record
 */
export interface ApprovalDecision {
  registrationId: string;
  action: "approve" | "reject" | "request_changes";
  approvedBy: string; // Staff ID
  approvedAt: string; // ISO 8601
  notes?: string;
  reason?: string;
}

/**
 * Validation context for batch operations
 */
export interface ValidationBatchContext {
  registrations: Registration[];
  competitions: Competition[];
  clubs: Club[];
  players: Player[];
}

/**
 * Summary of validation for UI display
 */
export interface ValidationSummary {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningCount: number;
  canApprove: boolean;
  canAutoApprove: boolean;
  primaryIssue?: ValidationError;
}

/**
 * Error log entry
 */
export interface ValidationErrorLog {
  timestamp: string; // ISO 8601
  registrationId: string;
  error: ValidationError;
  context?: any;
  userId?: string; // Who triggered the validation
}

// ═══════════════════════════════════════════════════════════════════════════
// API RESPONSE TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * API response for validation endpoint
 */
export interface ValidationEndpointResponse {
  success: boolean;
  data: ValidationResult;
  message?: string;
  timestamp: string; // ISO 8601
  durationMs?: number; // How long validation took
}

/**
 * API response for approval endpoint
 */
export interface ApprovalEndpointResponse {
  success: boolean;
  data?: Registration;
  message: string;
  timestamp: string; // ISO 8601
}

// ═══════════════════════════════════════════════════════════════════════════
// GUARD FUNCTIONS (Type predicates)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Check if player eligibility is valid (not stopped)
 */
export function isPlayerEligible(player: Player): boolean {
  return player.eligibility === "Verified" && !player.suspension;
}

/**
 * Check if registration can be approved
 */
export function canApproveRegistration(validationResult: ValidationResult): boolean {
  return validationResult.errors.length === 0;
}

/**
 * Check if registration can be auto-approved
 */
export function isAutoApprovable(validationResult: ValidationResult): boolean {
  return validationResult.isValid && validationResult.warnings.length === 0;
}

/**
 * Check if an age is valid for competition
 */
export function isValidAge(playerAge: number, competitionAgeLimit: number): boolean {
  return playerAge <= competitionAgeLimit;
}

/**
 * Check if roster size is valid
 */
export function isValidRosterSize(
  playerCount: number,
  minRoster: number,
  maxRoster: number
): boolean {
  return playerCount >= minRoster && playerCount <= maxRoster;
}
