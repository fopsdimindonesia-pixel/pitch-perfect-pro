// Dashboard
export { default as EOOverview } from './dashboard/EOOverview';

// Competitions - all sub-modules
export {
  Competitions,
  CreateCompetition,
  CompetitionProvider,
  useCompetition,
  CompetitionProfile,
  CompetitionCategories,
  CompetitionRules,
  EligibilityRules,
  RegistrationApproval,
  TeamSlotManagement,
  GroupAllocation,
  FixtureGenerator,
  BracketBuilder,
  CompetitionDashboard,
  CompetitionDocuments,
  CompetitionAnalytics,
  AwardSystem,
  PublicCompetitionPage,
  PublicStandings,
} from './competitions';

// Registrations
export { default as ClubRegistrations } from './registrations/ClubRegistrations';

// Standings
export { default as Standings } from './standings/Standings';

// Schedule
export { default as Schedule } from './schedule/Schedule';

// Reports
export { default as Reports } from './reports/Reports';
export { default as MatchSheet } from './reports/MatchSheet';
