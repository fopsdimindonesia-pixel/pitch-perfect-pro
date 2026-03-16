import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, Users, Trophy, Calendar, ClipboardList, BarChart3,
  Settings, CreditCard, ScrollText, Building2, UserCheck, Medal,
  Swords, ListOrdered, FileText, Shield, Shirt, History, Wallet, UserPlus, QrCode,
  Monitor, MoreVertical, Zap, Lock, CheckSquare, Code, Key, Webhook, Palette,
  Activity, Archive, BarChart4, Target, Globe, ScanLine, IdCard, TrendingUp,
  Plus, Grid3X3, GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ownerNav = [
  { group: "Dashboard", items: [
    { title: "Dashboard", url: "/owner/dashboard", icon: LayoutDashboard },
    { title: "Overview", url: "/owner/overview", icon: BarChart3 },
  ]},
  { group: "Platform Management", items: [
    { title: "Configuration", url: "/owner/platform-management/configuration", icon: Settings },
    { title: "Settings", url: "/owner/platform-management/settings", icon: Settings },
    { title: "Features", url: "/owner/platform-management/features", icon: Zap },
    { title: "Branding", url: "/owner/platform-management/branding", icon: Palette },
    { title: "Integrations", url: "/owner/platform-management/integrations", icon: Code },
  ]},
  { group: "User Management", items: [
    { title: "Users", url: "/owner/users/management", icon: Users },
    { title: "Audit Log", url: "/owner/users/audit", icon: ScrollText },
  ]},
  { group: "Organizations", items: [
    { title: "Clubs", url: "/owner/organizations/clubs", icon: Building2 },
    { title: "Event Organizers", url: "/owner/organizations/event-organizers", icon: UserCheck },
    { title: "Monitoring", url: "/owner/organizations/monitoring", icon: Monitor },
  ]},
  { group: "Player Ecosystem", items: [
    { title: "Player Registry", url: "/player/registry", icon: Globe },
    { title: "E-Card (QR)", url: "/player/ecard", icon: IdCard },
    { title: "Verification", url: "/player/verification", icon: ScanLine },
    { title: "Player Stats", url: "/player/stats", icon: TrendingUp },
  ]},
  { group: "Competitions", items: [
    { title: "Monitoring", url: "/owner/competitions/monitoring", icon: Trophy },
    { title: "Match Data", url: "/owner/competitions/matches", icon: Swords },
  ]},
  { group: "Finance", items: [
    { title: "Dashboard", url: "/owner/finance/dashboard", icon: Wallet },
    { title: "Reconciliation", url: "/owner/finance/reconciliation", icon: CheckSquare },
    { title: "Billing", url: "/owner/finance/billing", icon: CreditCard },
  ]},
  { group: "Analytics", items: [
    { title: "Global", url: "/owner/analytics/global", icon: BarChart3 },
    { title: "Revenue", url: "/owner/analytics/revenue", icon: BarChart3 },
  ]},
  { group: "Infrastructure", items: [
    { title: "System Monitor", url: "/owner/infrastructure/system-monitoring", icon: Monitor },
    { title: "Performance", url: "/owner/infrastructure/performance", icon: Activity },
    { title: "Logs", url: "/owner/infrastructure/logs", icon: ScrollText },
    { title: "Backup", url: "/owner/infrastructure/backup", icon: Archive },
  ]},
  { group: "Security & Compliance", items: [
    { title: "Alerts", url: "/owner/security/alerts", icon: Lock },
    { title: "Reports", url: "/owner/security/reports", icon: FileText },
    { title: "Audit", url: "/owner/security/audit", icon: ScrollText },
  ]},
  { group: "Developer Tools", items: [
    { title: "API Keys", url: "/owner/developer-tools/api-keys", icon: Key },
    { title: "Webhooks", url: "/owner/developer-tools/webhooks", icon: Webhook },
  ]},
];

