import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  Check, ChevronRight, AlertCircle, Plus, Trash2, Send,
  ChevronLeft, ArrowRight, Lock, Unlock, Play, Archive, Flag,
} from "lucide-react";
import { validateCompetitionForm, getFieldError, ValidationError } from "@/lib/validation";
import {
  useCompetition,
  type Category, type CompetitionStatus,
  STATUS_LABELS, STATUS_COLORS, STATUS_TRANSITIONS,
} from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

// ─── Status Lifecycle Bar ───────────────────────────────────────────────────
const LIFECYCLE_STEPS: { status: CompetitionStatus; icon: React.ElementType }[] = [
  { status: 'draft', icon: Flag },
  { status: 'registration_open', icon: Unlock },
  { status: 'registration_closed', icon: Lock },
  { status: 'active', icon: Play },
  { status: 'completed', icon: Check },
  { status: 'archived', icon: Archive },
];

interface ChecklistItem {
  label: string;
  passed: boolean;
  description: string;
}

function usePrePublishChecklist(): ChecklistItem[] {
  const { activeCompetition, competitionConfig } = useCompetition();
  if (!activeCompetition || activeCompetition.status !== 'draft') return [];

  const hasCategories = competitionConfig.categories.length >= 1;
  const hasGeneralRules = competitionConfig.rules.general.trim().length > 10;
  const hasMatchRules = competitionConfig.rules.match.trim().length > 10;
  const hasDisciplineRules = competitionConfig.rules.discipline.trim().length > 10;
  const hasStartDate = !!activeCompetition.startDate;
  const hasEndDate = !!activeCompetition.endDate;

  return [
    { label: 'Minimal 1 kategori', passed: hasCategories, description: 'Tambahkan kategori di tab Kategori' },
    { label: 'Peraturan umum terisi', passed: hasGeneralRules, description: 'Isi peraturan umum di tab Peraturan' },
    { label: 'Peraturan pertandingan terisi', passed: hasMatchRules, description: 'Isi peraturan pertandingan di tab Peraturan' },
    { label: 'Peraturan disiplin terisi', passed: hasDisciplineRules, description: 'Isi peraturan disiplin di tab Peraturan' },
    { label: 'Tanggal mulai diatur', passed: hasStartDate, description: 'Atur tanggal mulai di tab Profil' },
    { label: 'Tanggal selesai diatur', passed: hasEndDate, description: 'Atur tanggal selesai di tab Profil' },
  ];
}

