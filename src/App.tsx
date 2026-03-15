import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/context/RoleContext";
import { AppShell } from "@/components/layout/AppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Owner pages
import OwnerOverview from "./pages/owner/OwnerOverview";
import EOManagement from "./pages/owner/EOManagement";
import ClubManagement from "./pages/owner/ClubManagement";
import OwnerFinancial from "./pages/owner/OwnerFinancial";
import AuditLog from "./pages/owner/AuditLog";
import SystemConfig from "./pages/owner/SystemConfig";

// EO pages
import EOOverview from "./pages/eo/EOOverview";
import Competitions from "./pages/eo/Competitions";
import CreateCompetition from "./pages/eo/CreateCompetition";
import ClubRegistrations from "./pages/eo/ClubRegistrations";
import Schedule from "./pages/eo/Schedule";
import MatchSheet from "./pages/eo/MatchSheet";
import Standings from "./pages/eo/Standings";
import Reports from "./pages/eo/Reports";

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
import UserManagement from "./pages/competition/UserManagement";
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

// Club pages
import ClubOverview from "./pages/club/ClubOverview";
import Players from "./pages/club/Players";
import ECard from "./pages/club/ECard";
import Roster from "./pages/club/Roster";
import MatchDay from "./pages/club/MatchDay";
import MatchHistory from "./pages/club/MatchHistory";
import ClubFinancial from "./pages/club/ClubFinancial";
// Club Training pages
import TrainingSchedule from "./pages/club/training/TrainingSchedule";
import TrainingAttendance from "./pages/club/training/TrainingAttendance";
// Club Staff pages
import CoachManagement from "./pages/club/staff/CoachManagement";
import MedicalStaff from "./pages/club/staff/MedicalStaff";
// Club Analytics pages
import PlayerStatistics from "./pages/club/analytics/PlayerStatistics";

// Admin pages - Dashboard & Analytics
import PlatformDashboard from "./pages/admin/PlatformDashboard";
import GlobalAnalytics from "./pages/admin/GlobalAnalytics";
import RevenueAnalytics from "./pages/admin/RevenueAnalytics";

// Admin pages - Monitoring
import SystemMonitoring from "./pages/admin/SystemMonitoring";
import UserMonitoring from "./pages/admin/UserMonitoring";
import OrganizationMonitoring from "./pages/admin/OrganizationMonitoring";
import EventOrganizerManagement from "./pages/admin/EventOrganizerManagement";
import CompetitionMonitoring from "./pages/admin/CompetitionMonitoring";
import PlayerMonitoring from "./pages/admin/PlayerMonitoring";
import MatchMonitoring from "./pages/admin/MatchMonitoring";
import PerformanceMonitoring from "./pages/admin/PerformanceMonitoring";
import ServiceMonitoring from "./pages/admin/ServiceMonitoring";
import APIMonitoring from "./pages/admin/APIMonitoring";

// Admin pages - Platform Management
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";
import PlatformBilling from "./pages/admin/PlatformBilling";
import PlatformFeeSettings from "./pages/admin/PlatformFeeSettings";
import PaymentReconciliation from "./pages/admin/PaymentReconciliation";

// Admin pages - Configuration
import PlatformConfiguration from "./pages/admin/PlatformConfiguration";
import GlobalSettings from "./pages/admin/GlobalSettings";
import LocalizationSettings from "./pages/admin/LocalizationSettings";
import BrandingConfiguration from "./pages/admin/BrandingConfiguration";
import MaintenanceMode from "./pages/admin/MaintenanceMode";

// Admin pages - System Management
import SystemLogs from "./pages/admin/SystemLogs";
import SystemBackup from "./pages/admin/SystemBackup";
import SystemRestore from "./pages/admin/SystemRestore";
import DataExport from "./pages/admin/DataExport";
import DataImport from "./pages/admin/DataImport";
import FeatureFlagManagement from "./pages/admin/FeatureFlagManagement";

