import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CreditCard, Bank, Smartphone } from 'lucide-react';

const gateways = [
  { id: 1, name: 'Bank Transfer (BCA)', provider: 'BCA Virtual Account', status: 'active', fee: 0.5, icon: Bank },
  { id: 2, name: 'Credit Card (Visa/MC)', provider: 'Stripe', status: 'active', fee: 2.9, icon: CreditCard },
  { id: 3, name: 'E-Wallet (GCash)', provider: 'GCash Integration', status: 'active', fee: 1.5, icon: Smartphone },
  { id: 4, name: 'Bank Deposit', provider: 'Manual Transfer', status: 'inactive', fee: 0, icon: Bank },
  { id: 5, name: 'Online Banking', provider: 'MultiBank Platform', status: 'active', fee: 0.75, icon: Bank },
];

export default function PaymentGateway() {
  return (
    <main role="main" aria-label="Payment gateway configuration">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Gateway Configuration</h1>
        <p className="text-muted-foreground mt-1">Manage payment gateway settings and status</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Gateway Summary</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Gateways</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Transaction Fee</p>
            <p className="text-2xl font-bold">1.4%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Monthly Uptime</p>
            <p className="text-2xl font-bold text-blue-600">99.8%</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map((gateway) => {
          const IconComponent = gateway.icon;
          return (
            <Card key={gateway.id} className={gateway.status === 'inactive' ? 'opacity-60' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{gateway.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{gateway.provider}</p>
                    </div>
                  </div>
                  <Badge className={gateway.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {gateway.status === 'active' ? '● Active' : '● Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Transaction Fee</p>
                    <p className="text-lg font-bold">{gateway.fee}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-lg font-bold">{gateway.status === 'active' ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded bg-gray-50">
                  <span className="text-sm font-medium">Enable Gateway</span>
                  <Switch defaultChecked={gateway.status === 'active'} />
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Configure Settings
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
