// ─── Mock Data — Football Ecosystem SaaS ───────────────────────────────────

export type Role = "owner" | "eo" | "club";

// ─── EOs ────────────────────────────────────────────────────────────────────
export const mockEOs = [
  { id: "eo-1", name: "PSSI Makassar", plan: "Pro", competitions: 3, clubs: 14, status: "Active", joinedAt: "2024-01-15", revenue: 12500000 },
  { id: "eo-2", name: "Liga Surabaya FC", plan: "Starter", competitions: 1, clubs: 8, status: "Active", joinedAt: "2024-03-02", revenue: 4200000 },
  { id: "eo-3", name: "Turnamen Bandung", plan: "Pro", competitions: 2, clubs: 12, status: "Active", joinedAt: "2024-02-20", revenue: 9800000 },
  { id: "eo-4", name: "Bali Football Cup", plan: "Starter", competitions: 1, clubs: 6, status: "Suspended", joinedAt: "2024-04-10", revenue: 1500000 },
  { id: "eo-5", name: "Jakarta Premier League", plan: "Enterprise", competitions: 5, clubs: 20, status: "Active", joinedAt: "2023-11-01", revenue: 32000000 },
];

// ─── Clubs ────────────────────────────────────────────────────────────────────
export const mockClubs = [
  { id: "club-1", name: "SSB Garuda Muda", eoId: "eo-1", eoName: "PSSI Makassar", players: 22, status: "Verified", registeredAt: "2024-01-20", city: "Makassar" },
  { id: "club-2", name: "SSB Bintang Timur", eoId: "eo-1", eoName: "PSSI Makassar", players: 18, status: "Verified", registeredAt: "2024-01-22", city: "Makassar" },
  { id: "club-3", name: "FC Harapan Jaya", eoId: "eo-2", eoName: "Liga Surabaya FC", players: 20, status: "Pending", registeredAt: "2024-03-10", city: "Surabaya" },
  { id: "club-4", name: "Persija Muda", eoId: "eo-5", eoName: "Jakarta Premier League", players: 25, status: "Verified", registeredAt: "2023-11-15", city: "Jakarta" },
  { id: "club-5", name: "SSB Sriwijaya", eoId: "eo-3", eoName: "Turnamen Bandung", players: 19, status: "Verified", registeredAt: "2024-02-25", city: "Bandung" },
  { id: "club-6", name: "Bali United Junior", eoId: "eo-4", eoName: "Bali Football Cup", players: 16, status: "Suspended", registeredAt: "2024-04-12", city: "Bali" },
  { id: "club-7", name: "SSB Anging Mammiri", eoId: "eo-1", eoName: "PSSI Makassar", players: 21, status: "Verified", registeredAt: "2024-01-25", city: "Makassar" },
  { id: "club-8", name: "Pusamania Junior", eoId: "eo-1", eoName: "PSSI Makassar", players: 17, status: "Pending", registeredAt: "2024-02-01", city: "Makassar" },
];

// ─── Players ────────────────────────────────────────────────────────────────────
const positions = ["GK", "CB", "LB", "RB", "CM", "DM", "AM", "LW", "RW", "ST", "SS"];
const firstNames = ["Budi", "Andi", "Rizky", "Fajar", "Dimas", "Ilham", "Yoga", "Bagas", "Kevin", "Arif", "Rama", "Deni", "Farhan", "Hafiz", "Nabil", "Reza", "Sandi", "Taufik", "Umar", "Wahyu"];
const lastNames = ["Pratama", "Santoso", "Wijaya", "Saputra", "Kusuma", "Hidayat", "Rahman", "Setiawan", "Nugroho", "Firmansyah", "Hakim", "Ramadhan", "Fauzan", "Mahardika", "Perdana"];

