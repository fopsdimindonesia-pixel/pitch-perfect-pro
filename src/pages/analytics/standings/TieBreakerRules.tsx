import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp } from 'lucide-react';

const tieBreakers = [
  { order: 1, rule: 'Points', description: 'Total points gained (3 for win, 1 for draw)', examples: ['Team A: 45 points', 'Team B: 42 points'] },
  { order: 2, rule: 'Goal Difference', description: 'Goals scored minus goals conceded', examples: ['Team A: +12 GD', 'Team B: -5 GD'] },
  { order: 3, rule: 'Goals Scored', description: 'Total goals scored in all matches', examples: ['Team A: 48 goals', 'Team B: 42 goals'] },
  { order: 4, rule: 'Head to Head', description: 'Points, GD, and GF in matches between the teams', examples: ['Direct match records'] },
  { order: 5, rule: 'Away Goals', description: 'Away goals in head-to-head matches', examples: ['Used if teams still tied'] },
  { order: 6, rule: 'Fair Play', description: 'Disciplinary record (red/yellow cards)', examples: ['Fewer cards preferred'] },
];

export default function TieBreakerRules() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tie Breaker Rules</h1>
          <p className="text-muted-foreground mt-1">Competition tie breaker rules and rankings criteria</p>
        </div>
      </section>

      {/* Introduction */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            When two or more teams have the same points, the following tie breakers are applied in order to determine ranking and qualification.
          </p>
        </CardContent>
      </Card>

      {/* Tie Breaker Rules */}
      <section aria-label="Tie breaker rules list" className="space-y-4">
        {tieBreakers.map((tieBreaker) => (
          <Card key={tieBreaker.order}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold">
                    {tieBreaker.order}
                  </Badge>
                  <div>
                    <CardTitle className="text-lg">{tieBreaker.rule}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{tieBreaker.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2">Examples:</h4>
                <div className="space-y-1">
                  {tieBreaker.examples.map((example, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ArrowUp className="w-3 h-3" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Example Scenario */}
      <Card>
        <CardHeader>
          <CardTitle>Example Scenario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When Team A and Team B both have 42 points, we apply tie breakers in order:
          </p>
          <div className="space-y-2 text-sm">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">1. Check Points:</p>
              <p className="text-muted-foreground">Both have 42 points → Tied</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">2. Check Goal Difference:</p>
              <p className="text-muted-foreground">Team A: +8 GD, Team B: +5 GD → Team A Wins</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
            <p className="font-semibold">Result:</p>
            <p>Team A ranks higher than Team B due to better goal difference.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
