import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider, useRole } from "@/context/RoleContext";
import { AppShell } from "@/components/layout/AppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { Role } from "@/lib/mockData";

// Player Digital Ecosystem pages
import {
  GlobalPlayerRegistry,
  DigitalPassport,
  CareerTimeline,
  PlayerECard,
  PlayerVerificationSystem,
  PlayerStatsOverview,
} from "./modules/player";

// Owner pages
import {
  OwnerOverview,
  EOManagement,
  ClubManagement_owner as ClubManagement,
  OwnerFinancial,
  AuditLog,
  SystemConfig
} from "./modules/owner";

// EO pages
import {
  EOOverview,
  Competitions,
  CreateCompetition,
  ClubRegistrations,
  Standings,
  Schedule,
  Reports,
  MatchSheet
} from "./modules/eo";

// Match Management pages
import MatchScheduler from "./pages/match/setup/MatchScheduler";
import RefereeAssignment from "./pages/match/setup/RefereeAssignment";
import LineupSubmission from "./pages/match/lineup/LineupSubmission";
import MatchEvents from "./pages/match/events/MatchEvents";
import MatchTimeline from "./pages/match/data/MatchTimeline";
import MatchStatistics from "./pages/match/data/MatchStatistics";
import PlayerRatings from "./pages/match/data/PlayerRatings";
import TacticalAnalysis from "./pages/match/analytics/TacticalAnalysis";
import MatchArchive from "./pages/match/archive/MatchArchive";

// Competition pages
import CompetitionOverview from "./pages/competition/CompetitionOverview";
import CompetitionSetup from "./pages/competition/CompetitionSetup";
import CompetitionDetails from "./pages/competition/CompetitionDetails";
import CompetitionUserManagement from "./pages/competition/UserManagement";
import CompetitionRules from "./pages/competition/CompetitionRules";
import ParticipantRegistration from "./pages/competition/ParticipantRegistration";
import WaiverManagement from "./pages/competition/WaiverManagement";
import MatchManagement from "./pages/competition/MatchManagement";
import CompetitionRefereeAssignment from "./pages/competition/RefereeAssignment";
import ScoringSystem from "./pages/competition/ScoringSystem";
import PrizePrizeDistribution from "./pages/competition/PrizePrizeDistribution";
import DocumentManagement from "./pages/competition/DocumentManagement";
import CompetitionBudget from "./pages/competition/CompetitionBudget";
import CompetitionApproval from "./pages/competition/CompetitionApproval";
import Announcement from "./pages/competition/Announcement";
import CompetitionReports from "./pages/competition/CompetitionReports";
import VolunteerManagement from "./pages/competition/VolunteerManagement";
import VenueManagement from "./pages/competition/VenueManagement";
import OrganizationHierarchy from "./pages/competition/OrganizationHierarchy";
import RegistrationStatus from "./pages/competition/RegistrationStatus";

// Club pages - all from new modular structure
import {
  // Dashboard
  ClubOverview,
  ClubDashboard,
  
  // Core
  ClubProfile,
  ClubBranding,
  ClubHistory,
  ClubAchievements,
  
  // Players
  Players,
  PlayerProfile,
  PlayerRegistration,
  PlayerTransfer,
  PlayerContract,
  PlayerInjuryRecord,
  PlayerHistory,
  PlayerDocuments,
  PlayerPhoto,
  PlayerVerification,
  PlayerSuspension,
  
  // Roster
  Roster,
  RosterManagement,
  SquadPositions,
  ContractStatus,
  PlayerAvailability,
  PlayingTime,
  
  // Staff
  StaffRegistry,
  CoachManagement,
  MedicalStaff,
  StaffRoles,
  TeamManager,
  
  // Training
  TrainingSchedule,
  SessionPlanning,
  TrainingAttendance,
  FacilityManagement,
  CoachFeedback,
  
  // Academy
  AcademyRegistration,
  AgeCategory,
  YouthTeams,
  PlayerPromotion,
  TalentDevelopment,
  
  // Analytics
  PerformanceAnalytics,
  PlayerStatistics,
  MatchAnalysis,
  CompetitionStatistics,
  InjuryTrends,
  MatchHistory,
  
  // Finance
  FinancialDashboard,
  BudgetManagement,
  PayrollManagement,
  RevenueStreams,
  FinancialReports,
  ClubFinancial,
  
  // Operations
  OperationsDashboard,
  EventManagement,
  GuestManagement,
  InventoryManagement,
  SecurityManagement,
  MatchDay,
  LineupManagement,
  
  // Fan
  FanEngagement,
  TicketSales,
  MerchandiseCatalog,
  SocialMedia,
  FanFeedback,
  ECard,
} from "./modules/club";

