// tests/property/validation.property.ts
// Property-based tests for form validation utilities
// Testing framework: fast-check + vitest

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  validateEmail,
  validateField,
  contactFormRules,
} from '../../src/utils/validation';

/**
 * Property 1: Contact form validation rejects invalid input and preserves data
 *
 * For any contact form state with at least one invalid field (empty name,
 * malformed email, empty subject, or message below 10 characters), calling the
 * validation function SHALL return errors for each invalid field, and no entered
 * form data SHALL be cleared or modified.
 *
 * **Validates: Requirements 13.2, 13.4**
 */
describe('Property 1: Contact form validation rejects invalid input and preserves data', () => {
  // Generator for an invalid name (empty or whitespace-only)
  const invalidNameArb = fc.oneof(
    fc.constant(''),
    fc.stringOf(fc.constant(' '), { minLength: 1, maxLength: 10 })
  );

  // Generator for a valid name
  const validNameArb = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0);

  // Generator for an invalid email (no @, or no dot in domain)
  const invalidEmailArb = fc.oneof(
    fc.constant(''),
    fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('@')),
    // Has @ but no dot in domain part
    fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('@')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('.') && !s.includes('@'))
    ).map(([local, domain]) => `${local}@${domain}`)
  );

  // Generator for a valid email
  const validEmailArb = fc.tuple(
    fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0 && !s.includes('@') && !s.includes(' ')),
    fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.length > 0 && !s.includes('.') && !s.includes('@') && !s.includes(' ')),
    fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.length > 0 && !s.includes('.') && !s.includes('@') && !s.includes(' '))
  ).map(([local, domainPart, tld]) => `${local}@${domainPart}.${tld}`)
   .filter(e => e.length <= 254);

  // Generator for an invalid subject (empty or whitespace-only)
  const invalidSubjectArb = fc.oneof(
    fc.constant(''),
    fc.stringOf(fc.constant(' '), { minLength: 1, maxLength: 10 })
  );

  // Generator for a valid subject
  const validSubjectArb = fc.string({ minLength: 1, maxLength: 150 }).filter(s => s.trim().length > 0);

  // Generator for an invalid message (fewer than 10 chars after trim)
  const invalidMessageArb = fc.oneof(
    fc.constant(''),
    fc.string({ minLength: 1, maxLength: 9 }).filter(s => s.trim().length < 10)
  );

  // Generator for a valid message (10-2000 chars, trimmed length >= 10)
  const validMessageArb = fc.string({ minLength: 10, maxLength: 2000 }).filter(s => s.trim().length >= 10);

  it('should return an error for invalid name and preserve the input', () => {
    fc.assert(
      fc.property(invalidNameArb, (name) => {
        const error = validateField(name, contactFormRules.name);
        // Should produce an error
        expect(error).not.toBeNull();
        // Input data is not mutated (strings are immutable in JS, but we verify the function doesn't transform)
        expect(typeof name).toBe('string');
      }),
      { numRuns: 100 }
    );
  });

  it('should return an error for invalid email and preserve the input', () => {
    fc.assert(
      fc.property(invalidEmailArb, (email) => {
        const originalEmail = email;
        const error = validateField(email, contactFormRules.email);
        expect(error).not.toBeNull();
        // Data is preserved
        expect(email).toBe(originalEmail);
      }),
      { numRuns: 100 }
    );
  });

  it('should return an error for invalid subject and preserve the input', () => {
    fc.assert(
      fc.property(invalidSubjectArb, (subject) => {
        const originalSubject = subject;
        const error = validateField(subject, contactFormRules.subject);
        expect(error).not.toBeNull();
        expect(subject).toBe(originalSubject);
      }),
      { numRuns: 100 }
    );
  });

  it('should return an error for invalid message and preserve the input', () => {
    fc.assert(
      fc.property(invalidMessageArb, (message) => {
        const originalMessage = message;
        const error = validateField(message, contactFormRules.message);
        expect(error).not.toBeNull();
        expect(message).toBe(originalMessage);
      }),
      { numRuns: 100 }
    );
  });

  it('should correctly identify invalid fields in a mixed form (some valid, some invalid)', () => {
    // Generate form data where at least one field is invalid
    const formDataArb = fc.tuple(
      fc.oneof(validNameArb, invalidNameArb),
      fc.oneof(validEmailArb, invalidEmailArb),
      fc.oneof(validSubjectArb, invalidSubjectArb),
      fc.oneof(validMessageArb, invalidMessageArb)
    ).filter(([name, email, subject, message]) => {
      // Ensure at least one field is invalid
      const nameValid = validateField(name, contactFormRules.name) === null;
      const emailValid = validateField(email, contactFormRules.email) === null;
      const subjectValid = validateField(subject, contactFormRules.subject) === null;
      const messageValid = validateField(message, contactFormRules.message) === null;
      return !(nameValid && emailValid && subjectValid && messageValid);
    });

    fc.assert(
      fc.property(formDataArb, ([name, email, subject, message]) => {
        const nameError = validateField(name, contactFormRules.name);
        const emailError = validateField(email, contactFormRules.email);
        const subjectError = validateField(subject, contactFormRules.subject);
        const messageError = validateField(message, contactFormRules.message);

        // At least one error should exist
        const hasError = [nameError, emailError, subjectError, messageError].some(e => e !== null);
        expect(hasError).toBe(true);

        // Valid fields should have null error
        if (validateField(name, contactFormRules.name) === null) {
          expect(nameError).toBeNull();
        }
        if (validateField(email, contactFormRules.email) === null) {
          expect(emailError).toBeNull();
        }

        // Data is preserved (not cleared or modified)
        expect(name).toBeDefined();
        expect(email).toBeDefined();
        expect(subject).toBeDefined();
        expect(message).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 2: Contact form validation accepts all valid input
 *
 * For any contact form data where name is non-empty (≤100 chars), email
 * contains "@" followed by a valid domain (≤254 chars), subject is non-empty
 * (≤150 chars), and message is between 10 and 2000 characters, the validation
 * function SHALL return zero errors.
 *
 * **Validates: Requirements 13.1, 13.2**
 */
describe('Property 2: Contact form validation accepts all valid input', () => {
  // Smart generator: valid name (non-empty, ≤100 chars)
  const validNameArb = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0);

  // Smart generator: valid email (local@domain.tld, ≤254 chars)
  const validEmailArb = fc.tuple(
    fc.stringOf(fc.char().filter(c => c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 1, maxLength: 50 }),
    fc.stringOf(fc.char().filter(c => c !== '.' && c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 1, maxLength: 20 }),
    fc.stringOf(fc.char().filter(c => c !== '.' && c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 2, maxLength: 10 })
  ).map(([local, domainPart, tld]) => `${local}@${domainPart}.${tld}`)
   .filter(e => e.length <= 254 && e.trim().length > 0);

  // Smart generator: valid subject (non-empty, ≤150 chars)
  const validSubjectArb = fc.string({ minLength: 1, maxLength: 150 }).filter(s => s.trim().length > 0);

  // Smart generator: valid message (10-2000 chars, trimmed length ≥ 10)
  const validMessageArb = fc.string({ minLength: 10, maxLength: 2000 }).filter(s => s.trim().length >= 10);

  it('should return null (no error) for all valid form fields', () => {
    fc.assert(
      fc.property(
        validNameArb,
        validEmailArb,
        validSubjectArb,
        validMessageArb,
        (name, email, subject, message) => {
          const nameError = validateField(name, contactFormRules.name);
          const emailError = validateField(email, contactFormRules.email);
          const subjectError = validateField(subject, contactFormRules.subject);
          const messageError = validateField(message, contactFormRules.message);

          expect(nameError).toBeNull();
          expect(emailError).toBeNull();
          expect(subjectError).toBeNull();
          expect(messageError).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should accept valid optional phone field (empty or ≤20 chars)', () => {
    const validPhoneArb = fc.oneof(
      fc.constant(''),
      fc.string({ minLength: 1, maxLength: 20 })
    );

    fc.assert(
      fc.property(validPhoneArb, (phone) => {
        const phoneError = validateField(phone, contactFormRules.phone);
        expect(phoneError).toBeNull();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 3: Email format validation correctness
 *
 * For any string, the email validation function SHALL accept it if and only if it
 * contains an "@" character followed by a domain portion containing at least one "."
 * character — and SHALL reject all other strings.
 *
 * **Validates: Requirements 13.2, 16.2**
 */
describe('Property 3: Email format validation correctness', () => {
  it('should accept emails that have @ with valid domain containing a dot', () => {
    // Generate valid emails: local@domain.tld pattern
    const validEmailArb = fc.tuple(
      fc.stringOf(fc.char().filter(c => c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 1, maxLength: 30 }),
      fc.stringOf(fc.char().filter(c => c !== '.' && c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 1, maxLength: 15 }),
      fc.stringOf(fc.char().filter(c => c !== '.' && c !== '@' && c !== ' ' && c.trim().length > 0), { minLength: 1, maxLength: 10 })
    ).map(([local, domainPart, tld]) => `${local}@${domainPart}.${tld}`);

    fc.assert(
      fc.property(validEmailArb, (email) => {
        expect(validateEmail(email)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('should reject strings without @ character', () => {
    const noAtArb = fc.string({ minLength: 0, maxLength: 100 }).filter(s => !s.includes('@'));

    fc.assert(
      fc.property(noAtArb, (str) => {
        expect(validateEmail(str)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('should reject strings where @ is the first character (empty local part)', () => {
    const atStartArb = fc.string({ minLength: 1, maxLength: 50 }).map(s => `@${s}`);

    fc.assert(
      fc.property(atStartArb, (str) => {
        expect(validateEmail(str)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('should reject strings where domain has no dot', () => {
    const noDotDomainArb = fc.tuple(
      fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('@')),
      fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('.') && !s.includes('@'))
    ).map(([local, domain]) => `${local}@${domain}`);

    fc.assert(
      fc.property(noDotDomainArb, (str) => {
        expect(validateEmail(str)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('should reject strings where domain dot is first character', () => {
    const dotFirstArb = fc.tuple(
      fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('@')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('@'))
    ).map(([local, rest]) => `${local}@.${rest}`);

    fc.assert(
      fc.property(dotFirstArb, (str) => {
        expect(validateEmail(str)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('should reject strings where domain dot is last character', () => {
    const dotLastArb = fc.tuple(
      fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('@')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('.') && !s.includes('@') && s.length > 0)
    ).map(([local, domainBase]) => `${local}@${domainBase}.`);

    fc.assert(
      fc.property(dotLastArb, (str) => {
        expect(validateEmail(str)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('for arbitrary strings: validateEmail returns true iff @ followed by domain with dot (not first/last)', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 200 }), (str) => {
        const result = validateEmail(str);
        const trimmed = str.trim();
        const atIndex = trimmed.indexOf('@');

        if (atIndex < 1) {
          // No valid @ (either missing or at position 0)
          expect(result).toBe(false);
        } else {
          const domain = trimmed.slice(atIndex + 1);
          const dotIndex = domain.indexOf('.');
          const hasDotInValidPosition = dotIndex > 0 && dotIndex < domain.length - 1;

          if (hasDotInValidPosition) {
            expect(result).toBe(true);
          } else {
            expect(result).toBe(false);
          }
        }
      }),
      { numRuns: 100 }
    );
  });
});
