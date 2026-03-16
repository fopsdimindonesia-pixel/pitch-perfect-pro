import { Card } from "@/components/ui/card";

export default function FederationStructure() {
  const structure = [
    { level: "Federation", count: 1, examples: ["PSSI Central"] },
    { level: "Region", count: 34, examples: ["Makassar", "Jakarta", "Surabaya"] },
    { level: "League", count: 128, examples: ["Jakarta Premier", "Makassar League"] },
    { level: "Club", count: 2500, examples: ["SSB Garuda Muda", "Persija Muda"] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Federation Structure</h1>
        <p className="text-muted-foreground mt-1">Federation → Region → League → Club hierarchy</p>
      </div>

      {/* Structure Visualization */}
      <Card className="p-6">
        <div className="space-y-4">
          {structure.map((level) => (
            <div key={level.level}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{level.level}</h3>
                <span className="text-2xl font-bold text-blue-600">{level.count}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Examples: {level.examples.join(", ")}
              </p>
              <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </Card>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {structure.map((level) => (
          <Card key={level.level} className="p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{level.level}</p>
            <p className="text-3xl font-bold">{level.count}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
