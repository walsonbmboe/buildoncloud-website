// src/hooks/useIntersectionObserver.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useIntersectionObserver } from './useIntersectionObserver';

// Mock IntersectionObserver
let observerCallback: IntersectionObserverCallback;
let observerOptions: IntersectionObserverInit | undefined;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  // Must use function keyword for `new` to work
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        observerCallback = callback;
        observerOptions = options;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = vi.fn();
    }
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
});

describe('useIntersectionObserver', () => {
  it('returns isInView as false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    expect(result.current.isInView).toBe(false);
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('uses default threshold of 0.1', () => {
    const div = document.createElement('div');

    renderHook(() => {
      const hook = useIntersectionObserver();
      (hook.ref as React.MutableRefObject<HTMLElement | null>).current = div;
      return hook;
    });

    expect(observerOptions?.threshold).toBe(0.1);
  });

  it('uses provided threshold', () => {
    const div = document.createElement('div');

    renderHook(() => {
      const hook = useIntersectionObserver({ threshold: 0.5 });
      (hook.ref as React.MutableRefObject<HTMLElement | null>).current = div;
      return hook;
    });

    expect(observerOptions?.threshold).toBe(0.5);
  });

  it('sets isInView to true when element intersects', () => {
    const div = document.createElement('div');

    const { result } = renderHook(() => {
      const hook = useIntersectionObserver();
      (hook.ref as React.MutableRefObject<HTMLElement | null>).current = div;
      return hook;
    });

    // Simulate intersection
    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: div } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(result.current.isInView).toBe(true);
  });

  it('sets isInView back to false when element leaves viewport (triggerOnce=false)', () => {
    const div = document.createElement('div');

    const { result } = renderHook(() => {
      const hook = useIntersectionObserver({ triggerOnce: false });
      (hook.ref as React.MutableRefObject<HTMLElement | null>).current = div;
      return hook;
    });

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: div } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(result.current.isInView).toBe(true);

    act(() => {
      observerCallback(
        [{ isIntersecting: false, target: div } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(result.current.isInView).toBe(false);
  });

  it('unobserves on unmount', () => {
    const div = document.createElement('div');

    const { unmount } = renderHook(() => {
      const hook = useIntersectionObserver();
      (hook.ref as React.MutableRefObject<HTMLElement | null>).current = div;
      return hook;
    });

    unmount();
    expect(mockUnobserve).toHaveBeenCalled();
  });
});
