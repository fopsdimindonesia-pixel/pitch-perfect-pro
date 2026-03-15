import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'PLAN-001',
    name: 'Basic',
    tier: 'basic',
    price: 50000,
    billing: 'monthly',
    status: 'active',
    subscribers: 120,
    features: ['5 Players', 'Basic Reports', 'Email Support', 'Web Dashboard'],
  },
  {
    id: 'PLAN-002',
    name: 'Professional',
    tier: 'professional',
    price: 150000,
    billing: 'monthly',
    status: 'active',
    subscribers: 240,
    features: ['20 Players', 'Advanced Reports', 'Priority Support', 'API Access', 'Analytics'],
  },
  {
    id: 'PLAN-003',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 500000,
    billing: 'monthly',
    status: 'active',
    subscribers: 45,
    features: ['Unlimited Players', 'Custom Reports', '24/7 Support', 'API Access', 'White Label', 'Dedicated Manager'],
  },
  {
    id: 'PLAN-004',
    name: 'Professional Annual',
    tier: 'professional',
    price: 1500000,
    billing: 'annual',
    status: 'active',
    subscribers: 85,
    features: ['20 Players', 'Advanced Reports', 'Priority Support', 'API Access', '2 months free'],
  },
];

export default function SubscriptionPlans() {
  return (
    <main role="main" aria-label="Subscription plans management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground mt-1">Manage subscription tiers and plan configurations</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Plan Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Plans</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Subscribers</p>
            <p className="text-2xl font-bold">490</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">MRR (Monthly)</p>
            <p className="text-2xl font-bold">Rp 70.5M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Most Popular</p>
            <p className="text-2xl font-bold">Professional</p>
            <p className="text-xs text-muted-foreground mt-1">240 subscribers</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${
              plan.tier === 'enterprise' ? 'bg-yellow-100' : plan.tier === 'professional' ? 'bg-blue-100' : 'bg-gray-100'
            } opacity-20 rounded-full -mr-12 -mt-12`}></div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{plan.subscribers} subscribers</p>
                </div>
                <Badge className={
                  plan.tier === 'enterprise' ? 'bg-yellow-100 text-yellow-800' : 
                  plan.tier === 'professional' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }>
                  {plan.billing === 'annual' ? 'Annual' : 'Monthly'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold">
                  Rp {(plan.price).toLocaleString('id-ID')}
                  <span className="text-sm text-muted-foreground font-normal">/{plan.billing}</span>
                </p>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-xs text-muted-foreground">Rp {(plan.price).toLocaleString('id-ID')} {plan.billing}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{plan.subscribers}</p>
                  <p className="text-xs text-muted-foreground">subscribers</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
