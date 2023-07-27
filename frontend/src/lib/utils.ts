import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(initialDate: string) {
  const date = new Date(initialDate);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridian = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Pad minutes with leading zero if needed
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${hours}: ${paddedMinutes} ${meridian}`;
}
