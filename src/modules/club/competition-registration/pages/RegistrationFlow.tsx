/**
 * RegistrationFlow - Multi-step registration workflow
 * 
 * Steps:
 * 1. Konfirmasi info klub
 * 2. Pilih squad pemain
 * 3. Upload dokumen
 * 4. Review dan submit
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCompetitionRegistration } from "../hooks";
import { mockCompetitionsExtended, mockCompetitionRegistrations } from "../lib/mockData";
import { generatePlayers, mockClubs } from "@/lib/mockData";
import { STEPS, STEP_DESCRIPTIONS } from "../lib/constants";
import { cn } from "@/lib/utils";

// Import would be Step components in real app
// import { Step1ClubInfo, Step2SquadSelection, Step3DocumentUpload, Step4Review } from "../components";

export default function RegistrationFlow() {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Find competition
  const competition = mockCompetitionsExtended.find((c) => c.id === competitionId);
  const clubPlayers = generatePlayers("club-1", 22);
  const clubInfo = mockClubs[0];

  if (!competition) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <Card className="p-8 text-center">
          <p className="text-lg font-semibold text-muted-foreground">Kompetisi tidak ditemukan</p>
        </Card>
      </div>
    );
  }

  const progress = (activeStep / 4) * 100;

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Registration workflow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <Button variant="outline" size="sm" disabled>
          {competition.name}
        </Button>
      </div>

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
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : isCompleted
                    ? "bg-green-100 text-green-900 border-green-300 cursor-pointer hover:bg-green-200"
                    : "bg-muted text-muted-foreground border-muted"
              )}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-current/20">
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-bold">{step}</span>
                  )}
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
          {/* Step 1: Club Info */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Verifikasi informasi klub Anda sebelum melanjutkan ke pemilihan pemain.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm"><span className="font-semibold">Nama Klub:</span> {clubInfo.name}</p>
                  <p className="text-sm"><span className="font-semibold">Kota:</span> {clubInfo.city}</p>
                  <p className="text-sm"><span className="font-semibold">PIC:</span> Ahmad Yani</p>
                  <p className="text-sm"><span className="font-semibold">Email:</span> ahmad@club.id</p>
                  <p className="text-sm"><span className="font-semibold">Telepon:</span> +62-812-1234567</p>
                </div>
              </div>
              <Button
                onClick={() => setActiveStep(2)}
                className="w-full"
              >
                Lanjut ke Pemilihan Pemain
              </Button>
            </div>
          )}

          {/* Step 2: Squad Selection */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Pilih pemain yang akan terdaftar. Minimal {competition.regulations.minPlayers} dan maksimal {competition.regulations.maxPlayers} pemain.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Daftar Pemain Klub (Tap untuk memilih)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                  {clubPlayers.slice(0, 8).map((player) => (
                    <div
                      key={player.id}
                      className="p-3 rounded-lg border bg-card hover:bg-muted cursor-pointer transition-colors"
                    >
                      <p className="font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-muted-foreground">#{player.number} • {player.position} • Umur {player.age}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">Scroll untuk melihat kemampuan lebih banyak pemain...</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(1)}
                  className="flex-1"
                >
                  Kembali
                </Button>
                <Button
                  onClick={() => setActiveStep(3)}
                  className="flex-1"
                >
                  Lanjut ke Upload Dokumen
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Upload dokumen pendukung registrasi (KTP Manager, Daftar Pemain, Bukti Pembayaran)
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                {[
                  { name: "KTP/ID Card Manager", required: true },
                  { name: "Daftar Pemain (Squad List)", required: true },
                  { name: "Bukti Pembayaran", required: true },
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-lg border-2 border-dashed hover:border-primary transition-colors cursor-pointer">
                    <p className="text-sm font-medium mb-2">
                      {doc.name}
                      {doc.required && <span className="text-destructive ml-1">*</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">Drag & drop file atau klik untuk memilih</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(2)}
                  className="flex-1"
                >
                  Kembali
                </Button>
                <Button
                  onClick={() => setActiveStep(4)}
                  className="flex-1"
                >
                  Lanjut ke Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Tinjau ulang semua informasi sebelum submit. Pastikan semua data sudah benar.
                </AlertDescription>
              </Alert>
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">KLUB</p>
                  <p className="text-sm">{clubInfo.name} • {clubInfo.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">KOMPETISI</p>
                  <p className="text-sm">{competition.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">BIAYA</p>
                  <p className="text-sm font-semibold">Rp {competition.registrationFee.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <input type="checkbox" id="terms" className="w-4 h-4" />
                <label htmlFor="terms" className="text-xs">
                  Saya setuju dengan syarat dan ketentuan registrasi kompetisi ini
                </label>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(3)}
                  className="flex-1"
                >
                  Kembali
                </Button>
                <Button
                  onClick={() => {
                    navigate("/club/competition");
                    // Show success message in real app
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Submit Registrasi
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-blue-900">💡 Butuh Bantuan?</p>
            <p className="text-blue-800">
              Hubungi penyelenggara untuk pertanyaan atau bantuan terkait registrasi.
            </p>
            <p className="text-blue-700">Email: info@pssi-makassar.id • Telepon: +62-411-123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
