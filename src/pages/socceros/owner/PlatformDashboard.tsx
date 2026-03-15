import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SoccerosDashboardLayout, PageHeader, StatCard } from '@/components/socceros/DashboardLayout';
import { mockDashboardStats, getChartData, type ChartDataPoint } from '@/lib/socceros/mockData';
import { TrendingUp, Users, Trophy, BarChart3, Activity } from 'lucide-react';

export default function PlatformOwnerDashboard() {
  const chartData = getChartData('revenue');

  return (
    <SoccerosDashboardLayout role="OWNER">
      <PageHeader
        title="Platform Dashboard"
        subtitle="Monitor global system health and analytics"
        icon="🏢"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Active Users"
          value={mockDashboardStats.totalUsers.toLocaleString()}
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 8.2, direction: 'up' }}
          color="blue"
        />
        <StatCard
          title="Active Competitions"
          value={mockDashboardStats.activeCompetitions}
          icon={<Trophy className="w-6 h-6" />}
          trend={{ value: 5.1, direction: 'up' }}
          color="purple"
        />
        <StatCard
          title="Total Matches"
          value={mockDashboardStats.totalMatches}
          icon={<BarChart3 className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Total Clubs"
          value={mockDashboardStats.totalClubs}
          icon={<Trophy className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="System Health"
          value={`${mockDashboardStats.systemHealth}%`}
          icon={<Activity className="w-6 h-6" />}
          color="green"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold">$125.2M</div>
              <p className="text-sm text-muted-foreground">Total revenue (12 months)</p>
              <div className="space-y-2">
                {chartData.map((item: ChartDataPoint, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-12 text-xs font-medium">{item.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2" style={{ width: '100%' }}>
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${((item.value as number) / 70) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs">${item.value}M</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: 'API Service', status: 'operational', cpu: 45 },
                { name: 'Database', status: 'operational', cpu: 62 },
                { name: 'Cache Server', status: 'operational', cpu: 38 },
                { name: 'Email Service', status: 'operational', cpu: 28 },
              ].map((service, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ✓ {service.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${service.cpu}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">CPU: {service.cpu}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Manage users across the platform</p>
            <Button className="w-full" variant="outline">
              Users & Roles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Financial Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Monitor platform subscriptions</p>
            <Button className="w-full" variant="outline">
              Billing & Revenue
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Audit logs and security settings</p>
            <Button className="w-full" variant="outline">
              Security Center
            </Button>
          </CardContent>
        </Card>
      </div>
    </SoccerosDashboardLayout>
  );
}
