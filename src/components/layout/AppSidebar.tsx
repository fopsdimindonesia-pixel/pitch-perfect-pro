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
} from "lucide-react";
import { cn } from "@/lib/utils";

const ownerNav = [
  { group: "Platform", items: [
    { title: "Overview", url: "/owner/overview", icon: LayoutDashboard },
    { title: "EO Management", url: "/owner/eo-management", icon: Building2 },
    { title: "Club Management", url: "/owner/club-management", icon: Shield },
    { title: "Financial", url: "/owner/financial", icon: CreditCard },
  ]},
  { group: "System", items: [
    { title: "Audit Log", url: "/owner/audit-log", icon: ScrollText },
    { title: "Config & RBAC", url: "/owner/config", icon: Settings },
  ]},
];

const eoNav = [
  { group: "Competition", items: [
    { title: "Overview", url: "/eo/overview", icon: LayoutDashboard },
    { title: "Competitions", url: "/eo/competitions", icon: Trophy },
    { title: "Club Registration", url: "/eo/registrations", icon: UserCheck },
  ]},
  { group: "Match Ops", items: [
    { title: "Schedule", url: "/eo/schedule", icon: Calendar },
    { title: "Match Sheet", url: "/eo/match-sheet", icon: ClipboardList },
    { title: "Standings", url: "/eo/standings", icon: ListOrdered },
    { title: "Reports", url: "/eo/reports", icon: BarChart3 },
  ]},
];

const clubNav = [
  { group: "Club", items: [
    { title: "Overview", url: "/club/overview", icon: LayoutDashboard },
    { title: "Players", url: "/club/players", icon: Users },
    { title: "E-Card (QR)", url: "/club/ecard", icon: QrCode },
  ]},
  { group: "Competition", items: [
    { title: "Roster", url: "/club/roster", icon: UserPlus },
    { title: "Match Day", url: "/club/match-day", icon: Swords },
    { title: "Match History", url: "/club/match-history", icon: History },
  ]},
  { group: "Financial", items: [
    { title: "Financial", url: "/club/financial", icon: Wallet },
  ]},
];

const navMap = { owner: ownerNav, eo: eoNav, club: clubNav };

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
  };
  const roleLabels: Record<string, string> = {
    owner: "Owner",
    eo: "Event Organizer",
    club: "Club",
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
              <p className="text-sidebar-foreground font-semibold text-sm leading-tight">FootballOS</p>
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
