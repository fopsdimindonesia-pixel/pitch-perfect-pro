/**
 * Socceros Dashboard Layout Components
 * Provides layout and UI components for Socceros dashboards
 */

import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Main dashboard layout wrapper
 */
interface SoccerosDashboardLayoutProps {
  children: ReactNode;
  role?: string;
}

export function SoccerosDashboardLayout({ children, role }: SoccerosDashboardLayoutProps) {
  return <div className="space-y-4" data-role={role}>{children}</div>;
}

/**
 * Page header with title and description
 */
interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  icon?: ReactNode | string;
  action?: ReactNode;
}

export function PageHeader({ title, description, subtitle, icon, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {icon && typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        {(description || subtitle) && <p className="text-muted-foreground mt-1">{description || subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * Data table header component
 */
interface DataTableHeaderProps {
  title: string;
  children?: ReactNode;
}

export function DataTableHeader({ title, children }: DataTableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

/**
 * Stat card for displaying key metrics
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
  color?: string;
}

export function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card className={color ? `border-l-4 border-l-${color}-500` : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs mt-2 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Status badge for football/soccer statuses
 */
interface StatusBadgeFootballProps {
  status: string;
  variant?: 'active' | 'inactive' | 'pending';
}

export function StatusBadgeFootball({ status, variant = 'active' }: StatusBadgeFootballProps) {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[variant]}`}>{status}</span>;
}

/**
 * Pitch visualization component for football field
 */
export function PitchVisualization({ children }: { children?: ReactNode }) {
  return (
    <div className="w-full aspect-video bg-green-50 border-2 border-green-200 rounded-lg p-4">
      <div className="w-full h-full bg-gradient-to-b from-green-700 to-green-600 rounded relative">
        {/* Center line */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white transform -translate-x-1/2" />
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        {children}
      </div>
    </div>
  );
}
