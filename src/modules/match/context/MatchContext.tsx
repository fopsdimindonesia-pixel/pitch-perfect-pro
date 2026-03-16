import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { mockMatches, mockMatchEvents, generatePlayers } from '@/lib/mockData';

export type MatchEvent = {
  id: string;
  matchId: string;
  minute: number;
  type: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
  team: 'home' | 'away';
  player: string;
  assist: string | null;
  playerOut?: string;
  playerIn?: string;
};

export interface MatchData {
  id: string;
  competitionId: string;
  competitionName: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'Scheduled' | 'Live' | 'Finished';
  date: string;
  time: string;
  venue: string;
  referee: string;
  matchday: number;
}

const homeRoster = generatePlayers('club-1', 18).map((p, i) => ({
  ...p,
  starting: i < 11,
}));
const awayRoster = generatePlayers('club-2', 18).map((p, i) => ({
  ...p,
  starting: i < 11,
}));

interface MatchContextType {
  activeMatch: MatchData | null;
  setActiveMatchId: (id: string) => void;
  matches: typeof mockMatches;
  events: MatchEvent[];
  addEvent: (event: Omit<MatchEvent, 'id'>) => void;
  homeRoster: typeof homeRoster;
  awayRoster: typeof awayRoster;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(mockMatches[2]?.id ?? ''); // default to live match
  const [events, setEvents] = useState<MatchEvent[]>(
    mockMatchEvents.map((e) => ({
      ...e,
      type: e.type as MatchEvent['type'],
      team: e.team as 'home' | 'away',
    }))
  );

  const activeMatch = useMemo(
    () => (mockMatches.find((m) => m.id === activeId) as MatchData | null) ?? null,
    [activeId]
  );

  const matchEvents = useMemo(
    () => events.filter((e) => e.matchId === activeId),
    [events, activeId]
  );

  const addEvent = (event: Omit<MatchEvent, 'id'>) => {
    const newEvent: MatchEvent = {
      ...event,
      id: `ev-${Date.now()}`,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <MatchContext.Provider
      value={{
        activeMatch,
        setActiveMatchId: setActiveId,
        matches: mockMatches,
        events: matchEvents,
        addEvent,
        homeRoster,
        awayRoster,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error('useMatch must be used within MatchProvider');
  return ctx;
}
