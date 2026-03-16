import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { mockCompetitions, mockMatches, mockRegistrations, mockStandings } from '@/lib/mockData';

// ─── Competition Status Lifecycle ───────────────────────────────────────────
export type CompetitionStatus = 
  | 'draft' 
  | 'registration_open' 
  | 'registration_closed' 
  | 'active' 
  | 'completed' 
  | 'archived';

export const STATUS_LABELS: Record<CompetitionStatus, string> = {
  draft: 'Draft',
  registration_open: 'Registrasi Dibuka',
  registration_closed: 'Registrasi Ditutup',
  active: 'Berlangsung',
  completed: 'Selesai',
  archived: 'Diarsipkan',
};

export const STATUS_TRANSITIONS: Record<CompetitionStatus, CompetitionStatus[]> = {
  draft: ['registration_open'],
  registration_open: ['registration_closed'],
  registration_closed: ['active'],
  active: ['completed'],
  completed: ['archived'],
  archived: [],
};

export const STATUS_COLORS: Record<CompetitionStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  registration_open: 'bg-chart-2/15 text-chart-2',
  registration_closed: 'bg-chart-4/15 text-chart-4',
  active: 'bg-primary/15 text-primary',
  completed: 'bg-chart-1/15 text-chart-1',
  archived: 'bg-muted text-muted-foreground',
};

// ─── Data Types ─────────────────────────────────────────────────────────────
export interface CompetitionData {
  id: string;
  name: string;
  description: string;
  format: string;
  season: string;
  ageGroup: string;
  status: CompetitionStatus;
  clubs: number;
  startDate: string;
  endDate: string;
  registrationFee: number;
  eoId: string;
}

export interface Category {
  id: string;
  name: string;
  ageGroup: string;
  maxTeams: number;
  maxPlayers: number;
  status: 'Active' | 'Draft' | 'Closed';
}

export interface CompetitionRules {
  general: string;
  match: string;
  discipline: string;
}

export interface EligibilityConfig {
  maxAge: number;
  requireBirthCert: boolean;
  requireConsent: boolean;
  deadline: string;
  allowExceptions: boolean;
}

export interface CompetitionConfig {
  categories: Category[];
  rules: CompetitionRules;
  eligibility: EligibilityConfig;
}

// ─── Context Type ───────────────────────────────────────────────────────────
interface CompetitionContextType {
  activeCompetition: CompetitionData | null;
  setActiveCompetitionId: (id: string) => void;
  competitions: CompetitionData[];
  matches: typeof mockMatches;
  registrations: typeof mockRegistrations;
  standings: typeof mockStandings;
  competitionConfig: CompetitionConfig;
  addCompetition: (form: Omit<CompetitionData, 'id' | 'clubs' | 'status' | 'eoId'>) => void;
  updateCompetition: (partial: Partial<CompetitionData>) => void;
  transitionStatus: (to: CompetitionStatus) => boolean;
  updateConfig: (partial: Partial<CompetitionConfig>) => void;
}

// ─── Defaults ───────────────────────────────────────────────────────────────
const defaultRules: CompetitionRules = {
  general: `1. Semua pemain harus terdaftar dengan identitas valid
2. Pelatih harus memiliki lisensi kepelatihan
3. Tim wajib mematuhi semua regulasi
4. Pertandingan mengacu pada aturan FIFA dengan modifikasi`,
  match: `1. Durasi pertandingan: 2 x 40 menit (U-12), 2 x 45 menit (U-14+)
2. Water break diizinkan pada menit ke-20
3. Setiap tim diizinkan 3 pergantian pemain
4. Extra time hanya di fase knockout`,
  discipline: `1. Akumulasi kartu kuning: 3 kartu = 1 pertandingan ban
2. Kartu merah: Minimal 1 pertandingan ban
3. Kekerasan: Minimal 3 pertandingan ban + denda
4. Bahasa kasar: 1 pertandingan ban + denda`,
};

