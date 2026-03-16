/**
 * CompetitionDataContext — Shared competition data store
 * 
 * Single source of truth consumed by both EO and Club modules.
 * - EO: Full CRUD, status transitions, approve registrations
 * - Club: Read-only competitions, submit registrations
 */

import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type SharedCompetitionStatus = 
  | 'Draft' 
  | 'Registration Open' 
  | 'Active' 
  | 'Finished';

export interface SharedCompetition {
  id: string;
  eoId: string;
  eoName: string;
  name: string;
  description: string;
  format: string;
  ageGroup: string;
  status: SharedCompetitionStatus;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  registrationFee: number;
  maxWildcard: number;
  currentClubs: number;
  totalSlots: number;
  slotsAvailable: number;
  location: string;
  eoContact: string;
  eoPhone: string;
  eoEmail: string;
  regulations: {
    minPlayers: number;
    maxPlayers: number;
    minPlayerAge: number;
    maxPlayerAge: number;
    minSquadSize: number;
  };
  documents: {
    id: string;
    type: string;
    label: string;
    required: boolean;
    description?: string;
  }[];
  createdAt: string;
}

export type RegistrationStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export interface SharedRegistration {
  id: string;
  clubId: string;
  clubName: string;
  competitionId: string;
  status: RegistrationStatus;
  submittedAt?: string;
  approvedAt?: string;
  notes?: string;
}

export interface SharedFixture {
  id: string;
  competitionId: string;
  matchday: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  status: 'Scheduled' | 'Live' | 'Finished';
}

// ─── Initial Data ───────────────────────────────────────────────────────────

