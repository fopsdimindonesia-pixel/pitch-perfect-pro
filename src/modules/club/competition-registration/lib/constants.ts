/**
 * Competition Registration Module - Constants
 */

import type { CompetitionStatus, RegistrationStatus, DocumentRequirementType } from "./types";

/**
 * ============================================================================
 * STATUS & STATUS COLORS
 * ============================================================================
 */

export const COMPETITION_STATUS_LABELS: Record<CompetitionStatus, string> = {
  "Draft": "Draft",
  "Registration Open": "Pendaftaran Dibuka",
  "Active": "Berlangsung",
  "Finished": "Selesai",
  "Cancelled": "Dibatalkan",
};

export const COMPETITION_STATUS_COLORS: Record<CompetitionStatus, string> = {
  "Draft": "bg-slate-100 text-slate-700 border-slate-200",
  "Registration Open": "bg-green-100 text-green-700 border-green-200",
  "Active": "bg-blue-100 text-blue-700 border-blue-200",
  "Finished": "bg-gray-100 text-gray-700 border-gray-200",
  "Cancelled": "bg-red-100 text-red-700 border-red-200",
};

export const REGISTRATION_STATUS_LABELS: Record<RegistrationStatus, string> = {
  "Draft": "Draft",
  "Submitted": "Diajukan",
  "Approved": "Disetujui",
  "Rejected": "Ditolak",
};

export const REGISTRATION_STATUS_COLORS: Record<RegistrationStatus, string> = {
  "Draft": "bg-slate-100 text-slate-700",
  "Submitted": "bg-yellow-100 text-yellow-700",
  "Approved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
};

/**
 * ============================================================================
 * DOCUMENT REQUIREMENTS
 * ============================================================================
 */

export const DOCUMENT_TYPE_LABELS: Record<DocumentRequirementType, string> = {
  "manager-id": "KTP/ID Manager",
  "manager-passport": "Paspor Manager",
  "player-list": "Daftar Pemain",
  "payment-proof": "Bukti Pembayaran",
  "club-letter": "Surat Izin Klub",
  "player-id": "Fotokopi KTP Pemain",
  "medical-clearance": "Clearance Medis",
  "other": "Dokumen Lainnya",
};

export const ACCEPTED_FILE_FORMATS = {
  document: ["pdf", "doc", "docx"],
  image: ["jpg", "jpeg", "png", "gif"],
  all: ["pdf", "doc", "docx", "jpg", "jpeg", "png", "gif"],
};

export const MAX_FILE_SIZE_MB = 5; // 5MB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * ============================================================================
 * VALIDATION RULES
 * ============================================================================
 */

export const VALIDATION_RULES = {
  squad: {
    minPlayers: 18,
    maxPlayers: 23,
    maxWildcards: 2,
  },
  players: {
    minAge: 12,
    maxAge: 18,
  },
  documents: {
    required: ["manager-id", "player-list", "payment-proof"],
  },
  contact: {
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phonePattern: /^[0-9\-\+\s()]{7,}$/,
  },
};

/**
 * ============================================================================
 * UI CONSTANTS
 * ============================================================================
 */

export const STEPS = {
  1: "Konfirmasi Data Klub",
  2: "Pilih Squad Pemain",
  3: "Upload Dokumen",
  4: "Review & Submit",
} as const;

export const STEP_DESCRIPTIONS = {
  1: "Verifikasi informasi klub dan kontak person",
  2: "Pilih pemain yang akan terdaftar dalam kompetisi",
  3: "Upload dokumen pendukung registrasi",
  4: "Tinjau ulang data dan submit registrasi",
} as const;

/**
 * ============================================================================
 * MESSAGES
 * ============================================================================
 */

