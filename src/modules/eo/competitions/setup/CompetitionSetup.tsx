import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, AlertCircle, Plus, Edit2, Trash2, Save } from "lucide-react";
import { validateCompetitionForm, getFieldError, ValidationError } from "@/lib/validation";
import { useCompetition, type Category } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

// ─── Create Competition Stepper ─────────────────────────────────────────────
const stepLabels = ["Info Dasar", "Format", "Kelompok Umur", "Biaya & Tanggal", "Review"];
const formats = [
  { value: "League", label: "Liga", desc: "Semua lawan semua, sistem poin" },
  { value: "Knockout", label: "Gugur", desc: "Kalah langsung tersingkir" },
  { value: "Group+KO", label: "Grup + Gugur", desc: "Fase grup dilanjut knockout" },
];
const ageGroups = ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "Open"];

function CreateTab() {
  const navigate = useNavigate();
  const { addCompetition } = useCompetition();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [form, setForm] = useState({ name: "", description: "", format: "", ageGroup: "", registrationFee: "", startDate: "", endDate: "" });

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((err) => err.filter((e) => e.field !== k));
  };

  const handleNext = () => {
    const validation = validateCompetitionForm(form);
    if (!validation.isValid) { setErrors(validation.errors); return; }
    setErrors([]);
    if (step === stepLabels.length - 1) {
      addCompetition({ name: form.name, description: form.description, format: form.format, ageGroup: form.ageGroup, registrationFee: Number(form.registrationFee), startDate: form.startDate, endDate: form.endDate });
      navigate("/eo/competition/setup");
    } else {
      setStep((s) => s + 1);
    }
  };

  const canNext = [form.name.length > 2, !!form.format, !!form.ageGroup, !!form.registrationFee && !!form.startDate, true][step];

  return (
    <div className="space-y-5">
      {/* Stepper */}
      <div className="flex items-center gap-1">
        {stepLabels.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all", i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground")}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={cn("text-xs hidden sm:block truncate", i === step ? "text-foreground font-medium" : "text-muted-foreground")}>{s}</span>
            {i < stepLabels.length - 1 && <div className={cn("h-px flex-1 mx-1", i < step ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">{stepLabels[step]}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">{errors.map((e) => <li key={e.field}>{e.message}</li>)}</ul>
              </AlertDescription>
            </Alert>
          )}

          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label className="text-sm">Nama Kompetisi *</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="cth. Liga Makassar U13 2024" className={getFieldError(errors, "name") ? "border-destructive" : ""} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Deskripsi</Label>
                <Input value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Deskripsi singkat kompetisi..." />
              </div>
            </>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formats.map((f) => (
                <button key={f.value} onClick={() => update("format", f.value)} className={cn("rounded-lg border-2 p-4 text-left transition-all hover:border-primary", form.format === f.value ? "border-primary bg-primary/5" : "border-border")}>
                  <p className="font-semibold text-sm">{f.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((ag) => (
                <button key={ag} onClick={() => update("ageGroup", ag)} className={cn("px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-primary", form.ageGroup === ag ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background")}>{ag}</button>
              ))}
            </div>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label className="text-sm">Biaya Registrasi (Rp) *</Label>
                <Input type="number" value={form.registrationFee} onChange={(e) => update("registrationFee", e.target.value)} placeholder="500000" className={getFieldError(errors, "registrationFee") ? "border-destructive" : ""} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Mulai *</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className={getFieldError(errors, "startDate") ? "border-destructive" : ""} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Selesai</Label>
                  <Input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Review data kompetisi:</p>
              {[["Nama", form.name], ["Format", form.format], ["Kelompok Umur", form.ageGroup], ["Biaya", `Rp ${Number(form.registrationFee).toLocaleString("id-ID")}`], ["Mulai", form.startDate], ["Selesai", form.endDate || "—"]].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-border text-sm last:border-0">
                  <span className="text-muted-foreground">{l}</span><span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => step > 0 ? setStep((s) => s - 1) : null} disabled={step === 0}>{step === 0 ? "—" : "Kembali"}</Button>
        <Button size="sm" disabled={!canNext} onClick={handleNext} className="gap-1">
          {step === stepLabels.length - 1 ? "Simpan Kompetisi" : "Lanjut"}
          {step < stepLabels.length - 1 && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

// ─── Profile Tab ────────────────────────────────────────────────────────────
function ProfileTab() {
  const { activeCompetition, matches, registrations } = useCompetition();
  if (!activeCompetition) return <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi terlebih dahulu</Card>;

  const statusColor: Record<string, string> = { Active: "bg-primary/10 text-primary", Draft: "bg-secondary text-muted-foreground", Finished: "bg-muted text-muted-foreground" };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Format", value: `${activeCompetition.format} · ${activeCompetition.ageGroup}` },
          { label: "Tim Terdaftar", value: registrations.length },
          { label: "Pertandingan", value: matches.length },
          { label: "Status", value: <Badge className={statusColor[activeCompetition.status]}>{activeCompetition.status}</Badge> },
        ].map((item) => (
          <Card key={item.label} className="p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <div className="text-lg font-bold mt-1">{item.value}</div>
          </Card>
        ))}
      </div>
      <Card className="p-5 space-y-3">
        <div><Label className="text-sm font-medium">Deskripsi</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.description}</p></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label className="text-sm font-medium">Tanggal Mulai</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.startDate}</p></div>
          <div><Label className="text-sm font-medium">Tanggal Selesai</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.endDate}</p></div>
        </div>
        <div><Label className="text-sm font-medium">Biaya Registrasi</Label><p className="text-sm text-muted-foreground mt-1">Rp {activeCompetition.registrationFee.toLocaleString('id-ID')}</p></div>
      </Card>
    </div>
  );
}