const eoNav = [
  { group: "Dashboard", items: [
    { title: "Overview", url: "/eo/overview", icon: LayoutDashboard },
    { title: "Competitions", url: "/eo/competitions", icon: Trophy },
  ]},
  { group: "Setup & Rules", items: [
    { title: "Create Competition", url: "/eo/competitions/create", icon: Plus },
    { title: "Competition Profile", url: "/eo/competition/profile", icon: Settings },
    { title: "Categories", url: "/eo/competition/categories", icon: ListOrdered },
    { title: "Rules", url: "/eo/competition/rules", icon: ScrollText },
    { title: "Eligibility", url: "/eo/competition/eligibility", icon: UserCheck },
  ]},
  { group: "Registration & Teams", items: [
    { title: "Club Registration", url: "/eo/registrations", icon: UserPlus },
    { title: "Approval", url: "/eo/competition/approval", icon: CheckSquare },
    { title: "Team Slots", url: "/eo/competition/slots", icon: Users },
    { title: "Group Allocation", url: "/eo/competition/groups", icon: Grid3X3 },
  ]},
  { group: "Match & Tools", items: [
    { title: "Schedule", url: "/eo/schedule", icon: Calendar },
    { title: "Match Sheet", url: "/eo/match-sheet", icon: ClipboardList },
    { title: "Fixture Generator", url: "/eo/competition/fixtures", icon: Swords },
    { title: "Bracket Builder", url: "/eo/competition/bracket", icon: GitBranch },
    { title: "Standings", url: "/eo/standings", icon: ListOrdered },
    { title: "Dashboard", url: "/eo/competition/dashboard", icon: BarChart3 },
  ]},
  { group: "Reports & Public", items: [
    { title: "Reports", url: "/eo/reports", icon: BarChart3 },
    { title: "Analytics", url: "/eo/competition/analytics", icon: TrendingUp },
    { title: "Documents", url: "/eo/competition/documents", icon: FileText },
    { title: "Awards", url: "/eo/competition/awards", icon: Medal },
    { title: "Public Page", url: "/eo/competition/public", icon: Globe },
    { title: "Public Standings", url: "/eo/competition/public-standings", icon: ListOrdered },
  ]},
  { group: "Match Management", items: [
    { title: "Digital Match Sheet", url: "/match/match-sheet", icon: ClipboardList },
    { title: "Event Recorder", url: "/match/event-recorder", icon: Activity },
    { title: "Live Scoreboard", url: "/match/live", icon: Zap },
    { title: "Referee Report", url: "/match/referee-report", icon: FileText },
    { title: "Match Stats", url: "/match/stats-dashboard", icon: BarChart3 },
  ]},
  { group: "Match Tools", items: [
    { title: "Match Scheduler", url: "/match/scheduler", icon: Calendar },
    { title: "Referee Assignment", url: "/match/referees", icon: UserCheck },
    { title: "Lineup", url: "/match/lineup", icon: Users },
    { title: "Timeline", url: "/match/timeline", icon: Activity },
    { title: "Player Ratings", url: "/match/ratings", icon: Target },
    { title: "Tactical Analysis", url: "/match/tactics", icon: BarChart4 },
    { title: "Archive", url: "/match/archive", icon: Archive },
  ]},
];

const playerEcosystemNav = [
  { group: "Player Ecosystem", items: [
    { title: "Player Registry", url: "/player/registry", icon: Globe },
    { title: "E-Card (QR)", url: "/player/ecard", icon: IdCard },
    { title: "Verification", url: "/player/verification", icon: ScanLine },
    { title: "Player Stats", url: "/player/stats", icon: TrendingUp },
  ]},
];

const clubNav = [
  { group: "Dashboard", items: [
    { title: "Overview", url: "/club/overview", icon: LayoutDashboard },
  ]},
  { group: "Squad Management", items: [
    { title: "Players", url: "/club/players", icon: Users },
    { title: "E-Card (QR)", url: "/club/ecard", icon: QrCode },
    { title: "Roster", url: "/club/roster", icon: UserPlus },
  ]},
  { group: "Match Management", items: [
    { title: "Match Day", url: "/club/match-day", icon: Swords },
    { title: "Match History", url: "/club/match-history", icon: History },
  ]},
  { group: "Training & Performance", items: [
    { title: "Training Schedule", url: "/club/training/schedule", icon: Calendar },
    { title: "Training Attendance", url: "/club/training/attendance", icon: CheckSquare },
    { title: "Player Statistics", url: "/club/analytics/player-statistics", icon: BarChart3 },
  ]},
  { group: "Staff Management", items: [
    { title: "Coaches", url: "/club/staff/coaches", icon: UserCheck },
    { title: "Medical Staff", url: "/club/staff/medical", icon: Shield },
  ]},
  { group: "Financial", items: [
    { title: "Financial Status", url: "/club/financial", icon: Wallet },
  ]},
];

const adminNav = ownerNav;

const navMap = {
  owner: ownerNav,
  eo: [...eoNav, ...playerEcosystemNav],
  club: [...clubNav, ...playerEcosystemNav],
  admin: adminNav,
};

export function AppSidebar() {
  const { role } = useRole();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const nav = navMap[role];

  const roleColors: Record<string, string> = {
    owner: "bg-gold text-gold-foreground",
    eo: "bg-primary text-primary-foreground",
    club: "bg-navy text-navy-foreground",
    admin: "bg-slate-600 text-white",
  };
  const roleLabels: Record<string, string> = {
    owner: "Owner",
    eo: "Event Organizer",
    club: "Club",
    admin: "System Admin",
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Medal className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sidebar-foreground font-semibold text-sm leading-tight">SoccerOS</p>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-semibold", roleColors[role])}>
                {roleLabels[role]}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {nav.map((group) => (
          <SidebarGroup key={group.group}>
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest px-4 py-2">
                {group.group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors mx-1",
                            collapsed && "justify-center px-2",
                          )}
                          activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                        >
                          <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-sidebar-primary")} />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
