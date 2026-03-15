import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function InventoryManagement() {
  const inventory = [
    { id: 1, category: "Athletic Equipment", items: 145, status: "In Stock", location: "Main Store" },
    { id: 2, category: "Player Kits", items: 52, status: "Low Stock", location: "Equipment Room" },
    { id: 3, category: "Medical Supplies", items: 89, status: "In Stock", location: "Medical Room" },
    { id: 4, category: "Training Gear", items: 34, status: "Low Stock", location: "Training Facility" },
    { id: 5, category: "Office Supplies", items: 267, status: "In Stock", location: "Administration" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Equipment and supplies tracking</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">622</p>
            <p className="text-sm text-muted-foreground mt-2">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">3</p>
            <p className="text-sm text-muted-foreground mt-2">Categories OK</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-amber-600">2</p>
            <p className="text-sm text-muted-foreground mt-2">Low Stock Alert</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {inventory.map(item => (
          <Card key={item.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{item.category}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.items} items</p>
                  <Badge className={item.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
