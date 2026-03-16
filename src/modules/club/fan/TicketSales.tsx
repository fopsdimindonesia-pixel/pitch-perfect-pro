import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TicketSales() {
  const tickets = [
    { match: "vs FC Jakarta", date: "2024-03-23", available: 2500, sold: 3200, total: 5700 },
    { match: "vs Surabaya FC", date: "2024-03-30", available: 3500, sold: 1200, total: 4700 },
    { match: "vs Bandung United", date: "2024-04-06", available: 4000, sold: 0, total: 4000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Ticket sales">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Ticket Sales</h1>
          <p className="text-muted-foreground mt-1">Match ticket availability and sales</p>
        </div>
        <Button>Create Listing</Button>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{ticket.match}</p>
                    <p className="text-sm text-muted-foreground">{ticket.date}</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sold</p>
                    <p className="text-2xl font-bold text-primary">{ticket.sold}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold">{ticket.available}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="text-2xl font-bold text-gold">{ticket.total}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
