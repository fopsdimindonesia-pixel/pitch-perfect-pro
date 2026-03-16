/**
 * RegistrationFlow - Submits registration to shared CompetitionDataContext
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCompetitionData } from "@/context/CompetitionDataContext";
import { generatePlayers, mockClubs } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const STEPS: Record<number, string> = {
  1: "Info Klub",
  2: "Pilih Pemain",
  3: "Upload Dokumen",
  4: "Review & Submit",
};

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: "Verifikasi informasi klub Anda",
  2: "Pilih pemain yang akan didaftarkan",
  3: "Upload dokumen pendukung registrasi",
  4: "Tinjau ulang dan submit registrasi",
};

export default function RegistrationFlow() {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCompetition, submitRegistration, isClubRegistered } = useCompetitionData();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const competition = getCompetition(competitionId || '');
  const clubPlayers = generatePlayers("club-1", 22);
  const clubInfo = mockClubs[0];

  if (!competition) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />Kembali
        </Button>
        <Card className="p-8 text-center">
          <p className="text-lg font-semibold text-muted-foreground">Kompetisi tidak ditemukan</p>
        </Card>
      </div>
    );
  }

  const alreadyRegistered = isClubRegistered(competition.id, 'club-1');
  const progress = (activeStep / 4) * 100;

  const handleSubmit = () => {
    submitRegistration(competition.id, 'club-1', clubInfo.name);
    toast({
      title: "Registrasi Berhasil!",
      description: `Pendaftaran ke ${competition.name} telah dikirim ke EO untuk divalidasi.`,
    });
    navigate("/club/competition");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />Kembali
        </Button>
        <Button variant="outline" size="sm" disabled>{competition.name}</Button>
      </div>

      {alreadyRegistered && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/10">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-400">
            Klub Anda sudah terdaftar. Anda melihat ulang proses registrasi.
          </AlertDescription>
        </Alert>
      )}

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Registrasi Kompetisi</h1>
          <Badge variant="outline">Langkah {activeStep} dari 4</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-3">
        {(Object.entries(STEPS) as [string, string][]).map(([stepNum, label]) => {
          const step = parseInt(stepNum) as 1 | 2 | 3 | 4;
          const isActive = step === activeStep;
          const isCompleted = step < activeStep;
          return (
            <button
              key={step}
              onClick={() => step < activeStep && setActiveStep(step)}
              className={cn(
                "relative p-3 rounded-lg border transition-all text-sm font-medium",
                isActive ? "bg-primary text-primary-foreground border-primary"
                  : isCompleted ? "bg-green-100 text-green-900 border-green-300 cursor-pointer hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-muted text-muted-foreground border-muted"
              )}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-current/20">
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{step}</span>}
                </div>
                <span className="text-[10px] leading-tight">{label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[activeStep]}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{STEP_DESCRIPTIONS[activeStep]}</p>
        </CardHeader>
        <CardContent className="space-y-6 min-h-96">
          {activeStep === 1 && (
            <div className="space-y-4">
              <Alert><AlertDescription>Verifikasi informasi klub sebelum melanjutkan.</AlertDescription></Alert>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm"><span className="font-semibold">Nama Klub:</span> {clubInfo.name}</p>
                <p className="text-sm"><span className="font-semibold">Kota:</span> {clubInfo.city}</p>
                <p className="text-sm"><span className="font-semibold">PIC:</span> Ahmad Yani</p>
                <p className="text-sm"><span className="font-semibold">Email:</span> ahmad@club.id</p>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  ⚠️ Pastikan persyaratan EO terpenuhi: min {competition.regulations.minPlayers} pemain, 
                  usia {competition.regulations.minPlayerAge}-{competition.regulations.maxPlayerAge} tahun
                </p>
              </div>
              <Button onClick={() => setActiveStep(2)} className="w-full">Lanjut ke Pemilihan Pemain</Button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Pilih pemain yang akan terdaftar. Min {competition.regulations.minPlayers}, max {competition.regulations.maxPlayers} pemain.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                {clubPlayers.slice(0, 8).map(player => (
                  <div key={player.id} className="p-3 rounded-lg border bg-card hover:bg-muted cursor-pointer transition-colors">
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-muted-foreground">#{player.number} • {player.position} • Umur {player.age}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setActiveStep(1)} className="flex-1">Kembali</Button>
                <Button onClick={() => setActiveStep(3)} className="flex-1">Lanjut ke Upload Dokumen</Button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <Alert><AlertDescription>Upload dokumen pendukung sesuai persyaratan EO.</AlertDescription></Alert>
              <div className="space-y-3">
                {competition.documents.filter(d => d.required).map(doc => (
                  <div key={doc.id} className="p-4 rounded-lg border-2 border-dashed hover:border-primary transition-colors cursor-pointer">
                    <p className="text-sm font-medium mb-2">{doc.label} <span className="text-destructive">*</span></p>
                    <p className="text-xs text-muted-foreground">Drag & drop file atau klik untuk memilih</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setActiveStep(2)} className="flex-1">Kembali</Button>
                <Button onClick={() => setActiveStep(4)} className="flex-1">Lanjut ke Review</Button>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-4">
              <Alert><AlertDescription>Tinjau ulang semua informasi sebelum submit.</AlertDescription></Alert>
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">KLUB</p>
                  <p className="text-sm">{clubInfo.name} • {clubInfo.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">KOMPETISI</p>
                  <p className="text-sm">{competition.name} ({competition.eoName})</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">BIAYA</p>
                  <p className="text-sm font-semibold">Rp {competition.registrationFee.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs text-muted-foreground">
                📋 Registrasi akan dikirim ke EO ({competition.eoName}) untuk divalidasi dan disetujui.
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <input type="checkbox" id="terms" className="w-4 h-4" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
                <label htmlFor="terms" className="text-xs">Saya setuju dengan syarat dan ketentuan registrasi kompetisi ini</label>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setActiveStep(3)} className="flex-1">Kembali</Button>
                <Button onClick={handleSubmit} disabled={!termsAccepted || alreadyRegistered} className="flex-1">
                  {alreadyRegistered ? "Sudah Terdaftar" : "Submit Registrasi"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
