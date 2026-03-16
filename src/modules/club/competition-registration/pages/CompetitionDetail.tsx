/**
 * CompetitionDetail - Reads from shared CompetitionDataContext
 */

import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar, MapPin, Users, Trophy, Clock, CheckCircle, AlertCircle, ArrowLeft
} from "lucide-react";
import { useCompetitionData } from "@/context/CompetitionDataContext";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;
const formatDate = (date: string) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function CompetitionDetail() {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const { getCompetition, isClubRegistered } = useCompetitionData();

  const competition = getCompetition(competitionId || '');
  
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

  const isRegistrationOpen = competition.status === "Registration Open";
  const hasAvailableSlots = competition.slotsAvailable > 0;
  const deadline = new Date(competition.registrationDeadline);
  const isDeadlinePassed = deadline < new Date();
  const canRegister = isRegistrationOpen && hasAvailableSlots && !isDeadlinePassed;
  const isAlreadyRegistered = isClubRegistered(competition.id, 'club-1');

  const statusColors: Record<string, string> = {
    'Draft': 'bg-muted text-muted-foreground',
    'Registration Open': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Active': 'bg-primary/15 text-primary',
    'Finished': 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate("/club/competition")} className="gap-2">
        <ArrowLeft className="w-4 h-4" />Kembali ke Daftar
      </Button>

      {/* Hero */}
      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
              <Badge className={cn("text-xs", statusColors[competition.status])}>
                {competition.status === 'Registration Open' ? 'Pendaftaran Dibuka' : competition.status}
              </Badge>
              <Badge variant="outline" className="text-xs">Format: {competition.format}</Badge>
              <Badge variant="outline" className="text-xs">Usia: {competition.ageGroup}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Status Registrasi</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">{competition.currentClubs}/{competition.totalSlots}</p>
                <p className={cn("text-xs font-medium", competition.slotsAvailable === 0 ? "text-destructive" : "text-green-700")}>
                  {competition.slotsAvailable} tersisa
                </p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${(competition.currentClubs / competition.totalSlots) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts */}
      {!canRegister && !isAlreadyRegistered && (
        <>
          {!isRegistrationOpen && (
            <Alert><AlertCircle className="h-4 w-4" /><AlertDescription>Pendaftaran belum dibuka atau sudah ditutup.</AlertDescription></Alert>
          )}
          {!hasAvailableSlots && (
            <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Kuota kompetisi penuh.</AlertDescription></Alert>
          )}
        </>
      )}

      {isAlreadyRegistered && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/10">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-400">Klub Anda sudah terdaftar untuk kompetisi ini.</AlertDescription>
        </Alert>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Timeline Penting</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Deadline Pendaftaran', date: competition.registrationDeadline, icon: Clock, passed: isDeadlinePassed },
                { label: 'Mulai Kompetisi', date: competition.startDate, icon: CheckCircle, passed: false },
                { label: 'Akhir Kompetisi', date: competition.endDate, icon: CheckCircle, passed: false },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", item.passed ? "bg-destructive/10" : "bg-primary/10")}>
                    <item.icon className={cn("w-5 h-5", item.passed ? "text-destructive" : "text-primary")} />
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Persyaratan Kompetisi</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Pemain Min', value: competition.regulations.minPlayers },
                  { label: 'Pemain Max', value: competition.regulations.maxPlayers },
                  { label: 'Usia Min', value: competition.regulations.minPlayerAge },
                  { label: 'Usia Max', value: competition.regulations.maxPlayerAge },
                ].map(r => (
                  <div key={r.label} className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
                    <p className="text-2xl font-bold text-primary">{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lokasi & Kontak</CardTitle></CardHeader>
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
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Nama:</span> {competition.eoContact}</p>
                  <p><span className="text-muted-foreground">Email:</span> <a href={`mailto:${competition.eoEmail}`} className="text-primary hover:underline">{competition.eoEmail}</a></p>
                  <p><span className="text-muted-foreground">Telepon:</span> {competition.eoPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Biaya Registrasi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Biaya</span>
                <span className="font-bold text-lg text-primary">{formatCurrency(competition.registrationFee)}</span>
              </div>
              <Button onClick={() => navigate(`/club/competition/${competition.id}/register`)} disabled={!canRegister || isAlreadyRegistered} className="w-full" size="lg">
                {isAlreadyRegistered ? "Sudah Terdaftar" : canRegister ? "Daftar Sekarang" : "Tidak Bisa Daftar"}
              </Button>
            </CardContent>
          </Card>

          {competition.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dokumen Diperlukan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competition.documents.map(doc => (
                    <div key={doc.id} className="flex items-start gap-3 p-2 hover:bg-muted rounded transition-colors">
                      <div className={cn("w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5", doc.required ? "bg-destructive/10" : "bg-muted")}>
                        {doc.required ? <span className="text-xs font-bold text-destructive">*</span> : <span className="text-xs text-muted-foreground">○</span>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{doc.label}</p>
                        {doc.description && <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>}
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
