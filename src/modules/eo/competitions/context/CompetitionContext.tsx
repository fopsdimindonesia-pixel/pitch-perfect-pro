import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { mockCompetitions, mockMatches, mockRegistrations, mockStandings } from '@/lib/mockData';

export interface CompetitionData {
  id: string;
  name: string;
  format: string;
  ageGroup: string;
  status: string;
  clubs: number;
  startDate: string;
  endDate: string;
  description: string;
  registrationFee: number;
  eoId: string;
}

export interface Category {
  id: string;
  name: string;
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

interface CompetitionContextType {
  activeCompetition: CompetitionData | null;
  setActiveCompetitionId: (id: string) => void;
  competitions: CompetitionData[];
  matches: typeof mockMatches;
  registrations: typeof mockRegistrations;
  standings: typeof mockStandings;
  competitionConfig: CompetitionConfig;
  addCompetition: (form: Omit<CompetitionData, 'id' | 'clubs' | 'status' | 'eoId'>) => void;
  updateConfig: (partial: Partial<CompetitionConfig>) => void;
}

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

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<CompetitionData[]>(mockCompetitions as CompetitionData[]);
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
        ? [{ id: 'cat-default', name: ag, maxTeams: 16, maxPlayers: 25, status: 'Active' as const }]
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
      status: 'Draft',
      eoId: 'eo-1',
    };
    setCompetitions((prev) => [...prev, newComp]);
    setActiveId(newComp.id);
  }, []);

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
