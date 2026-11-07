import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, resolving conflicting Tailwind utility classes.
 * Used by Radix/shadcn-style components added in later phases.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
