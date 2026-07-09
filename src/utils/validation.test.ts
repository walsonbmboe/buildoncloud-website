import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateField,
  contactFormRules,
  newsletterFormRules,
} from './validation';

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('name@domain.co')).toBe(true);
    expect(validateEmail('a@b.c')).toBe(true);
  });

  it('rejects emails without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
    expect(validateEmail('noatsign')).toBe(false);
  });

  it('rejects emails with @ but no domain dot', () => {
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('rejects emails where dot is first or last char of domain', () => {
    expect(validateEmail('user@.domain')).toBe(false);
    expect(validateEmail('user@domain.')).toBe(false);
  });

  it('rejects emails with nothing before @', () => {
    expect(validateEmail('@domain.com')).toBe(false);
  });

  it('trims whitespace before validating', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });
});

describe('validateRequired', () => {
  it('returns true for non-empty strings', () => {
    expect(validateRequired('hello')).toBe(true);
    expect(validateRequired('  x  ')).toBe(true);
  });

  it('returns false for empty or whitespace-only strings', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('   ')).toBe(false);
  });
});

describe('validateMinLength', () => {
  it('returns true when trimmed value meets minimum', () => {
    expect(validateMinLength('hello', 5)).toBe(true);
    expect(validateMinLength('longer text', 5)).toBe(true);
  });

  it('returns false when trimmed value is too short', () => {
    expect(validateMinLength('hi', 5)).toBe(false);
    expect(validateMinLength('', 1)).toBe(false);
  });
});

describe('validateMaxLength', () => {
  it('returns true when value is within max', () => {
    expect(validateMaxLength('hello', 10)).toBe(true);
    expect(validateMaxLength('', 10)).toBe(true);
  });

  it('returns false when value exceeds max', () => {
    expect(validateMaxLength('a'.repeat(101), 100)).toBe(false);
  });
});

describe('validateField', () => {
  it('returns error for empty required field', () => {
    const result = validateField('', { required: true });
    expect(result).toBe('This field is required');
  });

  it('returns null for valid required field', () => {
    const result = validateField('hello', { required: true });
    expect(result).toBeNull();
  });

  it('skips further checks for empty non-required field', () => {
    const result = validateField('', { required: false, minLength: 5 });
    expect(result).toBeNull();
  });

  it('returns email error for invalid email', () => {
    const result = validateField('notanemail', { required: true, email: true });
    expect(result).toBe('Please enter a valid email address');
  });

  it('returns minLength error', () => {
    const result = validateField('hi', { required: true, minLength: 10 });
    expect(result).toBe('Must be at least 10 characters');
  });

  it('returns maxLength error', () => {
    const result = validateField('a'.repeat(101), { required: true, maxLength: 100 });
    expect(result).toBe('Must be no more than 100 characters');
  });

  it('uses custom messages when provided', () => {
    const result = validateField('', {
      required: true,
      messages: { required: 'Name is required' },
    });
    expect(result).toBe('Name is required');
  });

  it('validates pattern', () => {
    const result = validateField('abc', {
      required: true,
      pattern: /^\d+$/,
    });
    expect(result).toBe('Invalid format');
  });
});

describe('contactFormRules', () => {
  it('has rules for all contact form fields', () => {
    expect(contactFormRules.name).toBeDefined();
    expect(contactFormRules.email).toBeDefined();
    expect(contactFormRules.phone).toBeDefined();
    expect(contactFormRules.subject).toBeDefined();
    expect(contactFormRules.message).toBeDefined();
  });

  it('name is required with max 100', () => {
    expect(contactFormRules.name.required).toBe(true);
    expect(contactFormRules.name.maxLength).toBe(100);
  });

  it('email is required with email validation and max 254', () => {
    expect(contactFormRules.email.required).toBe(true);
    expect(contactFormRules.email.email).toBe(true);
    expect(contactFormRules.email.maxLength).toBe(254);
  });

  it('phone is optional with max 20', () => {
    expect(contactFormRules.phone.required).toBe(false);
    expect(contactFormRules.phone.maxLength).toBe(20);
  });

  it('subject is required with max 150', () => {
    expect(contactFormRules.subject.required).toBe(true);
    expect(contactFormRules.subject.maxLength).toBe(150);
  });

  it('message is required with min 10 and max 2000', () => {
    expect(contactFormRules.message.required).toBe(true);
    expect(contactFormRules.message.minLength).toBe(10);
    expect(contactFormRules.message.maxLength).toBe(2000);
  });
});

describe('newsletterFormRules', () => {
  it('has email rule that is required with email validation', () => {
    expect(newsletterFormRules.email.required).toBe(true);
    expect(newsletterFormRules.email.email).toBe(true);
  });
});
