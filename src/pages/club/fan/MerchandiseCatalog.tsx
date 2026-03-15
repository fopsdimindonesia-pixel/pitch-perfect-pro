import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MerchandiseCatalog() {
  const items = [
    { name: "Jersey (Home)", price: 350000, stock: 150, sold: 420 },
    { name: "Jersey (Away)", price: 350000, stock: 80, sold: 200 },
    { name: "Training Kit", price: 250000, stock: 200, sold: 150 },
    { name: "Cap", price: 80000, stock: 500, sold: 1200 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Merchandise catalog">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Merchandise Catalog</h1>
        <p className="text-muted-foreground mt-1">Official club merchandise sales</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <Card key={i}>
            <CardContent className="pt-4 space-y-2">
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-lg font-bold text-primary">Rp {(item.price/1000).toFixed(0)}K</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock: {item.stock}</span>
                  {item.stock < 100 && <Badge className="bg-red-100 text-red-800">Low</Badge>}
                </div>
                <p className="text-muted-foreground">Sold: {item.sold}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
