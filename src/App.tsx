import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/context/RoleContext";
import { AppShell } from "@/components/layout/AppShell";

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

// Club pages
import ClubOverview from "./pages/club/ClubOverview";
import Players from "./pages/club/Players";
import ECard from "./pages/club/ECard";
import Roster from "./pages/club/Roster";
import MatchDay from "./pages/club/MatchDay";
import MatchHistory from "./pages/club/MatchHistory";
import ClubFinancial from "./pages/club/ClubFinancial";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
              {/* Club */}
              <Route path="/club/overview" element={<ClubOverview />} />
              <Route path="/club/players" element={<Players />} />
              <Route path="/club/ecard" element={<ECard />} />
              <Route path="/club/roster" element={<Roster />} />
              <Route path="/club/match-day" element={<MatchDay />} />
              <Route path="/club/match-history" element={<MatchHistory />} />
              <Route path="/club/financial" element={<ClubFinancial />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
