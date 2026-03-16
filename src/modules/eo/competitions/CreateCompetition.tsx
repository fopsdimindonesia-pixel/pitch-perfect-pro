import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, AlertCircle } from "lucide-react";
import { validateCompetitionForm, getFieldError, ValidationError } from "@/lib/validation";

const steps = ["Info Dasar", "Format", "Kelompok Umur", "Biaya & Tanggal", "Review"];

const formats = [
  { value: "League", label: "Liga", desc: "Semua lawan semua, sistem poin" },
  { value: "Knockout", label: "Gugur", desc: "Kalah langsung tersingkir" },
  { value: "Group+KO", label: "Grup + Gugur", desc: "Fase grup dilanjut knockout" },
];

const ageGroups = ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "Open"];

export default function CreateCompetition() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    format: "",
    ageGroup: "",
    registrationFee: "",
    startDate: "",
    endDate: "",
  });

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    // Clear error for this field when user starts typing
    setErrors((err) => err.filter((e) => e.field !== k));
  };

  const validateStep = () => {
    const validation = validateCompetitionForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === steps.length - 1) {
        // Submit
        navigate("/eo/competitions");
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  const canNext = [
    form.name.length > 2,
    !!form.format,
    !!form.ageGroup,
    !!form.registrationFee && !!form.startDate,
    true,
  ][step];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl" role="main" aria-label="Create competition form">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Buat Kompetisi</h1>
        <p className="text-muted-foreground text-sm mt-1">Langkah demi langkah membuat kompetisi baru.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all",
              i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground",
            )}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={cn("text-xs hidden sm:block truncate", i === step ? "text-foreground font-medium" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <div className={cn("h-px flex-1 mx-1 transition-all", i < step ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">{steps[step]}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">Ada kesalahan dalam formulir:</p>
                  <ul className="list-disc list-inside text-sm">
                    {errors.map((err) => (
                      <li key={err.field}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label className="text-sm">Nama Kompetisi *</Label>
                <Input 
                  value={form.name} 
                  onChange={(e) => update("name", e.target.value)} 
                  placeholder="cth. Liga Makassar U13 2024"
                  className={getFieldError(errors, "name") ? "border-destructive" : ""}
                />
                {getFieldError(errors, "name") && (
                  <p className="text-xs text-destructive">{getFieldError(errors, "name")}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Deskripsi</Label>
                <Input 
                  value={form.description} 
                  onChange={(e) => update("description", e.target.value)} 
                  placeholder="Deskripsi singkat kompetisi..." 
                />
              </div>
            </>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formats.map((f) => (
                <button
                  key={f.value}
                  onClick={() => update("format", f.value)}
                  className={cn(
                    "rounded-lg border-2 p-4 text-left transition-all hover:border-primary",
                    form.format === f.value ? "border-primary bg-primary/5" : "border-border",
                  )}
                >
                  <p className="font-semibold text-sm">{f.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((ag) => (
                <button
                  key={ag}
                  onClick={() => update("ageGroup", ag)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-primary",
                    form.ageGroup === ag ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
                  )}
                >
                  {ag}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label className="text-sm">Biaya Registrasi (Rp) *</Label>
                <Input 
                  type="number" 
                  value={form.registrationFee} 
                  onChange={(e) => update("registrationFee", e.target.value)} 
                  placeholder="500000"
                  className={getFieldError(errors, "registrationFee") ? "border-destructive" : ""}
                />
                {getFieldError(errors, "registrationFee") && (
                  <p className="text-xs text-destructive">{getFieldError(errors, "registrationFee")}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Mulai *</Label>
                  <Input 
                    type="date" 
                    value={form.startDate} 
                    onChange={(e) => update("startDate", e.target.value)}
                    className={getFieldError(errors, "startDate") ? "border-destructive" : ""}
                  />
                  {getFieldError(errors, "startDate") && (
                    <p className="text-xs text-destructive">{getFieldError(errors, "startDate")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Tanggal Selesai</Label>
                  <Input 
                    type="date" 
                    value={form.endDate} 
                    onChange={(e) => update("endDate", e.target.value)}
                    className={getFieldError(errors, "endDate") ? "border-destructive" : ""}
                  />
                  {getFieldError(errors, "endDate") && (
                    <p className="text-xs text-destructive">{getFieldError(errors, "endDate")}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Review data kompetisi Anda:</p>
              {[
                ["Nama", form.name], ["Format", form.format], ["Kelompok Umur", form.ageGroup],
                ["Biaya Registrasi", `Rp ${Number(form.registrationFee).toLocaleString("id-ID")}`],
                ["Mulai", form.startDate], ["Selesai", form.endDate],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border text-sm last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{val || "—"}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => step > 0 ? setStep((s) => s - 1) : navigate("/eo/competitions")} className="gap-1">
          {step === 0 ? "Batal" : "Kembali"}
        </Button>
        <Button size="sm" disabled={!canNext} onClick={handleNext} className="gap-1">
          {step === steps.length - 1 ? "Simpan Kompetisi" : "Lanjut"}
          {step < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
