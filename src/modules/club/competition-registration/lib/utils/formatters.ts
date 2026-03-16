/**
 * Formatting Functions for Competition Registration
 */

import type { Competition, CompetitionStatus, RegistrationStatus, DocumentRequirementType } from "../types";
import {
  COMPETITION_STATUS_LABELS,
  REGISTRATION_STATUS_LABELS,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DOCUMENT_TYPE_LABELS,
} from "../constants";

/**
 * ============================================================================
 * DATE & TIME FORMATTING
 * ============================================================================
 */

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format date and time to Indonesian locale
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format time only
 */
export function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

/**
 * Get relative time (e.g., "2 hari lagi")
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = target.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 1) return `${diffDays} hari lagi`;
  if (diffDays === 1) return `Besok`;
  if (diffHours > 1) return `${diffHours} jam lagi`;
  if (diffHours === 1) return `1 jam lagi`;
  if (diffMins > 1) return `${diffMins} menit lagi`;
  if (diffMins <= 0) return `Sudah lewat`;

  return `${diffMins} menit lagi`;
}

/**
 * ============================================================================
 * CURRENCY FORMATTING
 * ============================================================================
 */

/**
 * Format number as IDR currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number as percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * ============================================================================
 * STATUS FORMATTING
 * ============================================================================
 */

/**
 * Get display label for competition status
 */
export function getCompetitionStatusLabel(status: CompetitionStatus): string {
  return COMPETITION_STATUS_LABELS[status] || status;
}

/**
 * Get display label for registration status
 */
export function getRegistrationStatusLabel(status: RegistrationStatus): string {
  return REGISTRATION_STATUS_LABELS[status] || status;
}

/**
 * ============================================================================
 * FILE FORMATTING
 * ============================================================================
 */

/**
 * Format file size to readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/**
 * Get document type label
 */
export function getDocumentTypeLabel(type: DocumentRequirementType): string {
  return DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * ============================================================================
 * COMPETITION INFO FORMATTING
 * ============================================================================
 */

/**
 * Format competition information for display
 */
export function formatCompetitionInfo(competition: Competition): {
  period: string;
  ageInfo: string;
  statusBadge: string;
  quota: string;
} {
  return {
    period: `${formatDate(competition.startDate)} - ${formatDate(competition.endDate)}`,
    ageInfo: competition.ageGroup,
    statusBadge: getCompetitionStatusLabel(competition.status as CompetitionStatus),
    quota: `${competition.currentClubs}/${competition.totalSlots}`,
  };
}

/**
 * ============================================================================
 * SQUAD FORMATTING
 * ============================================================================
 */

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Format player info summary
 */
export function formatPlayerSummary(name: string, position: string, age: number, shirtNumber?: number): string {
  const parts = [name, `#${shirtNumber || "-"}`, `${position}`, `Umur ${age}`];
  return parts.join(" • ");
}

/**
 * ============================================================================
 * URL & SLUG FORMATTING
 * ============================================================================
 */

/**
 * Convert text to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * ============================================================================
 * VALIDATION MESSAGE FORMATTING
 * ============================================================================
 */

/**
 * Format validation error for display
 */
export function formatValidationError(field: string, message: string): string {
  return `${field}: ${message}`;
}

/**
 * ============================================================================
 * COMPETITION DEADLINE FORMATTING
 * ============================================================================
 */

interface DeadlineInfo {
  formattedDeadline: string;
  daysRemaining: number;
  hoursRemaining: number;
  isUrgent: boolean;
  isPassed: boolean;
  displayText: string;
}

/**
 * Get comprehensive deadline information
 */
export function getDeadlineInfo(deadlineDate: string): DeadlineInfo {
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const isPassed = deadline < now;
  const diffMs = deadline.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.ceil((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const isUrgent = daysRemaining <= 3 && daysRemaining > 0;

  let displayText = "";
  if (isPassed) {
    displayText = "Deadline sudah lewat";
  } else if (daysRemaining <= 0) {
    displayText = "Sudah berakhir";
  } else if (daysRemaining > 7) {
    displayText = `${daysRemaining} hari tersisa`;
  } else if (daysRemaining > 0) {
    displayText = `${daysRemaining} hari, ${hoursRemaining} jam tersisa`;
  }

  return {
    formattedDeadline: formatDate(deadlineDate),
    daysRemaining: Math.max(0, daysRemaining),
    hoursRemaining: Math.max(0, hoursRemaining),
    isUrgent,
    isPassed,
    displayText,
  };
}

/**
 * ============================================================================
 * BREADCRUMB FORMATTING
 * ============================================================================
 */

interface BreadcrumbItem {
  label: string;
  path?: string;
}

/**
 * Format breadcrumb trail
 */
export function formatBreadcrumb(items: BreadcrumbItem[]): string {
  return items.map((item) => item.label).join(" > ");
}
