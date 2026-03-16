import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  User,
  Camera,
  Shield,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  status: "incomplete" | "in-progress" | "completed";
  progress: number;
}

export default function PlayerRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [steps] = useState<RegistrationStep[]>([
    {
      id: "profile",
      label: "Profil Pemain",
      description: "Data pribadi dan informasi dasar pemain",
      icon: <User className="w-5 h-5" />,
      status: "completed",
      progress: 100,
    },
    {
      id: "photo",
      label: "Foto Pemain",
      description: "Upload foto resmi untuk verifikasi",
      icon: <Camera className="w-5 h-5" />,
      status: "completed",
      progress: 100,
    },
    {
      id: "documents",
      label: "Dokumen Pendukung",
      description: "Identitas, medis, dan dokumen kontrak",
      icon: <FileText className="w-5 h-5" />,
      status: "in-progress",
      progress: 75,
    },
    {
      id: "verification",
      label: "Verifikasi",
      description: "Proses verifikasi oleh admin klub",
      icon: <Shield className="w-5 h-5" />,
      status: "incomplete",
      progress: 0,
    },
  ]);

  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const overallProgress = (completedSteps / totalSteps) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200 text-green-700";
      case "in-progress":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "in-progress":
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const handleSubmitRegistration = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progres Pendaftaran Pemain</CardTitle>
          <CardDescription>
            {completedSteps} dari {totalSteps} tahap selesai
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Kelengkapan Data</p>
              <Badge variant="outline">{Math.round(overallProgress)}%</Badge>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Registration Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tahapan Pendaftaran</CardTitle>
          <CardDescription>
            Ikuti langkah-langkah di bawah untuk menyelesaikan pendaftaran
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, idx) => (
            <div key={step.id}>
              <div
                className={cn(
                  "p-4 rounded-lg border-2 transition-all cursor-pointer",
                  getStatusColor(step.status)
                )}
                onClick={() => setCurrentStep(idx)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/50">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{step.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          step.status === "completed"
                            ? "default"
                            : step.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {step.status === "completed" && "✓ Selesai"}
                        {step.status === "in-progress" && "⏳ Sedang"}
                        {step.status === "incomplete" && "⭕ Menunggu"}
                      </Badge>
                    </div>
                    {step.status !== "incomplete" && (
                      <div className="mt-3">
                        <Progress value={step.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Step Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                {steps[currentStep].label}
              </CardTitle>
              <CardDescription className="mt-1">
                {steps[currentStep].description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="h-fit">
              Langkah {currentStep + 1}/{totalSteps}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Profile */}
          {currentStep === 0 && (
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">✓ Profil Lengkap</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Semua data pribadi dan olahraga pemain telah diisi dengan
                      lengkap dan valid.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="font-medium text-sm">Data yang dikumpulkan:</p>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Informasi pribadi (nama, DOB, kebangsaan)</li>
                  <li>Nomor identitas dan kontak</li>
                  <li>Atribut fisik (tinggi, berat)</li>
                  <li>Informasi sepak bola (posisi, nomor jersey)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Photo */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">✓ Foto Diunggah</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Foto resmi pemain telah diunggah dan akan digunakan untuk
                      kartu pemain resmi.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="w-32 h-40 rounded-lg bg-gray-200 overflow-hidden border-2 border-gray-300">
                  <img
                    src="https://via.placeholder.com/120x160?text=Foto"
                    alt="Player photo preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Format: JPG/PNG | Ukuran: 523 KB | Diupload: 10 Mar 2024
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <div className="space-y-2">
                {[
                  { name: "KTP/SIM", status: "verified" },
                  { name: "Sertifikat Medis", status: "verified" },
                  { name: "Kontrak Kerja", status: "pending" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Badge
                      variant={
                        doc.status === "verified" ? "default" : "secondary"
                      }
                    >
                      {doc.status === "verified" && "✓ Terverifikasi"}
                      {doc.status === "pending" && "⏳ Tertunda"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Satu dokumen masih menunggu review. Tim verifikasi akan
                  menghubungi Anda jika ada yang perlu diperbaiki.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Verifikasi akan dilakukan setelah semua dokumen lengkap
                  diverifikasi. Proses ini biasanya memakan waktu 2-3 hari
                  kerja.
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="font-medium text-sm">Apa yang akan diperiksa:</p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Verifikasi identitas dan keabsahan dokumen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Pemeriksaan status kesehatan dan medical clearance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Verifikasi kelayakan bermain sesuai regulasi kompetisi
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">Checklist Registrasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: "Data pemain lengkap", completed: true },
            { label: "Foto pemain berkualitas", completed: true },
            { label: "Semua dokumen diunggah", completed: true },
            { label: "Pemeriksaan medis selesai", completed: true },
            { label: "Verifikasi admin selesai", completed: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-bold text-white",
                  item.completed
                    ? "bg-green-500 border-green-500"
                    : "bg-gray-300 border-gray-300"
                )}
              >
                {item.completed && "✓"}
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation & Submission */}
      <div className="flex gap-3 justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            ← Sebelumnya
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            variant="outline"
            className="gap-2"
          >
            Berikutnya
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {currentStep === steps.length - 1 && (
          <Button
            onClick={handleSubmitRegistration}
            disabled={isSubmitting}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Selesaikan Pendaftaran
              </>
            )}
          </Button>
        )}
      </div>

      {/* Success Message Template */}
      {isSubmitting === false && currentStep === steps.length - 1 && (
        <Alert className="bg-green-50 border-green-200 border-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 ml-2">
            <strong>Siap untuk diserahkan!</strong> Semua data pemain telah
            lengkap. Klik tombol di atas untuk mengirimkan pendaftaran ke tim
            verifikasi.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
