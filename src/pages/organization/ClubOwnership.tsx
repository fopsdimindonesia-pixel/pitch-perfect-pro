import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockOwnership = [
  { id: "1", name: "Ahmad Riyadi", role: "Primary Owner", stake: "60%", joinedAt: "2023-01-15" },
  { id: "2", name: "Budi Santoso", role: "Co-owner", stake: "30%", joinedAt: "2023-06-20" },
  { id: "3", name: "Citra Dewi", role: "Investor", stake: "10%", joinedAt: "2024-01-10" },
];

export default function ClubOwnership() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Ownership</h1>
        <p className="text-muted-foreground mt-1">Manage ownership structure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockOwnership.map((owner) => (
          <Card key={owner.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{owner.name}</h3>
                <p className="text-sm text-muted-foreground">{owner.role}</p>
              </div>
              <Badge variant="outline">{owner.stake}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Since {owner.joinedAt}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Ownership Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="font-medium">Total Stakeholders</span>
            <span className="text-2xl font-bold">3</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="font-medium">Total Stake</span>
            <span className="text-2xl font-bold">100%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Last Updated</span>
            <span className="text-sm text-muted-foreground">2024-03-10</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
