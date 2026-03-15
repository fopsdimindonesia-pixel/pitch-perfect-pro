import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function FanEngagement() {
  const posts = [
    { id: 1, author: "Fan Club", content: "Amazing win tonight! Goals from Budi! 🔥", likes: 234, comments: 45, date: "2 hours ago" },
    { id: 2, author: "Official", content: "Squad announcement for next match", likes: 567, comments: 89, date: "5 hours ago" },
    { id: 3, author: "Fan Club", content: "Best defense this season!", likes: 156, comments: 23, date: "1 day ago" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Fan engagement">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Fan Engagement</h1>
        <p className="text-muted-foreground mt-1">Community interaction and feedback</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">45.2K</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">12.5K</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">89%</p>
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary" />
                    <div>
                      <p className="font-semibold text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                  {post.author === "Official" && <Badge>Official</Badge>}
                </div>
                <p className="text-sm">{post.content}</p>
                <div className="flex items-center gap-6 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
