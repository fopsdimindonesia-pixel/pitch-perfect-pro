// ─── Player Digital Ecosystem Mock Data (Modules 171–200) ─────────────────

export interface GlobalPlayer {
  id: string;
  globalId: string; // SOS-XXXXXX format
  name: string;
  position: string;
  nationality: string;
  dateOfBirth: string;
  age: number;
  height: number;
  weight: number;
  foot: "Left" | "Right" | "Both";
  photo: string;
  currentClub: string;
  currentClubId: string;
  status: "Active" | "Injured" | "Suspended" | "Free Agent" | "Retired";
  verificationStatus: "Verified" | "Pending" | "Rejected" | "Expired";
  registeredAt: string;
  lastVerifiedAt: string;
  // Digital Passport
  passportNumber: string;
  passportIssued: string;
  passportExpiry: string;
  // Stats summary
  totalAppearances: number;
  totalGoals: number;
  totalAssists: number;
  internationalCaps: number;
  // Medical
  medicalClearance: boolean;
  lastMedicalDate: string;
  bloodType: string;
  // Development
  potentialScore: number;
  currentRating: number;
}

export interface CareerEvent {
  id: string;
  playerId: string;
  date: string;
  year: number;
  type: "Transfer" | "Achievement" | "International" | "Injury" | "Contract" | "Milestone";
  title: string;
  description: string;
  club?: string;
  metadata?: Record<string, string>;
}

export interface TransferRecord {
  id: string;
  playerId: string;
  fromClub: string;
  toClub: string;
  date: string;
  fee: string;
  type: "Permanent" | "Loan" | "Free" | "Academy" | "Trial";
  status: "Completed" | "Pending" | "Rejected";
}

export interface VerificationLog {
  id: string;
  playerId: string;
  playerName: string;
  verifiedBy: string;
  method: "QR Scan" | "Manual" | "Biometric" | "Document";
  location: string;
  result: "Verified" | "Failed" | "Expired" | "Mismatch";
  timestamp: string;
  matchId?: string;
}

export interface MedicalRecord {
  id: string;
  playerId: string;
  type: "Fitness Test" | "Medical Check" | "Injury Report" | "Recovery";
  date: string;
  result: string;
  doctor: string;
  status: "Cleared" | "Restricted" | "Not Cleared";
  notes: string;
}

export interface SkillEvaluation {
  id: string;
  playerId: string;
  evaluator: string;
  date: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  overall: number;
  notes: string;
}

// ─── Global Player Registry ─────────────────────────────────────────────────

