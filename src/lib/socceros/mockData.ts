/**
 * Socceros Mock Data
 * Provides sample data for Socceros dashboard pages during development
 */

// Type definitions
export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  team: string;
  status: string;
  nationality?: string;
  joinDate?: string;
  contract?: string;
}

export interface AuditLog {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  status: string;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

export interface ChartDataPoint {
  month: string;
  [key: string]: string | number;
}

export interface DashboardStats {
  totalTeams: number;
  totalPlayers: number;
  activeMatches: number;
  totalCompetitions: number;
  pendingApprovals: number;
  systemHealth: number;
  totalUsers?: number;
  activeCompetitions?: number;
  totalMatches?: number;
  totalClubs?: number;
}

export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalDiff: string;
  rank?: number;
  club?: string;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: string;
}

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  status: string;
  venue: string;
}

export interface Competition {
  id: number;
  name: string;
  format: string;
  status: string;
  teams: number;
  matches: number;
  season?: string;
  clubs?: number;
  matchesPlayed?: number;
}

// Mock Players
export const mockPlayers: Player[] = [
  { id: 1, name: 'John Doe', number: 9, position: 'Forward', team: 'Team A', status: 'Active', nationality: 'Indonesia', joinDate: '2022-01-15', contract: '2026-12-31' },
  { id: 2, name: 'Jane Smith', number: 7, position: 'Midfielder', team: 'Team A', status: 'Active', nationality: 'Indonesia', joinDate: '2021-06-10', contract: '2025-06-30' },
  { id: 3, name: 'Bob Johnson', number: 5, position: 'Defender', team: 'Team A', status: 'Active', nationality: 'England', joinDate: '2023-01-20', contract: '2027-01-31' },
  { id: 4, name: 'Alice Williams', number: 1, position: 'Goalkeeper', team: 'Team A', status: 'Active', nationality: 'Australia', joinDate: '2020-08-05', contract: '2025-08-31' },
  { id: 5, name: 'Charlie Brown', number: 10, position: 'Midfielder', team: 'Team A', status: 'Injured', nationality: 'Canada', joinDate: '2021-03-12', contract: '2026-03-31' },
];

// Mock Competitions
export const mockCompetitions: Competition[] = [
  { id: 1, name: 'Liga Nasional', format: 'league', status: 'Active', teams: 18, matches: 45, season: '2023/2024', clubs: 18, matchesPlayed: 32 },
  { id: 2, name: 'Piala Indonesia', format: 'knockout', status: 'Active', teams: 32, matches: 32, season: '2024', clubs: 32, matchesPlayed: 16 },
  { id: 3, name: 'Liga Regional', format: 'league', status: 'Completed', teams: 12, matches: 66, season: '2023', clubs: 12, matchesPlayed: 66 },
];

// Mock Matches
export const mockMatches: Match[] = [
  { id: 1, homeTeam: 'PSM Makassar', awayTeam: 'Persija Jakarta', homeScore: 2, awayScore: 1, date: '2024-03-15', time: '19:30', status: 'Completed', venue: 'Andi Mattalatta Stadium' },
  { id: 2, homeTeam: 'Arema FC', awayTeam: 'Bali United', homeScore: 1, awayScore: 1, date: '2024-03-16', time: '15:30', status: 'Completed', venue: 'Kanjuruhan Stadium' },
  { id: 3, homeTeam: 'Borneo FC', awayTeam: 'Madura United', homeScore: 0, awayScore: 0, date: '2024-03-16', time: '20:00', status: 'Live', venue: 'Segiri Stadium' },
];

export const mockStandings: Standing[] = [
  { position: 1, team: 'Team Alpha', played: 10, won: 8, drawn: 1, lost: 1, points: 25, goalDiff: '+15', rank: 1, club: 'Team Alpha', goalsFor: 23, goalsAgainst: 8, goalDifference: '+15' },
  { position: 2, team: 'Team Beta', played: 10, won: 7, drawn: 2, lost: 1, points: 23, goalDiff: '+12', rank: 2, club: 'Team Beta', goalsFor: 20, goalsAgainst: 8, goalDifference: '+12' },
  { position: 3, team: 'Team Gamma', played: 10, won: 6, drawn: 2, lost: 2, points: 20, goalDiff: '+8', rank: 3, club: 'Team Gamma', goalsFor: 18, goalsAgainst: 10, goalDifference: '+8' },
  { position: 4, team: 'Team Delta', played: 10, won: 5, drawn: 2, lost: 3, points: 17, goalDiff: '+5', rank: 4, club: 'Team Delta', goalsFor: 16, goalsAgainst: 11, goalDifference: '+5' },
  { position: 5, team: 'Team Epsilon', played: 10, won: 4, drawn: 1, lost: 5, points: 13, goalDiff: '-3', rank: 5, club: 'Team Epsilon', goalsFor: 14, goalsAgainst: 17, goalDifference: '-3' },
];

