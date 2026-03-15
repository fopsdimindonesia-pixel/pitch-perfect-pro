import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PublicNews() {
  const news = [
    { id: 1, title: "Squad Announcement for Upcoming Match", date: "2024-03-20", category: "Team News", featured: true },
    { id: 2, title: "Sponsorship Agreement with ACME Corp", date: "2024-03-18", category: "Business", featured: false },
    { id: 3, title: "Youth Academy Recruitment Drive", date: "2024-03-15", category: "Academy", featured: false },
    { id: 4, title: "Match Highlightsector Available on YouTube", date: "2024-03-13", category: "Media", featured: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Public News</h1>
          <p className="text-muted-foreground mt-1">Club announcements and updates</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Post News
        </Button>
      </div>

      <div className="space-y-4">
        {news.map(item => (
          <Card key={item.id} className={item.featured ? "border-gold border-2" : ""}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                  </div>
                  {item.featured && <StatusBadge status="approved" label="Featured" />}
                </div>
                <Badge variant="outline">{item.category}</Badge>
                <Button variant="outline" size="sm">Read More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