export const globalPlayers: GlobalPlayer[] = [
  {
    id: "gp-1", globalId: "SOS-000001", name: "Rizky Pratama", position: "CB",
    nationality: "Indonesia", dateOfBirth: "1998-05-15", age: 27, height: 182, weight: 78,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rizky",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2020-01-10", lastVerifiedAt: "2024-03-01",
    passportNumber: "SOS-PAS-000001", passportIssued: "2024-01-01", passportExpiry: "2026-12-31",
    totalAppearances: 145, totalGoals: 2, totalAssists: 5, internationalCaps: 12,
    medicalClearance: true, lastMedicalDate: "2024-02-15", bloodType: "O+",
    potentialScore: 72, currentRating: 68,
  },
  {
    id: "gp-2", globalId: "SOS-000002", name: "Andi Kusuma", position: "CM",
    nationality: "Indonesia", dateOfBirth: "2000-08-20", age: 25, height: 177, weight: 72,
    foot: "Left", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=andi",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2021-06-15", lastVerifiedAt: "2024-02-20",
    passportNumber: "SOS-PAS-000002", passportIssued: "2024-01-15", passportExpiry: "2026-12-31",
    totalAppearances: 98, totalGoals: 15, totalAssists: 18, internationalCaps: 8,
    medicalClearance: true, lastMedicalDate: "2024-02-10", bloodType: "A+",
    potentialScore: 80, currentRating: 74,
  },
  {
    id: "gp-3", globalId: "SOS-000003", name: "Budi Santoso", position: "ST",
    nationality: "Indonesia", dateOfBirth: "1999-03-10", age: 26, height: 180, weight: 76,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2019-08-01", lastVerifiedAt: "2024-03-05",
    passportNumber: "SOS-PAS-000003", passportIssued: "2023-08-01", passportExpiry: "2026-07-31",
    totalAppearances: 156, totalGoals: 42, totalAssists: 12, internationalCaps: 15,
    medicalClearance: true, lastMedicalDate: "2024-01-20", bloodType: "B+",
    potentialScore: 85, currentRating: 79,
  },
  {
    id: "gp-4", globalId: "SOS-000004", name: "Citra Wijaya", position: "GK",
    nationality: "Indonesia", dateOfBirth: "1997-11-25", age: 28, height: 188, weight: 82,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=citra",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2018-07-01", lastVerifiedAt: "2024-02-28",
    passportNumber: "SOS-PAS-000004", passportIssued: "2023-07-01", passportExpiry: "2026-06-30",
    totalAppearances: 178, totalGoals: 0, totalAssists: 0, internationalCaps: 20,
    medicalClearance: true, lastMedicalDate: "2024-02-01", bloodType: "AB+",
    potentialScore: 76, currentRating: 75,
  },
  {
    id: "gp-5", globalId: "SOS-000005", name: "Dara Kusuma", position: "LB",
    nationality: "Indonesia", dateOfBirth: "2001-07-14", age: 24, height: 179, weight: 75,
    foot: "Left", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=dara",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Injured", verificationStatus: "Verified",
    registeredAt: "2022-01-15", lastVerifiedAt: "2024-01-10",
    passportNumber: "SOS-PAS-000005", passportIssued: "2024-01-01", passportExpiry: "2026-12-31",
    totalAppearances: 42, totalGoals: 1, totalAssists: 3, internationalCaps: 5,
    medicalClearance: false, lastMedicalDate: "2024-03-10", bloodType: "O-",
    potentialScore: 78, currentRating: 65,
  },
  {
    id: "gp-6", globalId: "SOS-000006", name: "Evan Pratama", position: "AM",
    nationality: "Indonesia", dateOfBirth: "2002-04-08", age: 23, height: 175, weight: 70,
    foot: "Both", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=evan",
    currentClub: "SSB Garuda Muda", currentClubId: "club-1",
    status: "Active", verificationStatus: "Pending",
    registeredAt: "2023-06-01", lastVerifiedAt: "2023-12-01",
    passportNumber: "SOS-PAS-000006", passportIssued: "2023-06-01", passportExpiry: "2025-05-31",
    totalAppearances: 28, totalGoals: 3, totalAssists: 6, internationalCaps: 2,
    medicalClearance: true, lastMedicalDate: "2024-01-15", bloodType: "A-",
    potentialScore: 82, currentRating: 66,
  },
  {
    id: "gp-7", globalId: "SOS-000007", name: "Farhan Hakim", position: "RW",
    nationality: "Indonesia", dateOfBirth: "2003-01-22", age: 23, height: 172, weight: 67,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=farhan",
    currentClub: "SSB Bintang Timur", currentClubId: "club-2",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2022-08-01", lastVerifiedAt: "2024-02-15",
    passportNumber: "SOS-PAS-000007", passportIssued: "2022-08-01", passportExpiry: "2025-07-31",
    totalAppearances: 62, totalGoals: 11, totalAssists: 14, internationalCaps: 0,
    medicalClearance: true, lastMedicalDate: "2024-02-01", bloodType: "B-",
    potentialScore: 77, currentRating: 70,
  },
  {
    id: "gp-8", globalId: "SOS-000008", name: "Gilang Ramadhan", position: "DM",
    nationality: "Indonesia", dateOfBirth: "2000-12-05", age: 25, height: 181, weight: 77,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=gilang",
    currentClub: "FC Harapan Jaya", currentClubId: "club-3",
    status: "Active", verificationStatus: "Pending",
    registeredAt: "2021-03-10", lastVerifiedAt: "2023-11-01",
    passportNumber: "SOS-PAS-000008", passportIssued: "2023-03-10", passportExpiry: "2025-03-09",
    totalAppearances: 85, totalGoals: 4, totalAssists: 9, internationalCaps: 3,
    medicalClearance: true, lastMedicalDate: "2024-01-05", bloodType: "O+",
    potentialScore: 74, currentRating: 71,
  },
  {
    id: "gp-9", globalId: "SOS-000009", name: "Hendra Wijaya", position: "CB",
    nationality: "Indonesia", dateOfBirth: "1996-09-18", age: 29, height: 185, weight: 80,
    foot: "Right", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=hendra",
    currentClub: "Persija Muda", currentClubId: "club-4",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2017-06-01", lastVerifiedAt: "2024-03-01",
    passportNumber: "SOS-PAS-000009", passportIssued: "2023-06-01", passportExpiry: "2026-05-31",
    totalAppearances: 220, totalGoals: 8, totalAssists: 3, internationalCaps: 25,
    medicalClearance: true, lastMedicalDate: "2024-02-20", bloodType: "A+",
    potentialScore: 70, currentRating: 76,
  },
  {
    id: "gp-10", globalId: "SOS-000010", name: "Irfan Setiawan", position: "ST",
    nationality: "Indonesia", dateOfBirth: "2004-06-30", age: 21, height: 176, weight: 71,
    foot: "Left", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=irfan",
    currentClub: "SSB Sriwijaya", currentClubId: "club-5",
    status: "Active", verificationStatus: "Verified",
    registeredAt: "2023-01-15", lastVerifiedAt: "2024-01-15",
    passportNumber: "SOS-PAS-000010", passportIssued: "2023-01-15", passportExpiry: "2025-12-31",
    totalAppearances: 35, totalGoals: 18, totalAssists: 5, internationalCaps: 0,
    medicalClearance: true, lastMedicalDate: "2024-01-10", bloodType: "B+",
    potentialScore: 88, currentRating: 69,
  },
];