// Mock Organizations
export const mockOrganizations = [
  { id: 1, name: 'Jakarta Football Association', type: 'Association', members: 145, status: 'Active' },
  { id: 2, name: 'Bandung Soccer Club', type: 'Club', members: 89, status: 'Active' },
  { id: 3, name: 'Surabaya United', type: 'Club', members: 112, status: 'Active' },
  { id: 4, name: 'Medan FC', type: 'Club', members: 67, status: 'Inactive' },
];

// Mock Users
export const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', organization: 'Jakarta FA', status: 'Active' },
  { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'Manager', organization: 'Bandung SC', status: 'Active' },
  { id: 3, name: 'Player User', email: 'player@example.com', role: 'Player', organization: 'Surabaya United', status: 'Active' },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  { id: 1, user: 'Admin User', action: 'Created team', target: 'Team Alpha', timestamp: '2024-03-15 10:30', status: 'Success' },
  { id: 2, user: 'Manager User', action: 'Updated player', target: 'John Doe', timestamp: '2024-03-15 10:15', status: 'Success' },
  { id: 3, user: 'Admin User', action: 'Deleted match', target: 'Match #123', timestamp: '2024-03-15 09:45', status: 'Success' },
  { id: 4, user: 'Player User', action: 'Updated profile', target: 'Player Profile', timestamp: '2024-03-15 09:20', status: 'Success' },
  { id: 5, user: 'Admin User', action: 'Created competition', target: 'New League', timestamp: '2024-03-15 08:00', status: 'Failed' },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  { id: 1, type: 'info', title: 'Match Scheduled', message: 'Team Alpha vs Team Beta on March 20', timestamp: '2024-03-15 10:00' },
  { id: 2, type: 'warning', title: 'Player Injured', message: 'Charlie Brown will be out for 2 weeks', timestamp: '2024-03-15 09:30' },
  { id: 3, type: 'success', title: 'Application Approved', message: 'Your club registration has been approved', timestamp: '2024-03-15 08:45' },
  {
    id: 4,
    type: 'error',
    title: 'Failed Transaction',
    message: 'Payment processing failed for membership fee',
    timestamp: '2024-03-15 07:15',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalTeams: 32,
  totalPlayers: 1280,
  activeMatches: 8,
  totalCompetitions: 5,
  pendingApprovals: 12,
  systemHealth: 99.8,
  totalUsers: 5420,
  activeCompetitions: 5,
  totalMatches: 286,
  totalClubs: 32,
};

// Mock Chart Data
export const getChartData = (type: string): ChartDataPoint[] => {
  switch (type) {
    case 'revenue':
      return [
        { month: 'Jan', value: 45 },
        { month: 'Feb', value: 52 },
        { month: 'Mar', value: 48 },
        { month: 'Apr', value: 61 },
        { month: 'May', value: 55 },
        { month: 'Jun', value: 67 },
      ];
    case 'matches':
      return [
        { month: 'Jan', matches: 12, completed: 10, pending: 2 },
        { month: 'Feb', matches: 15, completed: 14, pending: 1 },
        { month: 'Mar', matches: 18, completed: 16, pending: 2 },
        { month: 'Apr', matches: 22, completed: 20, pending: 2 },
        { month: 'May', matches: 20, completed: 18, pending: 2 },
        { month: 'Jun', matches: 25, completed: 23, pending: 2 },
      ];
    case 'registrations':
      return [
        { month: 'Jan', players: 45, teams: 3, clubs: 1 },
        { month: 'Feb', players: 62, teams: 4, clubs: 2 },
        { month: 'Mar', players: 58, teams: 3, clubs: 1 },
        { month: 'Apr', players: 75, teams: 5, clubs: 2 },
        { month: 'May', players: 82, teams: 6, clubs: 2 },
        { month: 'Jun', players: 95, teams: 7, clubs: 3 },
      ];
    default:
      return [];
  }
};

export const mockFinancials = [
  { id: 1, item: 'Q1 2025', revenue: 2500000, expenses: 2000000, profit: 500000, balance: 3200000, date: '2025-03-31', category: 'Quarterly', status: 'Finalized' },
  { id: 2, item: 'Q4 2024', revenue: 2200000, expenses: 1800000, profit: 400000, balance: 2700000, date: '2024-12-31', category: 'Quarterly', status: 'Finalized' },
  { id: 3, item: 'Q3 2024', revenue: 1900000, expenses: 1700000, profit: 200000, balance: 2300000, date: '2024-09-30', category: 'Quarterly', status: 'Finalized' },
  { id: 4, item: 'Q2 2024', revenue: 2100000, expenses: 1600000, profit: 500000, balance: 2100000, date: '2024-06-30', category: 'Quarterly', status: 'Finalized' },
];
