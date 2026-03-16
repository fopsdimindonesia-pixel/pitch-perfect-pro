/**
 * ClubSchedule — Read-only fixture view for clubs
 * Shows only matches involving the club's registered competitions
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { useCompetitionData } from '@/context/CompetitionDataContext';

export default function ClubSchedule() {
  const { getClubFixtures, competitions } = useCompetitionData();
  const clubName = 'SSB Garuda Muda';
  const fixtures = getClubFixtures(clubName);

  const upcoming = fixtures.filter(f => f.status === 'Scheduled').sort((a, b) => a.date.localeCompare(b.date));
  const past = fixtures.filter(f => f.status === 'Finished').sort((a, b) => b.date.localeCompare(a.date));
  const nextMatch = upcoming[0];

  const getCompetitionName = (competitionId: string) => {
    return competitions.find(c => c.id === competitionId)?.name || 'Kompetisi';
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      Live: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      Finished: 'bg-muted text-muted-foreground',
    };
    return map[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jadwal Pertandingan</h1>
        <p className="text-muted-foreground mt-1">Jadwal pertandingan {clubName}</p>
      </div>

      {/* Next Match Countdown */}
      {nextMatch && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Pertandingan Selanjutnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  {nextMatch.homeTeam} vs {nextMatch.awayTeam}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {getCompetitionName(nextMatch.competitionId)} • Matchday {nextMatch.matchday}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{nextMatch.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{nextMatch.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{nextMatch.venue}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{upcoming.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Akan Datang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{past.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Selesai</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{fixtures.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Pertandingan Mendatang</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map(fix => (
              <div key={fix.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{fix.homeTeam} vs {fix.awayTeam}</p>
                  <p className="text-xs text-muted-foreground">
                    {getCompetitionName(fix.competitionId)} • MD {fix.matchday}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{fix.date}</p>
                  <p className="text-xs text-muted-foreground">{fix.time} • {fix.venue}</p>
                </div>
                <Badge className={`ml-3 ${getStatusColor(fix.status)}`}>{fix.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Past */}
      {past.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Pertandingan Selesai</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {past.map(fix => (
              <div key={fix.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{fix.homeTeam} vs {fix.awayTeam}</p>
                  <p className="text-xs text-muted-foreground">
                    {getCompetitionName(fix.competitionId)} • MD {fix.matchday}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{fix.homeScore} - {fix.awayScore}</p>
                </div>
                <Badge className={`ml-3 ${getStatusColor(fix.status)}`}>Selesai</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {fixtures.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Belum ada jadwal pertandingan untuk klub Anda</p>
        </Card>
      )}
    </div>
  );
}
