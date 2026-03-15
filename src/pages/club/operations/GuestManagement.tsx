import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";

export default function GuestManagement() {
  const guests = [
    { id: 1, name: "John Richardson", type: "VIP", purpose: "Match Spectator", date: "2024-03-23", status: "Approved" },
    { id: 2, name: "Sarah Johnson", type: "Media", purpose: "Press Coverage", date: "2024-03-23", status: "Approved" },
    { id: 3, name: "Mike Anderson", type: "Partner", purpose: "Business Meeting", date: "2024-03-22", status: "Approved" },
    { id: 4, name: "Emma Williams", type: "VIP", purpose: "Facility Tour", date: "2024-03-24", status: "Pending" },
  ];

  const typeColors = {
    VIP: "bg-gold text-navy",
    Media: "bg-blue-100 text-blue-800",
    Partner: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Guest Management</h1>
          <p className="text-muted-foreground mt-1">VIP guests and access management</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Register Guest
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">47</p>
            <p className="text-sm text-muted-foreground mt-2">Total Guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">45</p>
            <p className="text-sm text-muted-foreground mt-2">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-amber-600">2</p>
            <p className="text-sm text-muted-foreground mt-2">Pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {guests.map(guest => (
          <Card key={guest.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{guest.name}</p>
                  <p className="text-sm text-muted-foreground">{guest.purpose}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {guest.date}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={typeColors[guest.type as keyof typeof typeColors]}>
                    {guest.type}
                  </Badge>
                  <Badge className={guest.status === "Approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                    {guest.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
