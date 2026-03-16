/**
 * CompetitionDetail - Detail dan profile kompetisi
 * 
 * Menampilkan:
 * - Informasi kompetisi lengkap
 * - Requirement dan rules
 * - Timeline
 * - Dokumen yang diperlukan
 * - Call-to-action untuk registrasi
 */

import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar, MapPin, Users, FileText, Trophy, Clock, CheckCircle, AlertCircle, ArrowLeft
} from "lucide-react";
import { mockCompetitionsExtended, mockCompetitionRegistrations } from "../lib/mockData";
import { formatCurrency, formatDate, getDeadlineInfo, getCompetitionStatusLabel } from "../lib/utils";
import { COMPETITION_STATUS_COLORS, DOCUMENT_TYPE_LABELS } from "../lib/constants";
import type { Competition } from "../lib/types";
import { cn } from "@/lib/utils";

export default function CompetitionDetail() {
  const { competitionId } = useParams();
  const navigate = useNavigate();

  // Find competition
  const competition = mockCompetitionsExtended.find((c) => c.id === competitionId);
  
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

  const deadlineInfo = getDeadlineInfo(competition.registrationDeadline);
  const statusColor = COMPETITION_STATUS_COLORS[competition.status as any];
  const isRegistrationOpen = competition.status === "Registration Open";
  const hasAvailableSlots = competition.slotsAvailable > 0;
  const isDeadlinePassed = deadlineInfo.isPassed;
  const canRegister = isRegistrationOpen && hasAvailableSlots && !isDeadlinePassed;

  // Check if already registered
  const isAlreadyRegistered = mockCompetitionRegistrations.some(
    (r) => r.competitionId === competitionId
  );

  const handleRegister = () => {
    navigate(`/club/competition/${competitionId}/register`);
  };

  const handleBack = () => {
    navigate("/club/competition");
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Competition detail">
      {/* Back Button */}
      <Button variant="ghost" onClick={handleBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar
      </Button>

      {/* Hero Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Info Utama */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-start gap-3">
              <Trophy className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold">{competition.name}</h1>
                <p className="text-muted-foreground mt-1">{competition.eoName}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">{competition.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={cn("text-xs", statusColor)}>
                {getCompetitionStatusLabel(competition.status as any)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Format: {competition.format}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Usia: {competition.ageGroup}
              </Badge>
            </div>
          </div>

          {/* Registration Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Status Registrasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Kuota</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">{competition.currentClubs}/{competition.totalSlots}</p>
                  <p className={cn(
                    "text-xs font-medium",
                    competition.slotsAvailable === 0 ? "text-destructive" : "text-green-700"
                  )}>
                    {competition.slotsAvailable} tersisa
                  </p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(competition.currentClubs / competition.totalSlots) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts */}
      {!canRegister && (
        <>
          {!isRegistrationOpen && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Pendaftaran belum dibuka atau sudah ditutup. Hubungi penyelenggara untuk informasi lebih lanjut.
              </AlertDescription>
            </Alert>
          )}
          {!hasAvailableSlots && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Kuota kompetisi penuh. Tidak dapat melakukan registrasi baru.
              </AlertDescription>
            </Alert>
          )}
          {isDeadlinePassed && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Deadline pendaftaran sudah lewat.
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      {isAlreadyRegistered && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Klub Anda sudah terdaftar untuk kompetisi ini.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Informasi */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline Penting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Deadline Pendaftaran */}
                <div className="flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    deadlineInfo.isPassed ? "bg-destructive/10" : "bg-primary/10"
                  )}>
                    <Clock className={cn(
                      "w-5 h-5",
                      deadlineInfo.isPassed ? "text-destructive" : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-sm">Deadline Pendaftaran</p>
                    <p className="text-sm text-muted-foreground">{formatDate(competition.registrationDeadline)}</p>
                    <p className={cn(
                      "text-xs font-medium mt-1",
                      deadlineInfo.isPassed ? "text-destructive" : deadlineInfo.isUrgent ? "text-chart-4" : "text-chart-2"
                    )}>
                      {deadlineInfo.displayText}
                    </p>
                  </div>
                </div>

                {/* Start Kompetisi */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-sm">Mulai Kompetisi</p>
                    <p className="text-sm text-muted-foreground">{formatDate(competition.startDate)}</p>
                  </div>
                </div>

                {/* End Kompetisi */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-sm">Akhir Kompetisi</p>
                    <p className="text-sm text-muted-foreground">{formatDate(competition.endDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Persyaratan Kompetisi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Jumlah Pemain Min</p>
                  <p className="text-2xl font-bold text-primary">{competition.regulations.minPlayers}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Jumlah Pemain Max</p>
                  <p className="text-2xl font-bold text-primary">{competition.regulations.maxPlayers}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Usia Min</p>
                  <p className="text-2xl font-bold text-primary">{competition.regulations.minPlayerAge}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Usia Max</p>
                  <p className="text-2xl font-bold text-primary">{competition.regulations.maxPlayerAge}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground p-3 bg-blue-50 border border-blue-200 rounded-lg">
                ℹ️ Minimal {competition.regulations.minSquadSize} pemain harus dalam starting XI
              </p>
            </CardContent>
          </Card>

          {/* Lokasi & Kontak */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lokasi & Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Lokasi</p>
                  <p className="text-sm text-muted-foreground">{competition.location}</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <p className="font-semibold text-sm">Hubungi Penyelenggara</p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Nama:</span> {competition.eoContact}</p>
                  <p><span className="text-muted-foreground">Email:</span> <a href={`mailto:${competition.eoEmail}`} className="text-primary hover:underline">{competition.eoEmail}</a></p>
                  <p><span className="text-muted-foreground">Telepon:</span> <a href={`tel:${competition.eoPhone}`} className="text-primary hover:underline">{competition.eoPhone}</a></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Dokumen & CTA */}
        <div className="space-y-6">
          {/* Fee Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Biaya Registrasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Biaya Registrasi</span>
                  <span className="font-bold text-lg text-primary">{formatCurrency(competition.registrationFee)}</span>
                </div>
                <div className="h-px bg-border" />
                <p className="text-xs text-muted-foreground">
                  Pembayaran harus diselesaikan sebelum submission registrasi
                </p>
              </div>
              <Button onClick={handleRegister} disabled={!canRegister} className="w-full" size="lg">
                {isAlreadyRegistered ? "Sudah Terdaftar" : canRegister ? "Daftar Sekarang" : "Tidak Bisa Daftar"}
              </Button>
            </CardContent>
          </Card>

          {/* Dokumen Diperlukan */}
          {competition.documents && competition.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dokumen yang Diperlukan</CardTitle>
                <CardDescription>({competition.documents.filter((d) => d.required).length} wajib)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competition.documents.map((doc) => (
                    <div key={doc.id} className="flex items-start gap-3 p-2 hover:bg-muted rounded transition-colors">
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5",
                        doc.required ? "bg-destructive/10" : "bg-muted"
                      )}>
                        {doc.required ? (
                          <span className="text-xs font-bold text-destructive">*</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">○</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{DOCUMENT_TYPE_LABELS[doc.type]}</p>
                        {doc.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
