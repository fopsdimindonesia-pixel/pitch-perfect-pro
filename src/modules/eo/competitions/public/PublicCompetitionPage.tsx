import { Card } from "@/components/ui/card";
import { Trophy, Users, BarChart3, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function PublicCompetitionPage() {
  const { activeCompetition, matches, registrations } = useCompetition();

  return (
    <div className="space-y-8" role="main" aria-label="Public competition page">
      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi untuk preview halaman publik</Card>
      ) : (
        <>
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-12 rounded-lg">
            <h1 id="page-title" className="text-4xl font-bold">{activeCompetition.name}</h1>
            <p className="text-primary-foreground/80 mt-2">{activeCompetition.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">Teams</p>
              </div>
              <p className="text-2xl font-bold">{registrations.length}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">Matches</p>
              </div>
              <p className="text-2xl font-bold">{matches.length}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">Format</p>
              </div>
              <p className="text-sm font-medium">{activeCompetition.format}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-destructive" />
                <p className="text-sm text-muted-foreground">Age Group</p>
              </div>
              <p className="text-sm font-medium">{activeCompetition.ageGroup}</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About This Competition</h2>
            <p className="text-muted-foreground mb-4">{activeCompetition.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-sm">Dates</p>
                <p className="text-muted-foreground">{activeCompetition.startDate} – {activeCompetition.endDate}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Registration Fee</p>
                <p className="text-muted-foreground">Rp {activeCompetition.registrationFee.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Status</p>
                <Badge className="w-fit mt-1">{activeCompetition.status}</Badge>
              </div>
              <div>
                <p className="font-semibold text-sm">Clubs Target</p>
                <p className="text-muted-foreground">{activeCompetition.clubs} clubs</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
