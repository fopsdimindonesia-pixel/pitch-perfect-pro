import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accent?: "primary" | "gold" | "destructive" | "navy";
  className?: string;
}

const accentMap = {
  primary: "text-primary bg-primary/10",
  gold: "text-gold-foreground bg-gold/15",
  destructive: "text-destructive bg-destructive/10",
  navy: "text-navy bg-navy/10",
};

export const StatCard = ({ title, value, icon: Icon, trend, accent = "primary", className }: StatCardProps) => {
  const TrendIcon = trend ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus) : null;
  const trendColor = trend ? (trend.value > 0 ? "text-primary" : trend.value < 0 ? "text-destructive" : "text-muted-foreground") : "";

  return (
    <div className={cn("bg-card rounded-lg p-5 shadow-stat hover:shadow-card-hover transition-shadow duration-200 animate-fade-in", className)}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={cn("w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0", accentMap[accent])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold tabular-nums tracking-tight">{value}</p>
        {trend && TrendIcon && (
          <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trend.value)}% {trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};
