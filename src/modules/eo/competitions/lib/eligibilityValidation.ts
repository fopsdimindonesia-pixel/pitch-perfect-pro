import { RegistrationData } from "../context/CompetitionContext";

/**
 * Eligibility Validation Utilities
 * Shared validation logic for team eligibility
 */

export interface EligibilityCheckResult {
  teamId: string;
  teamName: string;
  clubId: string;
  issues: EligibilityIssue[];
  compliant: boolean;
  completeness: number;
}

export interface EligibilityIssue {
  type: "error" | "warning" | "info";
  code: string;
  message: string;
  resolution?: string;
}

// ─── Validation Rules ──────────────────────────────────────────────────
const ELIGIBILITY_RULES = {
  minSquadSize: 14,
  maxSquadSize: 23,

  ageRequirements: {
    "U-12": { min: 10, max: 12 },
    "U-14": { min: 12, max: 14 },
    "U-16": { min: 14, max: 16 },
    "U-18": { min: 16, max: 18 },
    "Open": { min: 16, max: 150 },
  },

  playerRequirements: {
    mustBeRegistered: true,
    mustNotBeSuspended: true,
    contractMustBeActive: true,
    medicalClearanceRequired: true,
    insuranceCoverageRequired: true,
  },

  documentationRequired: [
    "club_registration",
    "player_list",
    "manager_id",
    "medical_certificates",
    "insurance_proof",
  ],
};

/**
 * Main validation function - check team eligibility
 */
export function checkTeamEligibility(
  team: RegistrationData | any,
  competitionConfig: any
): EligibilityCheckResult {
  const issues: EligibilityIssue[] = [];
  let completeness = 0;

  // 1. Check squad size
  if (!team.squad || team.squad.length === 0) {
    issues.push({
      type: "error",
      code: "EMPTY_SQUAD",
      message: "Tidak ada pemain dalam daftar tim",
      resolution: "Tambahkan minimal 14 pemain ke roster",
    });
  } else {
    if (team.squad.length < ELIGIBILITY_RULES.minSquadSize) {
      issues.push({
        type: "error",
        code: "SQUAD_TOO_SMALL",
        message: `Squad terlalu kecil: ${team.squad.length}/${ELIGIBILITY_RULES.minSquadSize} pemain`,
        resolution: `Tambahkan minimal ${ELIGIBILITY_RULES.minSquadSize - team.squad.length} pemain lagi`,
      });
    } else if (team.squad.length > ELIGIBILITY_RULES.maxSquadSize) {
      issues.push({
        type: "error",
        code: "SQUAD_TOO_LARGE",
        message: `Squad terlalu besar: ${team.squad.length}/${ELIGIBILITY_RULES.maxSquadSize} pemain`,
        resolution: `Kurangi hingga maksimal ${ELIGIBILITY_RULES.maxSquadSize} pemain`,
      });
    } else {
      completeness += 25;
    }
  }

  // 2. Check player eligibility status
  if (team.squad && team.squad.length > 0) {
    const suspendedPlayers = team.squad.filter((p: any) => p.eligibility === "Suspended");
    const unverifiedPlayers = team.squad.filter((p: any) => p.eligibility === "Pending");

    if (suspendedPlayers.length > 0) {
      issues.push({
        type: "error",
        code: "SUSPENDED_PLAYERS",
        message: `${suspendedPlayers.length} pemain dalam status suspended`,
        resolution: "Hapus pemain suspended atau tunggu hingga status berubah",
      });
    }

    if (unverifiedPlayers.length > 0) {
      issues.push({
        type: "warning",
        code: "UNVERIFIED_PLAYERS",
        message: `${unverifiedPlayers.length} pemain menunggu verifikasi`,
        resolution: "Pastikan semua dokumen pemain telah disubmit untuk verifikasi",
      });
    } else {
      completeness += 25;
    }
  }

  // 3. Check age requirements
  const category = team.category || "Open";
  const ageReqs =
    ELIGIBILITY_RULES.ageRequirements[
      category as keyof typeof ELIGIBILITY_RULES.ageRequirements
    ];

  if (team.squad && team.squad.length > 0 && ageReqs) {
    const outOfAgeRange = team.squad.filter((p: any) => {
      if (!p.age) return false;
      return p.age < ageReqs.min || p.age > ageReqs.max;
    });

    if (outOfAgeRange.length > 0) {
      issues.push({
        type: "error",
        code: "AGE_VIOLATION",
        message: `${outOfAgeRange.length} pemain tidak sesuai rentang usia kategori (${ageReqs.min}-${ageReqs.max} tahun)`,
        resolution: "Ganti pemain dengan usia yang sesuai kategori kompetisi",
      });
    } else {
      completeness += 25;
    }
  }

  // 4. Check documentation
  if (!team.documents || team.documents.length === 0) {
    issues.push({
      type: "error",
      code: "MISSING_DOCUMENTS",
      message: "Dokumen pendukung belum lengkap",
      resolution: `Upload semua dokumen yang diperlukan (${ELIGIBILITY_RULES.documentationRequired.length} file)`,
    });
  } else {
    const documentCount = team.documents.length;
    const expectedDocuments = ELIGIBILITY_RULES.documentationRequired.length;
    if (documentCount < expectedDocuments) {
      issues.push({
        type: "warning",
        code: "INCOMPLETE_DOCUMENTS",
        message: `Hanya ${documentCount}/${expectedDocuments} dokumen yang diupload`,
        resolution: `Upload ${expectedDocuments - documentCount} dokumen tambahan`,
      });
    } else {
      completeness += 25;
    }
  }

  // Calculate final completeness
  if (issues.filter((i) => i.type === "error").length === 0) {
    completeness = Math.max(completeness, 100);
  }

  return {
    teamId: team.clubId || team.teamId,
    teamName: team.clubName || team.name || "Unknown Team",
    clubId: team.clubId || team.teamId,
    issues,
    compliant: issues.filter((i) => i.type === "error").length === 0,
    completeness,
  };
}

/**
 * Validate specific aspect of eligibility
 */
export function validateSquadSize(squad: any[]): { valid: boolean; message: string } {
  if (!squad || squad.length === 0) {
    return {
      valid: false,
      message: `Squad kosong (minimum ${ELIGIBILITY_RULES.minSquadSize} pemain)`,
    };
  }
  if (squad.length < ELIGIBILITY_RULES.minSquadSize) {
    return {
      valid: false,
      message: `Squad terlalu kecil: ${squad.length}/${ELIGIBILITY_RULES.minSquadSize}`,
    };
  }
  if (squad.length > ELIGIBILITY_RULES.maxSquadSize) {
    return {
      valid: false,
      message: `Squad terlalu besar: ${squad.length}/${ELIGIBILITY_RULES.maxSquadSize}`,
    };
  }
  return { valid: true, message: "Squad size OK" };
}

/**
 * Check if all players are eligible
 */
export function validatePlayerEligibility(players: any[]): {
  valid: boolean;
  suspended: any[];
  unverified: any[];
} {
  return {
    valid: !players.some((p) => p.eligibility === "Suspended"),
    suspended: players.filter((p) => p.eligibility === "Suspended"),
    unverified: players.filter((p) => p.eligibility === "Pending"),
  };
}

/**
 * Get eligibility rules
 */
export function getEligibilityRules() {
  return ELIGIBILITY_RULES;
}
