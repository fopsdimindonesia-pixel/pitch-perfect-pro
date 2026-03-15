import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Settings, Key } from "lucide-react";

const roles = [
  { name: "Super Admin (Owner)", permissions: ["Manage EOs", "Manage Clubs", "View Financial", "Audit Log", "System Config"], color: "bg-gold/15 text-gold-foreground" },
  { name: "Event Organizer", permissions: ["Create Competition", "Approve Registration", "Manage Schedule", "Input Score", "View Reports"], color: "bg-primary/10 text-primary" },
  { name: "Club Manager", permissions: ["Manage Players", "Submit Lineup", "View Schedule", "View Standings"], color: "bg-navy/10 text-navy" },
  { name: "Referee", permissions: ["View Schedule", "Input Score", "Input Cards"], color: "bg-secondary text-secondary-foreground" },
];

const platformSettings = [
  { label: "Registrasi EO terbuka", description: "Izinkan EO baru mendaftar sendiri", enabled: true },
  { label: "Verifikasi otomatis pemain", description: "Verifikasi otomatis jika dokumen lengkap", enabled: false },
  { label: "E-Card QR aktif", description: "Aktifkan fitur cetak E-Card pemain", enabled: true },
  { label: "Notifikasi email", description: "Kirim email untuk setiap event penting", enabled: true },
  { label: "Mode maintenance", description: "Nonaktifkan akses platform untuk semua user", enabled: false },
];

export default function SystemConfig() {
  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="System configuration and access control">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Config & RBAC</h1>
        <p className="text-muted-foreground text-sm mt-1">Konfigurasi platform dan manajemen role akses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RBAC */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Role & Permission</CardTitle>
            </div>
            <CardDescription className="text-xs">Role-based access control untuk semua entitas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.map((role) => (
              <div key={role.name} className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs border-0 ${role.color}`}>{role.name}</Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">Edit</Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((p) => (
                    <span key={p} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Platform Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformSettings.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-4">
                  <div>
                    <Label className="text-sm font-medium">{s.label}</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                  <Switch defaultChecked={s.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">API Keys</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Production Key</p>
                  <p className="text-xs font-mono text-muted-foreground">fos_live_••••••••••••••••7f2a</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">Regenerate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Sandbox Key</p>
                  <p className="text-xs font-mono text-muted-foreground">fos_test_••••••••••••••••3c1d</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">Regenerate</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
