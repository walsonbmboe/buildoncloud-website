// src/utils/validation.ts
// Form validation utilities for BuildOnCloud Technologies website
// Validates: Requirements 13.1, 13.2, 16.2

/**
 * Validates that an email contains "@" followed by a domain with at least one "."
 */
export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf('@');
  if (atIndex < 1) return false;
  const domain = trimmed.slice(atIndex + 1);
  const dotIndex = domain.indexOf('.');
  // Domain must have at least one dot, and dot can't be first/last char
  return dotIndex > 0 && dotIndex < domain.length - 1;
}

/**
 * Validates that a trimmed value is non-empty.
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validates that value meets a minimum length (after trimming).
 */
export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Validates that value does not exceed a maximum length.
 */
export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}

// --- Field Rule Types ---

export interface FieldRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  messages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    email?: string;
  };
}

/**
 * Validates a single field value against a set of rules.
 * Returns the first error message encountered, or null if valid.
 */
export function validateField(value: string, rules: FieldRule): string | null {
  if (rules.required && !validateRequired(value)) {
    return rules.messages?.required ?? 'This field is required';
  }

  // If field is not required and value is empty, skip further checks
  if (!rules.required && value.trim().length === 0) {
    return null;
  }

  if (rules.email && !validateEmail(value)) {
    return rules.messages?.email ?? 'Please enter a valid email address';
  }

  if (rules.minLength !== undefined && !validateMinLength(value, rules.minLength)) {
    return (
      rules.messages?.minLength ??
      `Must be at least ${rules.minLength} characters`
    );
  }

  if (rules.maxLength !== undefined && !validateMaxLength(value, rules.maxLength)) {
    return (
      rules.messages?.maxLength ??
      `Must be no more than ${rules.maxLength} characters`
    );
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.messages?.pattern ?? 'Invalid format';
  }

  return null;
}

// --- Form Validation Rules ---

export type ContactFormRules = Record<
  'name' | 'email' | 'phone' | 'subject' | 'message',
  FieldRule
>;

export const contactFormRules: ContactFormRules = {
  name: {
    required: true,
    maxLength: 100,
    messages: {
      required: 'Name is required',
      maxLength: 'Name must be no more than 100 characters',
    },
  },
  email: {
    required: true,
    email: true,
    maxLength: 254,
    messages: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
      maxLength: 'Email must be no more than 254 characters',
    },
  },
  phone: {
    required: false,
    maxLength: 20,
    messages: {
      maxLength: 'Phone number must be no more than 20 characters',
    },
  },
  subject: {
    required: true,
    maxLength: 150,
    messages: {
      required: 'Subject is required',
      maxLength: 'Subject must be no more than 150 characters',
    },
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000,
    messages: {
      required: 'Message is required',
      minLength: 'Message must be at least 10 characters',
      maxLength: 'Message must be no more than 2000 characters',
    },
  },
};

export type NewsletterFormRules = Record<'email', FieldRule>;

export const newsletterFormRules: NewsletterFormRules = {
  email: {
    required: true,
    email: true,
    messages: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
  },
};
