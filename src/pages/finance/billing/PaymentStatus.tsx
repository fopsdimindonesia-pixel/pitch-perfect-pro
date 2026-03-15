import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const paymentStatusData = [
  { date: '2026-03-10', successful: 5, pending: 2, failed: 1 },
  { date: '2026-03-11', successful: 8, pending: 1, failed: 0 },
  { date: '2026-03-12', successful: 6, pending: 2, failed: 1 },
  { date: '2026-03-13', successful: 9, pending: 1, failed: 0 },
  { date: '2026-03-14', successful: 7, pending: 2, failed: 1 },
  { date: '2026-03-15', successful: 10, pending: 0, failed: 0 },
];

export default function PaymentStatus() {
  return (
    <main role="main" aria-label="Payment status overview">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Status Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time payment status and analytics</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <h2 id="metrics-title" className="sr-only">Payment Status Metrics</h2>
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Successful Payments</p>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Failed Payments</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="status-chart">Payment Status Trend (6 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="successful" fill="#22c55e" name="Successful" />
                <Bar dataKey="pending" fill="#eab308" name="Pending" />
                <Bar dataKey="failed" fill="#ef4444" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Success Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">93.8%</p>
              <p className="text-xs text-muted-foreground mt-2">45 out of 48 transactions</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '93.8%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">2.3h</p>
              <p className="text-xs text-muted-foreground mt-2">From initiation to completion</p>
            </div>
            <p className="text-xs text-center text-muted-foreground">Fastest: 15 min | Slowest: 8h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Failed Transaction Reasons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Insufficient Funds</span>
              <Badge className="bg-red-100 text-red-800">2</Badge>
            </div>
            <div className="flex justify-between">
              <span>Gateway Timeout</span>
              <Badge className="bg-orange-100 text-orange-800">1</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
