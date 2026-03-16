import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users } from "lucide-react";

export default function TeamSlotManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Team slot management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Team Slot Management</h1>
        <p className="text-muted-foreground mt-1">Manage available slots for teams</p>
      </div>

      {/* Slot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-blue-600">32</div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-sm font-medium">Total Slots</p>
          <p className="text-xs text-muted-foreground mt-1">All categories</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-green-600">24</div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-sm font-medium">Filled Slots</p>
          <p className="text-xs text-muted-foreground mt-1">75% capacity</p>
        </Card>

        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-orange-600">8</div>
            <BarChart3 className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-sm font-medium">Available Slots</p>
          <p className="text-xs text-muted-foreground mt-1">25% remaining</p>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Slots by Category</h2>
        <div className="space-y-3">
          {[
            { name: "U-16 Male", total: 12, filled: 10, available: 2 },
            { name: "U-16 Female", total: 8, filled: 6, available: 2 },
            { name: "U-14 Mixed", total: 12, filled: 8, available: 4 },
          ].map((cat, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{cat.name}</span>
                <span className="text-muted-foreground">{cat.filled}/{cat.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(cat.filled / cat.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
