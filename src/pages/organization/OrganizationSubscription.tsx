import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBillingPlans } from "@/lib/mockData";

export default function OrganizationSubscription() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Subscription</h1>
        <p className="text-muted-foreground mt-1">Choose your subscription plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockBillingPlans.map((plan) => (
          <Card key={plan.id} className="p-6 relative">
            {plan.name === "Pro" && (
              <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800">Current</Badge>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-lg font-semibold mb-1">
              {plan.price === 0 ? "Free" : `Rp ${plan.price.toLocaleString()}`}
            </p>
            <p className="text-xs text-muted-foreground mb-4">/month</p>
            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold text-muted-foreground">FEATURES</p>
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  {feature}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-4">Up to {plan.members} members</p>
            <Button variant={plan.name === "Pro" ? "default" : "outline"} className="w-full">
              {plan.name === "Pro" ? "Current Plan" : "Upgrade"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