export const generatePlayers = (clubId: string, count = 22) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${clubId}-p${i + 1}`,
    clubId,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    position: positions[i % positions.length],
    dob: `200${(i % 4) + 1}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    age: 12 + (i % 4),
    number: i + 1,
    idNumber: `7371${String(i + 1).padStart(10, "0")}`,
    eligibility: (["Verified", "Verified", "Verified", "Pending", "Suspended"] as const)[i % 5],
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${clubId}-${i}`,
    feeStatus: (["Paid", "Paid", "Unpaid"] as const)[i % 3],
    goals: Math.floor(Math.random() * 8),
    assists: Math.floor(Math.random() * 6),
    yellowCards: Math.floor(Math.random() * 3),
    redCards: i % 15 === 0 ? 1 : 0,
  }));

export const mockPlayers = generatePlayers("club-1");

// ─── Competitions ────────────────────────────────────────────────────────────────────
export const mockCompetitions = [
  { id: "comp-1", eoId: "eo-1", name: "Liga Makassar U13", format: "League", ageGroup: "U13", status: "Active", clubs: 8, registrationFee: 500000, startDate: "2024-03-01", endDate: "2024-06-30", description: "Kompetisi tahunan sepak bola kelompok umur 13 tahun di Makassar" },
  { id: "comp-2", eoId: "eo-1", name: "Cup Makassar U15", format: "Knockout", ageGroup: "U15", status: "Active", clubs: 16, registrationFee: 750000, startDate: "2024-04-01", endDate: "2024-05-31", description: "Turnamen knockout bergengsi untuk usia 15 tahun" },
  { id: "comp-3", eoId: "eo-1", name: "Piala Walikota U10", format: "Group+KO", ageGroup: "U10", status: "Draft", clubs: 0, registrationFee: 300000, startDate: "2024-07-01", endDate: "2024-08-31", description: "Turnamen piala wali kota untuk usia 10 tahun" },
  { id: "comp-4", eoId: "eo-5", name: "Jakarta Super League U15", format: "League", ageGroup: "U15", status: "Active", clubs: 20, registrationFee: 1000000, startDate: "2024-01-15", endDate: "2024-12-15", description: "Liga elit Jakarta untuk usia 15 tahun" },
  { id: "comp-5", eoId: "eo-2", name: "Surabaya Cup U12", format: "Group+KO", ageGroup: "U12", status: "Finished", clubs: 8, registrationFee: 500000, startDate: "2024-01-01", endDate: "2024-02-28", description: "Piala Surabaya kelompok umur 12 tahun" },
];

// ─── Registrations (Club to Competition) ─────────────────────────────────────
export const mockRegistrations = [
  { id: "reg-1", clubId: "club-1", clubName: "SSB Garuda Muda", competitionId: "comp-1", competitionName: "Liga Makassar U13", status: "Approved", paymentStatus: "Paid", registeredAt: "2024-02-15", fee: 500000 },
  { id: "reg-2", clubId: "club-2", clubName: "SSB Bintang Timur", competitionId: "comp-1", competitionName: "Liga Makassar U13", status: "Pending", paymentStatus: "Unpaid", registeredAt: "2024-02-18", fee: 500000 },
  { id: "reg-3", clubId: "club-7", clubName: "SSB Anging Mammiri", competitionId: "comp-1", competitionName: "Liga Makassar U13", status: "Pending", paymentStatus: "Paid", registeredAt: "2024-02-20", fee: 500000 },
  { id: "reg-4", clubId: "club-8", clubName: "Pusamania Junior", competitionId: "comp-1", competitionName: "Liga Makassar U13", status: "Approved", paymentStatus: "Paid", registeredAt: "2024-02-22", fee: 500000 },
  { id: "reg-5", clubId: "club-1", clubName: "SSB Garuda Muda", competitionId: "comp-2", competitionName: "Cup Makassar U15", status: "Approved", paymentStatus: "Paid", registeredAt: "2024-03-10", fee: 750000 },
];

// ─── Matches ─────────────────────────────────────────────────────────────────
export const mockMatches = [
  {
    id: "match-1", competitionId: "comp-1", competitionName: "Liga Makassar U13",
    homeTeam: "SSB Garuda Muda", awayTeam: "SSB Bintang Timur",
    homeScore: 2, awayScore: 1, status: "Finished" as const,
    date: "2024-03-10", time: "09:00", venue: "Lapangan Hasanuddin", referee: "Ahmad Yani",
    matchday: 1,
  },
  {
    id: "match-2", competitionId: "comp-1", competitionName: "Liga Makassar U13",
    homeTeam: "SSB Anging Mammiri", awayTeam: "Pusamania Junior",
    homeScore: 1, awayScore: 1, status: "Finished" as const,
    date: "2024-03-10", time: "11:00", venue: "Lapangan Hasanuddin", referee: "Budi Santoso",
    matchday: 1,
  },
  {
    id: "match-3", competitionId: "comp-1", competitionName: "Liga Makassar U13",
    homeTeam: "SSB Garuda Muda", awayTeam: "SSB Anging Mammiri",
    homeScore: 3, awayScore: 0, status: "Live" as const,
    date: "2024-03-17", time: "09:00", venue: "Lapangan Karebosi", referee: "Dedi Kurniawan",
    matchday: 2,
  },
  {
    id: "match-4", competitionId: "comp-1", competitionName: "Liga Makassar U13",
    homeTeam: "Pusamania Junior", awayTeam: "SSB Bintang Timur",
    homeScore: 0, awayScore: 0, status: "Scheduled" as const,
    date: "2024-03-17", time: "11:00", venue: "Lapangan Karebosi", referee: "Eko Prasetyo",
    matchday: 2,
  },
  {
    id: "match-5", competitionId: "comp-2", competitionName: "Cup Makassar U15",
    homeTeam: "SSB Garuda Muda", awayTeam: "Pusamania Junior",
    homeScore: 0, awayScore: 0, status: "Scheduled" as const,
    date: "2024-03-24", time: "15:00", venue: "Stadion Mattoanging", referee: "Fajar Nugraha",
    matchday: 1,
  },
];

// ─── Standings ────────────────────────────────────────────────────────────────
export const mockStandings = [
  { pos: 1, clubId: "club-1", club: "SSB Garuda Muda", p: 2, w: 2, d: 0, l: 0, gf: 5, ga: 1, gd: 4, pts: 6 },
  { pos: 2, clubId: "club-7", club: "SSB Anging Mammiri", p: 2, w: 1, d: 1, l: 0, gf: 1, ga: 1, gd: 0, pts: 4 },
  { pos: 3, clubId: "club-8", club: "Pusamania Junior", p: 2, w: 0, d: 1, l: 1, gf: 1, ga: 4, gd: -3, pts: 1 },
  { pos: 4, clubId: "club-2", club: "SSB Bintang Timur", p: 2, w: 0, d: 0, l: 2, gf: 1, ga: 3, gd: -2, pts: 0 },
];

// ─── Match Events ─────────────────────────────────────────────────────────────
export const mockMatchEvents = [
  { id: "ev-1", matchId: "match-3", minute: 12, type: "Goal" as const, team: "home", player: "Rizky Pratama", assist: "Andi Santoso" },
  { id: "ev-2", matchId: "match-3", minute: 35, type: "Yellow Card" as const, team: "away", player: "Dimas Wijaya", assist: null },
  { id: "ev-3", matchId: "match-3", minute: 41, type: "Goal" as const, team: "home", player: "Fajar Saputra", assist: "Rizky Pratama" },
  { id: "ev-4", matchId: "match-3", minute: 58, type: "Goal" as const, team: "home", player: "Rizky Pratama", assist: "Yoga Kusuma" },
];

// ─── Audit Log ──────────────────────────────────────────────────────────────
export const mockAuditLog = [
  { id: "log-1", actor: "admin@platform.id", action: "CREATE_COMPETITION", entity: "Liga Makassar U13", entityType: "Competition", timestamp: "2024-03-15T08:12:00Z", ip: "182.x.x.1" },
  { id: "log-2", actor: "eo1@pssi.id", action: "APPROVE_REGISTRATION", entity: "SSB Garuda Muda", entityType: "Club", timestamp: "2024-03-14T14:30:00Z", ip: "125.x.x.2" },
  { id: "log-3", actor: "club1@garuda.id", action: "ADD_PLAYER", entity: "Rizky Pratama", entityType: "Player", timestamp: "2024-03-13T10:00:00Z", ip: "101.x.x.3" },
  { id: "log-4", actor: "admin@platform.id", action: "SUSPEND_EO", entity: "Bali Football Cup", entityType: "EO", timestamp: "2024-03-12T16:00:00Z", ip: "182.x.x.1" },
  { id: "log-5", actor: "eo5@jakarta.id", action: "UPDATE_MATCH_SCORE", entity: "Match #34", entityType: "Match", timestamp: "2024-03-11T11:20:00Z", ip: "140.x.x.4" },
  { id: "log-6", actor: "club1@garuda.id", action: "SUBMIT_LINEUP", entity: "Match vs SSB Anging", entityType: "Match", timestamp: "2024-03-10T07:45:00Z", ip: "101.x.x.3" },
  { id: "log-7", actor: "admin@platform.id", action: "CREATE_EO", entity: "Jakarta Premier League", entityType: "EO", timestamp: "2024-03-09T09:00:00Z", ip: "182.x.x.1" },
];

// ─── Financial Records ────────────────────────────────────────────────────────
export const mockFinancialRecords = [
  { id: "fin-1", type: "Subscription", entity: "PSSI Makassar", plan: "Pro", amount: 499000, status: "Paid", date: "2024-03-01", period: "March 2024" },
  { id: "fin-2", type: "Subscription", entity: "Jakarta Premier League", plan: "Enterprise", amount: 999000, status: "Paid", date: "2024-03-01", period: "March 2024" },
  { id: "fin-3", type: "Subscription", entity: "Turnamen Bandung", plan: "Pro", amount: 499000, status: "Paid", date: "2024-03-01", period: "March 2024" },
  { id: "fin-4", type: "Subscription", entity: "Liga Surabaya FC", plan: "Starter", amount: 199000, status: "Paid", date: "2024-03-01", period: "March 2024" },
  { id: "fin-5", type: "Subscription", entity: "Bali Football Cup", plan: "Starter", amount: 199000, status: "Unpaid", date: "2024-03-01", period: "March 2024" },
  { id: "fin-6", type: "Registration Fee", entity: "SSB Garuda Muda", plan: "-", amount: 500000, status: "Paid", date: "2024-02-15", period: "Liga Makassar U13" },
  { id: "fin-7", type: "Registration Fee", entity: "SSB Anging Mammiri", plan: "-", amount: 500000, status: "Paid", date: "2024-02-20", period: "Liga Makassar U13" },
];

export const mockRevenueChart = [
  { month: "Oct", revenue: 12000000 },
  { month: "Nov", revenue: 18500000 },
  { month: "Dec", revenue: 15200000 },
  { month: "Jan", revenue: 22800000 },
  { month: "Feb", revenue: 25100000 },
  { month: "Mar", revenue: 28400000 },
];

// ─── Platform Stats ────────────────────────────────────────────────────────────
export const mockPlatformStats = {
  totalEOs: 5,
  totalClubs: 8,
  totalPlayers: 143,
  activeCompetitions: 3,
  totalRevenue: 60000000,
  totalMatches: 24,
};

// ─── Lineup ────────────────────────────────────────────────────────────────────
export const mockStartingXI = [
  { slot: 1, position: "GK", player: { id: "club-1-p1", name: "Budi Pratama", number: 1, eligibility: "Verified" } },
  { slot: 2, position: "CB", player: { id: "club-1-p2", name: "Andi Santoso", number: 4, eligibility: "Verified" } },
  { slot: 3, position: "CB", player: { id: "club-1-p3", name: "Rizky Wijaya", number: 5, eligibility: "Verified" } },
  { slot: 4, position: "LB", player: { id: "club-1-p4", name: "Fajar Saputra", number: 3, eligibility: "Verified" } },
  { slot: 5, position: "RB", player: { id: "club-1-p5", name: "Dimas Kusuma", number: 2, eligibility: "Pending" } },
  { slot: 6, position: "CM", player: { id: "club-1-p6", name: "Ilham Hidayat", number: 8, eligibility: "Verified" } },
  { slot: 7, position: "CM", player: { id: "club-1-p7", name: "Yoga Rahman", number: 6, eligibility: "Verified" } },
  { slot: 8, position: "AM", player: { id: "club-1-p8", name: "Bagas Setiawan", number: 10, eligibility: "Verified" } },
  { slot: 9, position: "LW", player: { id: "club-1-p9", name: "Kevin Nugroho", number: 11, eligibility: "Verified" } },
  { slot: 10, position: "RW", player: { id: "club-1-p10", name: "Arif Firmansyah", number: 7, eligibility: "Verified" } },
  { slot: 11, position: "ST", player: { id: "club-1-p11", name: "Rizky Pratama", number: 9, eligibility: "Verified" } },
];

export const mockBench = [
  { id: "club-1-p12", name: "Rama Hakim", number: 12, position: "GK", eligibility: "Verified" },
  { id: "club-1-p13", name: "Deni Ramadhan", number: 13, position: "CB", eligibility: "Verified" },
  { id: "club-1-p14", name: "Farhan Fauzan", number: 14, position: "CM", eligibility: "Pending" },
  { id: "club-1-p15", name: "Hafiz Mahardika", number: 15, position: "ST", eligibility: "Verified" },
  { id: "club-1-p16", name: "Nabil Perdana", number: 16, position: "LW", eligibility: "Verified" },
  { id: "club-1-p17", name: "Reza Pratama", number: 17, position: "RB", eligibility: "Verified" },
  { id: "club-1-p18", name: "Sandi Santoso", number: 18, position: "AM", eligibility: "Verified" },
];

// ─── Match History ─────────────────────────────────────────────────────────────
export const mockMatchHistory = [
  { id: "mh-1", date: "2024-03-10", opponent: "SSB Bintang Timur", competition: "Liga Makassar U13", result: "W", homeScore: 2, awayScore: 1, isHome: true },
  { id: "mh-2", date: "2024-03-03", opponent: "Pusamania Junior", competition: "Liga Makassar U13", result: "W", homeScore: 3, awayScore: 2, isHome: false },
  { id: "mh-3", date: "2024-02-25", opponent: "SSB Anging Mammiri", competition: "Liga Makassar U13", result: "D", homeScore: 1, awayScore: 1, isHome: true },
  { id: "mh-4", date: "2024-02-18", opponent: "Pusamania Junior", competition: "Cup Makassar U15", result: "W", homeScore: 2, awayScore: 0, isHome: true },
  { id: "mh-5", date: "2024-02-10", opponent: "SSB Bintang Timur", competition: "Cup Makassar U15", result: "L", homeScore: 0, awayScore: 1, isHome: false },
];

// ─── Player Fee (Club Financial) ──────────────────────────────────────────────
export const mockPlayerFees = mockPlayers.slice(0, 12).map((p, i) => ({
  playerId: p.id,
  playerName: p.name,
  months: [
    { month: "Jan 2024", status: "Paid" as const },
    { month: "Feb 2024", status: (i % 4 === 3 ? "Unpaid" : "Paid") as const },
    { month: "Mar 2024", status: (i % 3 === 2 ? "Unpaid" : "Paid") as const },
  ],
}));
