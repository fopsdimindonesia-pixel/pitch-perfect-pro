import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/shared/LoadingSkeleton";
import { AlertCircle } from "lucide-react";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  height?: string;
  className?: string;
}

/**
 * Accessible Chart Container
 * Wraps charts with loading state, error handling, and accessibility features
 */
export function ChartContainer({
  title,
  description,
  children,
  isLoading = false,
  error = null,
  height = "h-64",
  className = "",
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ChartSkeleton height={height} />
        ) : error ? (
          <div className="flex items-center gap-3 p-6 bg-red-50 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Failed to load chart</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : (
          <div role="img" aria-label={title}>
            <div className={height}>
              {children}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Accessible legend for charts
 */
export function ChartLegend({
  items,
  className = "",
}: {
  items: Array<{ label: string; color: string; value?: string | number }>;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-4 mt-4 text-sm ${className}`}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2" role="listitem">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span>
            <span className="font-medium">{item.label}</span>
            {item.value !== undefined && <span> ({item.value})</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Accessible tooltip for charts
 */
export function ChartTooltip({
  label,
  data,
}: {
  label: string;
  data: Array<{ name: string; value: string | number; color: string }>;
}) {
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
      role="tooltip"
      aria-label={`Chart data: ${label}`}
    >
      <p className="font-semibold text-sm mb-2">{label}</p>
      <div className="space-y-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="font-medium">{item.name}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Chart data table for screen readers
 * Displays chart data in tabular format accessible to screen readers
 */
export function ChartDataTable({
  title,
  headers,
  data,
  className = "",
}: {
  title: string;
  headers: string[];
  data: Array<Array<string | number>>;
  className?: string;
}) {
  return (
    <div className={`${className} sr-only`}>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Loading chart state wrapper
 */
export function LoadingChart({
  title,
  height = "h-64",
}: {
  title: string;
  height?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartSkeleton height={height} />
      </CardContent>
    </Card>
  );
}

/**
 * Error chart state
 */
export function ErrorChart({
  title,
  error = "Failed to load chart data",
}: {
  title: string;
  error?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg text-red-800">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Generate accessible colors for charts (colorblind-friendly)
 * Uses palette that's accessible for colorblind users
 */
export const accessibleChartColors = {
  palette1: ["#0173B2", "#DE8F05", "#CC78BC", "#CA9161", "#949494"], // Blue, Orange, Purple, Brown, Gray
  palette2: ["#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E"], // Green, Orange, Purple, Pink, Green
  palette3: ["#377EB8", "#FF7F00", "#4DAF4A", "#984EA3", "#E41A1C"], // Blue, Orange, Green, Purple, Red

  // Specific colors
  primary: "#0173B2",
  success: "#1B9E77",
  warning: "#DE8F05",
  danger: "#E41A1C",
  info: "#377EB8",
  neutral: "#949494",
};