// Admin pages - Security & Compliance
import ErrorTracking from "./pages/admin/ErrorTracking";
import AccessLogs from "./pages/admin/AccessLogs";
import AdminActivityLog from "./pages/admin/AdminActivityLog";
import SecurityAlerts from "./pages/admin/SecurityAlerts";
import ComplianceDashboard from "./pages/admin/ComplianceDashboard";
import AuditReports from "./pages/admin/AuditReports";

// Admin pages - Developer Tools
import APIKeyManagement from "./pages/admin/APIKeyManagement";
import APIUsageAnalytics from "./pages/admin/APIUsageAnalytics";
import WebhookManagement from "./pages/admin/WebhookManagement";
import IntegrationSettings from "./pages/admin/IntegrationSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <RoleProvider>
            <AppShell>
              <Routes>
              <Route path="/" element={<Navigate to="/owner/overview" replace />} />
              {/* Owner */}
              <Route path="/owner/overview" element={<OwnerOverview />} />
              <Route path="/owner/eo-management" element={<EOManagement />} />
              <Route path="/owner/club-management" element={<ClubManagement />} />
              <Route path="/owner/financial" element={<OwnerFinancial />} />
              <Route path="/owner/audit-log" element={<AuditLog />} />
              <Route path="/owner/config" element={<SystemConfig />} />
              {/* EO */}
              <Route path="/eo/overview" element={<EOOverview />} />
              <Route path="/eo/competitions" element={<Competitions />} />
              <Route path="/eo/competitions/create" element={<CreateCompetition />} />
              <Route path="/eo/registrations" element={<ClubRegistrations />} />
              <Route path="/eo/schedule" element={<Schedule />} />
              <Route path="/eo/match-sheet" element={<MatchSheet />} />
              <Route path="/eo/standings" element={<Standings />} />
              <Route path="/eo/reports" element={<Reports />} />
              {/* Match Management */}
              <Route path="/match/scheduler" element={<MatchScheduler />} />
              <Route path="/match/referees" element={<RefereeAssignment />} />
              <Route path="/match/lineup" element={<LineupSubmission />} />
              <Route path="/match/events" element={<MatchEvents />} />
              <Route path="/match/timeline" element={<MatchTimeline />} />
              <Route path="/match/statistics" element={<MatchStatistics />} />
              <Route path="/match/ratings" element={<PlayerRatings />} />
              <Route path="/match/tactics" element={<TacticalAnalysis />} />
              <Route path="/match/archive" element={<MatchArchive />} />
              {/* Competition */}
              <Route path="/competition/overview" element={<CompetitionOverview />} />
              <Route path="/competition/setup" element={<CompetitionSetup />} />
              <Route path="/competition/details" element={<CompetitionDetails />} />
              <Route path="/competition/users" element={<UserManagement />} />
              <Route path="/competition/rules" element={<CompetitionRules />} />
              <Route path="/competition/registration" element={<ParticipantRegistration />} />
              <Route path="/competition/waivers" element={<WaiverManagement />} />
              <Route path="/competition/matches" element={<MatchManagement />} />
              <Route path="/competition/referees" element={<CompetitionRefereeAssignment />} />
              <Route path="/competition/scoring" element={<ScoringSystem />} />
              <Route path="/competition/prizes" element={<PrizePrizeDistribution />} />
              <Route path="/competition/documents" element={<DocumentManagement />} />
              <Route path="/competition/budget" element={<CompetitionBudget />} />
              <Route path="/competition/approval" element={<CompetitionApproval />} />
              <Route path="/competition/announcements" element={<Announcement />} />
              <Route path="/competition/reports" element={<CompetitionReports />} />
              <Route path="/competition/volunteers" element={<VolunteerManagement />} />
              <Route path="/competition/venues" element={<VenueManagement />} />
              <Route path="/competition/hierarchy" element={<OrganizationHierarchy />} />
              <Route path="/competition/status" element={<RegistrationStatus />} />
              {/* Club */}
              <Route path="/club/overview" element={<ClubOverview />} />
              <Route path="/club/players" element={<Players />} />
              <Route path="/club/ecard" element={<ECard />} />
              <Route path="/club/roster" element={<Roster />} />
              <Route path="/club/match-day" element={<MatchDay />} />
              <Route path="/club/match-history" element={<MatchHistory />} />
              <Route path="/club/financial" element={<ClubFinancial />} />
              {/* Club Training routes */}
              <Route path="/club/training/schedule" element={<TrainingSchedule />} />
              <Route path="/club/training/attendance" element={<TrainingAttendance />} />
              {/* Club Staff routes */}
              <Route path="/club/staff/coaches" element={<CoachManagement />} />
              <Route path="/club/staff/medical" element={<MedicalStaff />} />
              {/* Club Analytics routes */}
              <Route path="/club/analytics/player-statistics" element={<PlayerStatistics />} />
              {/* Admin - Dashboard */}
              <Route path="/admin/dashboard" element={<PlatformDashboard />} />
              <Route path="/admin/analytics" element={<GlobalAnalytics />} />
              <Route path="/admin/revenue" element={<RevenueAnalytics />} />
              {/* Admin - Monitoring */}
              <Route path="/admin/system-monitoring" element={<SystemMonitoring />} />
              <Route path="/admin/user-monitoring" element={<UserMonitoring />} />
              <Route path="/admin/organization-monitoring" element={<OrganizationMonitoring />} />
              <Route path="/admin/eo-management" element={<EventOrganizerManagement />} />
              <Route path="/admin/competition-monitoring" element={<CompetitionMonitoring />} />
              <Route path="/admin/player-monitoring" element={<PlayerMonitoring />} />
              <Route path="/admin/match-monitoring" element={<MatchMonitoring />} />
              <Route path="/admin/performance-monitoring" element={<PerformanceMonitoring />} />
              <Route path="/admin/service-monitoring" element={<ServiceMonitoring />} />
              <Route path="/admin/api-monitoring" element={<APIMonitoring />} />
              {/* Admin - Platform Management */}
              <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
              <Route path="/admin/billing" element={<PlatformBilling />} />
              <Route path="/admin/fee-settings" element={<PlatformFeeSettings />} />
              <Route path="/admin/payment-reconciliation" element={<PaymentReconciliation />} />
              {/* Admin - Configuration */}
              <Route path="/admin/platform-config" element={<PlatformConfiguration />} />
              <Route path="/admin/global-settings" element={<GlobalSettings />} />
              <Route path="/admin/localization" element={<LocalizationSettings />} />
              <Route path="/admin/branding" element={<BrandingConfiguration />} />
              <Route path="/admin/maintenance" element={<MaintenanceMode />} />
              {/* Admin - System Management */}
              <Route path="/admin/logs" element={<SystemLogs />} />
              <Route path="/admin/backup" element={<SystemBackup />} />
              <Route path="/admin/restore" element={<SystemRestore />} />
              <Route path="/admin/data-export" element={<DataExport />} />
              <Route path="/admin/data-import" element={<DataImport />} />
              <Route path="/admin/feature-flags" element={<FeatureFlagManagement />} />
              {/* Admin - Security & Compliance */}
              <Route path="/admin/errors" element={<ErrorTracking />} />
              <Route path="/admin/access-logs" element={<AccessLogs />} />
              <Route path="/admin/admin-activity" element={<AdminActivityLog />} />
              <Route path="/admin/security-alerts" element={<SecurityAlerts />} />
              <Route path="/admin/compliance" element={<ComplianceDashboard />} />
              <Route path="/admin/audit-reports" element={<AuditReports />} />
              {/* Admin - Developer Tools */}
              <Route path="/admin/api-keys" element={<APIKeyManagement />} />
              <Route path="/admin/api-usage" element={<APIUsageAnalytics />} />
              <Route path="/admin/webhooks" element={<WebhookManagement />} />
              <Route path="/admin/integrations" element={<IntegrationSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </RoleProvider>
      </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