// ─── Career Timeline ────────────────────────────────────────────────────────

export const careerEvents: CareerEvent[] = [
  { id: "ce-1", playerId: "gp-3", date: "2019-08-01", year: 2019, type: "Transfer", title: "Signed with SSB Garuda Muda", description: "Permanent transfer from FC Jakarta", club: "SSB Garuda Muda" },
  { id: "ce-2", playerId: "gp-3", date: "2020-03-15", year: 2020, type: "Milestone", title: "First League Goal", description: "Scored debut league goal vs SSB Bintang Timur", club: "SSB Garuda Muda" },
  { id: "ce-3", playerId: "gp-3", date: "2021-06-01", year: 2021, type: "Achievement", title: "Top Scorer Award", description: "Finished season as top scorer with 18 goals", club: "SSB Garuda Muda" },
  { id: "ce-4", playerId: "gp-3", date: "2022-09-10", year: 2022, type: "International", title: "National Team Call-Up", description: "First call-up to Indonesia U-23 squad", club: "Indonesia U-23" },
  { id: "ce-5", playerId: "gp-3", date: "2023-01-15", year: 2023, type: "Contract", title: "Contract Extension", description: "Extended contract until 2027", club: "SSB Garuda Muda" },
  { id: "ce-6", playerId: "gp-3", date: "2023-11-20", year: 2023, type: "Achievement", title: "100th Appearance", description: "Reached 100 competitive appearances", club: "SSB Garuda Muda" },
  { id: "ce-7", playerId: "gp-3", date: "2024-02-01", year: 2024, type: "Injury", title: "Muscle Strain", description: "Minor muscle strain, recovered in 4 weeks", club: "SSB Garuda Muda" },
  { id: "ce-8", playerId: "gp-3", date: "2024-03-10", year: 2024, type: "Milestone", title: "40th Career Goal", description: "Reached 40 career goals milestone", club: "SSB Garuda Muda" },
  // Events for other players
  { id: "ce-9", playerId: "gp-1", date: "2020-01-10", year: 2020, type: "Transfer", title: "Academy Promotion", description: "Promoted from youth academy to first team", club: "SSB Garuda Muda" },
  { id: "ce-10", playerId: "gp-1", date: "2022-03-15", year: 2022, type: "International", title: "International Debut", description: "First cap for Indonesia U-23", club: "Indonesia U-23" },
  { id: "ce-11", playerId: "gp-2", date: "2021-06-15", year: 2021, type: "Transfer", title: "Joined SSB Garuda Muda", description: "Signed from local academy", club: "SSB Garuda Muda" },
  { id: "ce-12", playerId: "gp-2", date: "2023-08-20", year: 2023, type: "Achievement", title: "Player of the Month", description: "Won Player of the Month for August", club: "SSB Garuda Muda" },
];

// ─── Transfer Records ───────────────────────────────────────────────────────

export const transferRecords: TransferRecord[] = [
  { id: "tr-1", playerId: "gp-3", fromClub: "FC Jakarta", toClub: "SSB Garuda Muda", date: "2019-08-01", fee: "Rp 500.000.000", type: "Permanent", status: "Completed" },
  { id: "tr-2", playerId: "gp-1", fromClub: "Youth Academy", toClub: "SSB Garuda Muda", date: "2020-01-10", fee: "Free", type: "Academy", status: "Completed" },
  { id: "tr-3", playerId: "gp-2", fromClub: "SSB Cendekia", toClub: "SSB Garuda Muda", date: "2021-06-15", fee: "Rp 100.000.000", type: "Permanent", status: "Completed" },
  { id: "tr-4", playerId: "gp-7", fromClub: "SSB Muda Jaya", toClub: "SSB Bintang Timur", date: "2022-08-01", fee: "Free", type: "Free", status: "Completed" },
  { id: "tr-5", playerId: "gp-10", fromClub: "Academy Sriwijaya", toClub: "SSB Sriwijaya", date: "2023-01-15", fee: "Free", type: "Academy", status: "Completed" },
];

