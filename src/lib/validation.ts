export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateCompetitionForm(form: {
  name: string;
  description?: string;
  format: string;
  ageGroup: string;
  registrationFee: string;
  startDate: string;
  endDate?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!form.name || form.name.trim().length < 3) {
    errors.push({
      field: "name",
      message: "Nama kompetisi harus minimal 3 karakter",
    });
  }

  // Validate format
  if (!form.format) {
    errors.push({
      field: "format",
      message: "Format kompetisi harus dipilih",
    });
  }

  // Validate age group
  if (!form.ageGroup) {
    errors.push({
      field: "ageGroup",
      message: "Kelompok umur harus dipilih",
    });
  }

  // Validate registration fee
  if (!form.registrationFee) {
    errors.push({
      field: "registrationFee",
      message: "Biaya registrasi harus diisi",
    });
  } else {
    const fee = Number(form.registrationFee);
    if (isNaN(fee) || fee < 0) {
      errors.push({
        field: "registrationFee",
        message: "Biaya registrasi harus berupa angka positif",
      });
    }
  }

  // Validate start date
  if (!form.startDate) {
    errors.push({
      field: "startDate",
      message: "Tanggal mulai harus diisi",
    });
  } else {
    const startDate = new Date(form.startDate);
    if (isNaN(startDate.getTime())) {
      errors.push({
        field: "startDate",
        message: "Format tanggal mulai tidak valid",
      });
    } else if (startDate < new Date()) {
      errors.push({
        field: "startDate",
        message: "Tanggal mulai tidak boleh di masa lalu",
      });
    }
  }

  // Validate end date (if provided)
  if (form.endDate) {
    const endDate = new Date(form.endDate);
    if (isNaN(endDate.getTime())) {
      errors.push({
        field: "endDate",
        message: "Format tanggal selesai tidak valid",
      });
    } else if (form.startDate && endDate < new Date(form.startDate)) {
      errors.push({
        field: "endDate",
        message: "Tanggal selesai harus setelah tanggal mulai",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getFieldError(
  errors: ValidationError[],
  field: string
): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}

// ============================================================================
// EXTENDED VALIDATION UTILITIES
// ============================================================================

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormValidationSchema {
  [key: string]: Array<(value: unknown) => string | null>;
}

// EMAIL VALIDATION
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Invalid email format';
  if (email.length > 254) return 'Email is too long';
  return null;
};

// PASSWORD VALIDATION
export interface PasswordValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {},
): string | null => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  if (!password) return 'Password is required';
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (requireNumbers && !/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return null;
};

// TEXT VALIDATION
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string,
): string | null => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string,
): string | null => {
  if (value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

// NUMERIC VALIDATION
export const validateNumber = (value: string | number, fieldName: string): string | null => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  return null;
};

export const validateMinValue = (
  value: number,
  min: number,
  fieldName: string,
): string | null => {
  if (value < min) {
    return `${fieldName} must be at least ${min}`;
  }
  return null;
};

export const validateMaxValue = (
  value: number,
  max: number,
  fieldName: string,
): string | null => {
  if (value > max) {
    return `${fieldName} must not exceed ${max}`;
  }
  return null;
};

// COMPOSITE VALIDATION
export const validateForm = (
  formData: Record<string, unknown>,
  schema: FormValidationSchema,
): FormErrors => {
  const errors: FormErrors = {};

  for (const [field, validators] of Object.entries(schema)) {
    const value = formData[field];
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
};

// HELPER VALIDATORS
export const createValidator =
  (condition: (value: unknown) => boolean, message: string) =>
  (value: unknown): string | null => {
    return condition(value) ? null : message;
  };

export const combineValidators =
  (...validators: Array<(value: unknown) => string | null>) =>
  (value: unknown): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };

// PREDEFINED VALIDATORS
export const validators = {
  email: (value: unknown) => {
    if (typeof value !== 'string') return 'Email must be a string';
    return validateEmail(value);
  },
  password: (value: unknown) => {
    if (typeof value !== 'string') return 'Password must be a string';
    return validatePassword(value);
  },
  required: (fieldName: string = 'This field') => (value: unknown) => {
    if (typeof value === 'string') {
      return validateRequired(value, fieldName);
    }
    if (!value) return `${fieldName} is required`;
    return null;
  },
  number: (value: unknown) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return validateNumber(value, 'Value');
    }
    return 'Must be a number';
  },
  url: (value: unknown) => {
    if (typeof value !== 'string') return 'URL must be a string';
    try {
      new URL(value);
      return null;
    } catch {
      return 'Invalid URL format';
    }
  },
  phone: (value: unknown) => {
    if (typeof value !== 'string') return 'Phone must be a string';
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(value) ? null : 'Invalid phone number format';
  },
};
