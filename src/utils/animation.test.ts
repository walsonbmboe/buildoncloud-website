// src/utils/animation.test.ts
// Tests for shared Framer Motion animation variants

import { describe, it, expect } from 'vitest';
import {
  fadeIn,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  staggerContainer,
  scaleHover,
  pageTransition,
  scrollReveal,
  getVariants,
  getScrollRevealVariant,
  getStaggerContainer,
} from './animation';

describe('animation variants', () => {
  describe('fadeIn', () => {
    it('should have hidden state with opacity 0', () => {
      expect(fadeIn.hidden).toEqual({ opacity: 0 });
    });

    it('should have visible state with opacity 1', () => {
      expect(fadeIn.visible).toMatchObject({ opacity: 1 });
    });
  });

  describe('fadeUp', () => {
    it('should start hidden with opacity 0 and y offset 30', () => {
      expect(fadeUp.hidden).toEqual({ opacity: 0, y: 30 });
    });

    it('should animate to visible with opacity 1 and y 0', () => {
      expect(fadeUp.visible).toMatchObject({ opacity: 1, y: 0 });
    });
  });

  describe('fadeDown', () => {
    it('should start hidden with opacity 0 and y offset -30', () => {
      expect(fadeDown.hidden).toEqual({ opacity: 0, y: -30 });
    });

    it('should animate to visible with opacity 1 and y 0', () => {
      expect(fadeDown.visible).toMatchObject({ opacity: 1, y: 0 });
    });
  });

  describe('fadeLeft', () => {
    it('should start hidden with opacity 0 and x offset 30', () => {
      expect(fadeLeft.hidden).toEqual({ opacity: 0, x: 30 });
    });

    it('should animate to visible with opacity 1 and x 0', () => {
      expect(fadeLeft.visible).toMatchObject({ opacity: 1, x: 0 });
    });
  });

  describe('fadeRight', () => {
    it('should start hidden with opacity 0 and x offset -30', () => {
      expect(fadeRight.hidden).toEqual({ opacity: 0, x: -30 });
    });

    it('should animate to visible with opacity 1 and x 0', () => {
      expect(fadeRight.visible).toMatchObject({ opacity: 1, x: 0 });
    });
  });

  describe('staggerContainer', () => {
    it('should have staggerChildren in visible transition', () => {
      const visible = staggerContainer.visible as Record<string, unknown>;
      const transition = visible.transition as Record<string, number>;
      expect(transition.staggerChildren).toBe(0.15);
    });

    it('should have delayChildren in visible transition', () => {
      const visible = staggerContainer.visible as Record<string, unknown>;
      const transition = visible.transition as Record<string, number>;
      expect(transition.delayChildren).toBe(0.1);
    });
  });

  describe('scaleHover', () => {
    it('should have initial scale of 1', () => {
      expect(scaleHover.initial).toMatchObject({ scale: 1 });
    });

    it('should have hover scale of 1.03', () => {
      expect(scaleHover.hover).toMatchObject({ scale: 1.03 });
    });

    it('should have tap scale of 0.98', () => {
      expect(scaleHover.tap).toMatchObject({ scale: 0.98 });
    });
  });

  describe('pageTransition', () => {
    it('should have initial state with opacity 0', () => {
      expect(pageTransition.initial).toMatchObject({ opacity: 0 });
    });

    it('should have animate state with opacity 1', () => {
      expect(pageTransition.animate).toMatchObject({ opacity: 1 });
    });

    it('should have exit state with opacity 0', () => {
      expect(pageTransition.exit).toMatchObject({ opacity: 0 });
    });

    it('should have animate duration between 200-500ms', () => {
      const animate = pageTransition.animate as Record<string, unknown>;
      const transition = animate.transition as { duration: number };
      expect(transition.duration).toBeGreaterThanOrEqual(0.2);
      expect(transition.duration).toBeLessThanOrEqual(0.5);
    });

    it('should have exit duration between 200-500ms', () => {
      const exit = pageTransition.exit as Record<string, unknown>;
      const transition = exit.transition as { duration: number };
      expect(transition.duration).toBeGreaterThanOrEqual(0.2);
      expect(transition.duration).toBeLessThanOrEqual(0.5);
    });
  });

  describe('scrollReveal', () => {
    it('should start hidden with opacity 0 and y offset', () => {
      expect(scrollReveal.hidden).toMatchObject({ opacity: 0, y: 40 });
    });

    it('should animate to visible with opacity 1 and y 0', () => {
      expect(scrollReveal.visible).toMatchObject({ opacity: 1, y: 0 });
    });

    it('should have duration between 300-600ms', () => {
      const visible = scrollReveal.visible as Record<string, unknown>;
      const transition = visible.transition as { duration: number };
      expect(transition.duration).toBeGreaterThanOrEqual(0.3);
      expect(transition.duration).toBeLessThanOrEqual(0.6);
    });
  });
});

