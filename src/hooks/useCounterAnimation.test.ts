// src/hooks/useCounterAnimation.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCounterAnimation } from './useCounterAnimation';

describe('useCounterAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 when shouldAnimate is false', () => {
    const { result } = renderHook(() => useCounterAnimation(100, 1000, false));
    expect(result.current).toBe(0);
  });

  it('returns 0 when target is 0', () => {
    const { result } = renderHook(() => useCounterAnimation(0, 1000, true));
    expect(result.current).toBe(0);
  });

  it('reaches target value when animation completes', () => {
    let frameCallback: FrameRequestCallback | null = null;
    let frameId = 1;

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      frameCallback = cb;
      return frameId++;
    });

    const { result } = renderHook(() => useCounterAnimation(100, 1000, true));

    // Simulate animation completion
    act(() => {
      // First frame at time 0
      if (frameCallback) frameCallback(0);
    });
    act(() => {
      // Final frame past duration
      if (frameCallback) frameCallback(1000);
    });

    expect(result.current).toBe(100);

    vi.restoreAllMocks();
  });

  it('returns intermediate values during animation', () => {
    let frameCallback: FrameRequestCallback | null = null;
    let frameId = 1;

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      frameCallback = cb;
      return frameId++;
    });

    const { result } = renderHook(() => useCounterAnimation(100, 1000, true));

    // First frame sets start time
    act(() => {
      if (frameCallback) frameCallback(0);
    });

    // Mid animation: 50% through = ease-out gives higher than linear
    act(() => {
      if (frameCallback) frameCallback(500);
    });

    // At 50% progress with ease-out cubic (1 - (1-0.5)^3) = 0.875, so ~88
    expect(result.current).toBeGreaterThan(50);
    expect(result.current).toBeLessThan(100);

    vi.restoreAllMocks();
  });

  it('cancels animation on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42);

    const { unmount } = renderHook(() => useCounterAnimation(100, 1000, true));
    unmount();

    expect(cancelSpy).toHaveBeenCalledWith(42);
    vi.restoreAllMocks();
  });
});
