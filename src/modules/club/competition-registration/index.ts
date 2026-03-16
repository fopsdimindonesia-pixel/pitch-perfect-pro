/**
 * Competition Registration Module - Barrel Export
 */

// Pages
export { default as AvailableCompetitions } from "./pages/AvailableCompetitions";
export { default as CompetitionDetail } from "./pages/CompetitionDetail";
export { default as RegistrationFlow } from "./pages/RegistrationFlow";

// Hooks
export {
  useCompetitionRegistration,
  useDocumentUpload,
  useRegistrationStep,
  useSquadSelection,
} from "./hooks";

// Components
export { CompetitionCard } from "./components/CompetitionCard";

// Types
export type * from "./lib/types";

// Utils & Constants
export * from "./lib/utils";
export * from "./lib/constants";

// Mock Data
export {
  mockCompetitionsExtended,
  mockCompetitionRegistrations,
  mockRegistrationPlayers,
  mockUploadedDocuments,
} from "./lib/mockData";