function StatusLifecycleBar() {
  const { activeCompetition, transitionStatus } = useCompetition();
  const [showChecklist, setShowChecklist] = useState(false);
  const checklist = usePrePublishChecklist();
  if (!activeCompetition) return null;

  const currentIdx = LIFECYCLE_STEPS.findIndex((s) => s.status === activeCompetition.status);
  const nextStatuses = STATUS_TRANSITIONS[activeCompetition.status];
  const allChecksPassed = checklist.length === 0 || checklist.every((c) => c.passed);
  const isDraftToOpen = activeCompetition.status === 'draft' && nextStatuses[0] === 'registration_open';

  const handleTransition = () => {
    if (isDraftToOpen && !allChecksPassed) {
      setShowChecklist(true);
      return;
    }
    transitionStatus(nextStatuses[0]);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Status Kompetisi</h3>
          <Badge className={cn("text-xs", STATUS_COLORS[activeCompetition.status])}>
            {STATUS_LABELS[activeCompetition.status]}
          </Badge>
        </div>
        {nextStatuses.length > 0 && (
          <Button
            size="sm"
            onClick={handleTransition}
            className="gap-1.5 text-xs"
            variant={isDraftToOpen && !allChecksPassed ? 'outline' : 'default'}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            {STATUS_LABELS[nextStatuses[0]]}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-0.5">
        {LIFECYCLE_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={step.status} className="flex items-center gap-0.5 flex-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all text-xs",
                isPast && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isPast && !isCurrent && "bg-muted text-muted-foreground",
              )}>
                {isPast ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className={cn(
                "text-[10px] hidden lg:block truncate",
                isCurrent ? "text-foreground font-medium" : "text-muted-foreground",
              )}>
                {STATUS_LABELS[step.status]}
              </span>
              {i < LIFECYCLE_STEPS.length - 1 && (
                <div className={cn("h-px flex-1 mx-1", isPast ? "bg-primary" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Pre-publish Checklist */}
      {isDraftToOpen && showChecklist && (
        <div className="mt-4 border border-border rounded-lg p-4 bg-muted/30">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-chart-4" />
            Checklist Sebelum Buka Registrasi
          </h4>
          <div className="space-y-2">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  item.passed ? "bg-chart-2/15 text-chart-2" : "bg-destructive/15 text-destructive"
                )}>
                  {item.passed ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                </div>
                <div>
                  <span className={cn(item.passed ? "text-muted-foreground line-through" : "text-foreground font-medium")}>
                    {item.label}
                  </span>
                  {!item.passed && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {allChecksPassed && (
            <Button size="sm" className="mt-4 w-full gap-1.5" onClick={() => { transitionStatus(nextStatuses[0]); setShowChecklist(false); }}>
              <Send className="w-3.5 h-3.5" />
              Buka Registrasi Sekarang
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

// ─── Create Competition Stepper (new flow) ──────────────────────────────────
const CREATION_STEPS = ["Info Dasar", "Musim", "Kategori", "Kelompok Umur", "Peraturan", "Review"];

const FORMATS = [
  { value: "League", label: "Liga", desc: "Semua lawan semua, sistem poin" },
  { value: "Knockout", label: "Gugur", desc: "Kalah langsung tersingkir" },
  { value: "Group+KO", label: "Grup + Gugur", desc: "Fase grup dilanjut knockout" },
];

const AGE_GROUPS = ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "Open"];

function getCurrentSeason(): string {
  const y = new Date().getFullYear();
  return `${y}/${y + 1}`;
}

const SEASONS = (() => {
  const y = new Date().getFullYear();
  return [`${y - 1}/${y}`, `${y}/${y + 1}`, `${y + 1}/${y + 2}`];
})();

interface CreateForm {
  name: string;
  description: string;
  format: string;
  season: string;
  ageGroup: string;
  registrationFee: string;
  startDate: string;
  endDate: string;
  rulesGeneral: string;
  rulesMatch: string;
  rulesDiscipline: string;
}

function CreateTab() {
  const { addCompetition, updateConfig, setActiveCompetitionId } = useCompetition();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState<CreateForm>({
    name: "", description: "", format: "", season: getCurrentSeason(),
    ageGroup: "", registrationFee: "", startDate: "", endDate: "",
    rulesGeneral: "", rulesMatch: "", rulesDiscipline: "",
  });

  const update = (k: keyof CreateForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((err) => err.filter((e) => e.field !== k));
  };

  const canNext = [
    form.name.length > 2 && !!form.format, // step 0: info + format
    !!form.season,                           // step 1: season
    true,                                    // step 2: category (optional, defaults auto)
    !!form.ageGroup,                         // step 3: age group
    true,                                    // step 4: rules (optional)
    true,                                    // step 5: review
  ][step];

  const handleNext = () => {
    // Only validate on final step
    if (step === CREATION_STEPS.length - 1) {
      const validation = validateCompetitionForm({
        name: form.name, format: form.format, ageGroup: form.ageGroup,
        registrationFee: form.registrationFee || "0", startDate: form.startDate || new Date().toISOString().split('T')[0],
      });
      if (!validation.isValid) { setErrors(validation.errors); return; }

      addCompetition({
        name: form.name, description: form.description, format: form.format,
        season: form.season, ageGroup: form.ageGroup,
        registrationFee: Number(form.registrationFee) || 0,
        startDate: form.startDate, endDate: form.endDate,
      });

      setCreated(true);
      return;
    }
    setStep((s) => s + 1);
  };

  if (created) {
    return (
      <Card className="p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold">Kompetisi Berhasil Dibuat!</h3>
        <p className="text-sm text-muted-foreground">
          <strong>{form.name}</strong> telah dibuat sebagai <Badge className={STATUS_COLORS.draft}>{STATUS_LABELS.draft}</Badge>.
          Lanjutkan mengatur detail di tab lainnya, lalu ubah status untuk memulai.
        </p>
        <Button size="sm" onClick={() => { setCreated(false); setStep(0); setForm({ ...form, name: "", description: "" }); }}>
          Buat Kompetisi Lagi
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stepper */}
      <div className="flex items-center gap-0.5">
        {CREATION_STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-0.5 flex-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all",
              i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground",
            )}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={cn("text-[10px] hidden md:block truncate", i === step ? "text-foreground font-medium" : "text-muted-foreground")}>{s}</span>
            {i < CREATION_STEPS.length - 1 && <div className={cn("h-px flex-1 mx-0.5", i < step ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">{CREATION_STEPS[step]}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">{errors.map((e) => <li key={e.field}>{e.message}</li>)}</ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Step 0: Info Dasar + Format */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Nama Kompetisi *</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="cth. Liga Makassar U13 2024" className={getFieldError(errors, "name") ? "border-destructive" : ""} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Deskripsi</Label>
                <Input value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Deskripsi singkat kompetisi..." />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Format Kompetisi *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FORMATS.map((f) => (
                    <button key={f.value} onClick={() => update("format", f.value)} className={cn("rounded-lg border-2 p-4 text-left transition-all hover:border-primary", form.format === f.value ? "border-primary bg-primary/5" : "border-border")}>
                      <p className="font-semibold text-sm">{f.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Season */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Pilih musim kompetisi</p>
              <div className="grid grid-cols-3 gap-3">
                {SEASONS.map((s) => (
                  <button key={s} onClick={() => update("season", s)} className={cn("rounded-lg border-2 p-4 text-center transition-all hover:border-primary", form.season === s ? "border-primary bg-primary/5" : "border-border")}>
                    <p className="font-bold text-lg">{s}</p>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Mulai</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Selesai</Label>
                  <Input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Category + Fee */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Kategori akan otomatis dibuat berdasarkan kelompok umur. Anda bisa menambah kategori tambahan setelah kompetisi dibuat.</p>
              <div className="space-y-2">
                <Label className="text-sm">Biaya Registrasi (Rp)</Label>
                <Input type="number" value={form.registrationFee} onChange={(e) => update("registrationFee", e.target.value)} placeholder="500000" />
              </div>
            </div>
          )}

          {/* Step 3: Age Group */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Pilih kelompok umur untuk kompetisi ini</p>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUPS.map((ag) => (
                  <button key={ag} onClick={() => update("ageGroup", ag)} className={cn("px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all hover:border-primary", form.ageGroup === ag ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background")}>{ag}</button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Rules */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Atur peraturan dasar (bisa diedit nanti)</p>
              <Tabs defaultValue="general">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="general" className="text-xs">Umum</TabsTrigger>
                  <TabsTrigger value="match" className="text-xs">Pertandingan</TabsTrigger>
                  <TabsTrigger value="discipline" className="text-xs">Disiplin</TabsTrigger>
                </TabsList>
                <TabsContent value="general"><Textarea value={form.rulesGeneral} onChange={(e) => update("rulesGeneral", e.target.value)} placeholder="Peraturan umum kompetisi..." className="min-h-32 font-mono text-sm mt-2" /></TabsContent>
                <TabsContent value="match"><Textarea value={form.rulesMatch} onChange={(e) => update("rulesMatch", e.target.value)} placeholder="Peraturan pertandingan..." className="min-h-32 font-mono text-sm mt-2" /></TabsContent>
                <TabsContent value="discipline"><Textarea value={form.rulesDiscipline} onChange={(e) => update("rulesDiscipline", e.target.value)} placeholder="Peraturan disiplin..." className="min-h-32 font-mono text-sm mt-2" /></TabsContent>
              </Tabs>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Review data kompetisi sebelum menyimpan:</p>
              {[
                ["Nama", form.name],
                ["Format", FORMATS.find((f) => f.value === form.format)?.label ?? form.format],
                ["Musim", form.season],
                ["Kelompok Umur", form.ageGroup],
                ["Biaya Registrasi", form.registrationFee ? `Rp ${Number(form.registrationFee).toLocaleString("id-ID")}` : "Gratis"],
                ["Periode", `${form.startDate || "—"} s/d ${form.endDate || "—"}`],
                ["Status Awal", "Draft"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-border text-sm last:border-0">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-1">
          <ChevronLeft className="w-4 h-4" />Kembali
        </Button>
        <Button size="sm" disabled={!canNext} onClick={handleNext} className="gap-1">
          {step === CREATION_STEPS.length - 1 ? <><Send className="w-4 h-4" />Simpan sebagai Draft</> : <>Lanjut<ChevronRight className="w-4 h-4" /></>}
        </Button>
      </div>
    </div>
  );
}

// ─── Profile Tab ────────────────────────────────────────────────────────────
function ProfileTab() {
  const { activeCompetition, matches, registrations } = useCompetition();
  if (!activeCompetition) return <EmptyState />;

  return (
    <div className="space-y-4">
      <StatusLifecycleBar />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Format", value: `${activeCompetition.format} · ${activeCompetition.ageGroup}` },
          { label: "Musim", value: activeCompetition.season },
          { label: "Tim Terdaftar", value: registrations.length },
          { label: "Pertandingan", value: matches.length },
        ].map((item) => (
          <Card key={item.label} className="p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <div className="text-lg font-bold mt-1">{item.value}</div>
          </Card>
        ))}
      </div>
      <Card className="p-5 space-y-3">
        <div><Label className="text-sm font-medium">Deskripsi</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.description || "—"}</p></div>
        <div className="grid grid-cols-3 gap-4">
          <div><Label className="text-sm font-medium">Tanggal Mulai</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.startDate || "—"}</p></div>
          <div><Label className="text-sm font-medium">Tanggal Selesai</Label><p className="text-sm text-muted-foreground mt-1">{activeCompetition.endDate || "—"}</p></div>
          <div><Label className="text-sm font-medium">Biaya Registrasi</Label><p className="text-sm text-muted-foreground mt-1">Rp {activeCompetition.registrationFee.toLocaleString('id-ID')}</p></div>
        </div>
      </Card>
    </div>
  );
}

// ─── Categories Tab ─────────────────────────────────────────────────────────
function CategoriesTab() {
  const { activeCompetition, competitionConfig, updateConfig } = useCompetition();
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  if (!activeCompetition) return <EmptyState />;

  const addCategory = () => {
    if (!newName.trim()) return;
    const cat: Category = { id: `cat-${Date.now()}`, name: newName.trim(), ageGroup: newAge || activeCompetition.ageGroup, maxTeams: 16, maxPlayers: 25, minRoster: 11, status: 'Active' };
    updateConfig({ categories: [...competitionConfig.categories, cat] });
    setNewName(""); setNewAge("");
  };

  const removeCategory = (id: string) => {
    updateConfig({ categories: competitionConfig.categories.filter((c) => c.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <div className="space-y-1">
          <Label className="text-xs">Nama Kategori</Label>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="cth. Divisi Utama" className="w-48" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Kelompok Umur</Label>
          <Input value={newAge} onChange={(e) => setNewAge(e.target.value)} placeholder={activeCompetition.ageGroup} className="w-24" />
        </div>
        <Button size="sm" onClick={addCategory} className="gap-1"><Plus className="w-4 h-4" />Tambah</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                <th className="px-4 py-3 text-left font-semibold">Umur</th>
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
                  <td className="px-4 py-3">{cat.ageGroup}</td>
                  <td className="px-4 py-3">{cat.maxTeams}</td>
                  <td className="px-4 py-3">{cat.maxPlayers}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{cat.status}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => removeCategory(cat.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {competitionConfig.categories.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Belum ada kategori</td></tr>
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
  if (!activeCompetition) return <EmptyState />;

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
  if (!activeCompetition) return <EmptyState />;

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

// ─── Empty State ────────────────────────────────────────────────────────────
function EmptyState() {
  return <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi terlebih dahulu atau buat kompetisi baru di tab "Buat Baru".</Card>;
}

// ─── Main Setup Page ────────────────────────────────────────────────────────
export default function CompetitionSetup() {
  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Competition setup">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Competition Setup</h1>
        <p className="text-muted-foreground text-sm mt-1">Buat, atur, dan kelola siklus hidup kompetisi.</p>
      </div>

      <CompetitionSwitcher />

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full justify-start bg-muted/50 h-auto p-0 rounded-none border-b">
          <TabsTrigger value="create" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs sm:text-sm">Buat Baru</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs sm:text-sm">Profil & Status</TabsTrigger>
          <TabsTrigger value="categories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs sm:text-sm">Kategori</TabsTrigger>
          <TabsTrigger value="rules" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs sm:text-sm">Peraturan</TabsTrigger>
          <TabsTrigger value="eligibility" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs sm:text-sm">Kelayakan</TabsTrigger>
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
