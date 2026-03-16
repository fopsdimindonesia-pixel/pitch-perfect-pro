import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, AlertCircle } from "lucide-react";

export default function OperationsDashboard() {
  const stats = [
    { label: "Facility Usage", value: "87%", icon: Calendar, trend: "+5%" },
    { label: "Staff Present", value: "34/40", icon: Users, trend: "Today" },
    { label: "Active Events", value: "8", icon: TrendingUp, trend: "This Week" },
    { label: "Maintenance Tasks", value: "3", icon: AlertCircle, trend: "Pending" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Operations Dashboard</h1>
        <p className="text-muted-foreground mt-1">Stadium and facility operational metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                  </div>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Facility Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span>Main Pitch</span>
              <Badge className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span>Training Fields</span>
              <Badge className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span>Gym</span>
              <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Medical Room</span>
              <Badge className="bg-green-100 text-green-800">Operational</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ Morning Stadium Tour - 9:00 AM</p>
            <p>✓ Training Session - 10:00 AM</p>
            <p>✓ Facility Inspection - 2:00 PM</p>
            <p>• Media Event Setup - 3:00 PM</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
