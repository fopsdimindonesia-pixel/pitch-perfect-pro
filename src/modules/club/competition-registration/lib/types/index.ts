/**
 * Club Competition Registration Module - Type Definitions
 * 
 * Comprehensive type definitions untuk competition registration workflow
 */

/**
 * Competition Status enum
 * Draft -> Registration Open -> Active -> Finished
 */
export type CompetitionStatus = 
  | "Draft"
  | "Registration Open"
  | "Active"
  | "Finished"
  | "Cancelled";

/**
 * Registration Status enum
 * Draft -> Submitted -> Approved/Rejected
 */
export type RegistrationStatus = 
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Rejected";

/**
 * Document Status enum
 */
export type DocumentStatus = 
  | "Pending"
  | "Approved"
  | "Rejected";

/**
 * Competition Format
 */
export type CompetitionFormat = 
  | "League"
  | "Knockout"
  | "Group+KO";

/**
 * Registration Player eligibility
 */
export type PlayerEligibility = 
  | "Verified"
  | "Pending"
  | "Ineligible"
  | "Suspended";

/**
 * Document Requirement Type
 */
export type DocumentRequirementType = 
  | "manager-id"
  | "manager-passport"
  | "player-list"
  | "payment-proof"
  | "club-letter"
  | "player-id"
  | "medical-clearance"
  | "other";

/**
 * ============================================================================
 * COMPETITION TYPES
 * ============================================================================
 */

export interface CompetitionRegulations {
  /** Minimum jumlah pemain yang harus terdaftar */
  minPlayers: number;
  /** Maksimum jumlah pemain yang boleh terdaftar */
  maxPlayers: number;
  /** Batas umur minimum pemain */
  minPlayerAge: number;
  /** Batas umur maksimum pemain */
  maxPlayerAge: number;
  /** Minimum jumlah pemain dalam starting XI */
  minSquadSize: number;
  /** Posisi pemain yang diperlukan (contoh: 1 GK, min 3 DEF) */
  positionRequirements?: Record<string, number>;
}

export interface DocumentRequirement {
  /** Unique identifier */
  id: string;
  /** Type of document (for classification) */
  type: DocumentRequirementType;
  /** Display label */
  label: string;
  /** Is this document required for registration */
  required: boolean;
  /** Accepted file formats (e.g., ['pdf', 'jpg', 'png']) */
  acceptedFormats: string[];
  /** Maximum file size in bytes */
  maxFileSize: number;
  /** Additional description/instructions */
  description?: string;
}

/**
 * Competition Interface - Represents a single competition
 */
export interface Competition {
  // Basic info
  id: string;
  eoId: string;
  eoName: string;
  name: string;
  description: string;
  
  // Format & Category
  format: CompetitionFormat;
  ageGroup: string;
  
  // Status & Timeline
  status: CompetitionStatus;
  registrationDeadline: string; // ISO 8601 date
  startDate: string;
  endDate: string;
  
  // Slots & Pricing
  registrationFee: number; // in IDR
  maxWildcard: number;
  currentClubs: number;
  totalSlots: number;
  slotsAvailable: number;
  
  // Location & Contact
  location?: string;
  eoContact?: string;
  eoPhone?: string;
  eoEmail?: string;
  
  // Rules & Requirements
  regulations: CompetitionRegulations;
  documents?: DocumentRequirement[];
  
  // Additional metadata
  createdAt?: string;
  updatedAt?: string;
  logo?: string;
  banner?: string;
  website?: string;
}

/**
 * ============================================================================
 * CLUB INFO TYPES
 * ============================================================================
 */

export interface ClubInfo {
  id: string;
  name: string;
  city: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  founded?: number;
  logo?: string;
  status?: "Verified" | "Pending" | "Suspended";
}

/**
 * ============================================================================
 * PLAYER REGISTRATION TYPES
 * ============================================================================
 */

/**
 * Registration Player - Player information dalam registration
 */
export interface RegistrationPlayer {
  // Identifiers
  id: string;
  playerId: string;
  
  // Personal Info
  name: string;
  birthDate: string; // YYYY-MM-DD
  age: number;
  nationality: string;
  idNumber: string; // NIK/Passport
  
  // Football Info
  position: string;
  shirtNumber: number;
  height?: number;
  weight?: number;
  
