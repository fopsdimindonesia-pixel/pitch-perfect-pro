import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Mail, Phone, MapPin, Trophy, Users, FileText, AlertCircle } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerProfile() {
  const player = mockPlayerData.players[0];
  const contract = mockPlayerData.contracts[0];
  const injuries = mockPlayerData.injuries;
  const documents = mockPlayerData.documents.filter(d => d.playerId === player.id);

  const positionColors: Record<string, string> = {
    Goalkeeper: "bg-yellow-100 text-yellow-800",
    Defender: "bg-blue-100 text-blue-800",
    Midfielder: "bg-green-100 text-green-800",
    Forward: "bg-red-100 text-red-800",
    Winger: "bg-purple-100 text-purple-800",
  };

  const stats = [
    { label: "Appearances", value: player.appearances },
    { label: "Goals", value: player.goals },
    { label: "Assists", value: player.assists },
    { label: "Int'l Caps", value: player.internationalCaps },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player profile">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">{player.name}</h1>
          <p className="text-muted-foreground mt-1">#{player.number} • {player.position}</p>
        </div>
        <Button className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-full aspect-square bg-gradient-to-br from-primary to-navy rounded-lg flex items-center justify-center text-white mb-4">
              <Users className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <Badge className={positionColors[player.position] + " mt-2"}>
              {player.position}
            </Badge>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-semibold">{player.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height:</span>
                <span className="font-semibold">{player.height}cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight:</span>
                <span className="font-semibold">{player.weight}kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nationality:</span>
                <span className="font-semibold">{player.nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DoB:</span>
                <span className="font-semibold">{player.birthDate}</span>
              </div>
            </div>
            <Badge className="mt-3 bg-green-100 text-green-800 w-full">{player.status}</Badge>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{player.name.toLowerCase().replace(" ", ".")}@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">+62 812 3456 7890</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="injury">Injuries</TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Joined Club</p>
                  <p className="font-semibold">{player.joinedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">NIK</p>
                  <p className="font-semibold">{player.nIK}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">International Caps</p>
                  <p className="font-semibold">{player.internationalCaps}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="bg-green-100 text-green-800">{player.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Season Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Appearances</TableCell>
                    <TableCell className="text-right font-semibold">{player.appearances}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Goals</TableCell>
                    <TableCell className="text-right font-semibold">{player.goals}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Assists</TableCell>
                    <TableCell className="text-right font-semibold">{player.assists}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Yellow Cards</TableCell>
                    <TableCell className="text-right font-semibold">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Red Cards</TableCell>
                    <TableCell className="text-right font-semibold">0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract" className="space-y-4">
          {contract && (
            <Card>
              <CardHeader>
                <CardTitle>Active Contract</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Contract Type</p>
                    <p className="font-semibold">{contract.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge className="bg-green-100 text-green-800">{contract.status}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{contract.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="font-semibold">{contract.endDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Annual Salary</p>
                    <p className="font-semibold">{contract.salary}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Contract Terms</p>
                  <div className="flex flex-wrap gap-2">
                    {contract.terms.map((term, i) => (
                      <Badge key={i} variant="secondary">{term}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="injury" className="space-y-4">
          {injuries.length > 0 ? (
            injuries.map(injury => (
              <Card key={injury.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{injury.injuryType}</CardTitle>
                    <Badge className={injury.status === "Recovery" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                      {injury.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{injury.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Severity</p>
                      <Badge variant="outline">{injury.severity}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Return</p>
                      <p className="font-semibold">{injury.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Treating Doctor</p>
                      <p className="font-semibold">{injury.doctor}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Treatment Plan</p>
                    <p className="text-sm mt-1">{injury.treatmentPlan}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No active injuries
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <Card key={doc.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{doc.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">{doc.number}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{doc.status}</Badge>
                          <span className="text-xs text-muted-foreground">Expires: {doc.expiryDate}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">↓</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No documents uploaded
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
