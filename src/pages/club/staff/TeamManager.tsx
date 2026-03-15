import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Mail, Phone, MapPin, Trophy, Users, Calendar } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";

export default function TeamManager() {
  // Using the first staff member as team manager
  const manager = mockClubData.staff[0];

  const responsibilities = [
    "Team coordination and scheduling",
    "Player welfare and development",
    "Match preparation and logistics",
    "Communication with coaching staff",
    "Player discipline and conduct",
    "Training facility management",
  ];

  const managerStats = [
    { label: "Teams Managed", value: "3", icon: Users },
    { label: "Years in Role", value: "7", icon: Calendar },
    { label: "Championships", value: "2", icon: Trophy },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Team manager">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Team Manager</h1>
          <p className="text-muted-foreground mt-1">Primary team coordinator and liaison</p>
        </div>
        <Button className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-navy rounded-full flex items-center justify-center text-white mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold">{manager.name}</h2>
                <p className="text-primary font-semibold mt-1">{manager.role}</p>
                <Badge className="mt-3 bg-green-100 text-green-800">{manager.status}</Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{manager.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{manager.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{manager.department}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-2">Joined</p>
                <p className="font-medium">{manager.joinedAt}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manager Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {managerStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center">
                      <Icon className="w-5 h-5 mx-auto text-primary mb-2" />
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Primary Responsibilities</CardTitle>
              <CardDescription>Key duties and areas of focus</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2 bg-primary flex-shrink-0" />
                    <span className="text-sm">{resp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Focus Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Player Development</Badge>
                <Badge variant="secondary">Squad Management</Badge>
                <Badge variant="secondary">Schedule Coordination</Badge>
                <Badge variant="secondary">Conflict Resolution</Badge>
                <Badge variant="secondary">Welfare Oversight</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-navy/5 border-primary/20">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Scheduled training session with coaching staff</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Updated squad availability for upcoming match</span>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Conducted player welfare check-in</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Approved medical consultation request</span>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Email notifications</span>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SMS alerts</span>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Weekly reports</span>
            <Badge className="bg-blue-100 text-blue-800">Digest</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
