import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    features: [
      { name: '5 Registered Players', included: true },
      { name: 'Basic Match Reports', included: true },
      { name: 'Email Support', included: true },
      { name: 'Web Dashboard', included: true },
      { name: 'Advanced Analytics', included: false },
      { name: 'API Access', included: false },
      { name: '24/7 Phone Support', included: false },
    ],
  },
  {
    name: 'Professional',
    features: [
      { name: '20 Registered Players', included: true },
      { name: 'Advanced Match Reports', included: true },
      { name: 'Priority Email Support', included: true },
      { name: 'Web Dashboard', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'API Access', included: true },
      { name: '24/7 Phone Support', included: false },
    ],
  },
  {
    name: 'Enterprise',
    features: [
      { name: 'Unlimited Players', included: true },
      { name: 'Custom Reports', included: true },
      { name: '24/7 Email Support', included: true },
      { name: 'Web Dashboard', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'API Access', included: true },
      { name: '24/7 Phone Support', included: true },
    ],
  },
];

export default function PlanBenefits() {
  return (
    <main role="main" aria-label="Subscription plan benefits">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Plan Benefits</h1>
        <p className="text-muted-foreground mt-1">Configure features and benefits for each subscription tier</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="benefits-title">Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-3 px-4 font-semibold">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} scope="col" className="text-center py-3 px-4 font-semibold">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{feature.name}</td>
                    {plans.map((plan) => {
                      const planFeature = plan.features[idx];
                      return (
                        <td key={plan.name} className="py-3 px-4 text-center">
                          {planFeature.included ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature.name} className="flex items-start gap-2">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-sm' : 'text-sm text-gray-400'}>
                    {feature.name}
                  </span>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4" size="sm">
                Edit Features
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Player Limits</p>
                  <p className="text-xs text-muted-foreground">Configure max players per plan</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Support Level</p>
                  <p className="text-xs text-muted-foreground">Email, chat, phone support</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Analytics & Reporting</p>
                  <p className="text-xs text-muted-foreground">Report types and data retention</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">API Access</p>
                  <p className="text-xs text-muted-foreground">API rate limits and endpoints</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
