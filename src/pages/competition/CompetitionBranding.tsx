import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Palette } from "lucide-react";

export default function CompetitionBranding() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition branding">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Branding</h1>
        <p className="text-muted-foreground mt-1">Customize competition appearance</p>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Logo & Colors
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Competition Logo</label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Primary Color</label>
            <div className="mt-2 flex gap-2">
              <Input type="color" defaultValue="#3b82f6" className="w-20 h-10" />
              <Input type="text" defaultValue="#3b82f6" className="flex-1" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Secondary Color</label>
            <div className="mt-2 flex gap-2">
              <Input type="color" defaultValue="#10b981" className="w-20 h-10" />
              <Input type="text" defaultValue="#10b981" className="flex-1" />
            </div>
          </div>

          <Button>Save Branding</Button>
        </div>
      </Card>
    </div>
  );
}
