import { mockMatches } from "@/lib/mockData";
import { MatchCard } from "@/components/shared/MatchCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

// Group matches by date
const grouped = mockMatches.reduce((acc, m) => {
  if (!acc[m.date]) acc[m.date] = [];
  acc[m.date].push(m);
  return acc;
}, {} as Record<string, typeof mockMatches>);

export default function Schedule() {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Match schedule">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 id="page-title" className="text-2xl font-bold tracking-tight">Jadwal Pertandingan</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola jadwal pertandingan semua kompetisi.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setWeekOffset((w) => w - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-3">
            {weekOffset === 0 ? "Minggu Ini" : weekOffset === 1 ? "Minggu Depan" : `${weekOffset > 0 ? "+" : ""}${weekOffset} minggu`}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setWeekOffset((w) => w + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Date headers */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, i) => (
          <div key={day} className="text-center">
            <p className="text-xs text-muted-foreground">{day}</p>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium mt-1 ${i === 6 ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
              {10 + i + weekOffset * 7}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, matches]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <p className="text-xs text-muted-foreground font-medium bg-background px-2">
                {new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matches.map((m) => (
                <MatchCard
                  key={m.id}
                  {...m}
                  competitionName={m.competitionName}
                  onClick={() => navigate("/eo/match-sheet")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
