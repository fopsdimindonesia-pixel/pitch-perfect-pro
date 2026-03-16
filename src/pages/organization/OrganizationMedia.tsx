import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockMediaLibrary } from "@/lib/mockData";

export default function OrganizationMedia() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Media</h1>
          <p className="text-muted-foreground mt-1">Media library and gallery</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockMediaLibrary.map((media) => (
          <Card key={media.id} className="overflow-hidden hover:shadow-lg transition">
            <div className="w-full h-40 bg-muted flex items-center justify-center text-muted-foreground">
              <span className="text-sm">{media.type === "image" ? "📷" : "🎬"}</span>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{media.title}</h3>
              <div className="flex items-center justify-between mt-2 text-xs">
                <Badge variant="outline">{media.type}</Badge>
                <span className="text-muted-foreground">{media.uploadedAt}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">by {media.uploadedBy}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
