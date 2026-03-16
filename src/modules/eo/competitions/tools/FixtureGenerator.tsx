import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Shuffle, Trash2, Check, ChevronDown, ChevronUp, MapPin, Loader2 } from "lucide-react";
import { useCompetition, type MatchData } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  generateRoundRobin,
  generateKnockout,
  generateHybrid,
  validateFixtures,
  getFixtureStats,
} from "@/lib/fixtures";
import { useVenues } from "../hooks/useVenues";
import { saveFixtures, publishFixtures, clearFixtures } from "../api";
  const list = teams.length % 2 === 0 ? [...teams] : [...teams, 'BYE'];
  const n = list.length;
  const rounds = n - 1;
  const matchesPerRound = n / 2;
  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split('T')[0]);
  let matchId = Date.now();

  for (let round = 0; round < rounds; round++) {
    const roundDate = new Date(start);
    roundDate.setDate(roundDate.getDate() + round * 7);
    const dateStr = roundDate.toISOString().split('T')[0];

    for (let i = 0; i < matchesPerRound; i++) {
      const home = list[i];
      const away = list[n - 1 - i];
      if (home === 'BYE' || away === 'BYE') continue;

      matches.push({
        id: `gen-${matchId++}`,
        competitionId,
        competitionName,
        homeTeam: home,
        awayTeam: away,
        homeScore: 0,
        awayScore: 0,
        status: 'Scheduled',
        date: dateStr,
        time: `${9 + (i % 4) * 2}:00`,
        venue: 'TBD',
        referee: 'TBD',
        matchday: round + 1,
        round: `Matchday ${round + 1}`,
      });
    }
    // Rotate: fix first element, rotate rest
    const last = list.pop()!;
    list.splice(1, 0, last);
  }

  return matches;
}

function generateKnockout(teams: string[], competitionId: string, competitionName: string, startDate: string): MatchData[] {
  // Pad to next power of 2
  const n = teams.length;
  const nextPow2 = Math.pow(2, Math.ceil(Math.log2(n)));
  const padded = [...teams];
  while (padded.length < nextPow2) padded.push('BYE');

  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split('T')[0]);
  let matchId = Date.now();
  let totalRounds = Math.log2(nextPow2);

  const roundNames = (size: number): string => {
    if (size === 2) return 'Final';
    if (size === 4) return 'Semifinal';
    if (size === 8) return 'Quarterfinal';
    return `Round of ${size}`;
  };

  // Only generate first round pairings (rest depend on results)
  const roundSize = nextPow2;
  const roundName = roundNames(roundSize);
  const roundDate = new Date(start);
  const dateStr = roundDate.toISOString().split('T')[0];

  for (let i = 0; i < nextPow2 / 2; i++) {
    const home = padded[i];
    const away = padded[nextPow2 - 1 - i];
    if (home === 'BYE' || away === 'BYE') continue;

    matches.push({
      id: `gen-${matchId++}`,
      competitionId,
      competitionName,
      homeTeam: home,
      awayTeam: away,
      homeScore: 0,
      awayScore: 0,
      status: 'Scheduled',
      date: dateStr,
      time: `${9 + (i % 6) * 2}:00`,
      venue: 'TBD',
      referee: 'TBD',
      matchday: 1,
      round: roundName,
    });
  }

  // Generate placeholder rounds
  let remaining = nextPow2 / 2;
  let weekOffset = 1;
  while (remaining > 1) {
    const pairsInRound = remaining / 2;
    const rName = roundNames(remaining);
    const rDate = new Date(start);
    rDate.setDate(rDate.getDate() + weekOffset * 7);
    const rDateStr = rDate.toISOString().split('T')[0];

    for (let i = 0; i < pairsInRound; i++) {
      matches.push({
        id: `gen-${matchId++}`,
        competitionId,
        competitionName,
        homeTeam: `Winner ${rName} #${i * 2 + 1}`,
        awayTeam: `Winner ${rName} #${i * 2 + 2}`,
        homeScore: 0,
        awayScore: 0,
        status: 'Scheduled',
        date: rDateStr,
        time: `${9 + (i % 4) * 2}:00`,
        venue: 'TBD',
        referee: 'TBD',
        matchday: weekOffset + 1,
        round: remaining === 2 ? 'Final' : roundNames(remaining / 2 * 2 > 2 ? remaining : remaining),
      });
    }
    remaining = pairsInRound;
    weekOffset++;
  }

  return matches;
}

