import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Edit, Trash2, Plus, Download } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerPhoto() {
  const player = mockPlayerData.players[0];

  const photos = [
    { id: 1, url: "https://placehold.co/400x500/navy/white?text=Official+Photo", type: "Official", date: "2024-02-15", status: "Active" },
    { id: 2, url: "https://placehold.co/400x500/primary/white?text=Training", type: "Training", date: "2024-02-10", status: "Archive" },
    { id: 3, url: "https://placehold.co/400x500/gold/navy?text=Match+Day", type: "Match Day", date: "2024-02-08", status: "Archive" },
    { id: 4, url: "https://placehold.co/400x500/navy/white?text=Squad+Photo", type: "Squad Photo", date: "2024-01-15", status: "Archive" },
    { id: 5, url: "https://placehold.co/400x500/primary/white?text=Youth+Academy", type: "Youth Academy", date: "2023-08-20", status: "Archive" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player photos">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Player Photo Gallery</h1>
          <p className="text-muted-foreground mt-1">{player.name} • Photo management</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Photo
        </Button>
      </div>

      <Card className="border-2 border-dashed">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-medium mb-2">Drag photos here or click to upload</p>
            <p className="text-sm text-muted-foreground mb-4">PNG, JPG, WebP (max 5MB)</p>
            <Button variant="outline">Select Files</Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(photo => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img src={photo.url} alt={photo.type} className="w-full h-80 object-cover" />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{photo.type}</p>
                      <p className="text-xs text-muted-foreground">{photo.date}</p>
                    </div>
                    <Badge className={photo.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {photo.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" className="px-2">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Photo Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-900">
          <p>• Official photo: Passport-style, white background, player in club kit</p>
          <p>• Match day: Action photos from games and training</p>
          <p>• Squad photos: Team roster and group photos</p>
          <p>• Resolution: Minimum 400x500px for official photos</p>
          <p>• File size: Maximum 5MB per image</p>
        </CardContent>
      </Card>
    </div>
  );
}
