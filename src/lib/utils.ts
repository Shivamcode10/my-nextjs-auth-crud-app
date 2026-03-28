// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names intelligently.
 * - `clsx` handles conditional classes.
 * - `twMerge` ensures Tailwind classes don't conflict (e.g., `p-4 p-2` becomes `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}