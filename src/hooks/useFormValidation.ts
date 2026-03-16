/**
 * useFormValidation Hook
 * Manages form state and validation
 */

import { useState, useCallback, useRef } from 'react';
import { FormErrors, FormValidationSchema, validateForm } from '@/lib/validation';

export interface FormState {
  [key: string]: unknown;
}

export interface UseFormValidationOptions<T extends FormState> {
  initialValues: T;
  schema: FormValidationSchema;
  onSubmit?: (values: T) => void | Promise<void>;
}

export const useFormValidation = <T extends FormState>({
  initialValues,
  schema,
  onSubmit,
}: UseFormValidationOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimeoutRef = useRef<NodeJS.Timeout>();

  /**
   * Handle field change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldValue =
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value)
            : value;

      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      // Clear error when field changes
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors],
  );

  /**
   * Handle field blur
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;

      // Mark as touched
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate single field
      if (schema[name]) {
        const validators = schema[name];
        const value = values[name];

        for (const validator of validators) {
          const error = validator(value);
          if (error) {
            setErrors((prev) => ({
              ...prev,
              [name]: error,
            }));
            break;
          }
        }
      }
    },
    [schema, values],
  );

  /**
   * Validate all fields
   */
  const validateAll = useCallback((): boolean => {
    const newErrors = validateForm(values, schema);
    setErrors(newErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(schema).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {},
    );
    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  }, [values, schema]);

  /**
   * Handle form submit
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateAll()) {
        return;
      }

      try {
        setIsSubmitting(true);

        if (onSubmit) {
          await onSubmit(values);
        }
      } finally {
        // Prevent rapid resubmission
        submitTimeoutRef.current = setTimeout(() => {
          setIsSubmitting(false);
        }, 500);
      }
    },
    [validateAll, values, onSubmit],
  );

  /**
   * Reset form
   */
  const reset = useCallback((newValues?: Partial<T>) => {
    setValues((prev) => ({
      ...prev,
      ...newValues,
    }));
    setErrors({});
    setTouched({});
    setIsSubmitting(false);

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
  }, []);

  /**
   * Set field value
   */
  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  /**
   * Set field error
   */
  const setFieldError = useCallback((field: string, error: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));
  }, []);

  /**
   * Get field props (for Input/Textarea/Select components)
   */
  const getFieldProps = useCallback(
    (fieldName: keyof T) => ({
      name: fieldName,
      value: values[fieldName] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur],
  );

  /**
   * Get field error (only if touched)
   */
  const getFieldError = useCallback(
    (fieldName: string) => (touched[fieldName] ? errors[fieldName] : undefined),
    [errors, touched],
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    getFieldProps,
    getFieldError,
    validateAll,
  };
};