// ─── Verification Logs ──────────────────────────────────────────────────────

export const verificationLogs: VerificationLog[] = [
  { id: "vl-1", playerId: "gp-3", playerName: "Budi Santoso", verifiedBy: "Referee Ahmad", method: "QR Scan", location: "Stadion Karebosi", result: "Verified", timestamp: "2024-03-10 14:30", matchId: "match-1" },
  { id: "vl-2", playerId: "gp-1", playerName: "Rizky Pratama", verifiedBy: "Referee Ahmad", method: "QR Scan", location: "Stadion Karebosi", result: "Verified", timestamp: "2024-03-10 14:31", matchId: "match-1" },
  { id: "vl-3", playerId: "gp-6", playerName: "Evan Pratama", verifiedBy: "Referee Ahmad", method: "Manual", location: "Stadion Karebosi", result: "Expired", timestamp: "2024-03-10 14:32", matchId: "match-1" },
  { id: "vl-4", playerId: "gp-2", playerName: "Andi Kusuma", verifiedBy: "Staff Budi", method: "QR Scan", location: "Training Ground", result: "Verified", timestamp: "2024-03-08 09:00" },
  { id: "vl-5", playerId: "gp-4", playerName: "Citra Wijaya", verifiedBy: "Referee Sandi", method: "QR Scan", location: "Lapangan Utama", result: "Verified", timestamp: "2024-03-05 15:10", matchId: "match-2" },
  { id: "vl-6", playerId: "gp-8", playerName: "Gilang Ramadhan", verifiedBy: "Referee Tono", method: "Document", location: "Stadion Surabaya", result: "Mismatch", timestamp: "2024-03-03 13:45", matchId: "match-3" },
  { id: "vl-7", playerId: "gp-5", playerName: "Dara Kusuma", verifiedBy: "Staff Medis", method: "Manual", location: "Medical Room", result: "Failed", timestamp: "2024-03-10 08:00" },
  { id: "vl-8", playerId: "gp-9", playerName: "Hendra Wijaya", verifiedBy: "Referee Ahmad", method: "QR Scan", location: "GBK Mini", result: "Verified", timestamp: "2024-03-01 16:00", matchId: "match-4" },
];

// ─── Medical Records ────────────────────────────────────────────────────────

export const medicalRecords: MedicalRecord[] = [
  { id: "mr-1", playerId: "gp-3", type: "Fitness Test", date: "2024-01-20", result: "VO2 Max: 58.2 ml/kg/min", doctor: "Dr. Siti Nurhaliza", status: "Cleared", notes: "Excellent cardiovascular fitness" },
  { id: "mr-2", playerId: "gp-5", type: "Injury Report", date: "2024-03-10", result: "Ankle sprain - Grade 2", doctor: "Dr. Siti Nurhaliza", status: "Not Cleared", notes: "Expected recovery: 4-6 weeks" },
  { id: "mr-3", playerId: "gp-1", type: "Medical Check", date: "2024-02-15", result: "All parameters normal", doctor: "Dr. Siti Nurhaliza", status: "Cleared", notes: "Annual check-up completed" },
  { id: "mr-4", playerId: "gp-2", type: "Fitness Test", date: "2024-02-10", result: "Sprint: 11.2s / 100m", doctor: "Fajar Rahman", status: "Cleared", notes: "Good speed metrics" },
];

// ─── Skill Evaluations ──────────────────────────────────────────────────────

export const skillEvaluations: SkillEvaluation[] = [
  { id: "se-1", playerId: "gp-3", evaluator: "Coach Ahmad", date: "2024-02-15", pace: 76, shooting: 82, passing: 68, dribbling: 74, defending: 35, physical: 78, overall: 79, notes: "Strong finisher, improving passing" },
  { id: "se-2", playerId: "gp-2", evaluator: "Coach Ahmad", date: "2024-02-15", pace: 72, shooting: 70, passing: 80, dribbling: 76, defending: 65, physical: 70, overall: 74, notes: "Excellent vision and passing range" },
  { id: "se-3", playerId: "gp-1", evaluator: "Coach Budi", date: "2024-02-10", pace: 68, shooting: 40, passing: 62, dribbling: 55, defending: 80, physical: 78, overall: 68, notes: "Solid defender, good positioning" },
  { id: "se-4", playerId: "gp-10", evaluator: "Scout Adi", date: "2024-01-20", pace: 84, shooting: 78, passing: 60, dribbling: 80, defending: 28, physical: 65, overall: 69, notes: "High potential, explosive pace and finishing" },
];