  // Status
  eligible: boolean;
  eligibilityReason?: string;
}

/**
 * ============================================================================
 * DOCUMENT UPLOAD TYPES
 * ============================================================================
 */

/**
 * Uploaded Document - Single file upload dalam registration
 */
export interface UploadedDocument {
  // Identifiers
  id: string;
  type: DocumentRequirementType;
  
  // File Info
  fileName: string;
  fileSize: number; // in bytes
  fileType: string; // mime type
  
  // Status & Timeline
  uploadedAt: string; // ISO 8601
  status: DocumentStatus;
  approvalNotes?: string;
  
  // Storage
  url: string;
  storagePath?: string;
}

/**
 * ============================================================================
 * REGISTRATION TYPES
 * ============================================================================
 */

/**
 * Main Registration Interface - Represents registration status
 */
export interface CompetitionRegistration {
  // Identifiers
  id: string;
  clubId: string;
  competitionId: string;
  
  // Club & Competition Info
  club: ClubInfo;
  competition: Competition;
  
  // Status & Progress
  status: RegistrationStatus;
  /** Current step completed (1-4) */
  stepCompleted: 1 | 2 | 3 | 4;
  
  // Registration Data
  squad: RegistrationPlayer[];
  documents: UploadedDocument[];
  
  // Timeline
  createdAt: string; // ISO 8601
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  
  // Additional Notes
  notes?: string;
  internalNotes?: string; // For admin use
}

/**
 * ============================================================================
 * REGISTRATION FORM STATE TYPES
 * ============================================================================
 */

/**
 * Step 1: Club Confirmation Form Data
 */
export interface RegistrationStep1Data {
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  additionalNotes?: string;
}

/**
 * Step 2: Squad Selection Form Data
 */
export interface RegistrationStep2Data {
  selectedPlayerIds: Set<string>;
  shirtNumbers: Record<string, number>;
  notes?: string;
}

/**
 * Step 3: Document Upload Form Data
 */
export interface RegistrationStep3Data {
  documents: UploadedDocument[];
  uploadProgress: Record<string, number>; // percentage
}

/**
 * Step 4: Confirmation Form Data
 */
export interface RegistrationStep4Data {
  agreedToTerms: boolean;
  agreedToRules: boolean;
  paymentMethod?: string;
}

/**
 * ============================================================================
 * VALIDATION & ERROR TYPES
 * ============================================================================
 */

export interface ValidationError {
  field: string;
  message: string;
  type: "required" | "invalid" | "constraint" | "server";
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * ============================================================================
 * API/FORM SUBMISSION TYPES
 * ============================================================================
 */

/**
 * Registration Submit Payload
 */
export interface RegistrationSubmitPayload {
  clubId: string;
  competitionId: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  squadron: RegistrationPlayer[];
  documents: UploadedDocument[];
  agreedToTerms: boolean;
  agreedToRules: boolean;
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
}

/**
 * ============================================================================
 * CONTEXT TYPES
 * ============================================================================
 */

/**
 * Registration Context State
 */
export interface RegistrationContextState {
  // Data
  competition: Competition | null;
  registration: CompetitionRegistration | null;
  club: ClubInfo | null;
  availableCompetitions: Competition[];
  
  // UI State
  currentStep: 1 | 2 | 3 | 4;
  isLoading: boolean;
  error: ValidationError[] | null;
  success: boolean;
  
  // Form State
  formData: {
    step1: Partial<RegistrationStep1Data>;
    step2: Partial<RegistrationStep2Data>;
    step3: Partial<RegistrationStep3Data>;
    step4: Partial<RegistrationStep4Data>;
  };
}

/**
 * Registration Context Value
 */
export interface RegistrationContextValue extends RegistrationContextState {
  // Actions
  setCurrentStep: (step: 1 | 2 | 3 | 4) => void;
  nextStep: () => void;
  previousStep: () => void;
  
  updateFormData: (step: 1 | 2 | 3 | 4, data: any) => void;
  validateStep: (step: 1 | 2 | 3 | 4) => Promise<ValidationResult>;
  submitRegistration: () => Promise<void>;
  
  setCompetition: (competition: Competition) => void;
  setRegistration: (registration: CompetitionRegistration) => void;
  reset: () => void;
}
