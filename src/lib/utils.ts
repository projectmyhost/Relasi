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

/**
 * Compress and convert image File to Base64 data URL for instant and serverless-safe transport
 */
export async function compressImageFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not a browser environment or FileReader unavailable, fallback
    if (typeof window === 'undefined' || typeof FileReader === 'undefined') {
      reject(new Error('FileReader unavailable in current context'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawResult = e.target?.result as string;
      if (!rawResult) {
        reject(new Error('Failed to read file as data URL'));
        return;
      }

      // If already small (< 100KB), return as is
      if (file.size < 100 * 1024) {
        resolve(rawResult);
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const maxDimension = 1200;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawResult);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Compress to quality 0.82 JPEG for optimal balance of sharpness and light payload size (~80-160KB)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        } catch {
          resolve(rawResult);
        }
      };
      img.onerror = () => resolve(rawResult);
      img.src = rawResult;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

