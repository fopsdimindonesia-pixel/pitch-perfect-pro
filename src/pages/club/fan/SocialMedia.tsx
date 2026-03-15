import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SocialMedia() {
  const platforms = [
    { platform: "Facebook", followers: 82500, engagement: "12.5%", posts: 345 },
    { platform: "Instagram", followers: 95200, engagement: "18.7%", posts: 523 },
    { platform: "Twitter", followers: 54800, engagement: "8.3%", posts: 812 },
    { platform: "YouTube", followers: 23400, engagement: "14.2%", videos: 89 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Social media management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Social Media</h1>
        <p className="text-muted-foreground mt-1">Multi-platform presence</p>
      </div>

      <div className="space-y-2">
        {platforms.map((p, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">{p.platform}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="font-bold">{(p.followers/1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <p className="font-bold text-primary">{p.engagement}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{p.videos ? "Videos" : "Posts"}</p>
                  <p className="font-bold">{p.posts || p.videos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
