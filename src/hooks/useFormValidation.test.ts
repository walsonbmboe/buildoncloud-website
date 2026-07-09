// src/hooks/useFormValidation.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFormValidation } from './useFormValidation';
import type { FieldRule } from '../utils/validation';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

const rules: Record<string, FieldRule> = {
  name: {
    required: true,
    messages: { required: 'Name is required' },
  },
  email: {
    required: true,
    email: true,
    messages: {
      required: 'Email is required',
      email: 'Please enter a valid email',
    },
  },
  message: {
    required: true,
    minLength: 10,
    messages: {
      required: 'Message is required',
      minLength: 'Message must be at least 10 characters',
    },
  },
};

describe('useFormValidation', () => {
  it('initializes with provided values', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('handleChange updates field value', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleChange('name', 'John');
    });

    expect(result.current.values.name).toBe('John');
  });

  it('handleBlur marks field as touched and validates', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleBlur('name');
    });

    expect(result.current.touched.name).toBe(true);
    expect(result.current.errors.name).toBe('Name is required');
  });

  it('validate returns false and sets errors when form is invalid', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    let isValid: boolean;
    act(() => {
      isValid = result.current.validate();
    });

    expect(isValid!).toBe(false);
    expect(result.current.errors.name).toBe('Name is required');
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.message).toBe('Message is required');
  });

  it('validate returns true when all fields are valid', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleChange('name', 'John Doe');
      result.current.handleChange('email', 'john@example.com');
      result.current.handleChange('message', 'This is a valid message for testing');
    });

    let isValid: boolean;
    act(() => {
      isValid = result.current.validate();
    });

    expect(isValid!).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('shows email validation error for invalid email', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Please enter a valid email');
  });

  it('shows minLength error when message is too short', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleChange('message', 'short');
    });

    act(() => {
      result.current.handleBlur('message');
    });

    expect(result.current.errors.message).toBe(
      'Message must be at least 10 characters'
    );
  });

  it('reset restores initial values and clears errors/touched', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    act(() => {
      result.current.handleChange('name', 'John');
      result.current.handleBlur('email');
    });

    expect(result.current.values.name).toBe('John');
    expect(result.current.touched.email).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('clears error when valid value is entered', () => {
    const { result } = renderHook(() =>
      useFormValidation(initialValues, rules)
    );

    // Trigger error
    act(() => {
      result.current.handleBlur('name');
    });
    expect(result.current.errors.name).toBe('Name is required');

    // Fix the error
    act(() => {
      result.current.handleChange('name', 'John');
    });
    expect(result.current.errors.name).toBeUndefined();
  });
});
