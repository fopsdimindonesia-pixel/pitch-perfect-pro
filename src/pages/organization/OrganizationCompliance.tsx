import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { mockComplianceChecklist } from "@/lib/mockData";

export default function OrganizationCompliance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Compliance</h1>
        <p className="text-muted-foreground mt-1">Track compliance requirements and status</p>
      </div>

      {/* Compliance Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Compliance Status</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-3xl font-bold text-green-600">2</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">1</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </div>
        </div>
      </Card>

      {/* Compliance Checklist */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Compliance Checklist</h2>
        <div className="space-y-3">
          {mockComplianceChecklist.map((item) => (
            <div key={item.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/30 transition">
              <div className="flex items-start gap-3 flex-1">
                {item.status === "Completed" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due: {item.dueDate}</p>
                </div>
              </div>
              <Badge className={
                item.status === "Completed" ? "bg-green-100 text-green-800" :
                item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
