import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockPrizes = [
  { id: 1, place: "1st Place", prize: "$5,000", team: "Not Assigned" },
  { id: 2, place: "2nd Place", prize: "$3,000", team: "Not Assigned" },
  { id: 3, place: "3rd Place", prize: "$1,000", team: "Not Assigned" },
];

export default function PrizePrizeDistribution() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prize Distribution</h1>
          <p className="text-muted-foreground mt-1">Manage prizes and awards</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Prize
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Place</th>
                <th className="px-6 py-3 text-left font-semibold">Prize</th>
                <th className="px-6 py-3 text-left font-semibold">Awarded To</th>
              </tr>
            </thead>
            <tbody>
              {mockPrizes.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{p.place}</td>
                  <td className="px-6 py-4 font-semibold">{p.prize}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-gray-100 text-gray-800">{p.team}</Badge>
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
