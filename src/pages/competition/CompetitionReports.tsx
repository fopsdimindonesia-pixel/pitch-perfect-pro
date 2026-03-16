import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Download } from "lucide-react";

const mockReports = [
  { id: 1, title: "Attendance Report", date: "2024-03-20", type: "PDF", status: "Ready" },
  { id: 2, title: "Match Statistics", date: "2024-03-19", type: "Excel", status: "Ready" },
  { id: 3, title: "Financial Summary", date: "2024-03-18", type: "PDF", status: "Ready" },
  { id: 4, title: "Player Performance Analysis", date: "2024-03-17", type: "PDF", status: "Ready" },
];

export default function CompetitionReports() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition reports">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and view competition reports</p>
      </div>

      <div className="space-y-3">
        {mockReports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{report.type}</Badge>
                <Badge className="bg-green-100 text-green-800">{report.status}</Badge>
                <Download className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-blue-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
