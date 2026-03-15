import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Download, Image } from "lucide-react";

const mockMedia = [
  { id: 1, title: "Opening Ceremony", type: "Video", size: "450 MB", date: "2024-03-15" },
  { id: 2, title: "Match Highlights - Day 1", type: "Video", size: "320 MB", date: "2024-03-16" },
  { id: 3, title: "Team Photos", type: "Album", size: "125 MB", date: "2024-03-17" },
  { id: 4, title: "Award Ceremony", type: "Video", size: "280 MB", date: "2024-03-20" },
];

export default function CompetitionMedia() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition media management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Competition Media</h1>
          <p className="text-muted-foreground mt-1">Manage photos and videos</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockMedia.map((item) => (
          <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Image className="w-8 h-8 text-gray-400" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{item.type}</span>
              <span>{item.size}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Trash2 className="w-3 h-3 text-red-600" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
