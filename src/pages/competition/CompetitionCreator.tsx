import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight, Clock } from "lucide-react";

const steps = [
  { id: 1, label: "Competition Info", status: "completed" },
  { id: 2, label: "Categories", status: "completed" },
  { id: 3, label: "Age Groups", status: "active" },
  { id: 4, label: "Season", status: "pending" },
  { id: 5, label: "Confirmation", status: "pending" },
];

export default function CompetitionCreator() {
  const [currentStep, setCurrentStep] = useState(3);

  return (
    <div className="space-y-6" role="main" aria-label="Create competition">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Create Competition</h1>
        <p className="text-muted-foreground mt-1">Multi-step wizard to set up your competition</p>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : step.status === "active"
                        ? "bg-blue-100 text-blue-700 ring-2 ring-blue-500"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.status === "completed" ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.status === "completed" ? "Completed" : step.status === "active" ? "In Progress" : "Pending"}
                  </p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-1 mx-auto transition-all ${step.status === "completed" ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step 3: Age Groups */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Step 3: Configure Age Groups</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Age Groups for This Competition</label>
            <div className="space-y-3">
              {[
                { name: "U-12", min: 10, max: 12 },
                { name: "U-14", min: 13, max: 14 },
                { name: "U-16", min: 15, max: 16 },
                { name: "U-18", min: 17, max: 18 },
              ].map((group, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.min}-{group.max} years</p>
                  </div>
                  <Badge variant="outline">Selected</Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Custom Age Group</label>
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="Group Name (e.g., U-20)" />
              <Input placeholder="Min Age" type="number" />
              <Input placeholder="Max Age" type="number" />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Back</Button>
          <Button onClick={() => setCurrentStep(4)}>
            Continue to Season <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Competition Summary
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex justify-between">
            <span>Competition Name:</span>
            <span className="font-medium">PSSI U-16 Championship 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Categories:</span>
            <span className="font-medium">3 (Male, Female, Mixed)</span>
          </div>
          <div className="flex justify-between">
            <span>Age Groups:</span>
            <span className="font-medium">4 selected</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
