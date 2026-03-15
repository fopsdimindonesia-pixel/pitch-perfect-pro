import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Upload } from "lucide-react";

export default function BrandingConfiguration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Branding Configuration</h1>
        <p className="text-muted-foreground mt-1">Customize platform colors, logos, and branding</p>
      </div>

      {/* Info */}
      <Card className="p-4 bg-blue-50 border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-blue-900">Branding changes apply globally</p>
          <p className="text-xs text-blue-800">Changes are cached and may take a few minutes to appear</p>
        </div>
      </Card>

      {/* Logo Section */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Logo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-3">Primary Logo</label>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='12' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ELogo%3C/text%3E%3C/svg%3E" alt="Logo" className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG or SVG, max 2MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Favicon</label>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-xs font-medium">Click to upload</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Color Scheme</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded border bg-blue-600 cursor-pointer" />
                <Input type="text" defaultValue="#2563eb" className="flex-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded border bg-slate-600 cursor-pointer" />
                <Input type="text" defaultValue="#475569" className="flex-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded border bg-orange-500 cursor-pointer" />
                <Input type="text" defaultValue="#f97316" className="flex-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Success Color</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded border bg-green-600 cursor-pointer" />
                <Input type="text" defaultValue="#16a34a" className="flex-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>Inter (Default)</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Poppins</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heading Font Size</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>Large</option>
                <option>Medium (Default)</option>
                <option>Small</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Platform Metadata</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Name</label>
              <Input defaultValue="Pitch Perfect Pro" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">tagline</label>
              <Input defaultValue="The Ultimate Football Management Platform" />
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex gap-3">
          <Button>Save Branding</Button>
          <Button variant="outline">Preview</Button>
          <Button variant="outline">Reset to Default</Button>
        </div>
      </Card>
    </div>
  );
}
