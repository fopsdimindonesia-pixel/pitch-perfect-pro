import { useState, useMemo } from "react";
import { mockMatches, mockStartingXI, mockBench } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchStatusBadge } from "@/components/shared/StatusBadges";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { PitchVisualization } from "@/components/match/PitchVisualization";
import { ArrowLeftRight, Check, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { focusVisibleClass } from "@/lib/accessibility";

interface SubstitutionRecord {
  out: string;
  in: string;
  minute: number;
}

interface FormationOption {
  formation: string;
  description: string;
}

const FORMATIONS: FormationOption[] = [
  { formation: "4-3-3", description: "Balanced" },
  { formation: "4-2-3-1", description: "Defensive" },
  { formation: "3-5-2", description: "Attacking" },
  { formation: "5-3-2", description: "Conservative" },
  { formation: "5-4-1", description: "Very Defensive" },
];

// Mock lineup data for demonstration
const mockLineupData = {
  startingXI: [
    { number: 1, name: "I Made Wirawan", position: "GK", rating: 7.5 },
    { number: 2, name: "Asnawi Mangkualam", position: "RB", rating: 7.2 },
    { number: 3, name: "Toni Kusuma", position: "CB", rating: 7.4 },
    { number: 4, name: "Joko Susilo", position: "CB", rating: 7.1 },
    { number: 5, name: "Andik Vermansah", position: "LB", rating: 7.3 },
    { number: 6, name: "Erik Riyanto", position: "CM", rating: 7.2 },
    { number: 7, name: "Saddil Ramdani", position: "CM", rating: 7.4 },
    { number: 8, name: "Miod Izin", position: "RW", rating: 7.6 },
    { number: 9, name: "Bambang Pamungkas", position: "CF", rating: 8.1 },
    { number: 10, name: "Evan Dimas", position: "LW", rating: 7.8 },
    { number: 11, name: "Ilija Spasojevic", position: "ST", rating: 8.0 },
  ],
  bench: [
    { number: 12, name: "Kurniawan Dwi Yulianto", position: "GK", rating: 6.8 },
    { number: 13, name: "Riko Simanjuntak", position: "DF", rating: 6.9 },
    { number: 14, name: "Rizki Pora", position: "MF", rating: 6.7 },
    { number: 15, name: "Stefano Lilipaly", position: "FW", rating: 7.1 },
  ],
};

const upcomingMatch = mockMatches.find((m) => m.status === "Scheduled") || mockMatches[3];

export default function LineupManagement() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formation, setFormation] = useState("4-3-3");
  const [captain, setCaptain] = useState(9);
  const [subs, setSubs] = useState<SubstitutionRecord[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  const formationLabel = useMemo(() => {
    return FORMATIONS.find((f) => f.formation === formation)?.description || "Standard";
  }, [formation]);

  const handleSubmitLineup = () => {
    setSubmitted(true);
    toast({
      title: "Lineup Submitted! ✓",
      description:
        "Starting XI dan bangku cadangan telah dikirim ke Event Organizer.",
    });
  };

  const handleSaveAsDraft = () => {
    toast({
      title: "Lineup Saved",
      description: "Formasi dan pemain tersimpan sebagai draft.",
    });
  };

  return (
    <div
      className="space-y-6 animate-fade-in p-6"
      role="main"
      aria-label="Lineup Management"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lineup Management</h1>
          <p className="text-muted-foreground mt-1">
            Kelola formasi dan pemain untuk pertandingan mendatang
          </p>
        </div>

        {/* Match Card */}
        <Card className="match-card-scheduled overflow-hidden border-2">
          <div
            className="bg-gradient-to-r from-navy to-navy/90 text-navy-foreground p-6"
            role="region"
            aria-label="Match information"
          >
            <p className="text-xs uppercase tracking-widest text-navy-foreground/60 mb-3">
              {upcomingMatch.competitionName}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex-1 text-right sm:text-left">
                <p className="font-bold text-lg">SSB Garuda Muda</p>
                <p className="text-xs text-navy-foreground/60">Kandang (Home)</p>
              </div>

              <div className="flex-shrink-0 text-center space-y-2">
                <MatchStatusBadge status="Scheduled" />
                <p className="text-2xl font-bold">{upcomingMatch.time}</p>
                <p className="text-xs text-navy-foreground/60">
                  {upcomingMatch.date}
                </p>
              </div>

              <div className="flex-1 text-left">
                <p className="font-bold text-lg">{upcomingMatch.awayTeam}</p>
                <p className="text-xs text-navy-foreground/60">Tandang (Away)</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70">
              <span>📍</span>
              <span>{upcomingMatch.venue}</span>
            </div>
          </div>

          <CardContent className="pt-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:
                </span>
                <Badge
                  className={cn(
                    "text-xs border-0",
                    submitted
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  )}
                  role="status"
                  aria-label={
                    submitted ? "Lineup submitted" : "Lineup in draft"
                  }
                >
                  {submitted ? "✓ Submitted" : "📝 Draft"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Formation:
                </span>
                <Badge variant="secondary" className="text-xs">
                  {formation} {formationLabel && `(${formationLabel})`}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Captain:
                </span>
                <Badge variant="outline" className="text-xs">
                  #{captain}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="formation">Formation</TabsTrigger>
          <TabsTrigger value="squad">Squad</TabsTrigger>
          <TabsTrigger value="subs" className="hidden lg:inline-flex">
            Subs
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pitch Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <PitchVisualization
                homeTeam="SSB Garuda Muda"
                awayTeam={upcomingMatch.awayTeam}
                homeFormation={formation}
                homeLineup={mockLineupData.startingXI}
                readOnly={submitted}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Starting XI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Players:</span>
                    <span className="font-medium">11</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formation:</span>
                    <span className="font-medium">{formation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Captain:</span>
                    <span className="font-medium">
                      #{captain} -
                      {
                        mockLineupData.startingXI.find((p) => p.number === captain)
                          ?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Rating:</span>
                    <span className="font-medium">
                      {(
                        mockLineupData.startingXI.reduce((sum, p) => sum + p.rating, 0) /
                        11
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Substitution Log</CardTitle>
              </CardHeader>
              <CardContent>
                {subs.length > 0 ? (
                  <div className="space-y-2">
                    {subs.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs p-2 bg-accent/50 rounded"
                      >
                        <ArrowLeftRight className="w-3 h-3 text-primary flex-shrink-0" />
                        <span>Min {s.minute}: {s.out} → {s.in}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No substitutions recorded yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FORMATION TAB */}
        <TabsContent value="formation" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5" />
                Formation Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="formation-select" className="text-sm font-medium">
                  Select Formation
                </label>
                <Select value={formation} onValueChange={setFormation}>
                  <SelectTrigger id="formation-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATIONS.map((f) => (
                      <SelectItem key={f.formation} value={f.formation}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{f.formation}</span>
                          <span className="text-xs text-muted-foreground">
                            ({f.description})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="captain-select" className="text-sm font-medium">
                  Select Captain
                </label>
                <Select value={captain.toString()} onValueChange={(val) => setCaptain(Number(val))}>
                  <SelectTrigger id="captain-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLineupData.startingXI.map((player) => (
                      <SelectItem key={player.number} value={player.number.toString()}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{player.number}</span>
                          <span>{player.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {player.position}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                <p className="text-sm font-medium text-blue-900">Formation Details</p>
                <p className="text-xs text-blue-800">
                  <strong>Current:</strong> {formation} - {formationLabel}
                </p>
                <p className="text-xs text-blue-800">
                  This formation provides a balanced approach to both defense and
                  attack.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SQUAD TAB */}
        <TabsContent value="squad" className="space-y-4 mt-6">
          {/* Captain Selection Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Captain (Starting XI)</CardTitle>
              <p className="text-xs text-muted-foreground mt-2">
                Click on a player to set as captain (⭐)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {mockLineupData.startingXI.map((player) => (
                  <button
                    key={player.number}
                    onClick={() => setCaptain(player.number)}
                    className={cn(
                      "p-3 rounded-lg text-center transition-all focus:outline-offset-2 focus:outline-2 focus:outline-primary",
                      captain === player.number
                        ? "bg-blue-600 text-white border-2 border-blue-700 shadow-lg scale-105"
                        : "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                    )}
                    aria-label={`${player.name}, ${player.position}, number ${player.number}${
                      captain === player.number ? ", selected as captain" : ""
                    }`}
                    aria-pressed={captain === player.number}
                  >
                    <div className="font-bold text-lg">{player.number}</div>
                    <div className="text-xs font-medium truncate">
                      {player.name.split(" ")[0]}
                    </div>
                    <div className="text-xs opacity-75">{player.position}</div>
                    {captain === player.number && (
                      <div className="text-sm mt-1">⭐</div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Starting XI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Starting XI</span>
                <Badge variant="secondary" className="text-xs">
                  {mockLineupData.startingXI.length} players
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="space-y-2"
                role="list"
                aria-label="Starting XI players"
              >
                {mockLineupData.startingXI.map((player) => (
                  <div
                    key={player.number}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    role="listitem"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {player.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{player.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {player.position}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        ⭐ {player.rating}
                      </Badge>
                      {captain === player.number && (
                        <Badge className="text-xs">Captain</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bench */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Bangku Cadangan (Bench)</span>
                <Badge variant="outline" className="text-xs">
                  {mockLineupData.bench.length} players
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {mockLineupData.bench.map((player) => (
                  <div
                    key={player.number}
                    className="p-3 bg-accent/50 rounded-lg border border-accent hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-lg">{player.number}</span>
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {player.rating}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm mb-1">{player.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.position}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUBSTITUTIONS TAB */}
        <TabsContent value="subs" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Substitution History</CardTitle>
            </CardHeader>
            <CardContent>
              {subs.length > 0 ? (
                <div className="space-y-3">
                  {subs.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ArrowLeftRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Minute {s.minute}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.out} → {s.in}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setSubs(subs.filter((_, i) => i !== idx))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    No substitutions recorded yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Substitutions will appear here during the match
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sticky bottom-6 bg-white/95 backdrop-blur p-4 rounded-lg border">
        <Button
          variant="outline"
          onClick={handleSaveAsDraft}
          disabled={submitted}
          className={cn(focusVisibleClass)}
        >
          💾 Save as Draft
        </Button>

        <Button
          onClick={handleSubmitLineup}
          disabled={submitted}
          className={cn(focusVisibleClass, "gap-2")}
        >
          <Check className="w-4 h-4" />
          {submitted ? "Lineup Sudah Dikirim" : "Submit Lineup"}
        </Button>

        {submitted && (
          <div className="flex items-center gap-2 text-green-600 text-sm ml-auto">
            <Check className="w-4 h-4" />
            <span>Status: Submitted to Event Organizer</span>
          </div>
        )}
      </div>
    </div>
  );
}