// Admin pages - imported from new modular structure
import {
  OwnerDashboard,
  GlobalAnalytics,
  RevenueAnalytics,
  SystemMonitoring,
  UserManagement,
  UserAuditLog,
  OrganizationMonitoring,
  CompetitionMonitoring,
  PlayerMonitoring,
  MatchMonitoring,
  PerformanceMonitoring,
  ServiceMonitoring,
  APIMonitoring,
  SubscriptionManagement,
  BillingManagement,
  PlatformFeeSettings,
  PaymentReconciliation,
  PlatformConfiguration,
  SystemSettings,
  LocalizationSettings,
  BrandingConfiguration,
  MaintenanceMode,
  LogManagement,
  SystemBackup,
  SystemRestore,
  DataExport,
  DataImport,
  FeatureFlags,
  ErrorTracking,
  AccessLogs,
  SecurityAudit,
  SecurityAlerts,
  ComplianceReports,
  APIKeyManagement,
  APIUsageAnalytics,
  WebhookManagement,
  IntegrationSettings
} from "./modules/owner";

// Aliases for backward compatibility with old names
const PlatformDashboard = OwnerDashboard;
const AdminUserManagement = UserManagement;
const UserMonitoring = AdminUserManagement;
const EventOrganizerManagement = EOManagement;
const FeatureFlagManagement = FeatureFlags;
const GlobalSettings = SystemSettings;
const SystemLogs = LogManagement;
const PlatformBilling = BillingManagement;
const AdminActivityLog = SecurityAudit;
const ComplianceDashboard = ComplianceReports;
const AuditReports = SecurityAudit;

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ============================================================================
// Route Configurations - Organized by Domain
// ============================================================================

// Owner Routes (Platform Administration)
const ownerRoutes = [
  { path: "/owner/dashboard", element: <OwnerDashboard /> },
  { path: "/owner/overview", element: <OwnerOverview /> },
  // Platform Management
  { path: "/owner/platform-management/configuration", element: <PlatformConfiguration /> },
  { path: "/owner/platform-management/settings", element: <SystemSettings /> },
  { path: "/owner/platform-management/features", element: <FeatureFlags /> },
  { path: "/owner/platform-management/maintenance", element: <MaintenanceMode /> },
  { path: "/owner/platform-management/branding", element: <BrandingConfiguration /> },
  { path: "/owner/platform-management/integrations", element: <IntegrationSettings /> },
  { path: "/owner/platform-management/localization", element: <LocalizationSettings /> },
  // Users Management
  { path: "/owner/users/management", element: <UserManagement /> },
  { path: "/owner/users/audit", element: <UserAuditLog /> },
  { path: "/owner/users/logs", element: <AuditLog /> },
  // Organizations
  { path: "/owner/organizations/clubs", element: <ClubManagement /> },
  { path: "/owner/organizations/event-organizers", element: <EOManagement /> },
  { path: "/owner/organizations/monitoring", element: <OrganizationMonitoring /> },
  { path: "/owner/organizations/subscriptions", element: <SubscriptionManagement /> },
  // Competitions
  { path: "/owner/competitions/monitoring", element: <CompetitionMonitoring /> },
  { path: "/owner/competitions/matches", element: <MatchMonitoring /> },
  { path: "/owner/competitions/players", element: <PlayerMonitoring /> },
  // Finance
  { path: "/owner/finance/dashboard", element: <OwnerFinancial /> },
  { path: "/owner/finance/reconciliation", element: <PaymentReconciliation /> },
  { path: "/owner/finance/fee-settings", element: <PlatformFeeSettings /> },
  { path: "/owner/finance/billing", element: <BillingManagement /> },
  // Analytics
  { path: "/owner/analytics/global", element: <GlobalAnalytics /> },
  { path: "/owner/analytics/revenue", element: <RevenueAnalytics /> },
  // Infrastructure
  { path: "/owner/infrastructure/system-monitoring", element: <SystemMonitoring /> },
  { path: "/owner/infrastructure/performance", element: <PerformanceMonitoring /> },
  { path: "/owner/infrastructure/services", element: <ServiceMonitoring /> },
  { path: "/owner/infrastructure/logs", element: <LogManagement /> },
  { path: "/owner/infrastructure/backup", element: <SystemBackup /> },
  { path: "/owner/infrastructure/restore", element: <SystemRestore /> },
  { path: "/owner/infrastructure/errors", element: <ErrorTracking /> },
  { path: "/owner/infrastructure/access-logs", element: <AccessLogs /> },
  // Security
  { path: "/owner/security/alerts", element: <SecurityAlerts /> },
  { path: "/owner/security/reports", element: <ComplianceReports /> },
  { path: "/owner/security/audit", element: <SecurityAudit /> },
  // Developer Tools
  { path: "/owner/developer-tools/api-keys", element: <APIKeyManagement /> },
  { path: "/owner/developer-tools/webhooks", element: <WebhookManagement /> },
  { path: "/owner/developer-tools/monitoring", element: <APIMonitoring /> },
  // Compliance
  { path: "/owner/compliance/config", element: <SystemConfig /> },
  { path: "/owner/compliance/import", element: <DataImport /> },
  { path: "/owner/compliance/export", element: <DataExport /> },
  // Backward compatibility
  { path: "/admin/*", element: <Navigate to="/owner/dashboard" replace /> },
];

