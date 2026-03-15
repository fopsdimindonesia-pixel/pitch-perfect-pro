import { mockStandings, mockCompetitions } from "@/lib/mockData";
import { StandingsTable } from "@/components/shared/StandingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Standings() {
  const [compId, setCompId] = useState("comp-1");
  const comp = mockCompetitions.find((c) => c.id === compId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Klasemen</h1>
          <p className="text-muted-foreground text-sm mt-1">Klasemen otomatis berdasarkan hasil pertandingan.</p>
        </div>
        <Select value={compId} onValueChange={setCompId}>
          <SelectTrigger className="w-56 h-8 text-sm">
            <SelectValue placeholder="Pilih kompetisi" />
          </SelectTrigger>
          <SelectContent>
            {mockCompetitions.filter((c) => c.status !== "Draft").map((c) => (
              <SelectItem key={c.id} value={c.id} className="text-sm">{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {comp && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{comp.name}</CardTitle>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{comp.ageGroup}</span>
                <span>·</span>
                <span>{comp.format}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <StandingsTable data={mockStandings} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Top Scorer", player: "Rizky Pratama", club: "SSB Garuda Muda", value: "7 Gol" },
          { label: "Top Assist", player: "Andi Santoso", club: "SSB Garuda Muda", value: "5 Assist" },
          { label: "Clean Sheet", player: "Budi Pratama", club: "SSB Garuda Muda", value: "2 CS" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className="font-bold text-sm mt-2">{s.player}</p>
              <p className="text-xs text-muted-foreground">{s.club}</p>
              <p className="text-2xl font-black text-primary mt-2 tabular-nums">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
