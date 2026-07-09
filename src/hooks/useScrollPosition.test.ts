// src/hooks/useScrollPosition.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useScrollPosition } from './useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 initially', () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toBe(0);
  });

  it('updates on scroll event', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });

    // Value should update since 16ms threshold is met on first call (lastUpdate starts at 0)
    expect(result.current).toBe(100);
  });

  it('throttles rapid scroll updates to ~16ms', () => {
    const { result } = renderHook(() => useScrollPosition());

    // First scroll at time 0 - will pass throttle since lastUpdate starts at 0
    act(() => {
      vi.setSystemTime(new Date(1000));
      Object.defineProperty(window, 'scrollY', { writable: true, value: 50 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(50);

    // Second scroll 5ms later - should be throttled
    act(() => {
      vi.setSystemTime(new Date(1005));
      Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });

    // Should still be 50 because update was throttled (rAF not yet fired)
    expect(result.current).toBe(50);
  });

  it('cleans up scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition());

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});
