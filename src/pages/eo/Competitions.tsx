import { mockCompetitions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Users, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const formatColors: Record<string, string> = {
  League: "bg-primary/10 text-primary",
  Knockout: "bg-destructive/10 text-destructive",
  "Group+KO": "bg-gold/15 text-gold-foreground",
};

const statusColors: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Draft: "bg-secondary text-muted-foreground",
  Finished: "bg-navy/10 text-navy",
};

export default function Competitions() {
  const navigate = useNavigate();

  const handleCompetitionClick = (compId: string) => {
    navigate(`/eo/competitions/${compId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Competition list">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 id="page-title" className="text-2xl font-bold tracking-tight">Kompetisi</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola seluruh kompetisi yang Anda buat.</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => navigate("/eo/competitions/create")}>
          <Plus className="w-4 h-4" />
          Buat Kompetisi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockCompetitions.map((comp) => (
          <Card
            key={comp.id}
            className="hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
            onClick={() => handleCompetitionClick(comp.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", formatColors[comp.format])}>
                      {comp.format}
                    </Badge>
                    <Badge className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background text-muted-foreground">
                      {comp.ageGroup}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">{comp.name}</CardTitle>
                </div>
                <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0 flex-shrink-0", statusColors[comp.status])}>
                  {comp.status}
                </Badge>
              </div>
              <CardDescription className="text-xs">{comp.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{comp.clubs} Klub</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{comp.startDate} – {comp.endDate}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Registration Fee</span>
                <span className="text-xs font-semibold tabular-nums">
                  Rp {comp.registrationFee.toLocaleString("id-ID")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
