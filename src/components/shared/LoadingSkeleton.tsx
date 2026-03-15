import { Card, CardContent } from "@/components/ui/card";

interface LoadingSkeletonProps {
  rows?: number;
  height?: "sm" | "md" | "lg";
  type?: "table" | "card" | "chart";
  className?: string;
}

/**
 * Loading Skeleton Component
 * Shows loading state with animated skeleton while data is being fetched
 */
export function LoadingSkeleton({
  rows = 5,
  height = "md",
  type = "table",
  className = "",
}: LoadingSkeletonProps) {
  const heightClass = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  }[height];

  if (type === "chart") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 h-2 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-2">
        {/* Header skeleton */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          ))}
        </div>
        {/* Row skeletons */}
        {Array.from({ length: rows }).map((_, i) => (
          <div 
            key={i} 
            className="grid grid-cols-5 gap-4 p-4 border rounded-lg animate-pulse"
          >
            {[1, 2, 3, 4, 5].map((j) => (
              <div key={j} className={`${heightClass} bg-muted rounded`} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Card type
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for specific components
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="grid gap-4 p-4 border rounded-lg animate-pulse" 
         style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="h-10 bg-muted rounded" />
      ))}
    </div>
  );
}

/**
 * Chart loading state
 */
export function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} bg-muted rounded-lg animate-pulse`} 
         aria-busy="true"
         aria-label="Loading chart..." />
  );
}

/**
 * Card content skeleton
 */
export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-muted rounded w-1/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-muted rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
