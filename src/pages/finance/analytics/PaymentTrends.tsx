import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const paymentTrends = [
  { month: 'Jan', transactions: 145, successful: 142, pending: 2, failed: 1, avgAmount: 1275000 },
  { month: 'Feb', transactions: 178, successful: 175, pending: 2, failed: 1, avgAmount: 1235000 },
  { month: 'Mar', transactions: 195, successful: 190, pending: 3, failed: 2, avgAmount: 1282000 },
  { month: 'Apr', transactions: 165, successful: 160, pending: 3, failed: 2, avgAmount: 1393000 },
];

export default function PaymentTrends() {
  return (
    <main role="main" aria-label="Payment trends analysis">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Trends Analysis</h1>
        <p className="text-muted-foreground mt-1">Track payment patterns, success rates, and transaction volume</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Payment Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">683</p>
            <p className="text-xs text-green-600 mt-1">↑ 13.8% growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Transaction Size</p>
            <p className="text-2xl font-bold">Rp 1.3M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">97.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Peak Month</p>
            <p className="text-2xl font-bold">March</p>
            <p className="text-xs text-muted-foreground mt-1">195 transactions</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="transaction-trend">Transaction Volume & Size Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="transactions" stroke="#3b82f6" name="Transaction Count" />
                <Line yAxisId="right" type="monotone" dataKey="avgAmount" stroke="#ec4899" name="Avg Amount" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="success-trend">Payment Success Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="successful" stroke="#22c55e" name="Successful" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#eab308" name="Pending" />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transaction Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>Successful</span>
                <span className="font-semibold">667 (97.6%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '97.6%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Pending</span>
                <span className="font-semibold">10 (1.5%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '1.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Failed</span>
                <span className="font-semibold">6 (0.9%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '0.9%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Bank Transfer</p>
              <p className="text-xs text-muted-foreground">98.1% success rate</p>
            </div>
            <div className="p-2 bg-red-50 rounded">
              <p className="font-medium">Credit Card</p>
              <p className="text-xs text-muted-foreground">95.2% success rate</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">E-Wallet</p>
              <p className="text-xs text-muted-foreground">97.8% success rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>March (Peak)</span>
              <span className="font-semibold">195 txns</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>February</span>
              <span className="font-semibold">178 txns</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>January</span>
              <span className="font-semibold">145 txns</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
