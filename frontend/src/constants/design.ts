/**
 * AssetDNA Centralized Design Constants
 * Use these constants instead of magic numbers or raw tailwind classes in animations/layout.
 */

// Animation Speeds (in seconds)
export const ANIMATION_SPEEDS = {
  FAST: 0.15,
  NORMAL: 0.25,
  SLOW: 0.4,
} as const;

// Easing Curves (Framer Motion Array Format)
export const EASINGS = {
  STANDARD_EASE: [0.16, 1, 0.3, 1] as const,
  EMPHASIZED_EASE: [0.16, 1, 0.3, 1] as const,
  EMPHASIZED_DECELERATE: [0.16, 1, 0.3, 1] as const,
  EMPHASIZED_ACCELERATE: [0.3, 0, 0.8, 0.15] as const,
} as const;

// Z-Index System (Standardized Layers)
export const Z_INDEX = {
  HIDE: -1,
  BASE: 0,
  CONTENT: 10,
  NAVBAR: 40,
  DROPDOWN: 50,
  OVERLAY: 100,
  MODAL: 1000,
  TOAST: 9999,
} as const;

// Opacity Scales
export const OPACITY = {
  SUBTLE: 0.05,
  LIGHT: 0.1,
  MEDIUM: 0.4,
  HEAVY: 0.8,
} as const;
