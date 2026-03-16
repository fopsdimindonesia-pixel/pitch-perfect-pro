import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Goal, AlertCircle } from 'lucide-react';

const mockEvents = [
  { id: 1, min: 12, type: 'goal', player: 'Bambang Pamungkas', assist: 'Evan Dimas', team: 'home' },
  { id: 2, min: 24, type: 'card', player: 'Toni Kusuma', team: 'away' },
  { id: 3, min: 31, type: 'goal', player: 'Marko Milic', assist: null, team: 'away' },
  { id: 4, min: 52, type: 'sub', playerOut: 'Rizki Pora', playerIn: 'Saddil Ramdani', team: 'home' },
  { id: 5, min: 77, type: 'goal', player: 'Ilija Spasojevic', assist: 'Bambang Pamungkas', team: 'home' },
];

export default function MatchTimeline() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match Timeline</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda vs Persikabo</p>
          </div>
        </div>
      </section>

      {/* Live Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-red-50">
        <CardContent className="p-8">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">SSB Garuda Muda</p>
              <p className="text-5xl font-black text-blue-600">2</p>
            </div>
            <Badge className="h-fit">LIVE 90+5'</Badge>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Persikabo</p>
              <p className="text-5xl font-black text-red-600">1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle id="timeline-heading">Event Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" role="region" aria-labelledby="timeline-heading">
            {mockEvents.map((event, idx) => (
              <div key={event.id} className="flex gap-4">
                <div className="text-center">
                  <div className="font-bold text-lg">{event.min}'</div>
                  <div className="h-12 w-1 bg-gray-300 mx-auto mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {event.type === 'goal' && (
                      <>
                        <Goal className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Goal</span>
                      </>
                    )}
                    {event.type === 'card' && (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="font-semibold">Yellow Card</span>
                      </>
                    )}
                    {event.type === 'sub' && (
                      <>
                        <span className="font-semibold">Substitution</span>
                      </>
                    )}
                    <Badge className={event.team === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                      {event.team === 'home' ? 'Home' : 'Away'}
                    </Badge>
                  </div>
                  {event.type === 'goal' && (
                    <p className="text-sm">
                      <span className="font-medium">{event.player}</span>
                      {event.assist && <span className="text-muted-foreground"> (Assist: {event.assist})</span>}
                    </p>
                  )}
                  {event.type === 'card' && (
                    <p className="text-sm"><span className="font-medium">{event.player}</span></p>
                  )}
                  {event.type === 'sub' && (
                    <p className="text-sm"><span className="font-medium">{event.playerOut}</span> → <span className="font-medium">{event.playerIn}</span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <section aria-label="Match timeline statistics">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-muted-foreground">Home Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-sm text-muted-foreground">Away Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">Total Cards</p>
          </CardContent>
        </Card>
      </div>
    </section>
  </main>
  );
}