function generateHybrid(teams: string[], competitionId: string, competitionName: string, startDate: string): MatchData[] {
  const n = teams.length;
  const groupSize = 4;
  const numGroups = Math.max(1, Math.ceil(n / groupSize));
  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split('T')[0]);
  let matchId = Date.now();
  let maxMatchday = 0;

  // Distribute teams into groups
  const groups: string[][] = Array.from({ length: numGroups }, () => []);
  teams.forEach((t, i) => groups[i % numGroups].push(t));

  // Round-robin within each group
  groups.forEach((group, gi) => {
    const groupLabel = String.fromCharCode(65 + gi); // A, B, C...
    const list = group.length % 2 === 0 ? [...group] : [...group, 'BYE'];
    const gn = list.length;
    const rounds = gn - 1;

    for (let round = 0; round < rounds; round++) {
      const roundDate = new Date(start);
      roundDate.setDate(roundDate.getDate() + round * 7);
      const dateStr = roundDate.toISOString().split('T')[0];

      for (let i = 0; i < gn / 2; i++) {
        const home = list[i];
        const away = list[gn - 1 - i];
        if (home === 'BYE' || away === 'BYE') continue;

        const md = round + 1;
        if (md > maxMatchday) maxMatchday = md;

        matches.push({
          id: `gen-${matchId++}`,
          competitionId,
          competitionName,
          homeTeam: home,
          awayTeam: away,
          homeScore: 0,
          awayScore: 0,
          status: 'Scheduled',
          date: dateStr,
          time: `${9 + (i % 4) * 2}:00`,
          venue: 'TBD',
          referee: 'TBD',
          matchday: md,
          round: `Group ${groupLabel} - MD ${md}`,
          group: groupLabel,
        });
      }
      const last = list.pop()!;
      list.splice(1, 0, last);
    }
  });

  // Knockout stage: top 2 from each group
  const koTeams = groups.flatMap((_, gi) => {
    const gl = String.fromCharCode(65 + gi);
    return [`1st Group ${gl}`, `2nd Group ${gl}`];
  });

  const koStart = new Date(start);
  koStart.setDate(koStart.getDate() + (maxMatchday + 1) * 7);

  generateHybrid,
  validateFixtures,
  getFixtureStats,
} from "@/lib/fixtures";

// ─── Component ──────────────────────────────────────────────────────────────

