import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, X } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

interface VerificationRecord {
  id: string;
  category: string;
  item: string;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
  notes: string;
}

export default function PlayerVerification() {
  const player = mockPlayerData.players[0];

  const verificationRecords: VerificationRecord[] = [
    { id: "1", category: "Personal Data", item: "Basic Information", status: "Approved", date: "2024-01-15", notes: "Name, DOB, Nationality verified" },
    { id: "2", category: "Personal Data", item: "ID Documents", status: "Approved", date: "2024-01-15", notes: "Passport and NIK verified" },
    { id: "3", category: "Medical", item: "Medical Report", status: "Approved", date: "2024-01-10", notes: "Fitness for play certification" },
    { id: "4", category: "Legal", item: "Contract Review", status: "Approved", date: "2024-01-12", notes: "Contract terms reviewed" },
    { id: "5", category: "Financial", item: "Tax Information", status: "Pending", date: "2024-03-01", notes: "Awaiting tax documentation" },
    { id: "6", category: "Admin", item: "Insurance Check", status: "Approved", date: "2024-01-20", notes: "Insurance coverage confirmed" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "Rejected":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const approved = verificationRecords.filter(r => r.status === "Approved").length;
  const pending = verificationRecords.filter(r => r.status === "Pending").length;
  const rejected = verificationRecords.filter(r => r.status === "Rejected").length;

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player verification">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Player Verification</h1>
          <p className="text-muted-foreground mt-1">{player.name} • Status & approval tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-600">{approved}</p>
                <p className="text-sm text-muted-foreground mt-1">Approved</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-600">{pending}</p>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-red-600">{rejected}</p>
                <p className="text-sm text-muted-foreground mt-1">Rejected</p>
              </div>
              <X className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {pending > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold">Verification Pending</p>
              <p>{pending} item(s) awaiting approval. Please submit required documentation.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {verificationRecords.map(record => (
            <Card key={record.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-semibold text-sm">{record.item}</p>
                        <p className="text-xs text-muted-foreground">{record.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{record.notes}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusBadge(record.status)}>
                      {record.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">{record.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          {verificationRecords.filter(r => r.status === "Approved").map(record => (
            <Card key={record.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{record.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{record.date}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-3">
          {verificationRecords.filter(r => r.status === "Pending").map(record => (
            <Card key={record.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      {record.item}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                  </div>
                  <Button size="sm">Submit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No rejected items
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Verification Process</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-900">
          <p><strong>Step 1:</strong> Submit all required documentation</p>
          <p><strong>Step 2:</strong> Documents reviewed by administration</p>
          <p><strong>Step 3:</strong> Medical and legal checks completed</p>
          <p><strong>Step 4:</strong> Final approval granted to play</p>
        </CardContent>
      </Card>
    </div>
  );
}
