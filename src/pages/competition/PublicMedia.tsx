import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Play } from "lucide-react";

const mockGallery = [
  { id: 1, title: "Opening Ceremony", type: "Video", thumbnail: "🎥" },
  { id: 2, title: "Match Day 1", type: "Photos", thumbnail: "📷" },
  { id: 3, title: "Team Photos", type: "Photos", thumbnail: "📷" },
  { id: 4, title: "Award Ceremony", type: "Video", thumbnail: "🎥" },
];

export default function PublicMedia() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Gallery</h1>
        <p className="text-muted-foreground mt-1">Photos and videos from the competition</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockGallery.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="bg-gray-200 h-48 flex items-center justify-center relative overflow-hidden">
              <span className="text-4xl">{item.thumbnail}</span>
              {item.type === 'Video' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition">
                  <Play className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <Badge variant="outline" className="mt-2">{item.type}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