export default function FixtureGenerator() {
  const { toast } = useToast();
  const { activeCompetition, matches, registrations, addMatches, clearMatches } = useCompetition();
  const { venues, getVenueUtilization, addAssignment, stats } = useVenues();
  const approvedTeams = registrations.filter((r) => r.status === "Approved");
  const teamNames = approvedTeams.map((r) => r.clubName);
  const [preview, setPreview] = useState<MatchData[]>([]);
  const [validationErrors, setValidationErrors] = useState<Array<{ type: string; message: string }>>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedVenueTab, setSelectedVenueTab] = useState(false);
  const [fromFormat, setFromFormat] = useState<'league' | 'knockout' | 'hybrid'>('league');
  const [isSaving, setIsSaving] = useState(false);

  const generate = (format: 'league' | 'knockout' | 'hybrid') => {
    if (teamNames.length < 2) {
      toast({ title: "Error", description: "Minimal 2 tim yang disetujui untuk generate fixture.", variant: "destructive" });
      return;
    }
    const comp = activeCompetition!;
    let generated: MatchData[];
    switch (format) {
      case 'league': generated = generateRoundRobin(teamNames, comp.id, comp.name, comp.startDate); break;
      case 'knockout': generated = generateKnockout(teamNames, comp.id, comp.name, comp.startDate); break;
      case 'hybrid': generated = generateHybrid(teamNames, comp.id, comp.name, comp.startDate); break;
    }
    
    // Validate generated fixtures
    const errors = validateFixtures(generated, { checkVenue: true, checkTeams: true });
    setValidationErrors(errors);
    setFromFormat(format);
    
    setPreview(generated);
    setShowAll(false);
  };

  const confirmFixtures = async () => {
    if (!activeCompetition || !preview.length) return;

    setIsSaving(true);
    try {
      // Call API to save fixtures
      const result = await saveFixtures(
        activeCompetition.id,
        preview,
        fromFormat
      );

      if (result.success) {
        // Add to local context
        addMatches(preview);
        
        toast({
          title: "✓ Fixture Disimpan",
          description: `${preview.length} pertandingan berhasil ditambahkan ke server`,
        });
        
        setPreview([]);
        setValidationErrors([]);
      } else {
        toast({
          title: "✗ Gagal Menyimpan",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "✗ Error",
        description: "Gagal menyimpan fixture: " + (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = async () => {
    if (!activeCompetition) return;

    try {
      const result = await clearFixtures(activeCompetition.id);
      
      if (result.success) {
        clearMatches();
        toast({ title: "✓ Fixture Dihapus", description: result.message });
      } else {
        toast({
          title: "✗ Gagal Menghapus",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "✗ Error",
        description: "Gagal menghapus fixture: " + (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const displayPreview = showAll ? preview : preview.slice(0, 10);

  return (
    <div className="space-y-6" role="main" aria-label="Fixture generator">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fixture Generator</h1>
        <p className="text-muted-foreground text-sm mt-1">Generate jadwal pertandingan otomatis</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          {teamNames.length < 2 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Minimal 2 tim yang disetujui diperlukan. Saat ini: {teamNames.length} tim.</AlertDescription>
            </Alert>
          )}

          <Card className="p-6">
            <Tabs defaultValue="league">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="league">League</TabsTrigger>
                <TabsTrigger value="knockout">Knockout</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>

              <TabsContent value="league" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Format:</span> Round-Robin</div>
                  <div><span className="text-muted-foreground">Tim:</span> {teamNames.length}</div>
                  <div><span className="text-muted-foreground">Putaran:</span> {Math.max(0, teamNames.length - 1)}</div>
                  <div><span className="text-muted-foreground">Est. Pertandingan:</span> {teamNames.length > 1 ? (teamNames.length * (teamNames.length - 1)) / 2 : 0}</div>
                </div>
                <Button className="w-full gap-2" onClick={() => generate('league')} disabled={teamNames.length < 2}>
                  <Shuffle className="w-4 h-4" />Generate League Fixtures
                </Button>
              </TabsContent>

              <TabsContent value="knockout" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Format:</span> Single Elimination</div>
                  <div><span className="text-muted-foreground">Tim:</span> {teamNames.length}</div>
                  <div><span className="text-muted-foreground">Bracket:</span> {Math.pow(2, Math.ceil(Math.log2(Math.max(2, teamNames.length))))}</div>
                  <div><span className="text-muted-foreground">Putaran:</span> {Math.ceil(Math.log2(Math.max(2, teamNames.length)))}</div>
                </div>
                <Button className="w-full gap-2" onClick={() => generate('knockout')} disabled={teamNames.length < 2}>
                  <Shuffle className="w-4 h-4" />Generate Knockout Bracket
                </Button>
              </TabsContent>

              <TabsContent value="hybrid" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Format:</span> Group + Knockout</div>
                  <div><span className="text-muted-foreground">Tim:</span> {teamNames.length}</div>
                  <div><span className="text-muted-foreground">Grup:</span> {Math.max(1, Math.ceil(teamNames.length / 4))}</div>
                  <div><span className="text-muted-foreground">Tim/Grup:</span> ~4</div>
                </div>
                <Button className="w-full gap-2" onClick={() => generate('hybrid')} disabled={teamNames.length < 2}>
                  <Shuffle className="w-4 h-4" />Generate Hybrid Format
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Preview */}
          {preview.length > 0 && (
            <>
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="space-y-2">
                  {validationErrors.map((error, idx) => (
                    <Alert
                      key={idx}
                      className={
                        error.type === "error"
                          ? "bg-red-50 border-red-200"
                          : "bg-yellow-50 border-yellow-200"
                      }
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription
                        className={
                          error.type === "error" ? "text-red-800" : "text-yellow-800"
                        }
                      >
                        {error.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Venue Assignment Section */}
              <Card className="p-5 bg-blue-50/50 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <h2 className="font-semibold text-sm">Venue Assignment</h2>
                  </div>
                  <Badge variant="outline">{venues.length} Venue(s) Available</Badge>
                </div>

                {/* Venue Utilization Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <p className="text-xs text-muted-foreground">Total Venues</p>
                    <p className="text-lg font-bold text-blue-600">{stats.totalVenues}</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <p className="text-xs text-muted-foreground">Avg Utilization</p>
                    <p className="text-lg font-bold text-blue-600">{stats.averageUtilization}%</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <p className="text-xs text-muted-foreground">Max Utilization</p>
                    <p className="text-lg font-bold text-blue-600">{stats.maxUtilization}%</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <p className="text-xs text-muted-foreground">Total Capacity</p>
                    <p className="text-lg font-bold text-blue-600">{stats.availableCapacity.toLocaleString()}</p>
                  </div>
                </div>

                {/* Venue Distribution */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Venue Utilization Distribution</p>
                  {stats.distribution.map((dist) => (
                    <div key={dist.venueId} className="flex items-center gap-2 text-xs">
                      <span className="w-24 truncate font-medium">{dist.name}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            dist.utilization > 80
                              ? "bg-red-500"
                              : dist.utilization > 50
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${dist.utilization}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-muted-foreground">
                        {dist.totalMatches} match(es)
                      </span>
                    </div>
                  ))}
                </div>

                {/* Auto-assign venues suggestion */}
                <Button
                  className="w-full mt-4 gap-2"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Auto-assign venues to fixtures based on utilization
                    let venueIndex = 0;
                    preview.forEach((match, idx) => {
                      const venue = venues[venueIndex % venues.length];
                      addAssignment(match.id, venue.id, match.time);
                      venueIndex++;
                    });
                    toast({
                      title: "Venues Assigned",
                      description: `${preview.length} matches assigned to ${venues.length} venue(s)`,
                    });
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  Auto-assign Venues
                </Button>
              </Card>

              <Card className="p-5 border-chart-2/30 bg-chart-2/5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-sm">Preview ({preview.length} pertandingan)</h2>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setPreview([]); setValidationErrors([]); }} className="text-xs" disabled={isSaving}>Batal</Button>
                    <Button 
                      size="sm" 
                      onClick={confirmFixtures} 
                      disabled={validationErrors.some((e) => e.type === "error") || isSaving}
                      className="gap-1 text-xs"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Simpan Fixture
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {displayPreview.map((m) => (
                    <div key={m.id} className="flex items-center justify-between p-2 text-xs border-b border-border/50 last:border-b-0">
                      <span className="text-muted-foreground font-mono w-20">{m.date}</span>
                      <Badge variant="outline" className="text-[9px] mx-2">{m.round ?? `MD ${m.matchday}`}</Badge>
                      <span className="flex-1 text-center truncate">{m.homeTeam} vs {m.awayTeam}</span>
                    </div>
                  ))}
                </div>
                {preview.length > 10 && (
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-xs gap-1" onClick={() => setShowAll(!showAll)}>
                    {showAll ? <><ChevronUp className="w-3 h-3" />Sembunyikan</> : <><ChevronDown className="w-3 h-3" />Lihat semua ({preview.length})</>}
                  </Button>
                )}
              </Card>
            </>
          )}

          {/* Existing fixtures */}
          {matches.length > 0 && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-sm">Fixture Tersimpan ({matches.length})</h2>
                <Button variant="ghost" size="sm" className="text-xs text-destructive gap-1" onClick={handleClear}>
                  <Trash2 className="w-3.5 h-3.5" />Hapus Semua
                </Button>
              </div>
              <div className="space-y-1.5">
                {matches.slice(0, 10).map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-2 text-xs border-b border-border/50 last:border-b-0">
                    <span className="text-muted-foreground font-mono w-20">{m.date}</span>
                    <span className="flex-1 mx-3 text-center">{m.homeTeam} vs {m.awayTeam}</span>
                    <Badge variant="outline" className="text-[9px]">{m.status}</Badge>
                  </div>
                ))}
                {matches.length > 10 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">...dan {matches.length - 10} pertandingan lainnya</p>
                )}
              </div>
            </Card>
          )}

          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm font-medium">✓ {teamNames.length} tim siap untuk generate fixture</p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimasi pertandingan (round-robin): {teamNames.length > 1 ? (teamNames.length * (teamNames.length - 1)) / 2 : 0}
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
