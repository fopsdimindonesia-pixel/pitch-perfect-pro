import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Edit } from "lucide-react";
import { useState } from "react";
import { mockClubData } from "@/lib/mockClubData";

export default function ClubBranding() {
  const club = mockClubData.club;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club branding">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Club Branding</h1>
          <p className="text-muted-foreground mt-1">Manage your club's visual identity</p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          <Edit className="w-4 h-4" />
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Club Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-8 bg-muted rounded-lg">
              <img src={club.logo} alt="Club Logo" className="h-32 w-32 rounded" />
            </div>
            {isEditing && (
              <Button variant="outline" className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Upload New Logo
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Banner */}
        <Card>
          <CardHeader>
            <CardTitle>Club Banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden bg-muted h-32">
              <img src={club.banner} alt="Club Banner" className="w-full h-full object-cover" />
            </div>
            {isEditing && (
              <Button variant="outline" className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Upload New Banner
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Club Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {club.colors.map((color, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Color {idx + 1}</p>
                  <p className="font-mono text-lg font-bold">{color}</p>
                </div>
                {isEditing && (
                  <input
                    type="color"
                    defaultValue={color}
                    className="w-12 h-12 cursor-pointer rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gradient-to-r from-primary/5 to-navy/5">
        <CardHeader>
          <CardTitle>Brand Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground mb-2">Light Background</p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded" style={{ backgroundColor: club.colors[0] }} />
                <div>
                  <p className="font-bold">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.city}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border">
              <p className="text-xs text-gray-400 mb-2">Dark Background</p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded" style={{ backgroundColor: club.colors[1] }} />
                <div>
                  <p className="font-bold text-white">{club.name}</p>
                  <p className="text-xs text-gray-400">{club.city}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
