/**
 * Validation Functions for Competition Registration
 */

import type {
  ValidationResult,
  ValidationError,
  RegistrationPlayer,
  UploadedDocument,
  RegistrationStep1Data,
  RegistrationStep2Data,
  RegistrationStep3Data,
} from "../types";
import { VALIDATION_RULES, ERROR_MESSAGES, ACCEPTED_FILE_FORMATS, MAX_FILE_SIZE_BYTES } from "../constants";

/**
 * Create validation error
 */
function createError(field: string, message: string, type: "required" | "invalid" | "constraint" | "server" = "invalid"): ValidationError {
  return { field, message, type };
}

/**
 * ============================================================================
 * CONTACT VALIDATION
 * ============================================================================
 */

export function validateEmail(email: string): boolean {
  return VALIDATION_RULES.contact.emailPattern.test(email);
}

export function validatePhone(phone: string): boolean {
  return VALIDATION_RULES.contact.phonePattern.test(phone);
}

/**
 * Validate Step 1 - Club Information
 */
export function validateStep1(data: Partial<RegistrationStep1Data>): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.contactPerson?.trim()) {
    errors.push(createError("contactPerson", ERROR_MESSAGES.REQUIRED_FIELD, "required"));
  }

  if (!data.contactPhone?.trim()) {
    errors.push(createError("contactPhone", ERROR_MESSAGES.REQUIRED_FIELD, "required"));
  } else if (!validatePhone(data.contactPhone)) {
    errors.push(createError("contactPhone", ERROR_MESSAGES.INVALID_PHONE, "invalid"));
  }

  if (!data.contactEmail?.trim()) {
    errors.push(createError("contactEmail", ERROR_MESSAGES.REQUIRED_FIELD, "required"));
  } else if (!validateEmail(data.contactEmail)) {
    errors.push(createError("contactEmail", ERROR_MESSAGES.INVALID_EMAIL, "invalid"));
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * ============================================================================
 * SQUAD VALIDATION
 * ============================================================================
 */

/**
 * Check if player is eligible based on age
 */
export function isPlayerEligible(birthDate: string, minAge: number, maxAge: number): boolean {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= minAge && age <= maxAge;
}

/**
 * Validate Step 2 - Squad Selection
 */
export function validateStep2(
  data: Partial<RegistrationStep2Data>,
  players: RegistrationPlayer[],
  minPlayerAge: number,
  maxPlayerAge: number
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.selectedPlayerIds || data.selectedPlayerIds.size === 0) {
    errors.push(createError("selectedPlayers", ERROR_MESSAGES.SQUAD_TOO_FEW, "required"));
    return { isValid: false, errors };
  }

  const selectedCount = data.selectedPlayerIds.size;

  if (selectedCount < VALIDATION_RULES.squad.minPlayers) {
    errors.push(
      createError("selectedPlayers", ERROR_MESSAGES.SQUAD_TOO_FEW, "constraint")
    );
  }

  if (selectedCount > VALIDATION_RULES.squad.maxPlayers) {
    errors.push(
      createError("selectedPlayers", ERROR_MESSAGES.SQUAD_TOO_MANY, "constraint")
    );
  }

  // Validate each selected player
  let ineligibleCount = 0;
  data.selectedPlayerIds.forEach((playerId) => {
    const player = players.find((p) => p.id === playerId);
    if (player && !isPlayerEligible(player.birthDate, minPlayerAge, maxPlayerAge)) {
      ineligibleCount++;
    }
  });

  if (ineligibleCount > 0) {
    errors.push(
      createError("selectedPlayers", `${ineligibleCount} pemain tidak memenuhi syarat umur`, "constraint")
    );
  }

  // Validate shirt numbers uniqueness
  if (data.shirtNumbers) {
    const numbers = Object.values(data.shirtNumbers);
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      errors.push(
        createError("shirtNumbers", "Nomor punggung harus unik", "constraint")
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * ============================================================================
 * DOCUMENT VALIDATION
 * ============================================================================
 */

/**
 * Validate file format
 */
export function isValidFileFormat(filename: string, acceptedFormats: string[]): boolean {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  return acceptedFormats.includes(extension);
}

/**
 * Get file size in MB
 */
export function getFileSizeInMB(fileSizeInBytes: number): number {
  return Math.round((fileSizeInBytes / (1024 * 1024)) * 10) / 10;
}

/**
 * Validate single file
 */
export function validateFile(
  file: File,
  acceptedFormats: string[] = ACCEPTED_FILE_FORMATS.all,
  maxFileSize: number = MAX_FILE_SIZE_BYTES
): ValidationResult {
  const errors: ValidationError[] = [];

  // Check file size
  if (file.size > maxFileSize) {
    errors.push(createError("file", ERROR_MESSAGES.FILE_TOO_LARGE, "constraint"));
  }

  // Check file type
  if (!isValidFileFormat(file.name, acceptedFormats)) {
    errors.push(createError("file", ERROR_MESSAGES.INVALID_FILE_TYPE, "constraint"));
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate Step 3 - Document Upload
 */
export function validateStep3(
  data: Partial<RegistrationStep3Data>,
  requiredDocuments: string[]
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.documents || data.documents.length === 0) {
    errors.push(createError("documents", ERROR_MESSAGES.DOCUMENT_MISSING, "required"));
    return { isValid: false, errors };
  }

  // Check if all required documents are uploaded
  const uploadedTypes = new Set(data.documents.map((d) => d.type));
  const missingDocs = requiredDocuments.filter((doc) => !uploadedTypes.has(doc as any));

  if (missingDocs.length > 0) {
    errors.push(
      createError("documents", `${missingDocs.length} dokumen wajib belum diupload`, "required")
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * ============================================================================
 * OVERALL VALIDATION
 * ============================================================================
 */

/**
 * Validate complete registration before submission
 */
export function validateCompleteRegistration(
  step1: Partial<RegistrationStep1Data>,
  step2: Partial<RegistrationStep2Data>,
  step3: Partial<RegistrationStep3Data>,
  players: RegistrationPlayer[],
  minAge: number,
  maxAge: number,
  requiredDocs: string[]
): ValidationResult {
  const errors: ValidationError[] = [];

  const v1 = validateStep1(step1);
  const v2 = validateStep2(step2, players, minAge, maxAge);
  const v3 = validateStep3(step3, requiredDocs);

  return {
    isValid: v1.isValid && v2.isValid && v3.isValid,
    errors: [...v1.errors, ...v2.errors, ...v3.errors],
  };
}

/**
 * ============================================================================
 * BUSINESS LOGIC VALIDATION
 * ============================================================================
 */

/**
 * Check if registration deadline has passed
 */
export function isDeadlinePassed(deadlineDate: string): boolean {
  return new Date(deadlineDate) < new Date();
}

/**
 * Check if competition has available slots
 */
export function hasAvailableSlots(currentClubs: number, totalSlots: number): boolean {
  return currentClubs < totalSlots;
}

/**
 * Get days remaining until deadline
 */
export function getDaysUntilDeadline(deadlineDate: string): number {
  const deadline = new Date(deadlineDate);
  const today = new Date();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((deadline.getTime() - today.getTime()) / millisecondsPerDay);
}

/**
 * Check if registration is still open
 */
export function isRegistrationOpen(
  status: string,
  deadlineDate: string,
  hasSlots: boolean
): { open: boolean; reason?: string } {
  if (status !== "Registration Open") {
    return { open: false, reason: "Registrasi belum dibuka atau sudah ditutup" };
  }

  if (isDeadlinePassed(deadlineDate)) {
    return { open: false, reason: "Deadline pendaftaran sudah lewat" };
  }

  if (!hasSlots) {
    return { open: false, reason: "Kuota kompetisi penuh" };
  }

  return { open: true };
}
