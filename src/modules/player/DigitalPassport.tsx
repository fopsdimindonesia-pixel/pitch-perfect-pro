import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ShieldCheck, QrCode, Globe, Activity, Heart, Award, TrendingUp } from "lucide-react";
import { globalPlayers, careerEvents, skillEvaluations, medicalRecords } from "@/lib/playerEcosystemData";

export default function DigitalPassport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = globalPlayers.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="p-6">
        <Card><CardContent className="pt-6 text-center">
          <p className="text-muted-foreground mb-4">Pemain tidak ditemukan.</p>
          <Button onClick={() => navigate("/player/registry")}>Kembali ke Registry</Button>
        </CardContent></Card>
      </div>
    );
  }

  const events = careerEvents.filter((e) => e.playerId === id).sort((a, b) => b.date.localeCompare(a.date));
  const skills = skillEvaluations.find((s) => s.playerId === id);
  const medical = medicalRecords.filter((m) => m.playerId === id);

  const verificationColor = {
    Verified: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Rejected: "bg-destructive/10 text-destructive",
    Expired: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  }[player.verificationStatus];

  const skillItems = skills ? [
    { label: "Pace", value: skills.pace },
    { label: "Shooting", value: skills.shooting },
    { label: "Passing", value: skills.passing },
    { label: "Dribbling", value: skills.dribbling },
    { label: "Defending", value: skills.defending },
    { label: "Physical", value: skills.physical },
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/player/registry")} className="h-10 w-10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Passport</h1>
          <p className="text-muted-foreground">{player.globalId} • {player.name}</p>
        </div>
      </div>

      {/* Passport Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-navy to-primary p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex gap-5">
              <img src={player.photo} alt={player.name} className="w-24 h-24 rounded-xl bg-white/20 border-2 border-white/30" />
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/60">SoccerOS Digital Passport</p>
                <h2 className="text-2xl font-bold">{player.name}</h2>
                <p className="text-sm text-white/80">{player.position} • {player.foot} Foot • {player.currentClub}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={verificationColor}>{player.verificationStatus}</Badge>
                  <Badge variant="outline" className="border-white/30 text-white text-xs">{player.status}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right space-y-1 hidden md:block">
              <p className="font-mono text-lg font-bold">{player.globalId}</p>
              <p className="text-xs text-white/60">Passport: {player.passportNumber}</p>
              <p className="text-xs text-white/60">Valid: {player.passportExpiry}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Tanggal Lahir", value: player.dateOfBirth },
              { label: "Usia", value: `${player.age} tahun` },
              { label: "Kebangsaan", value: player.nationality },
              { label: "Tinggi / Berat", value: `${player.height} cm / ${player.weight} kg` },
              { label: "Golongan Darah", value: player.bloodType },
              { label: "Terdaftar", value: player.registeredAt },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Award className="w-4 h-4 text-primary" />Statistik Karir</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { label: "Penampilan", value: player.totalAppearances, color: "text-foreground" },
              { label: "Gol", value: player.totalGoals, color: "text-primary" },
              { label: "Assist", value: player.totalAssists, color: "text-navy" },
              { label: "Caps Internasional", value: player.internationalCaps, color: "text-gold" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-lg bg-muted/50">
                <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skill Radar */}
        {skills && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Evaluasi Skill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {skillItems.map((skill) => (
                <div key={skill.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{skill.label}</span>
                    <span className="font-semibold tabular-nums">{skill.value}</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">Overall Rating</span>
                  <span className="font-bold text-lg text-primary">{skills.overall}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Potential: {player.potentialScore}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medical Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Heart className="w-4 h-4 text-destructive" />Status Medis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Medical Clearance</span>
              <Badge className={player.medicalClearance ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {player.medicalClearance ? "Cleared" : "Not Cleared"}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Riwayat Medis Terkini</p>
              {medical.length > 0 ? medical.map((m) => (
                <div key={m.id} className="p-2 rounded border text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{m.type}</span>
                    <span className="text-xs text-muted-foreground">{m.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{m.result}</p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">Belum ada data medis</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Career Events */}
      {events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />Timeline Karir Terkini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => {
                const typeColors: Record<string, string> = {
                  Transfer: "bg-blue-100 text-blue-800", Achievement: "bg-primary/10 text-primary",
                  International: "bg-purple-100 text-purple-800", Injury: "bg-red-100 text-red-800",
                  Contract: "bg-green-100 text-green-800", Milestone: "bg-gold/15 text-gold-foreground",
                };
                return (
                  <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-bold text-primary">{event.year}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge className={typeColors[event.type] || "bg-muted text-muted-foreground"}>{event.type}</Badge>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate(`/player/timeline/${id}`)}>
              Lihat Timeline Lengkap
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
