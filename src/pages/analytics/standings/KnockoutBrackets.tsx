import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function KnockoutBrackets() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knockout Brackets</h1>
          <p className="text-muted-foreground mt-1">Knockout stage tournament brackets</p>
        </div>
      </section>

      {/* Round of 16 */}
      <Card>
        <CardHeader>
          <CardTitle>Round of 16</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Match {i + 1}</span>
                  <Badge variant="outline">{['TBD', 'Live', 'FT'][Math.floor(Math.random() * 3)]}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span>Team {i * 2 + 1}</span>
                    <span className="font-bold">-</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Team {i * 2 + 2}</span>
                    <span className="font-bold">-</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quarter Finals */}
      <Card>
        <CardHeader>
          <CardTitle>Quarter Finals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Match {i + 1}</span>
                  <Badge variant="outline">TBD</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span>Winner Match {i * 2 + 1}</span>
                    <span className="font-bold">-</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Winner Match {i * 2 + 2}</span>
                    <span className="font-bold">-</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Semi Finals */}
      <Card>
        <CardHeader>
          <CardTitle>Semi Finals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Match {i + 1}</span>
                  <Badge variant="outline">TBD</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span>Winner QF {i * 2 + 1}</span>
                    <span className="font-bold">-</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Winner QF {i * 2 + 2}</span>
                    <span className="font-bold">-</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final */}
      <Card>
        <CardHeader>
          <CardTitle>Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded p-4 space-y-3 max-w-sm mx-auto">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Championship Match</span>
              <Badge variant="outline">TBD</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded font-medium">
                <span>Winner SF 1</span>
                <span className="text-xl">-</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded font-medium">
                <span>Winner SF 2</span>
                <span className="text-xl">-</span>
              </div>
            </div>
            <div className="pt-2 border-t text-sm font-bold text-center">Champion</div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
