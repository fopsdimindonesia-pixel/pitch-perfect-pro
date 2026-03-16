import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
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

interface CompetitionContextType {
  activeCompetition: CompetitionData | null;
  setActiveCompetitionId: (id: string) => void;
  competitions: typeof mockCompetitions;
  matches: typeof mockMatches;
  registrations: typeof mockRegistrations;
  standings: typeof mockStandings;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(mockCompetitions[0]?.id ?? '');

  const activeCompetition = useMemo(
    () => (mockCompetitions.find((c) => c.id === activeId) as CompetitionData | null) ?? null,
    [activeId]
  );

  const matches = useMemo(
    () => mockMatches.filter((m) => m.competitionId === activeId),
    [activeId]
  );

  const registrations = useMemo(
    () => mockRegistrations.filter((r) => r.competitionId === activeId),
    [activeId]
  );

  // Standings are only for comp-1 in mock data; return all if match, empty otherwise
  const standings = useMemo(
    () => (activeId === 'comp-1' ? mockStandings : []),
    [activeId]
  );

  return (
    <CompetitionContext.Provider
      value={{
        activeCompetition,
        setActiveCompetitionId: setActiveId,
        competitions: mockCompetitions,
        matches,
        registrations,
        standings,
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
