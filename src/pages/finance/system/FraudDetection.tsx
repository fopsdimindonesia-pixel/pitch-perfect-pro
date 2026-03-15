import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle } from 'lucide-react';

const fraudIndicators = [
  { id: 'FRAUD-001', type: 'Duplicate Transactions', riskLevel: 'low', count: 2, lastDetected: '2026-03-15 08:30', status: 'reviewed', action: 'mark-safe' },
  { id: 'FRAUD-002', type: 'Velocity Attack', riskLevel: 'medium', count: 5, lastDetected: '2026-03-14 16:45', status: 'under-review', action: 'block-account' },
  { id: 'FRAUD-003', type: 'Geographic Anomaly', riskLevel: 'low', count: 1, lastDetected: '2026-03-13 22:10', status: 'resolved', action: 'monitor' },
];

export default function FraudDetection() {
  return (
    <main role="main" aria-label="Fraud detection monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Fraud Detection</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage potential fraud indicators</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Fraud Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Fraud Cases (YTD)</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Prevented Loss</p>
            <p className="text-2xl font-bold">Rp 25M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Detection Rate</p>
            <p className="text-2xl font-bold text-green-600">98.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">False Positive</p>
            <p className="text-2xl font-bold">1.2%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="fraud-detection-table" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Detected Fraud Indicators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fraudIndicators.map((fraud) => (
            <div key={fraud.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{fraud.type}</p>
                  <p className="text-sm text-muted-foreground">{fraud.id} • Last: {fraud.lastDetected}</p>
                </div>
                <Badge
                  className={
                    fraud.riskLevel === 'high'
                      ? 'bg-red-100 text-red-800'
                      : fraud.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }
                >
                  {fraud.riskLevel}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Instances</p>
                  <p className="font-semibold">{fraud.count}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold">{fraud.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recommended</p>
                  <p className="font-semibold text-sm">{fraud.action}</p>
                </div>
              </div>

              <Button size="sm" variant="outline">
                {fraud.action === 'block-account' ? 'Block Account' : fraud.action === 'mark-safe' ? 'Mark Safe' : 'Continue Monitoring'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">3D Secure Verification</p>
              <p className="text-xs text-muted-foreground">✓ Enabled for all CC</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Fraud Machine Learning</p>
              <p className="text-xs text-muted-foreground">✓ Active (98.5% accuracy)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Velocity Limits</p>
              <p className="text-xs text-muted-foreground">✓ Configured</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Fraud Prevention Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Successful Blocks</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Prevented Losses</span>
              <span className="font-semibold">Rp 25M</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 rounded">
              <span>False Positives</span>
              <span className="font-semibold">1.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
