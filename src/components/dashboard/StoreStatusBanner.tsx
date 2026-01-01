import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { StoreStatusInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface StoreStatusBannerProps {
  storeStatus: StoreStatusInfo;
  className?: string;
}

const statusConfig = {
  active: {
    icon: CheckCircle,
    variant: 'default' as const,
    bgClass: 'bg-success/10 border-success/20',
    iconClass: 'text-success',
    textClass: 'text-success',
  },
  pending_approval: {
    icon: Clock,
    variant: 'default' as const,
    bgClass: 'bg-warning/10 border-warning/20',
    iconClass: 'text-warning',
    textClass: 'text-warning',
  },
  suspended: {
    icon: XCircle,
    variant: 'destructive' as const,
    bgClass: 'bg-destructive/10 border-destructive/20',
    iconClass: 'text-destructive',
    textClass: 'text-destructive',
  },
  action_required: {
    icon: AlertTriangle,
    variant: 'default' as const,
    bgClass: 'bg-accent/10 border-accent/20',
    iconClass: 'text-accent',
    textClass: 'text-accent',
  },
};

export function StoreStatusBanner({ storeStatus, className }: StoreStatusBannerProps) {
  const config = statusConfig[storeStatus.status];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.bgClass, 'border', className)}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Icon className={cn('h-5 w-5', config.iconClass)} />
          <AlertDescription className={cn('text-sm font-medium', config.textClass)}>
            {storeStatus.message}
          </AlertDescription>
        </div>
        {storeStatus.actionRequired && (
          <Button variant="outline" size="sm" asChild className="ml-4">
            <Link to={storeStatus.actionRequired.ctaLink}>
              {storeStatus.actionRequired.ctaLabel}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>
    </Alert>
  );
}