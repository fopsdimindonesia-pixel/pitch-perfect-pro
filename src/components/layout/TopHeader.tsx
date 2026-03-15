import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRole } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Medal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Role } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const roleMeta: Record<Role, { label: string; color: string; home: string; tenant: string }> = {
  owner: { label: "Owner", color: "bg-gold/20 text-gold-foreground border-gold/30", home: "/owner/overview", tenant: "Platform Admin" },
  eo: { label: "Event Organizer", color: "bg-primary/10 text-primary border-primary/20", home: "/eo/overview", tenant: "PSSI Makassar" },
  club: { label: "Club", color: "bg-navy/10 text-navy border-navy/20", home: "/club/overview", tenant: "SSB Garuda Muda" },
};

export function TopHeader() {
  const { role, setRole, tenantName } = useRole();
  const navigate = useNavigate();
  const meta = roleMeta[role];

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    navigate(roleMeta[newRole].home);
  };

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-30">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="flex items-center gap-2 flex-1">
        <Medal className="w-4 h-4 text-primary hidden sm:block" />
        <span className="font-semibold text-sm text-foreground hidden sm:block">FootballOS</span>
        <span className="text-muted-foreground/50 hidden sm:block">·</span>
        <span className="text-sm text-muted-foreground truncate">{tenantName}</span>
      </div>

      {/* Role Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn("gap-2 text-xs h-8 border", meta.color)}>
            <span className="hidden sm:inline">{meta.label}</span>
            <span className="sm:hidden">{meta.label.split(" ")[0]}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role (Demo)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(["owner", "eo", "club"] as Role[]).map((r) => (
            <DropdownMenuItem key={r} onClick={() => switchRole(r)} className={cn("gap-2 cursor-pointer", role === r && "bg-accent")}>
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0", r === "owner" ? "bg-gold" : r === "eo" ? "bg-primary" : "bg-navy")} />
              <div>
                <p className="text-sm font-medium">{roleMeta[r].label}</p>
                <p className="text-xs text-muted-foreground">{roleMeta[r].tenant}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notification */}
      <Button variant="ghost" size="icon" className="relative w-8 h-8 text-muted-foreground hover:text-foreground">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-live" />
      </Button>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 h-8 text-xs font-medium">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-[10px] font-bold">A</span>
            </div>
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-destructive">Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