// Event Organizer Routes
const eoRoutes = [
  { path: "/eo/overview", element: <EOOverview /> },
  { path: "/eo/competitions", element: <Competitions /> },
  { path: "/eo/competitions/create", element: <CreateCompetition /> },
  { path: "/eo/registrations", element: <ClubRegistrations /> },
  { path: "/eo/schedule", element: <Schedule /> },
  { path: "/eo/match-sheet", element: <MatchSheet /> },
  { path: "/eo/standings", element: <Standings /> },
  { path: "/eo/reports", element: <Reports /> },
];

// Match Management Routes
const matchRoutes = [
  { path: "/match/scheduler", element: <MatchScheduler /> },
  { path: "/match/referees", element: <RefereeAssignment /> },
  { path: "/match/lineup", element: <LineupSubmission /> },
  { path: "/match/events", element: <MatchEvents /> },
  { path: "/match/timeline", element: <MatchTimeline /> },
  { path: "/match/statistics", element: <MatchStatistics /> },
  { path: "/match/ratings", element: <PlayerRatings /> },
  { path: "/match/tactics", element: <TacticalAnalysis /> },
  { path: "/match/archive", element: <MatchArchive /> },
];

// Competition Routes
const competitionRoutes = [
  { path: "/competition/overview", element: <CompetitionOverview /> },
  { path: "/competition/setup", element: <CompetitionSetup /> },
  { path: "/competition/details", element: <CompetitionDetails /> },
  { path: "/competition/users", element: <CompetitionUserManagement /> },
  { path: "/competition/rules", element: <CompetitionRules /> },
  { path: "/competition/registration", element: <ParticipantRegistration /> },
  { path: "/competition/waivers", element: <WaiverManagement /> },
  { path: "/competition/matches", element: <MatchManagement /> },
  { path: "/competition/referees", element: <CompetitionRefereeAssignment /> },
  { path: "/competition/scoring", element: <ScoringSystem /> },
  { path: "/competition/prizes", element: <PrizePrizeDistribution /> },
  { path: "/competition/documents", element: <DocumentManagement /> },
  { path: "/competition/budget", element: <CompetitionBudget /> },
  { path: "/competition/approval", element: <CompetitionApproval /> },
  { path: "/competition/announcements", element: <Announcement /> },
  { path: "/competition/reports", element: <CompetitionReports /> },
  { path: "/competition/volunteers", element: <VolunteerManagement /> },
  { path: "/competition/venues", element: <VenueManagement /> },
  { path: "/competition/hierarchy", element: <OrganizationHierarchy /> },
  { path: "/competition/status", element: <RegistrationStatus /> },
];

