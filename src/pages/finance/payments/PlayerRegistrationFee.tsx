import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const playerRegistrations = [
  { id: 1, player: 'Bambang Pamungkas', club: 'SSB Garuda Muda', competition: 'Premier League', fee: 100000, status: 'paid', date: '2026-03-10' },
  { id: 2, player: 'Evan Dimas', club: 'SSB Garuda Muda', competition: 'Premier League', fee: 100000, status: 'paid', date: '2026-03-09' },
  { id: 3, player: 'Ilija Spasojevic', club: 'Persija Jakarta', competition: 'Cup Tournament', fee: 100000, status: 'pending', date: '2026-03-08' },
  { id: 4, player: 'Saddil Ramdani', club: 'Bali United', competition: 'Premier League', fee: 100000, status: 'failed', date: '2026-03-07' },
  { id: 5, player: 'Menyerah Siaheuw', club: 'PSM Makassar', competition: 'Regional League', fee: 50000, status: 'paid', date: '2026-03-06' },
];

export default function PlayerRegistrationFee() {
  return (
    <main role="main" aria-label="Player registration fees">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Player Registration Fees</h1>
        <p className="text-muted-foreground mt-1">Track player registration fee payments</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Player Fee Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Registrations</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold">Rp 450K</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="player-fees">Player Registration Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Player</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Club</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Competition</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Fee</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {playerRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{reg.player}</td>
                    <td className="py-3 px-2 text-sm">{reg.club}</td>
                    <td className="py-3 px-2 text-sm">{reg.competition}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(reg.fee).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={
                          reg.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : reg.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }
                      >
                        {reg.status === 'paid' ? '✓ Paid' : reg.status === 'pending' ? '⏳ Pending' : '✗ Failed'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{reg.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
