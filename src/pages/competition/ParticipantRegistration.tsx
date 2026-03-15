import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockParticipants = [
  { id: 1, name: "Team A", players: 15, status: "Registered", paymentStatus: "Paid" },
  { id: 2, name: "Team B", players: 14, status: "Registered", paymentStatus: "Pending" },
  { id: 3, name: "Team C", players: 16, status: "Pending Approval", paymentStatus: "Pending" },
];

export default function ParticipantRegistration() {
  return (
    <div className="space-y-6" role="main" aria-label="Participant registration">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Participant Registration</h1>
          <p className="text-muted-foreground mt-1">Manage team and participant registrations</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Registration
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Teams</p>
          <p className="text-3xl font-bold mt-2">16</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Registered</p>
          <p className="text-3xl font-bold mt-2">14</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending Approval</p>
          <p className="text-3xl font-bold mt-2">2</p>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Team Name</th>
                <th className="px-6 py-3 text-left font-semibold">Players</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody>
              {mockParticipants.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">{p.players}</td>
                  <td className="px-6 py-4">
                    <Badge className={p.status === "Registered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={p.paymentStatus === "Paid" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}>
                      {p.paymentStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
