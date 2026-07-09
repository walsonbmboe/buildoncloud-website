// src/hooks/useFormValidation.ts
// Generic form validation hook with rules, errors, touched state, and form actions.
// Uses validateField from src/utils/validation.ts for field-level validation.
// Validates: Requirements 13.2, 13.4

import { useState, useCallback } from 'react';
import { validateField, type FieldRule } from '../utils/validation';

export interface UseFormValidationReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T, value: string) => void;
  handleBlur: (field: keyof T) => void;
  validate: () => boolean;
  reset: () => void;
}

/**
 * Generic form validation hook that manages form state, validation errors,
 * and touched tracking.
 *
 * @param initialValues - The initial values for the form fields
 * @param rules - Validation rules keyed by field name
 * @returns Form state and handlers
 */
export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  rules: Record<string, FieldRule>
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing in a touched field
      const fieldRules = rules[field as string];
      if (fieldRules) {
        const error = validateField(value, fieldRules);
        setErrors((prev) => {
          const next = { ...prev };
          if (error) {
            next[field] = error;
          } else {
            delete next[field];
          }
          return next;
        });
      }
    },
    [rules]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate field on blur
      const fieldRules = rules[field as string];
      if (fieldRules) {
        const fieldValue = values[field] ?? '';
        const error = validateField(fieldValue, fieldRules);
        setErrors((prev) => {
          const next = { ...prev };
          if (error) {
            next[field] = error;
          } else {
            delete next[field];
          }
          return next;
        });
      }
    },
    [rules, values]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    let isValid = true;

    for (const field of Object.keys(initialValues) as Array<keyof T>) {
      allTouched[field] = true;
      const fieldRules = rules[field as string];
      if (fieldRules) {
        const fieldValue = values[field] ?? '';
        const error = validateField(fieldValue, fieldRules);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    }

    setTouched(allTouched);
    setErrors(newErrors);
    return isValid;
  }, [initialValues, rules, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}