// Player Digital Ecosystem Routes (accessible by all roles)
const playerEcosystemRoutes = [
  { path: "/player/registry", element: <GlobalPlayerRegistry /> },
  { path: "/player/passport/:id", element: <DigitalPassport /> },
  { path: "/player/timeline/:id", element: <CareerTimeline /> },
  { path: "/player/ecard", element: <PlayerECard /> },
  { path: "/player/verification", element: <PlayerVerificationSystem /> },
  { path: "/player/stats", element: <PlayerStatsOverview /> },
];

// Club System Routes
const clubRoutes = [
  { path: "/club/overview", element: <ClubOverview /> },
  { path: "/club/players", element: <Players /> },
  { path: "/club/ecard", element: <ECard /> },
  { path: "/club/roster", element: <Roster /> },
  { path: "/club/match-day", element: <LineupManagement /> },
  { path: "/club/lineup", element: <LineupManagement /> },
  { path: "/club/match-history", element: <MatchHistory /> },
  { path: "/club/financial", element: <ClubFinancial /> },
  { path: "/club/training/schedule", element: <TrainingSchedule /> },
  { path: "/club/training/attendance", element: <TrainingAttendance /> },
  { path: "/club/staff/coaches", element: <CoachManagement /> },
  { path: "/club/staff/medical", element: <MedicalStaff /> },
  { path: "/club/analytics/player-statistics", element: <PlayerStatistics /> },
];

// ============================================================================
// Role-Protected Element Wrapper
// ============================================================================
const ProtectedElement = ({
  element,
  allowedRoles,
}: {
  element: React.ReactNode;
  allowedRoles: Role[];
}) => {
  const { role } = useRole();
  const isAllowed = allowedRoles.includes(role);

  return isAllowed ? element : <Navigate to="/unauthorized" replace />;
};

// ============================================================================
// Route Configuration with Role Permissions
// ============================================================================
interface RouteWithRole {
  path: string;
  element: React.ReactNode;
  allowedRoles: Role[];
}

const protectedRoutes: RouteWithRole[] = [
  // Owner routes (admin/owner only)
  ...ownerRoutes.map((route) => ({
    ...route,
    allowedRoles: ["owner", "admin"] as Role[],
  })),
  // EO routes (eo only)
  ...eoRoutes.map((route) => ({
    ...route,
    allowedRoles: ["eo"] as Role[],
  })),
  // Match routes (all roles)
  ...matchRoutes.map((route) => ({
    ...route,
    allowedRoles: ["owner", "eo", "club", "admin"] as Role[],
  })),
  // Competition routes (all roles)
  ...competitionRoutes.map((route) => ({
    ...route,
    allowedRoles: ["owner", "eo", "club", "admin"] as Role[],
  })),
  // Player Ecosystem routes (all roles)
  ...playerEcosystemRoutes.map((route) => ({
    ...route,
    allowedRoles: ["owner", "eo", "club", "admin"] as Role[],
  })),
  // Club routes (club only)
  ...clubRoutes.map((route) => ({
    ...route,
    allowedRoles: ["club"] as Role[],
  })),
  })),
];

// Root redirect component - redirects based on current role
const RootRedirect = () => {
  const { role } = useRole();
  const redirectPath = useMemo(() => {
    switch (role) {
      case "owner":
      case "admin":
        return "/owner/dashboard";
      case "eo":
        return "/eo/overview";
      case "club":
        return "/club/overview";
      default:
        return "/owner/dashboard";
    }
  }, [role]);

  return <Navigate to={redirectPath} replace />;
};

// Unauthorized page component
const UnauthorizedPage = () => {
  const { role, tenantName } = useRole();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          Your current role (<span className="font-mono font-semibold">{role}</span>) does not have permission to access this page.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Logged in as: <span className="font-semibold">{tenantName}</span>
        </p>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// Root redirect
const rootRoute = { path: "/", element: <RootRedirect /> };

// 404 fallback
const notFoundRoute = { path: "*", element: <NotFound /> };

// ============================================================================
// Routes Renderer - Renders all routes with role protection
// ============================================================================
const RoutesRenderer = () => {
  return (
    <Routes>
      {/* Root redirect - redirect to role-based dashboard */}
      <Route path="/" element={<RootRedirect />} />

      {/* Protected routes - render Route directly with protected element */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedElement
              element={route.element}
              allowedRoles={route.allowedRoles}
            />
          }
        />
      ))}

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <RoleProvider>
            <AppShell>
              <RoutesRenderer />
            </AppShell>
          </RoleProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
