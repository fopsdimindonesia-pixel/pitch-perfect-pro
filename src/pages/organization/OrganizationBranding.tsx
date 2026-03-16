import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function OrganizationBranding() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Branding</h1>
        <p className="text-muted-foreground mt-1">Manage brand assets and settings</p>
      </div>

      {/* Logo Upload */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Logo</h2>
        <div className="flex gap-6">
          <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            Logo Preview
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-3">Upload your organization logo</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload Logo
            </Button>
          </div>
        </div>
      </Card>

      {/* Cover Image */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
        <div className="w-full h-40 rounded-lg bg-muted flex items-center justify-center text-muted-foreground mb-4">
          Cover Preview
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Cover
        </Button>
      </Card>

      {/* Brand Colors */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" defaultValue="#0066cc" className="w-12 h-12 rounded cursor-pointer" />
              <input type="text" defaultValue="#0066cc" className="flex-1 px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" defaultValue="#ff6b6b" className="w-12 h-12 rounded cursor-pointer" />
              <input type="text" defaultValue="#ff6b6b" className="flex-1 px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input type="color" defaultValue="#ffd700" className="w-12 h-12 rounded cursor-pointer" />
              <input type="text" defaultValue="#ffd700" className="flex-1 px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
        </div>
      </Card>

      <Button className="w-full">Save Branding</Button>
    </div>
  );
}
