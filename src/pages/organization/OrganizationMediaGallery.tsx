import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockGalleryItems = [
  { id: "1", title: "Tournament Finals", category: "Photos" },
  { id: "2", title: "Opening Ceremony", category: "Videos" },
  { id: "3", title: "Team Awards", category: "Photos" },
  { id: "4", title: "Championship Highlights", category: "Videos" },
  { id: "5", title: "Player Training", category: "Photos" },
  { id: "6", title: "Fan Celebration", category: "Videos" },
];

export default function OrganizationMediaGallery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Media Gallery</h1>
          <p className="text-muted-foreground mt-1">Photo and video gallery</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Media
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockGalleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer group">
            <div className="w-full h-48 bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center text-white text-2xl group-hover:scale-105 transition">
              {item.category === "Videos" ? "🎬" : "📷"}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-2">{item.category}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
