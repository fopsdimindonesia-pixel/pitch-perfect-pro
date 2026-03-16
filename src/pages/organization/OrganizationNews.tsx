import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { mockOrgNews } from "@/lib/mockData";

export default function OrganizationNews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization News</h1>
        <p className="text-muted-foreground mt-1">Latest news and announcements</p>
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {mockOrgNews.map((article) => (
          <Card key={article.id} className="p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold flex-1">{article.title}</h2>
              <Badge variant="outline">News</Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.publishedAt}
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">Read More →</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="px-4 py-2 border rounded hover:bg-muted">Previous</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
        <button className="px-4 py-2 border rounded hover:bg-muted">2</button>
        <button className="px-4 py-2 border rounded hover:bg-muted">Next</button>
      </div>
    </div>
  );
}
