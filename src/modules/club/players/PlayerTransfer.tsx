import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerTransfer() {
  const player = mockPlayerData.players[0];
  const transfers = mockPlayerData.transfers.filter(t => t.playerId === player.id);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Permanent":
        return "bg-blue-100 text-blue-800";
      case "Loan":
        return "bg-purple-100 text-purple-800";
      case "Academy":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player transfers">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Player Transfers</h1>
        <p className="text-muted-foreground mt-1">{player.name} • Transfer records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{transfers.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Transfers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-gold">
              {transfers.reduce((sum, t) => {
                if (t.transferFee.includes("Rp")) {
                  const num = parseInt(t.transferFee.replace(/[^0-9]/g, ""));
                  return sum + num;
                }
                return sum;
              }, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Total Fee</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-primary">1</p>
            <p className="text-sm text-muted-foreground mt-2">Current Club</p>
          </CardContent>
        </Card>
      </div>

      {transfers.length > 0 ? (
        <div className="space-y-4">
          {/* Timeline View */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-navy" />

            <div className="space-y-6">
              {transfers.map((transfer, i) => (
                <div key={transfer.id} className="ml-20 relative">
                  <div className="absolute -left-16 top-2 w-4 h-4 rounded-full border-4 border-background bg-primary" />

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{transfer.fromClub}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{transfer.toClub}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {transfer.transferDate}
                          </p>
                          <p className="text-sm mt-2">
                            Fee: <span className="font-semibold text-primary">{transfer.transferFee}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getTypeColor(transfer.type)}>
                            {transfer.type}
                          </Badge>
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            {transfer.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No transfer history
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Transfer Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map(transfer => (
                  <TableRow key={transfer.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm">{transfer.transferDate}</TableCell>
                    <TableCell className="font-medium">{transfer.fromClub}</TableCell>
                    <TableCell className="font-medium">{transfer.toClub}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transfer.type)}>
                        {transfer.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{transfer.transferFee}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">{transfer.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Transfer Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-900">
          <p>• Transfer window: January 1-31 and August 1-31</p>
          <p>• International transfers require FIFA approval</p>
          <p>• Medical examination required before transfer</p>
          <p>• Contract must be registered with league within 5 days</p>
          <p>• Previous club clearance needed for transfers</p>
        </CardContent>
      </Card>
    </div>
  );
}