describe('getVariants', () => {
  it('should return full motion variants when reducedMotion is false', () => {
    const variants = getVariants(false);
    expect(variants.fadeUp.hidden).toEqual({ opacity: 0, y: 30 });
    expect(variants.fadeUp.visible).toMatchObject({ opacity: 1, y: 0 });
  });

  it('should return reduced motion variants when reducedMotion is true', () => {
    const variants = getVariants(true);
    // All reduced variants should have instant transitions (duration 0)
    const visible = variants.fadeUp.visible as Record<string, unknown>;
    const transition = visible.transition as { duration: number };
    expect(transition.duration).toBe(0);
  });

  it('should return variants with no movement when reducedMotion is true', () => {
    const variants = getVariants(true);
    // Reduced motion variants should not have x/y offsets in visible state
    const fadeUpVisible = variants.fadeUp.visible as Record<string, unknown>;
    expect(fadeUpVisible.x).toBeUndefined();
    expect(fadeUpVisible.y).toBeUndefined();
  });

  it('should return scaleHover with scale 1 when reducedMotion is true', () => {
    const variants = getVariants(true);
    expect(variants.scaleHover.hover).toMatchObject({ scale: 1 });
  });

  it('should return page transition with instant transition when reducedMotion is true', () => {
    const variants = getVariants(true);
    const animate = variants.pageTransition.animate as Record<string, unknown>;
    const transition = animate.transition as { duration: number };
    expect(transition.duration).toBe(0);
  });

  it('should return staggerContainer with no stagger when reducedMotion is true', () => {
    const variants = getVariants(true);
    const visible = variants.staggerContainer.visible as Record<string, unknown>;
    const transition = visible.transition as { staggerChildren: number };
    expect(transition.staggerChildren).toBe(0);
  });
});

describe('getScrollRevealVariant', () => {
  it('should return fade-up variant by default', () => {
    const variant = getScrollRevealVariant();
    expect(variant.hidden).toMatchObject({ opacity: 0, y: 40 });
    expect(variant.visible).toMatchObject({ opacity: 1, x: 0, y: 0 });
  });

  it('should return fade-down variant', () => {
    const variant = getScrollRevealVariant('down');
    expect(variant.hidden).toMatchObject({ opacity: 0, y: -40 });
  });

  it('should return fade-left variant', () => {
    const variant = getScrollRevealVariant('left');
    expect(variant.hidden).toMatchObject({ opacity: 0, x: 40 });
  });

  it('should return fade-right variant', () => {
    const variant = getScrollRevealVariant('right');
    expect(variant.hidden).toMatchObject({ opacity: 0, x: -40 });
  });

  it('should clamp duration to 300-600ms range', () => {
    const shortVariant = getScrollRevealVariant('up', 0.1);
    const visible = shortVariant.visible as Record<string, unknown>;
    const transition = visible.transition as { duration: number };
    expect(transition.duration).toBeGreaterThanOrEqual(0.3);

    const longVariant = getScrollRevealVariant('up', 1.0);
    const longVisible = longVariant.visible as Record<string, unknown>;
    const longTransition = longVisible.transition as { duration: number };
    expect(longTransition.duration).toBeLessThanOrEqual(0.6);
  });

  it('should return instant transition when reducedMotion is true', () => {
    const variant = getScrollRevealVariant('up', 0.5, true);
    const visible = variant.visible as Record<string, unknown>;
    const transition = visible.transition as { duration: number };
    expect(transition.duration).toBe(0);
  });
});

describe('getStaggerContainer', () => {
  it('should return stagger container with custom delay', () => {
    const variant = getStaggerContainer(0.2);
    const visible = variant.visible as Record<string, unknown>;
    const transition = visible.transition as { staggerChildren: number };
    expect(transition.staggerChildren).toBe(0.2);
  });

  it('should return default stagger delay of 0.15', () => {
    const variant = getStaggerContainer();
    const visible = variant.visible as Record<string, unknown>;
    const transition = visible.transition as { staggerChildren: number };
    expect(transition.staggerChildren).toBe(0.15);
  });

  it('should return instant container when reducedMotion is true', () => {
    const variant = getStaggerContainer(0.2, true);
    const visible = variant.visible as Record<string, unknown>;
    const transition = visible.transition as { staggerChildren: number; duration: number };
    expect(transition.staggerChildren).toBe(0);
    expect(transition.duration).toBe(0);
  });
});
