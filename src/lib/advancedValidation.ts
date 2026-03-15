// Advanced Validation Utilities for Club Management System

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Player Registration Validation
 */
export const validatePlayerRegistration = (data: {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  nIK?: string;
  position?: string;
  height?: string;
  weight?: string;
  shirtNumber?: string;
  nationality?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.firstName?.trim()) {
    errors.push({ field: "firstName", message: "First name is required" });
  } else if (data.firstName.length < 2) {
    errors.push({ field: "firstName", message: "First name must be at least 2 characters" });
  }

  if (!data.lastName?.trim()) {
    errors.push({ field: "lastName", message: "Last name is required" });
  }

  if (!data.birthDate) {
    errors.push({ field: "birthDate", message: "Date of birth is required" });
  } else {
    const dob = new Date(data.birthDate);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 16 || age > 45) {
      errors.push({ field: "birthDate", message: "Player age must be between 16 and 45 years" });
    }
  }

  if (!data.nIK?.trim()) {
    errors.push({ field: "nIK", message: "NIK (National ID) is required" });
  } else if (data.nIK.replace(/\D/g, "").length !== 16) {
    errors.push({ field: "nIK", message: "NIK must be 16 digits" });
  }

  if (!data.position) {
    errors.push({ field: "position", message: "Position is required" });
  }

  if (!data.height || parseFloat(data.height) <= 0) {
    errors.push({ field: "height", message: "Height must be a valid number (cm)" });
  } else if (parseFloat(data.height) < 150 || parseFloat(data.height) > 210) {
    errors.push({ field: "height", message: "Height must be between 150cm and 210cm" });
  }

  if (!data.weight || parseFloat(data.weight) <= 0) {
    errors.push({ field: "weight", message: "Weight must be a valid number (kg)" });
  } else if (parseFloat(data.weight) < 50 || parseFloat(data.weight) > 120) {
    errors.push({ field: "weight", message: "Weight must be between 50kg and 120kg" });
  }

  if (!data.shirtNumber) {
    errors.push({ field: "shirtNumber", message: "Shirt number is required" });
  } else {
    const num = parseInt(data.shirtNumber);
    if (isNaN(num) || num < 1 || num > 99) {
      errors.push({ field: "shirtNumber", message: "Shirt number must be between 1 and 99" });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Academy Registration Validation
 */
export const validateAcademyRegistration = (data: {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  ageGroup?: string;
  position?: string;
  school?: string;
  parentContact?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.firstName?.trim()) {
    errors.push({ field: "firstName", message: "First name is required" });
  }

  if (!data.lastName?.trim()) {
    errors.push({ field: "lastName", message: "Last name is required" });
  }

  if (!data.birthDate) {
    errors.push({ field: "birthDate", message: "Date of birth is required" });
  } else {
    const dob = new Date(data.birthDate);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 6 || age > 20) {
      errors.push({ field: "birthDate", message: "Youth players must be between 6 and 20 years old" });
    }
  }

  if (!data.ageGroup) {
    errors.push({ field: "ageGroup", message: "Age group is required" });
  }

  if (!data.position) {
    errors.push({ field: "position", message: "Position is required" });
  }

  if (!data.school?.trim()) {
    errors.push({ field: "school", message: "School is required" });
  }

  if (!data.parentContact?.trim()) {
    errors.push({ field: "parentContact", message: "Parent contact is required" });
  } else if (!/^[\d\-\+\s()]+$/.test(data.parentContact)) {
    errors.push({ field: "parentContact", message: "Invalid phone number format" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Training Session Validation
 */
export const validateTrainingSession = (data: {
  date?: string;
  duration?: string;
  focusArea?: string;
  objectives?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.date) {
    errors.push({ field: "date", message: "Training date is required" });
  } else {
    const sessionDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (sessionDate < today) {
      errors.push({ field: "date", message: "Training date cannot be in the past" });
    }
  }

  if (!data.duration || parseFloat(data.duration) <= 0) {
    errors.push({ field: "duration", message: "Duration must be a valid number (minutes)" });
  } else if (parseFloat(data.duration) < 30 || parseFloat(data.duration) > 180) {
    errors.push({ field: "duration", message: "Session duration must be between 30 and 180 minutes" });
  }

  if (!data.focusArea?.trim()) {
    errors.push({ field: "focusArea", message: "Focus area is required" });
  }

  if (!data.objectives?.trim()) {
    errors.push({ field: "objectives", message: "Session objectives are required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Budget Validation
 */
export const validateBudget = (data: {
  category?: string;
  allocated?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.category?.trim()) {
    errors.push({ field: "category", message: "Budget category is required" });
  }

  if (!data.allocated || parseFloat(data.allocated) <= 0) {
    errors.push({ field: "allocated", message: "Allocated amount must be greater than 0" });
  } else if (parseFloat(data.allocated) > 10000000000) {
    errors.push({ field: "allocated", message: "Allocated amount exceeds maximum limit" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Guest Registration Validation
 */
export const validateGuestRegistration = (data: {
  fullName?: string;
  guestType?: string;
  purpose?: string;
  visitDate?: string;
  contactNumber?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.fullName?.trim()) {
    errors.push({ field: "fullName", message: "Full name is required" });
  }

  if (!data.guestType) {
    errors.push({ field: "guestType", message: "Guest type is required" });
  }

  if (!data.purpose?.trim()) {
    errors.push({ field: "purpose", message: "Visit purpose is required" });
  }

  if (!data.visitDate) {
    errors.push({ field: "visitDate", message: "Visit date is required" });
  } else {
    const visitDate = new Date(data.visitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (visitDate < today) {
      errors.push({ field: "visitDate", message: "Visit date cannot be in the past" });
    }
  }

  if (!data.contactNumber?.trim()) {
    errors.push({ field: "contactNumber", message: "Contact number is required" });
  } else if (!/^[\d\-\+\s()]+$/.test(data.contactNumber)) {
    errors.push({ field: "contactNumber", message: "Invalid phone number format" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Helper function to get error message for a specific field
 */
export const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
  return errors.find(err => err.field === fieldName)?.message;
};

/**
 * Helper function to check if field has error
 */
export const hasFieldError = (errors: ValidationError[], fieldName: string): boolean => {
  return errors.some(err => err.field === fieldName);
};
