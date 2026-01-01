import { Link } from 'react-router-dom';
import { Package, Tag, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FulfillmentAlert } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface FulfillmentQueueProps {
  alerts: FulfillmentAlert[];
  className?: string;
}

const alertIcons = {
  awaiting_processing: Package,
  needs_label: Tag,
  late_order: AlertTriangle,
};

const urgencyColors = {
  high: 'text-destructive bg-destructive/10',
  medium: 'text-warning bg-warning/10',
  low: 'text-muted-foreground bg-muted',
};

export function FulfillmentQueue({ alerts, className }: FulfillmentQueueProps) {
  const totalCount = alerts.reduce((sum, alert) => sum + alert.count, 0);

  if (totalCount === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Fulfillment Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <Package className="h-8 w-8 text-success mb-2" />
            <p className="text-sm font-medium text-foreground">All orders fulfilled!</p>
            <p className="text-xs text-muted-foreground">No pending fulfillment tasks.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Fulfillment Queue
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/help?article=fulfillment-guide" className="text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn about order fulfillment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type];
            return (
              <Link
                key={alert.id}
                to={alert.link}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  urgencyColors[alert.urgency]
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">
                    {alert.label}
                  </p>
                </div>
                <span className={cn(
                  'text-sm font-bold px-2 py-0.5 rounded',
                  urgencyColors[alert.urgency]
                )}>
                  {alert.count}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}