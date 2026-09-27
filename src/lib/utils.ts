import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return "-";
  try {
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return String(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(d);
  } catch {
    return String(dateStr);
  }
}

/**
 * Format timestamp into WIB time, e.g. "17:24 WIB"
 */
export function formatTimeWIB(dateStrOrDate: string | Date | undefined | null): string {
  if (!dateStrOrDate) return "-";
  try {
    const d = typeof dateStrOrDate === 'string' ? new Date(dateStrOrDate) : dateStrOrDate;
    if (isNaN(d.getTime())) return String(dateStrOrDate);
    const timeStr = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(d);
    return `${timeStr} WIB`;
  } catch {
    return String(dateStrOrDate);
  }
}

/**
 * Format timestamp into Date + WIB time, e.g. "27 September 2026, 17:24 WIB"
 */
export function formatDateTimeWIB(dateStrOrDate: string | Date | undefined | null): string {
  if (!dateStrOrDate) return "-";
  try {
    const d = typeof dateStrOrDate === 'string' ? new Date(dateStrOrDate) : dateStrOrDate;
    if (isNaN(d.getTime())) return String(dateStrOrDate);
    const formatted = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(d);
    return `${formatted} WIB`;
  } catch {
    return String(dateStrOrDate);
  }
}

/**
 * Current date string in WIB (format: YYYY-MM-DD)
 */
export function getCurrentDateWIB(): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Current time string in WIB, e.g. "17:24 WIB"
 */
export function getCurrentTimeWIB(): string {
  try {
    const timeStr = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(new Date());
    return `${timeStr} WIB`;
  } catch {
    return '10:00 WIB';
  }
}

