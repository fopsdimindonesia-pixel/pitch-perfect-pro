import React from 'react';
import { Card } from '@/components/ui/card';

interface Player {
  number: number;
  name: string;
  position: string;
}

interface PitchVisualizationProps {
  homeTeam?: string;
  awayTeam?: string;
  homeFormation?: string;
  awayFormation?: string;
  homeLineup?: Player[];
  awayLineup?: Player[];
  readOnly?: boolean;
}

export function PitchVisualization({
  homeTeam = 'Home',
  awayTeam = 'Away',
  homeFormation = '4-3-3',
  awayFormation = '4-2-3-1',
  homeLineup = [],
  awayLineup = [],
  readOnly = true,
}: PitchVisualizationProps) {
  const pitchDescription = `${homeTeam} (${homeFormation}) vs ${awayTeam} (${awayFormation}). Formation visualization showing player positions on the pitch.`;
  
  return (
    <Card className="p-6 bg-gradient-to-b from-green-700 to-green-900 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white font-semibold text-sm" role="region" aria-label={`${homeTeam} team formation`}>{homeTeam} ({homeFormation})</div>
        <div className="text-white font-semibold text-sm" role="region" aria-label={`${awayTeam} team formation`}>{awayTeam} ({awayFormation})</div>
      </div>

      <svg 
        viewBox="0 0 400 280" 
        className="w-full bg-green-800 rounded-lg border-2 border-white/30"
        role="img"
        aria-label={pitchDescription}
      >
        <title>{pitchDescription}</title>
        <desc>Soccer pitch showing {homeTeam} players on the left side in blue and {awayTeam} players on the right side in red</desc>
        
        {/* Field outline */}
        <rect x="10" y="10" width="380" height="260" fill="none" stroke="white" strokeWidth="2" />
        
        {/* Center line */}
        <line x1="200" y1="10" x2="200" y2="270" stroke="white" strokeWidth="1" />
        
        {/* Center circle */}
        <circle cx="200" cy="140" r="40" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="200" cy="140" r="3" fill="white" />
        
        {/* Penalty areas */}
        <rect x="10" y="60" width="60" height="160" fill="none" stroke="white" strokeWidth="1" />
        <rect x="330" y="60" width="60" height="160" fill="none" stroke="white" strokeWidth="1" />

        {/* Home team players (left side) */}
        {homeLineup.slice(0, 11).map((player, idx) => {
          const rows = homeFormation.split('-').map(Number);
          const positions = [
            [], // GK
            ...Array(rows[0]).fill(0).map(() => []), // Defenders
            ...Array(rows[1]).fill(0).map(() => []), // Midfielders
            ...Array(rows[2]).fill(0).map(() => []), // Forwards
          ];
          const totalPlayers = rows.reduce((a, b) => a + b, 0) + 1;
          const step = 240 / (totalPlayers + 1);
          const y = 20 + (idx + 1) * step;
          
          return (
            <g key={`home-${idx}`} role="img" aria-label={`${player.name}, number ${player.number}, position ${player.position}`}>
              <circle cx="60" cy={y} r="12" fill="rgb(59, 130, 246)" stroke="white" strokeWidth="1" />
              <title>{`${homeTeam} - #${player.number} ${player.name} (${player.position})`}</title>
              <text x="60" y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                {player.number}
              </text>
            </g>
          );
        })}

        {/* Away team players (right side) */}
        {awayLineup.slice(0, 11).map((player, idx) => {
          const rows = awayFormation.split('-').map(Number);
          const totalPlayers = rows.reduce((a, b) => a + b, 0) + 1;
          const step = 240 / (totalPlayers + 1);
          const y = 20 + (idx + 1) * step;
          
          return (
            <g key={`away-${idx}`} role="img" aria-label={`${player.name}, number ${player.number}, position ${player.position}`}>
              <circle cx="340" cy={y} r="12" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="1" />
              <title>{`${awayTeam} - #${player.number} ${player.name} (${player.position})`}</title>
              <text x="340" y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                {player.number}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>{readOnly ? 'Formation preview (read-only mode)' : 'Drag players to reposition them on the pitch'}</span>
        {readOnly && <span className="text-amber-600" role="status">Read-only mode</span>}
      </div>
    </Card>
  );
}
