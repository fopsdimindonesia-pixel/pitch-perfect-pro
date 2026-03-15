import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Download, FileText } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerContract() {
  const player = mockPlayerData.players[0];
  const contract = mockPlayerData.contracts.find(c => c.playerId === player.id);

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const daysRemaining = contract ? calculateDaysRemaining(contract.endDate) : 0;
  const yearsRemaining = Math.floor(daysRemaining / 365);
  const monthsRemaining = Math.floor((daysRemaining % 365) / 30);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player contracts">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Player Contract</h1>
          <p className="text-muted-foreground mt-1">{player.name} • Contract management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {contract ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-2xl font-bold text-green-700 mt-1">{contract.status}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{contract.status}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Contract Type</p>
                <p className="text-2xl font-bold mt-1">{contract.type}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="text-2xl font-bold mt-1">{yearsRemaining}y {monthsRemaining}m</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                  <p className="text-lg font-semibold">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">End Date</p>
                  <p className="text-lg font-semibold">{contract.endDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Annual Salary</p>
                  <p className="text-lg font-semibold text-primary">{contract.salary}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Signed On</p>
                  <p className="text-lg font-semibold">{contract.signedDate}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-semibold mb-3">Contract Terms</p>
                <div className="space-y-2">
                  {contract.terms.map((term, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Renewal</CardTitle>
              <CardDescription>Manage contract extension negotiations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  Contract expires in {daysRemaining} days ({yearsRemaining} years, {monthsRemaining} months).
                  {daysRemaining < 180 && " Renewal discussions should begin soon."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">Start Renewal Discussion</Button>
                <Button variant="outline">View Previous Contracts</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Main Contract</p>
                    <p className="text-xs text-muted-foreground">Signed {contract.signedDate}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Amendment #1</p>
                    <p className="text-xs text-muted-foreground">Performance bonus clause</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No contract on file
          </CardContent>
        </Card>
      )}
    </div>
  );
}
