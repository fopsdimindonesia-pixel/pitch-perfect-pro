// ─── Mock Data — Football Ecosystem SaaS ───────────────────────────────────

export type Role = "owner" | "eo" | "club" | "admin";

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
    { month: "Jan 2024", status: "Paid" as "Paid" | "Unpaid" },
    { month: "Feb 2024", status: (i % 4 === 3 ? "Unpaid" : "Paid") as "Paid" | "Unpaid" },
    { month: "Mar 2024", status: (i % 3 === 2 ? "Unpaid" : "Paid") as "Paid" | "Unpaid" },
  ],
}));

// ─── MULTI-TENANT ORGANIZATION SYSTEM (Modules 41-80) ─────────────────────────

// ─── Organizations ──────────────────────────────────────────────────────────
export const mockOrganizations = [
  { 
    id: "org-1", name: "PSSI Central", type: "Federation", owner: "Ahmad Riyadi", members: 45, status: "Active", createdAt: "2023-01-15", 
    contact: { email: "info@pssi.id", phone: "+62-21-xxx-xxxx", address: "Jl. Stadion Utama, Jakarta" }, logo: "https://via.placeholder.com/100", website: "pssi.id"
  },
  { 
    id: "org-2", name: "Makassar Regional FA", type: "Regional", owner: "Budi Santoso", members: 28, status: "Active", createdAt: "2023-03-20",
    contact: { email: "makassar@fa.id", phone: "+62-411-xxx-xxxx", address: "Jl. Hasanuddin, Makassar" }, logo: "https://via.placeholder.com/100", website: "makassarfa.id"
  },
  { 
    id: "org-3", name: "Jakarta Premier League", type: "League", owner: "Joko Widodo", members: 32, status: "Active", createdAt: "2023-05-10",
    contact: { email: "jpl@league.id", phone: "+62-21-yyy-yyyy", address: "Jl. Senayan, Jakarta" }, logo: "https://via.placeholder.com/100", website: "jplindo.id"
  },
  { 
    id: "org-4", name: "PSSI Surabaya", type: "Regional", owner: "Sukarno Hadi", members: 22, status: "Pending", createdAt: "2024-02-01",
    contact: { email: "surabaya@pssi.id", phone: "+62-31-zzz-zzzz", address: "Jl. Tunjungan, Surabaya" }, logo: "https://via.placeholder.com/100", website: null
  },
];

// ─── Organization Members ───────────────────────────────────────────────────
export const mockOrgMembers = [
  { id: "mem-1", userId: "user-1", name: "Ahmad Riyadi", email: "ahmad@pssi.id", role: "Admin", status: "Active", joinedAt: "2023-01-15" },
  { id: "mem-2", userId: "user-2", name: "Budi Santoso", email: "budi@pssi.id", role: "Manager", status: "Active", joinedAt: "2023-03-20" },
  { id: "mem-3", userId: "user-3", name: "Citra Dewi", email: "citra@pssi.id", role: "Editor", status: "Active", joinedAt: "2023-06-10" },
  { id: "mem-4", userId: "user-4", name: "Doni Sutrisno", email: "doni@pssi.id", role: "Viewer", status: "Inactive", joinedAt: "2023-08-05" },
  { id: "mem-5", userId: "user-5", name: "Eka Putri", email: "eka@pssi.id", role: "Editor", status: "Active", joinedAt: "2023-10-12" },
];

// ─── Organization Invitations ───────────────────────────────────────────────
export const mockOrgInvitations = [
  { id: "inv-1", email: "newuser@pssi.id", role: "Manager", status: "Pending", sentAt: "2024-03-10", expiresAt: "2024-03-24" },
  { id: "inv-2", email: "another@pssi.id", role: "Editor", status: "Accepted", sentAt: "2024-03-08", expiresAt: "2024-03-22" },
  { id: "inv-3", email: "pending@pssi.id", role: "Viewer", status: "Pending", sentAt: "2024-03-05", expiresAt: "2024-03-19" },
  { id: "inv-4", email: "expired@pssi.id", role: "Editor", status: "Expired", sentAt: "2024-02-10", expiresAt: "2024-02-24" },
];

// ─── Organization Roles & Permissions ────────────────────────────────────────
export const mockOrgRoles = [
  { id: "role-1", name: "Admin", permissions: ["create", "read", "update", "delete", "manage_members"], description: "Full system access" },
  { id: "role-2", name: "Manager", permissions: ["read", "update", "manage_members"], description: "Can manage content and members" },
  { id: "role-3", name: "Editor", permissions: ["create", "read", "update"], description: "Can create and edit content" },
  { id: "role-4", name: "Viewer", permissions: ["read"], description: "Read-only access" },
];

