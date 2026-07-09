// src/components/ui/ContactForm.tsx
// Contact form component with inline validation and focus management
// Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 13.6

import { useRef, useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { contactFormRules } from '../../utils/validation';

interface ContactFormProps {
  /** Pre-filled tier name from query param (e.g., "Starter") */
  tier?: string | null;
}

const initialValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

/**
 * Contact form with inline error messages, focus management on submit,
 * and success/error state handling.
 */
export default function ContactForm({ tier }: ContactFormProps) {
  const { values, errors, touched, handleChange, handleBlur, validate, reset } =
    useFormValidation(initialValues, contactFormRules);

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs for focus management
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const fieldOrder: Array<keyof typeof initialValues> = ['name', 'email', 'phone', 'subject', 'message'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const isValid = validate();

    if (!isValid) {
      // Focus first invalid field
      for (const field of fieldOrder) {
        if (errors[field]) {
          fieldRefs[field]?.current?.focus();
          break;
        }
      }
      return;
    }

    try {
      // Submit to Netlify Forms
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('subject', values.subject);
      formData.append('message', values.message);
      if (tier) formData.append('tier', tier);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const getFieldError = (field: keyof typeof initialValues) => {
    return touched[field] && errors[field] ? errors[field] : undefined;
  };

  const inputBaseClasses =
    'w-full px-4 py-3 bg-white border rounded-lg text-heading placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors duration-200';

  const getInputClasses = (field: keyof typeof initialValues) => {
    const hasError = getFieldError(field);
    return `${inputBaseClasses} ${hasError ? 'border-red-400' : 'border-gray-200'}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      {/* Hidden field for Netlify form name */}
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot field for spam prevention */}
      <p className="hidden">
        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
      </p>

      {/* Tier display */}
      {tier && (
        <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-electric-600">
          Enquiring about: <span className="font-semibold text-electric-500">{tier} plan</span>
        </div>
      )}

      {/* Success banner */}
      {submitStatus === 'success' && (
        <div
          role="alert"
          className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"
        >
          Thank you for your message! We'll get back to you within 24 hours.
        </div>
      )}

      {/* Error banner */}
      {submitStatus === 'error' && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          Something went wrong. Please try again or contact us directly via email.
        </div>
      )}

      {/* Name field */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-heading mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          ref={fieldRefs.name}
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={getInputClasses('name')}
          placeholder="Your full name"
          aria-invalid={!!getFieldError('name')}
          aria-describedby={getFieldError('name') ? 'contact-name-error' : undefined}
        />
        {getFieldError('name') && (
          <p id="contact-name-error" className="mt-1 text-xs text-red-500" role="alert">
            {getFieldError('name')}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-heading mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          ref={fieldRefs.email}
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={getInputClasses('email')}
          placeholder="you@example.com"
          aria-invalid={!!getFieldError('email')}
          aria-describedby={getFieldError('email') ? 'contact-email-error' : undefined}
        />
        {getFieldError('email') && (
          <p id="contact-email-error" className="mt-1 text-xs text-red-500" role="alert">
            {getFieldError('email')}
          </p>
        )}
      </div>

      {/* Phone field (optional) */}
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-heading mb-1">
          Phone <span className="text-body-muted">(optional)</span>
        </label>
        <input
          ref={fieldRefs.phone}
          id="contact-phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
          className={getInputClasses('phone')}
          placeholder="+44 7XXX XXX XXX"
          aria-invalid={!!getFieldError('phone')}
          aria-describedby={getFieldError('phone') ? 'contact-phone-error' : undefined}
        />
        {getFieldError('phone') && (
          <p id="contact-phone-error" className="mt-1 text-xs text-red-500" role="alert">
            {getFieldError('phone')}
          </p>
        )}
      </div>

      {/* Subject field */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-heading mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          ref={fieldRefs.subject}
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          onBlur={() => handleBlur('subject')}
          className={getInputClasses('subject')}
          placeholder="How can we help?"
          aria-invalid={!!getFieldError('subject')}
          aria-describedby={getFieldError('subject') ? 'contact-subject-error' : undefined}
        />
        {getFieldError('subject') && (
          <p id="contact-subject-error" className="mt-1 text-xs text-red-500" role="alert">
            {getFieldError('subject')}
          </p>
        )}
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-heading mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          ref={fieldRefs.message}
          id="contact-message"
          name="message"
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          className={`${getInputClasses('message')} resize-y min-h-[120px]`}
          placeholder="Tell us about your project..."
          rows={5}
          aria-invalid={!!getFieldError('message')}
          aria-describedby={getFieldError('message') ? 'contact-message-error' : undefined}
        />
        {getFieldError('message') && (
          <p id="contact-message-error" className="mt-1 text-xs text-red-500" role="alert">
            {getFieldError('message')}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-electric-500 hover:bg-electric-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 focus:ring-offset-white"
      >
        Send Message
      </button>
    </form>
  );
}
