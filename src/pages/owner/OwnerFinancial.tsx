import { mockFinancialRecords, mockRevenueChart } from "@/lib/mockData";
import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

const formatIDRShort = (v: number) => {
  if (v >= 1000000) return `Rp ${(v / 1000000).toFixed(1)}jt`;
  return formatIDR(v);
};

export default function OwnerFinancial() {
  const totalRevenue = mockRevenueChart.reduce((s, m) => s + m.revenue, 0);
  const thisMonth = mockRevenueChart[mockRevenueChart.length - 1].revenue;
  const lastMonth = mockRevenueChart[mockRevenueChart.length - 2].revenue;
  const growth = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Platform financial overview">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Financial</h1>
        <p className="text-muted-foreground text-sm mt-1">Revenue platform dari subscription dan registration fee.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={formatIDRShort(totalRevenue)} icon={DollarSign} accent="gold" trend={{ value: growth, label: "vs last month" }} />
        <StatCard title="Bulan Ini" value={formatIDRShort(thisMonth)} icon={TrendingUp} accent="primary" />
        <StatCard title="Subscription Aktif" value={4} icon={Users} accent="navy" />
        <StatCard title="Tagihan Pending" value={1} icon={CreditCard} accent="destructive" />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Revenue 6 Bulan Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockRevenueChart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220 15% 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 15% 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip
                formatter={(v: number) => [formatIDR(v), "Revenue"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(220 15% 88%)" }}
              />
              <Bar dataKey="revenue" fill="hsl(142 65% 28%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Log Pembayaran</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tipe</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Entity</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Plan / Period</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Jumlah</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFinancialRecords.map((rec) => (
                <TableRow key={rec.id} className="hover:bg-accent/30">
                  <TableCell className="text-xs text-muted-foreground">{rec.type}</TableCell>
                  <TableCell className="text-sm font-medium">{rec.entity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{rec.period}</TableCell>
                  <TableCell className="text-right text-sm font-medium tabular-nums">{formatIDR(rec.amount)}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", rec.status === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                      {rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{rec.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