const initialCompetitions: SharedCompetition[] = [
  {
    id: 'comp-1',
    eoId: 'eo-1',
    eoName: 'PSSI Makassar',
    name: 'Liga Makassar U13 2024',
    description: 'Kompetisi liga tahunan untuk kategori usia 13 tahun di wilayah Makassar',
    format: 'League',
    ageGroup: 'U13',
    status: 'Registration Open',
    registrationDeadline: '2024-02-28',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    registrationFee: 500000,
    maxWildcard: 2,
    currentClubs: 6,
    totalSlots: 8,
    slotsAvailable: 2,
    location: 'Makassar, South Sulawesi',
    eoContact: 'Ahmad Hamdan',
    eoPhone: '+62-411-123456',
    eoEmail: 'info@pssi-makassar.id',
    regulations: { minPlayers: 18, maxPlayers: 23, minPlayerAge: 12, maxPlayerAge: 13, minSquadSize: 18 },
    documents: [
      { id: 'doc-1', type: 'manager-id', label: 'KTP/ID Card Manager', required: true },
      { id: 'doc-2', type: 'player-list', label: 'Daftar Pemain', required: true },
      { id: 'doc-3', type: 'payment-proof', label: 'Bukti Pembayaran', required: true },
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'comp-2',
    eoId: 'eo-1',
    eoName: 'PSSI Makassar',
    name: 'Cup Makassar U15 2024',
    description: 'Turnamen knockout bergengsi untuk kategori usia 15 tahun',
    format: 'Knockout',
    ageGroup: 'U15',
    status: 'Registration Open',
    registrationDeadline: '2024-03-15',
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    registrationFee: 750000,
    maxWildcard: 3,
    currentClubs: 12,
    totalSlots: 16,
    slotsAvailable: 4,
    location: 'Makassar, South Sulawesi',
    eoContact: 'Ahmad Hamdan',
    eoPhone: '+62-411-123456',
    eoEmail: 'info@pssi-makassar.id',
    regulations: { minPlayers: 18, maxPlayers: 23, minPlayerAge: 14, maxPlayerAge: 16, minSquadSize: 18 },
    documents: [
      { id: 'doc-1', type: 'manager-id', label: 'KTP/ID Card Manager', required: true },
      { id: 'doc-2', type: 'player-list', label: 'Daftar Pemain', required: true },
      { id: 'doc-3', type: 'payment-proof', label: 'Bukti Pembayaran', required: true },
    ],
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'comp-3',
    eoId: 'eo-1',
    eoName: 'PSSI Makassar',
    name: 'Piala Walikota U10 2024',
    description: 'Festival sepak bola untuk kategori usia 10 tahun',
    format: 'Group+KO',
    ageGroup: 'U10',
    status: 'Draft',
    registrationDeadline: '2024-06-15',
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    registrationFee: 300000,
    maxWildcard: 1,
    currentClubs: 0,
    totalSlots: 12,
    slotsAvailable: 12,
    location: 'Makassar, South Sulawesi',
    eoContact: 'Ahmad Hamdan',
    eoPhone: '+62-411-123456',
    eoEmail: 'info@pssi-makassar.id',
    regulations: { minPlayers: 18, maxPlayers: 20, minPlayerAge: 9, maxPlayerAge: 10, minSquadSize: 18 },
    documents: [
      { id: 'doc-1', type: 'manager-id', label: 'KTP/ID Card Manager', required: true },
      { id: 'doc-2', type: 'player-list', label: 'Daftar Pemain', required: true },
    ],
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'comp-4',
    eoId: 'eo-5',
    eoName: 'Jakarta Premier League',
    name: 'Jakarta Super League U15 2024',
    description: 'Liga elit Jakarta untuk kategori usia 15 tahun',
    format: 'League',
    ageGroup: 'U15',
    status: 'Active',
    registrationDeadline: '2024-01-10',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    registrationFee: 1000000,
    maxWildcard: 2,
    currentClubs: 20,
    totalSlots: 20,
    slotsAvailable: 0,
    location: 'Jakarta Pusat',
    eoContact: 'Budi Hartono',
    eoPhone: '+62-21-9876543',
    eoEmail: 'info@jakarta-premier.id',
    regulations: { minPlayers: 18, maxPlayers: 23, minPlayerAge: 14, maxPlayerAge: 16, minSquadSize: 18 },
    documents: [
      { id: 'doc-1', type: 'manager-id', label: 'KTP/ID Card Manager', required: true },
      { id: 'doc-2', type: 'player-list', label: 'Daftar Pemain', required: true },
      { id: 'doc-3', type: 'payment-proof', label: 'Bukti Pembayaran', required: true },
    ],
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'comp-5',
    eoId: 'eo-2',
    eoName: 'Liga Surabaya FC',
    name: 'Surabaya Cup U12 2024',
    description: 'Piala Surabaya kelompok umur 12 tahun - selesai',
    format: 'Group+KO',
    ageGroup: 'U12',
    status: 'Finished',
    registrationDeadline: '2024-12-15',
    startDate: '2024-01-01',
    endDate: '2024-02-28',
    registrationFee: 500000,
    maxWildcard: 2,
    currentClubs: 8,
    totalSlots: 8,
    slotsAvailable: 0,
    location: 'Surabaya, East Java',
    eoContact: 'Siti Rahma',
    eoPhone: '+62-31-555666',
    eoEmail: 'info@surabaya-cup.id',
    regulations: { minPlayers: 18, maxPlayers: 23, minPlayerAge: 11, maxPlayerAge: 12, minSquadSize: 18 },
    documents: [
      { id: 'doc-1', type: 'manager-id', label: 'KTP/ID Card Manager', required: true },
    ],
    createdAt: '2023-12-01T10:00:00Z',
  },
];

const initialRegistrations: SharedRegistration[] = [
  {
    id: 'reg-club1-comp1',
    clubId: 'club-1',
    clubName: 'SSB Garuda Muda',
    competitionId: 'comp-1',
    status: 'Approved',
    submittedAt: '2024-02-15T14:45:00Z',
    approvedAt: '2024-02-16T09:30:00Z',
    notes: 'Semua dokumen lengkap',
  },
  {
    id: 'reg-club2-comp1',
    clubId: 'club-2',
    clubName: 'SSB Bintang Timur',
    competitionId: 'comp-1',
    status: 'Submitted',
    submittedAt: '2024-02-18T15:20:00Z',
    notes: 'Menunggu approval dari EO',
  },
  {
    id: 'reg-club1-comp2',
    clubId: 'club-1',
    clubName: 'SSB Garuda Muda',
    competitionId: 'comp-2',
    status: 'Draft',
    notes: 'Masih dalam proses',
  },
];

const initialFixtures: SharedFixture[] = [
  { id: 'fix-1', competitionId: 'comp-1', matchday: 1, homeTeam: 'SSB Garuda Muda', awayTeam: 'SSB Bintang Timur', date: '2024-03-05', time: '15:00', venue: 'Stadion Mattoangin', homeScore: 2, awayScore: 1, status: 'Finished' },
  { id: 'fix-2', competitionId: 'comp-1', matchday: 1, homeTeam: 'SSB Elang Emas', awayTeam: 'SSB Rajawali', date: '2024-03-05', time: '17:00', venue: 'Lapangan Barombong', homeScore: 0, awayScore: 0, status: 'Finished' },
  { id: 'fix-3', competitionId: 'comp-1', matchday: 2, homeTeam: 'SSB Bintang Timur', awayTeam: 'SSB Elang Emas', date: '2024-03-12', time: '15:00', venue: 'Stadion Mattoangin', status: 'Scheduled' },
  { id: 'fix-4', competitionId: 'comp-1', matchday: 2, homeTeam: 'SSB Garuda Muda', awayTeam: 'SSB Rajawali', date: '2024-03-12', time: '17:00', venue: 'Lapangan Barombong', status: 'Scheduled' },
  { id: 'fix-5', competitionId: 'comp-4', matchday: 10, homeTeam: 'SSB Garuda Muda', awayTeam: 'Persija Academy', date: '2024-04-20', time: '16:00', venue: 'GBK Training Ground', status: 'Scheduled' },
];

// ─── Context Type ───────────────────────────────────────────────────────────

interface CompetitionDataContextType {
  // Data
  competitions: SharedCompetition[];
  registrations: SharedRegistration[];
  fixtures: SharedFixture[];

  // EO Actions
  updateCompetitionStatus: (id: string, status: SharedCompetitionStatus) => void;
  approveRegistration: (registrationId: string) => void;
  rejectRegistration: (registrationId: string) => void;

  // Club Actions
  submitRegistration: (competitionId: string, clubId: string, clubName: string) => void;
  isClubRegistered: (competitionId: string, clubId: string) => boolean;
  getClubRegistration: (competitionId: string, clubId: string) => SharedRegistration | undefined;

  // Queries
  getCompetition: (id: string) => SharedCompetition | undefined;
  getCompetitionFixtures: (competitionId: string) => SharedFixture[];
  getClubFixtures: (clubName: string) => SharedFixture[];
  getCompetitionRegistrations: (competitionId: string) => SharedRegistration[];
}

const CompetitionDataContext = createContext<CompetitionDataContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────────────────

export function CompetitionDataProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<SharedCompetition[]>(initialCompetitions);
  const [registrations, setRegistrations] = useState<SharedRegistration[]>(initialRegistrations);
  const [fixtures] = useState<SharedFixture[]>(initialFixtures);

  const updateCompetitionStatus = useCallback((id: string, status: SharedCompetitionStatus) => {
    setCompetitions(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }, []);

  const approveRegistration = useCallback((registrationId: string) => {
    setRegistrations(prev => prev.map(r =>
      r.id === registrationId ? { ...r, status: 'Approved' as RegistrationStatus, approvedAt: new Date().toISOString() } : r
    ));
  }, []);

  const rejectRegistration = useCallback((registrationId: string) => {
    setRegistrations(prev => prev.map(r =>
      r.id === registrationId ? { ...r, status: 'Rejected' as RegistrationStatus } : r
    ));
  }, []);

  const submitRegistration = useCallback((competitionId: string, clubId: string, clubName: string) => {
    const newReg: SharedRegistration = {
      id: `reg-${Date.now()}`,
      clubId,
      clubName,
      competitionId,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
    };
    setRegistrations(prev => [...prev, newReg]);
  }, []);

  const isClubRegistered = useCallback((competitionId: string, clubId: string) => {
    return registrations.some(r => r.competitionId === competitionId && r.clubId === clubId);
  }, [registrations]);

  const getClubRegistration = useCallback((competitionId: string, clubId: string) => {
    return registrations.find(r => r.competitionId === competitionId && r.clubId === clubId);
  }, [registrations]);

  const getCompetition = useCallback((id: string) => {
    return competitions.find(c => c.id === id);
  }, [competitions]);

  const getCompetitionFixtures = useCallback((competitionId: string) => {
    return fixtures.filter(f => f.competitionId === competitionId);
  }, [fixtures]);

  const getClubFixtures = useCallback((clubName: string) => {
    return fixtures.filter(f => f.homeTeam === clubName || f.awayTeam === clubName);
  }, [fixtures]);

  const getCompetitionRegistrations = useCallback((competitionId: string) => {
    return registrations.filter(r => r.competitionId === competitionId);
  }, [registrations]);

  const value = useMemo(() => ({
    competitions,
    registrations,
    fixtures,
    updateCompetitionStatus,
    approveRegistration,
    rejectRegistration,
    submitRegistration,
    isClubRegistered,
    getClubRegistration,
    getCompetition,
    getCompetitionFixtures,
    getClubFixtures,
    getCompetitionRegistrations,
  }), [competitions, registrations, fixtures, updateCompetitionStatus, approveRegistration, rejectRegistration, submitRegistration, isClubRegistered, getClubRegistration, getCompetition, getCompetitionFixtures, getClubFixtures, getCompetitionRegistrations]);

  return (
    <CompetitionDataContext.Provider value={value}>
      {children}
    </CompetitionDataContext.Provider>
  );
}

export function useCompetitionData() {
  const ctx = useContext(CompetitionDataContext);
  if (!ctx) throw new Error('useCompetitionData must be used within CompetitionDataProvider');
  return ctx;
}
