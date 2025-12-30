import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  href: string;
  searchParams?: Record<string, string>;
  iconColor?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  href,
  iconColor = 'bg-primary/10 text-primary',
  loading = false,
}: KPICardProps) {
  if (loading) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={href}>
      <Card className="hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <div className="flex items-center gap-1.5 mt-2">
                  {trend.isPositive ? (
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      'text-xs font-medium',
                      trend.isPositive ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)} {trend.label || 'vs yesterday'}
                  </span>
                </div>
              )}
            </div>
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110',
                iconColor
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
