import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Activity } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerInjuryRecord() {
  const player = mockPlayerData.players[0];
  const injuries = mockPlayerData.injuries.filter(i => i.playerId === player.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recovery":
        return "bg-yellow-100 text-yellow-800";
      case "Recovered":
        return "bg-green-100 text-green-800";
      case "Chronic":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Severe":
        return "border-red-200 bg-red-50";
      case "Moderate":
        return "border-yellow-200 bg-yellow-50";
      case "Mild":
        return "border-green-200 bg-green-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Injury records">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Injury Records</h1>
        <p className="text-muted-foreground mt-1">{player.name} • Medical and injury tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{injuries.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Injuries Recorded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-yellow-600">
              {injuries.filter(i => i.status === "Recovery").length}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Currently Recovering</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-green-600">
              {injuries.filter(i => i.status === "Recovered").length}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Fully Recovered</p>
          </CardContent>
        </Card>
      </div>

      {injuries.filter(i => i.status === "Recovery").length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold">
                Player is currently recovering from {injuries.filter(i => i.status === "Recovery").length} injury(ies)
              </p>
              <p>Not available for selection. Consult medical team before return.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {injuries.length > 0 ? (
        <>
          <div className="space-y-4">
            {injuries.map(injury => (
              <Card key={injury.id} className={getSeverityColor(injury.severity)}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{injury.injuryType}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{injury.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getStatusColor(injury.status)}>
                        {injury.status}
                      </Badge>
                      <div className="text-xs">
                        <Badge variant="outline">{injury.severity}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Injury Date</p>
                      <p className="font-semibold">{injury.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Return</p>
                      <p className="font-semibold">{injury.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Doctor</p>
                      <p className="font-semibold">{injury.doctor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Treatment</p>
                      <p className="font-semibold">{injury.treatmentPlan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Injury Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Injury Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Doctor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {injuries.map(injury => (
                      <TableRow key={injury.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{injury.injuryType}</TableCell>
                        <TableCell className="text-sm">{injury.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{injury.severity}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{injury.expectedReturn}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(injury.status)}>
                            {injury.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{injury.doctor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No injury records
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5" />
            Injury Prevention Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-900">
          <p>• Proper warm-up and cool-down before and after training</p>
          <p>• Strength and conditioning exercises 3-4 times per week</p>
          <p>• Immediate reporting of any pain or discomfort</p>
          <p>• Follow medical team recommendations for recovery</p>
          <p>• Regular physiotherapy sessions during rehabilitation</p>
          <p>• Medical clearance required before match return</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Club Doctor:</span> Dr. Siti Nurhaliza - nurhaliza@club.com
          </p>
          <p>
            <span className="font-semibold">Chief Physiotherapist:</span> Ahmad Fisio - ahmad.fisio@club.com
          </p>
          <p>
            <span className="font-semibold">Emergency:</span> +62-800-123-4567
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
