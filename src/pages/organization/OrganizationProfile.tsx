import { useState } from "react";
import { Mail, Phone, MapPin, Globe, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrganizations, mockActivityLog } from "@/lib/mockData";

export default function OrganizationProfile() {
  const org = mockOrganizations[0];
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex gap-4 flex-1">
          <img
            src={org.logo}
            alt={org.name}
            className="w-24 h-24 rounded-lg bg-muted object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{org.name}</h1>
            <p className="text-muted-foreground">{org.type}</p>
            <div className="flex gap-4 mt-4">
              <Badge className="bg-green-100 text-green-800">{org.status}</Badge>
              <span className="text-sm text-muted-foreground">{org.members} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{org.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{org.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{org.contact.address}</p>
                  </div>
                </div>
                {org.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="font-medium">{org.website}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Members ({org.members})</h2>
            <p className="text-muted-foreground text-sm">Member management interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {mockActivityLog.slice(0, 5).map((log) => (
                <div key={log.id} className="flex justify-between items-start pb-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{log.user} {log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <p className="text-muted-foreground text-sm">Document management interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Organization Settings</h2>
            <p className="text-muted-foreground text-sm">Settings management interface here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