// ─── Categories Tab ─────────────────────────────────────────────────────────
function CategoriesTab() {
  const { activeCompetition, competitionConfig, updateConfig } = useCompetition();
  const [newName, setNewName] = useState("");
  if (!activeCompetition) return <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi terlebih dahulu</Card>;

  const addCategory = () => {
    if (!newName.trim()) return;
    const cat: Category = { id: `cat-${Date.now()}`, name: newName.trim(), maxTeams: 16, maxPlayers: 25, status: 'Active' };
    updateConfig({ categories: [...competitionConfig.categories, cat] });
    setNewName("");
  };

  const removeCategory = (id: string) => {
    updateConfig({ categories: competitionConfig.categories.filter((c) => c.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nama kategori baru (cth. U15)" className="max-w-xs" />
        <Button size="sm" onClick={addCategory} className="gap-1"><Plus className="w-4 h-4" />Tambah</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                <th className="px-4 py-3 text-left font-semibold">Maks Tim</th>
                <th className="px-4 py-3 text-left font-semibold">Maks Pemain</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {competitionConfig.categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3">{cat.maxTeams}</td>
                  <td className="px-4 py-3">{cat.maxPlayers}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{cat.status}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => removeCategory(cat.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {competitionConfig.categories.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Belum ada kategori</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── Rules Tab ──────────────────────────────────────────────────────────────
function RulesTab() {
  const { activeCompetition, competitionConfig, updateConfig } = useCompetition();
  if (!activeCompetition) return <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi terlebih dahulu</Card>;

  const { rules } = competitionConfig;
  const setRule = (key: keyof typeof rules, value: string) => {
    updateConfig({ rules: { ...rules, [key]: value } });
  };

  return (
    <Card>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="border-b rounded-none w-full justify-start bg-muted/50 h-auto p-0">
          <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Umum</TabsTrigger>
          <TabsTrigger value="match" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Pertandingan</TabsTrigger>
          <TabsTrigger value="discipline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Disiplin</TabsTrigger>
        </TabsList>
        {(["general", "match", "discipline"] as const).map((key) => (
          <TabsContent key={key} value={key} className="p-5 space-y-3">
            <p className="text-sm text-muted-foreground">Peraturan untuk: {activeCompetition.name}</p>
            <Textarea value={rules[key]} onChange={(e) => setRule(key, e.target.value)} className="min-h-48 font-mono text-sm" />
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

// ─── Eligibility Tab ────────────────────────────────────────────────────────
function EligibilityTab() {
  const { activeCompetition, competitionConfig, updateConfig } = useCompetition();
  if (!activeCompetition) return <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi terlebih dahulu</Card>;

  const { eligibility } = competitionConfig;
  const setElig = (partial: Partial<typeof eligibility>) => {
    updateConfig({ eligibility: { ...eligibility, ...partial } });
  };

  return (
    <Card className="p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-sm mb-3">Persyaratan Usia</h3>
        <div className="flex items-center gap-3">
          <Label className="text-sm">Usia Maksimal</Label>
          <Input type="number" value={eligibility.maxAge} onChange={(e) => setElig({ maxAge: Number(e.target.value) })} className="w-24" />
          <span className="text-sm text-muted-foreground">tahun</span>
        </div>
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input type="checkbox" checked={eligibility.allowExceptions} onChange={(e) => setElig({ allowExceptions: e.target.checked })} className="w-4 h-4 rounded" />
          <span className="text-sm">Izinkan pengecualian usia dengan persetujuan tertulis</span>
        </label>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-semibold text-sm mb-3">Persyaratan Pendaftaran</h3>
        <div className="space-y-2 mb-4">
          <Label className="text-sm">Deadline Pendaftaran</Label>
          <Input type="date" value={eligibility.deadline} onChange={(e) => setElig({ deadline: e.target.value })} className="max-w-xs" />
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={eligibility.requireBirthCert} onChange={(e) => setElig({ requireBirthCert: e.target.checked })} className="w-4 h-4 rounded" />
            <span className="text-sm">Wajib akte kelahiran untuk verifikasi usia</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={eligibility.requireConsent} onChange={(e) => setElig({ requireConsent: e.target.checked })} className="w-4 h-4 rounded" />
            <span className="text-sm">Wajib persetujuan orang tua untuk pemain U-18</span>
          </label>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Setup Page ────────────────────────────────────────────────────────
export default function CompetitionSetup() {
  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Competition setup">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Competition Setup</h1>
        <p className="text-muted-foreground text-sm mt-1">Kelola seluruh pengaturan kompetisi dalam satu halaman.</p>
      </div>

      <CompetitionSwitcher />

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full justify-start bg-muted/50 h-auto p-0 rounded-none border-b">
          <TabsTrigger value="create" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Buat Baru</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Profil</TabsTrigger>
          <TabsTrigger value="categories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Kategori</TabsTrigger>
          <TabsTrigger value="rules" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Peraturan</TabsTrigger>
          <TabsTrigger value="eligibility" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Kelayakan</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6"><CreateTab /></TabsContent>
        <TabsContent value="profile" className="mt-6"><ProfileTab /></TabsContent>
        <TabsContent value="categories" className="mt-6"><CategoriesTab /></TabsContent>
        <TabsContent value="rules" className="mt-6"><RulesTab /></TabsContent>
        <TabsContent value="eligibility" className="mt-6"><EligibilityTab /></TabsContent>
      </Tabs>
    </div>
  );
}