// ─── Billing & Subscription ─────────────────────────────────────────────────
export const mockBillingPlans = [
  { id: "plan-1", name: "Free", price: 0, members: 5, features: ["Basic features", "1 competition"], description: "Get started for free" },
  { id: "plan-2", name: "Pro", price: 499000, members: 25, features: ["All features", "Unlimited competitions", "Analytics", "API access"], description: "For growing organizations" },
  { id: "plan-3", name: "Enterprise", price: 999000, members: 100, features: ["Everything", "Priority support", "Custom integrations"], description: "For large organizations" },
];

export const mockPaymentHistory = [
  { id: "pay-1", date: "2024-03-01", plan: "Pro", amount: 499000, status: "Paid", invoiceId: "INV-2024-001", method: "Bank Transfer" },
  { id: "pay-2", date: "2024-02-01", plan: "Pro", amount: 499000, status: "Paid", invoiceId: "INV-2024-002", method: "Credit Card" },
  { id: "pay-3", date: "2024-01-01", plan: "Pro", amount: 499000, status: "Paid", invoiceId: "INV-2024-003", method: "Bank Transfer" },
];

// ─── Organization Analytics ─────────────────────────────────────────────────
export const mockOrgAnalytics = {
  totalMembers: 45,
  totalClubs: 14,
  totalEOs: 3,
  activeUsers: 38,
  activityChart: [
    { date: "Mon", value: 120 },
    { date: "Tue", value: 145 },
    { date: "Wed", value: 98 },
    { date: "Thu", value: 167 },
    { date: "Fri", value: 189 },
    { date: "Sat", value: 145 },
    { date: "Sun", value: 98 },
  ],
};

// ─── Activity Log ────────────────────────────────────────────────────────────
export const mockActivityLog = [
  { id: "act-1", timestamp: "2024-03-15T14:30:00Z", user: "Ahmad Riyadi", action: "Created organization", details: "Jakarta Regional FA" },
  { id: "act-2", timestamp: "2024-03-15T13:20:00Z", user: "Budi Santoso", action: "Added member", details: "Citra Dewi" },
  { id: "act-3", timestamp: "2024-03-15T12:15:00Z", user: "Citra Dewi", action: "Updated settings", details: "Organization name" },
  { id: "act-4", timestamp: "2024-03-15T11:00:00Z", user: "Ahmad Riyadi", action: "Removed member", details: "Doni Sutrisno" },
  { id: "act-5", timestamp: "2024-03-15T10:45:00Z", user: "Eka Putri", action: "Uploaded document", details: "Annual Report 2024" },
];

// ─── Documents ──────────────────────────────────────────────────────────────
export const mockOrgDocuments = [
  { id: "doc-1", name: "Annual Report 2024", type: "pdf", size: "2.4 MB", uploadedAt: "2024-03-10", uploadedBy: "Ahmad Riyadi" },
  { id: "doc-2", name: "Organizational Charter", type: "pdf", size: "1.8 MB", uploadedAt: "2024-02-20", uploadedBy: "Budi Santoso" },
  { id: "doc-3", name: "Financial Statements", type: "xlsx", size: "845 KB", uploadedAt: "2024-03-05", uploadedBy: "Eka Putri" },
  { id: "doc-4", name: "Membership List", type: "xlsx", size: "256 KB", uploadedAt: "2024-03-01", uploadedBy: "Citra Dewi" },
];

// ─── API Keys ────────────────────────────────────────────────────────────────
export const mockAPIKeys = [
  { id: "key-1", name: "Production", key: "pk_live_xxxxxxxxxxxxx", scope: ["read", "write"], created: "2024-01-15", lastUsed: "2024-03-15" },
  { id: "key-2", name: "Development", key: "pk_test_xxxxxxxxxxxxx", scope: ["read"], created: "2024-02-01", lastUsed: "2024-03-14" },
  { id: "key-3", name: "Mobile App", key: "pk_mobile_xxxxxxxxxx", scope: ["read"], created: "2024-03-01", lastUsed: "2024-03-13" },
];

// ─── Integrations ───────────────────────────────────────────────────────────
export const mockIntegrations = [
  { id: "int-1", name: "Stripe", category: "Payment", status: "connected", connectedAt: "2024-01-15" },
  { id: "int-2", name: "Sendgrid", category: "Email", status: "connected", connectedAt: "2024-02-01" },
  { id: "int-3", name: "AWS S3", category: "Storage", status: "connected", connectedAt: "2024-03-01" },
  { id: "int-4", name: "Slack", category: "Communication", status: "disconnected", connectedAt: null },
];

