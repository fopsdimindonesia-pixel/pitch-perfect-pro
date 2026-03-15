import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SessionPlanning() {
  const plans = [
    { id: 1, name: "Ball Control Drills", duration: "45 min", intensity: "Medium", equipment: "Cones, Balls" },
    { id: 2, name: "Tactical Shape", duration: "60 min", intensity: "High", equipment: "Cones, Vests" },
    { id: 3, name: "Strength & Conditioning", duration: "40 min", intensity: "High", equipment: "Weights" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Session planning">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Session Planning</h1>
        <p className="text-muted-foreground mt-1">Training session templates</p>
      </div>

      <div className="space-y-3">
        {plans.map(plan => (
          <Card key={plan.id}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">{plan.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-sm">{plan.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Intensity</p>
                  <p className="font-semibold text-sm">{plan.intensity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-semibold text-sm">{plan.equipment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
