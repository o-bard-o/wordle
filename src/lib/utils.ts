import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param inputs - the classes to merge
 * @returns a merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