export const ERROR_MESSAGES = {
  // General
  REQUIRED_FIELD: "Kolom ini harus diisi",
  INVALID_EMAIL: "Email tidak valid",
  INVALID_PHONE: "Nomor telepon tidak valid",
  
  // Squad
  SQUAD_TOO_FEW: "Minimal 18 pemain harus dipilih",
  SQUAD_TOO_MANY: "Maksimal 23 pemain boleh dipilih",
  PLAYER_INELIGIBLE: "Pemain tidak memenuhi syarat umur",
  PLAYER_ALREADY_SELECTED: "Pemain sudah terpilih",
  
  // Documents
  FILE_TOO_LARGE: `File terlalu besar. Maksimal ${MAX_FILE_SIZE_MB}MB`,
  INVALID_FILE_TYPE: "Format file tidak didukung",
  DOCUMENT_MISSING: "Dokumen wajib masih kurang",
  UPLOAD_FAILED: "Gagal upload file. Coba lagi",
  
  // Registration
  COMPETITION_FULL: "Kuota kompetisi penuh",
  REGISTRATION_CLOSED: "Pendaftaran sudah ditutup",
  ALREADY_REGISTERED: "Klub sudah terdaftar untuk kompetisi ini",
  SUBMIT_FAILED: "Gagal submit registrasi. Coba lagi",
};

export const SUCCESS_MESSAGES = {
  STEP_COMPLETED: "Langkah selesai!",
  REGISTRATION_SUBMITTED: "Registrasi berhasil diajukan",
  DOCUMENT_UPLOADED: "Dokumen berhasil diupload",
  SQUAD_UPDATED: "Squad pemain berhasil diperbarui",
};

/**
 * ============================================================================
 * FORMATTING
 * ============================================================================
 */

export const DATE_FORMAT = "DD MMMM YYYY";
export const DATE_TIME_FORMAT = "DD MMMM YYYY HH:mm";
export const TIME_FORMAT = "HH:mm";

/**
 * ============================================================================
 * POSITION OPTIONS
 * ============================================================================
 */

export const POSITIONS = [
  { value: "GK", label: "Goalkeeper", abbr: "GK" },
  { value: "CB", label: "Center Back", abbr: "CB" },
  { value: "LB", label: "Left Back", abbr: "LB" },
  { value: "RB", label: "Right Back", abbr: "RB" },
  { value: "CD", label: "Central Defender", abbr: "CD" },
  { value: "LM", label: "Left Midfielder", abbr: "LM" },
  { value: "CM", label: "Central Midfielder", abbr: "CM" },
  { value: "RM", label: "Right Midfielder", abbr: "RM" },
  { value: "DM", label: "Defensive Midfielder", abbr: "DM" },
  { value: "AM", label: "Attacking Midfielder", abbr: "AM" },
  { value: "LW", label: "Left Winger", abbr: "LW" },
  { value: "RW", label: "Right Winger", abbr: "RW" },
  { value: "CF", label: "Center Forward", abbr: "CF" },
  { value: "ST", label: "Striker", abbr: "ST" },
  { value: "SS", label: "Second Striker", abbr: "SS" },
];

export const POSITION_COLORS: Record<string, string> = {
  "GK": "bg-yellow-100 text-yellow-800",
  "CB": "bg-blue-100 text-blue-800",
  "LB": "bg-blue-100 text-blue-800",
  "RB": "bg-blue-100 text-blue-800",
  "CD": "bg-blue-100 text-blue-800",
  "LM": "bg-purple-100 text-purple-800",
  "CM": "bg-purple-100 text-purple-800",
  "RM": "bg-purple-100 text-purple-800",
  "DM": "bg-purple-100 text-purple-800",
  "AM": "bg-green-100 text-green-800",
  "LW": "bg-green-100 text-green-800",
  "RW": "bg-green-100 text-green-800",
  "CF": "bg-red-100 text-red-800",
  "ST": "bg-red-100 text-red-800",
  "SS": "bg-red-100 text-red-800",
};

/**
 * ============================================================================
 * PAYMENT
 * ============================================================================
 */

export const PAYMENT_METHODS = [
  { id: "transfer", label: "Transfer Bank", icon: "💳" },
  { id: "cash", label: "Tunai", icon: "💵" },
  { id: "online", label: "E-Wallet", icon: "📱" },
];

/**
 * ============================================================================
 * AGE GROUPS
 * ============================================================================
 */

export const AGE_GROUPS = [
  "U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U20", "Senior"
];

/**
 * ============================================================================
 * COMPETITION FORMATS
 * ============================================================================
 */

export const COMPETITION_FORMATS = [
  { id: "League", label: "Liga", description: "Setiap tim bermain melawan semua tim" },
  { id: "Knockout", label: "Gugur", description: "Sistem gugur - kalah langsung keluar" },
  { id: "Group+KO", label: "Grup + Gugur", description: "Grup terlebih dahulu, top tim lanjut gugur" },
];
