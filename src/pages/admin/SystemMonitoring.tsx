import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Zap, Database, Cog } from "lucide-react";

const systemMetrics = [
  { name: "Server Status", status: "Healthy", uptime: "99.98%", icon: Server },
  { name: "API Response Time", status: "Fast", latency: "45ms", icon: Zap },
  { name: "Database Health", status: "Optimal", latency: "12ms", icon: Database },
  { name: "Background Jobs", status: "Running", latency: "250 jobs/hr", icon: Cog },
];

const activeServices = [
  { name: "Authentication Service", status: "Operational", uptime: "99.99%", latency: "25ms" },
  { name: "Payment Processor", status: "Operational", uptime: "99.95%", latency: "180ms" },
  { name: "Email Service", status: "Operational", uptime: "99.99%", latency: "850ms" },
  { name: "File Storage", status: "Operational", uptime: "99.98%", latency: "120ms" },
  { name: "Cache System", status: "Operational", uptime: "99.99%", latency: "5ms" },
  { name: "Message Queue", status: "Operational", uptime: "99.97%", latency: "15ms" },
];

export default function SystemMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <p className="text-muted-foreground mt-1">Real-time system health and status</p>
      </div>

      {/* Monitoring Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Icon className="w-6 h-6 text-blue-600" />
                <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{metric.name}</p>
              <p className="text-lg font-bold">{metric.status}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {metric.uptime || metric.latency}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Services Table */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Active Services</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Service Name</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Uptime</th>
                <th className="text-left p-4 font-semibold">Latency</th>
              </tr>
            </thead>
            <tbody>
              {activeServices.map((service) => (
                <tr key={service.name} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{service.name}</td>
                  <td className="p-4">
                    <Badge className="bg-green-100 text-green-800 text-xs">{service.status}</Badge>
                  </td>
                  <td className="p-4 text-sm">{service.uptime}</td>
                  <td className="p-4 text-sm font-mono text-muted-foreground">{service.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
