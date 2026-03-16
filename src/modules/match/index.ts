// Context
export { MatchProvider, useMatch } from './context/MatchContext';

// Components
export { MatchSwitcher } from './components/MatchSwitcher';
export { LiveScoreHeader } from './components/LiveScoreHeader';

// Pages — Unified (merged duplicates)
export { default as DigitalMatchSheet } from './pages/DigitalMatchSheet';
export { default as LiveScoreboard } from './pages/LiveScoreboard';
export { default as RefereeReport } from './pages/RefereeReport';
export { default as MatchStatsDashboard } from './pages/MatchStatsDashboard';

// Pages — Migrated from legacy
export { default as RefereeAssignment } from './pages/RefereeAssignment';
export { default as LineupSubmission } from './pages/LineupSubmission';
export { default as TacticalAnalysis } from './pages/TacticalAnalysis';
export { default as MatchArchive } from './pages/MatchArchive';
