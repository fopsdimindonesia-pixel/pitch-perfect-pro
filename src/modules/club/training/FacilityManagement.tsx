import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacilityManagement() {
  const facilities = [
    { name: "Main Pitch", capacity: 100, surface: "Natural Grass", status: "Available" },
    { name: "Practice Pitch", capacity: 50, surface: "Artificial", status: "Available" },
    { name: "Indoor Hall", capacity: 40, surface: "Wood", status: "Maintenance" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Facility management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Facility Management</h1>
        <p className="text-muted-foreground mt-1">Training facility bookings and maintenance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((f, i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-3">
              <p className="font-semibold text-lg">{f.name}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{f.capacity} people</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Surface</p>
                  <p className="font-semibold">{f.surface}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded text-sm font-semibold w-fit ${f.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {f.status}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
