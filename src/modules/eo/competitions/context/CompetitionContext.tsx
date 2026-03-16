import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockCompetitions } from '@/lib/mockData';

interface CompetitionData {
  id: string;
  name: string;
  format: string;
  ageGroup: string;
  status: string;
  clubs: number;
  startDate: string;
  endDate: string;
}

interface CompetitionContextType {
  activeCompetition: CompetitionData | null;
  setActiveCompetitionId: (id: string) => void;
  competitions: typeof mockCompetitions;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(mockCompetitions[0]?.id ?? '');

  const activeCompetition = mockCompetitions.find((c) => c.id === activeId) ?? null;

  return (
    <CompetitionContext.Provider
      value={{
        activeCompetition: activeCompetition as CompetitionData | null,
        setActiveCompetitionId: setActiveId,
        competitions: mockCompetitions,
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