// ─── Organization Hierarchy ─────────────────────────────────────────────────
export const mockHierarchy = {
  name: "PSSI Central",
  children: [
    {
      name: "Jakarta Regional",
      children: [
        { name: "Jakarta Premier League", children: [] },
        { name: "Jakarta Youth Cup", children: [] },
      ],
    },
    {
      name: "Makassar Regional",
      children: [
        { name: "Makassar League", children: [] },
      ],
    },
  ],
};

// ─── Verification Queue ──────────────────────────────────────────────────────
export const mockVerificationQueue = [
  { id: "ver-1", organizationName: "Bandung FC Alliance", type: "Regional", submittedAt: "2024-03-10", status: "Pending", documents: 5 },
  { id: "ver-2", organizationName: "Sumatra United League", type: "League", submittedAt: "2024-03-08", status: "In Review", documents: 7 },
  { id: "ver-3", organizationName: "Kalimantan Youth Cup", type: "Regional", submittedAt: "2024-03-05", status: "Approved", documents: 4 },
];

// ─── Licenses & Certifications ──────────────────────────────────────────────
export const mockLicenses = [
  { id: "lic-1", name: "Organizational License", issueDate: "2023-01-15", expiryDate: "2026-01-15", status: "Valid" },
  { id: "lic-2", name: "Event Hosting License", issueDate: "2023-06-01", expiryDate: "2024-06-01", status: "Expiring Soon" },
];

// ─── Media Library ───────────────────────────────────────────────────────────
export const mockMediaLibrary = [
  { id: "media-1", title: "Tournament Opening Ceremony", type: "image", uploadedAt: "2024-03-10", uploadedBy: "Ahmad Riyadi" },
  { id: "media-2", title: "Final Match Highlights", type: "video", uploadedAt: "2024-03-12", uploadedBy: "Budi Santoso" },
  { id: "media-3", title: "Team Photo 2024", type: "image", uploadedAt: "2024-03-08", uploadedBy: "Citra Dewi" },
  { id: "media-4", title: "Award Ceremony", type: "video", uploadedAt: "2024-03-05", uploadedBy: "Eka Putri" },
];

// ─── Organization News ───────────────────────────────────────────────────────
export const mockOrgNews = [
  { id: "news-1", title: "New Season Announcements", publishedAt: "2024-03-15", author: "Ahmad Riyadi", content: "Exciting news about upcoming competitions..." },
  { id: "news-2", title: "Member Recognition", publishedAt: "2024-03-10", author: "Budi Santoso", content: "Congratulations to our outstanding members..." },
  { id: "news-3", title: "System Updates", publishedAt: "2024-03-05", author: "Citra Dewi", content: "We've made important improvements..." },
];

// ─── User Multi-Org Memberships ──────────────────────────────────────────────
export const mockUserMultiOrgs = [
  { id: "umo-1", userId: "user-1", userName: "Ahmad Riyadi", organizations: ["org-1", "org-2"], roles: ["Admin", "Manager"] },
  { id: "umo-2", userId: "user-2", userName: "Budi Santoso", organizations: ["org-1", "org-3"], roles: ["Manager", "Editor"] },
  { id: "umo-3", userId: "user-3", userName: "Citra Dewi", organizations: ["org-1"], roles: ["Editor"] },
];

// ─── Compliance Checklist ────────────────────────────────────────────────────
export const mockComplianceChecklist = [
  { id: "comp-1", item: "Registration forms completed", status: "Completed", dueDate: "2024-02-15" },
  { id: "comp-2", item: "Tax documentation submitted", status: "Pending", dueDate: "2024-03-31" },
  { id: "comp-3", item: "Officers identification verified", status: "Completed", dueDate: "2024-02-28" },
  { id: "comp-4", item: "Financial records audit", status: "In Progress", dueDate: "2024-04-15" },
];

// ─── Archived Organizations ─────────────────────────────────────────────────
export const mockArchivedOrgs = [
  { id: "arch-1", name: "Old Tournament League", type: "League", archivedAt: "2023-12-31", reason: "Completed season" },
  { id: "arch-2", name: "Test Federation", type: "Federation", archivedAt: "2023-11-15", reason: "Restructuring" },
];

// ─── Certifications ─────────────────────────────────────────────────────────
export const mockCertifications = [
  { id: "cert-1", name: "ISO 9001 Certification", issueDate: "2023-01-15", expiryDate: "2026-01-15", status: "Valid", issuer: "International Standards Org" },
  { id: "cert-2", name: "Data Privacy Certification", issueDate: "2023-06-01", expiryDate: "2025-06-01", status: "Valid", issuer: "Privacy Board" },
];
