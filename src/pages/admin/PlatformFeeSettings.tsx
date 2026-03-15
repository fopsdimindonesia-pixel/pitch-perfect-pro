import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function PlatformFeeSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Fee Settings</h1>
        <p className="text-muted-foreground mt-1">Configure platform fees and commission rules</p>
      </div>

      {/* Warning */}
      <Card className="p-4 bg-orange-50 border border-orange-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-orange-900">Careful with these settings</p>
          <p className="text-xs text-orange-800">Changes to fee settings will affect all new subscriptions</p>
        </div>
      </Card>

      {/* Fee Configuration */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Platform Fee</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Fee Percentage</label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="10" min="0" max="100" className="w-32" />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Deducted from each subscription payment</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Fees</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Credit Card Fee</label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="2.9" step="0.1" className="w-32" />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bank Transfer Fee</label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="1.5" step="0.1" className="w-32" />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Commission Rules</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Partner Commission</label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="5" min="0" max="50" className="w-32" />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Referral Reward</label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="3" min="0" max="20" className="w-32" />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex gap-3">
          <Button>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </Card>
    </div>
  );
}