const defaultEligibility: EligibilityConfig = {
  maxAge: 13,
  requireBirthCert: true,
  requireConsent: true,
  deadline: '',
  allowExceptions: true,
};

// Map legacy status strings to new lifecycle
function normalizeLegacyStatus(status: string): CompetitionStatus {
  const map: Record<string, CompetitionStatus> = {
    Active: 'active',
    Draft: 'draft',
    Finished: 'completed',
    active: 'active',
    draft: 'draft',
    completed: 'completed',
  };
  return map[status] ?? 'draft';
}

function getCurrentSeason(): string {
  const now = new Date();
  return `${now.getFullYear()}/${now.getFullYear() + 1}`;
}

// ─── Provider ───────────────────────────────────────────────────────────────
const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<CompetitionData[]>(
    (mockCompetitions as any[]).map((c) => ({
      ...c,
      season: c.season ?? getCurrentSeason(),
      status: normalizeLegacyStatus(c.status),
    })) as CompetitionData[]
  );
  const [activeId, setActiveId] = useState<string>(mockCompetitions[0]?.id ?? '');
  const [configMap, setConfigMap] = useState<Record<string, CompetitionConfig>>({});

  const activeCompetition = useMemo(
    () => competitions.find((c) => c.id === activeId) ?? null,
    [activeId, competitions]
  );

  const matches = useMemo(() => mockMatches.filter((m) => m.competitionId === activeId), [activeId]);
  const registrations = useMemo(() => mockRegistrations.filter((r) => r.competitionId === activeId), [activeId]);
  const standings = useMemo(() => (activeId === 'comp-1' ? mockStandings : []), [activeId]);

  const competitionConfig = useMemo<CompetitionConfig>(() => {
    if (configMap[activeId]) return configMap[activeId];
    const ag = activeCompetition?.ageGroup ?? 'U13';
    const maxAge = parseInt(ag.replace(/\D/g, '')) || 18;
    return {
      categories: activeCompetition
        ? [{ id: 'cat-default', name: ag, ageGroup: ag, maxTeams: 16, maxPlayers: 25, status: 'Active' as const }]
        : [],
      rules: defaultRules,
      eligibility: { ...defaultEligibility, maxAge, deadline: activeCompetition?.startDate ?? '' },
    };
  }, [activeId, configMap, activeCompetition]);

  const updateConfig = useCallback((partial: Partial<CompetitionConfig>) => {
    setConfigMap((prev) => ({
      ...prev,
      [activeId]: { ...(prev[activeId] ?? competitionConfig), ...partial },
    }));
  }, [activeId, competitionConfig]);

  const addCompetition = useCallback((form: Omit<CompetitionData, 'id' | 'clubs' | 'status' | 'eoId'>) => {
    const newComp: CompetitionData = {
      ...form,
      id: `comp-${Date.now()}`,
      clubs: 0,
      status: 'draft',
      eoId: 'eo-1',
    };
    setCompetitions((prev) => [...prev, newComp]);
    setActiveId(newComp.id);
  }, []);

  const updateCompetition = useCallback((partial: Partial<CompetitionData>) => {
    setCompetitions((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, ...partial } : c))
    );
  }, [activeId]);

  const transitionStatus = useCallback((to: CompetitionStatus): boolean => {
    const current = competitions.find((c) => c.id === activeId);
    if (!current) return false;
    const allowed = STATUS_TRANSITIONS[current.status];
    if (!allowed.includes(to)) return false;
    setCompetitions((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, status: to } : c))
    );
    return true;
  }, [activeId, competitions]);

  return (
    <CompetitionContext.Provider
      value={{
        activeCompetition,
        setActiveCompetitionId: setActiveId,
        competitions,
        matches,
        registrations,
        standings,
        competitionConfig,
        addCompetition,
        updateCompetition,
        transitionStatus,
        updateConfig,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}

export function useCompetition() {
  const ctx = useContext(CompetitionContext);
  if (!ctx) throw new Error('useCompetition must be used within CompetitionProvider');
  return ctx;
}
