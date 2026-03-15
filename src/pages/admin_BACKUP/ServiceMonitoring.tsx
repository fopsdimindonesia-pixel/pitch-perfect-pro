import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const mockServices = [
  {
    id: "SVC-001",
    name: "API Server",
    status: "Operational",
    uptime: 99.98,
    avgResponseTime: 85,
    lastIncident: "2024-12-10",
    healthScore: 98
  },
  {
    id: "SVC-002",
    name: "Database",
    status: "Operational",
    uptime: 99.95,
    avgResponseTime: 45,
    lastIncident: "2024-12-08",
    healthScore: 97
  },
  {
    id: "SVC-003",
    name: "Cache Service",
    status: "Operational",
    uptime: 99.92,
    avgResponseTime: 12,
    lastIncident: "2024-12-09",
    healthScore: 96
  },
  {
    id: "SVC-004",
    name: "Email Service",
    status: "Degraded",
    uptime: 98.45,
    avgResponseTime: 2400,
    lastIncident: "2024-12-15",
    healthScore: 82
  },
  {
    id: "SVC-005",
    name: "Payment Gateway",
    status: "Operational",
    uptime: 99.97,
    avgResponseTime: 280,
    lastIncident: "2024-12-11",
    healthScore: 99
  },
  {
    id: "SVC-006",
    name: "Storage Service",
    status: "Operational",
    uptime: 99.94,
    avgResponseTime: 320,
    lastIncident: "2024-12-07",
    healthScore: 95
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case "Operational":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "Degraded":
      return <AlertCircle className="w-5 h-5 text-orange-600" />;
    case "Down":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Operational":
      return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
    case "Degraded":
      return <Badge className="bg-orange-100 text-orange-800">Degraded</Badge>;
    case "Down":
      return <Badge className="bg-red-100 text-red-800">Down</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function ServiceMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Monitoring</h1>
        <p className="text-muted-foreground mt-1">Monitor health and status of platform services</p>
      </div>

      {/* Overall Status */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Platform Status</h2>
            <p className="text-2xl font-bold text-green-600">All Systems Operational</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Avg Uptime (30 days)</p>
            <p className="text-2xl font-bold mt-1">99.92%</p>
          </div>
        </div>
      </Card>

      {/* Service Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockServices.map((service) => (
          <Card key={service.id} className="p-6 hover:border-blue-400 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(service.status)}
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{service.id}</p>
                </div>
              </div>
              {getStatusBadge(service.status)}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Uptime</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        service.uptime >= 99.5 ? "bg-green-600" :
                        service.uptime >= 99 ? "bg-blue-600" :
                        "bg-orange-600"
                      }`}
                      style={{ width: `${service.uptime}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold ml-2">{service.uptime}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <span className="text-sm font-semibold">{service.avgResponseTime}ms</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Health Score</p>
                <span className="text-sm font-semibold">{service.healthScore}/100</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <p className="text-xs text-muted-foreground">Last Incident</p>
                <span className="text-xs font-medium">{service.lastIncident}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Service Dependencies */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Service Dependencies</h2>
        <div className="space-y-4">
          {[
            {
              service: "API Server",
              depends: ["Database", "Cache Service", "Payment Gateway"],
              status: "healthy"
            },
            {
              service: "Database",
              depends: ["Storage Service"],
              status: "healthy"
            },
            {
              service: "Email Service",
              depends: ["SMTP Provider"],
              status: "degraded"
            }
          ].map((dep, i) => (
            <div key={i} className="p-4 rounded-lg border hover:bg-muted/50">
              <p className="font-medium text-sm mb-2">{dep.service}</p>
              <div className="flex flex-wrap gap-2">
                {dep.depends.map((d) => (
                  <span key={d} className="inline-block px-2 py-1 bg-muted text-xs rounded font-medium">
                    {d}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      dep.status === "healthy" ? "bg-green-600" :
                      dep.status === "degraded" ? "bg-orange-600" :
                      "bg-red-600"
                    }`}
                    style={{ width: dep.status === "healthy" ? "100%" : "75%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Incident History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
        <div className="space-y-3">
          {[
            {
              date: "2024-12-15 04:30",
              service: "Email Service",
              issue: "High latency - SMTP timeouts",
              duration: "45 min",
              status: "Resolved"
            },
            {
              date: "2024-12-10 14:20",
              service: "API Server",
              issue: "Database connection pool exhausted",
              duration: "12 min",
              status: "Resolved"
            },
            {
              date: "2024-12-08 08:15",
              service: "Cache Service",
              issue: "Memory pressure - eviction rate high",
              duration: "8 min",
              status: "Resolved"
            }
          ].map((incident, i) => (
            <div key={i} className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50">
              <div className="flex-1">
                <p className="font-medium text-sm">{incident.service}</p>
                <p className="text-xs text-muted-foreground mt-1">{incident.issue}</p>
                <p className="text-xs text-muted-foreground mt-1">{incident.date} • Duration: {incident.duration}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">{incident.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Maintenance Schedule */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Scheduled Maintenance</h2>
        <div className="space-y-3">
          {[
            {
              date: "2024-12-22 02:00 - 04:00",
              service: "Database",
              reason: "Index optimization",
              impact: "1-2 min downtime"
            },
            {
              date: "2024-12-25 01:00 - 03:00",
              service: "API Server",
              reason: "Security patches",
              impact: "Zero downtime"
            }
          ].map((maintenance, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-blue-50">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">{maintenance.service}</p>
                <p className="text-xs text-muted-foreground mt-1">{maintenance.date}</p>
                <p className="text-xs text-muted-foreground">{maintenance.reason} • {maintenance.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
