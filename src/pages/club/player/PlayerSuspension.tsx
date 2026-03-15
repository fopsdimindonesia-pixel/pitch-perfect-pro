import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerSuspension() {
  const player = mockPlayerData.players[0];
  const suspensions = mockPlayerData.suspensions.filter(s => s.playerId === player.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Appealed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const allDisciplineRecords = mockPlayerData.disciplineRecords.filter(d => d.playerId === player.id);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player suspensions">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Suspension Records</h1>
        <p className="text-muted-foreground mt-1">{player.name} • Suspension and discipline history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{suspensions.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Suspensions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-yellow-600">
              {suspensions.filter(s => s.status === "Active").length}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Active Suspensions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-green-600">
              {suspensions.filter(s => s.status === "Completed").length}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Completed</p>
          </CardContent>
        </Card>
      </div>

      {suspensions.length > 0 ? (
        <>
          {suspensions.filter(s => s.status === "Active").length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-900">
                  <p className="font-semibold">Active Suspensions</p>
                  <p>Player is currently suspended and cannot play official matches.</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Suspension Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Reason</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suspensions.map(suspension => (
                      <TableRow key={suspension.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{suspension.reason}</TableCell>
                        <TableCell className="text-sm">{suspension.startDate}</TableCell>
                        <TableCell className="text-sm">{suspension.endDate}</TableCell>
                        <TableCell className="text-sm">{suspension.matches} match(es)</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(suspension.status)}>
                            {suspension.status}
                          </Badge>
                        </TableCell>
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
            No suspension records
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Discipline History</CardTitle>
        </CardHeader>
        <CardContent>
          {allDisciplineRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Offense</TableHead>
                    <TableHead>Match/Event</TableHead>
                    <TableHead>Consequence</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allDisciplineRecords.map(record => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="text-sm">{record.date}</TableCell>
                      <TableCell className="font-medium">{record.offense}</TableCell>
                      <TableCell className="text-sm">{record.matchInfo}</TableCell>
                      <TableCell className="text-sm">{record.consequence}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{record.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No discipline records
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Appeal Process</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3 text-blue-900">
          <p>
            <strong>Step 1:</strong> File appeal within 5 days of suspension notice
          </p>
          <p>
            <strong>Step 2:</strong> Provide documentation and evidence
          </p>
          <p>
            <strong>Step 3:</strong> Club legal team reviews case
          </p>
          <p>
            <strong>Step 4:</strong> League disciplinary committee makes decision
          </p>
          <p className="mt-3">
            Contact: Club Legal Department for appeal assistance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
