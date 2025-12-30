import { Check, Clock, Package, Truck, Home, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { OrderStatus, OrderTimelineEntry, formatDate, formatTime, orderStatusLabels } from '@/data/mockData';

interface OrderStatusTimelineProps {
  timeline: OrderTimelineEntry[];
  currentStatus: OrderStatus;
}

const statusIcons: Record<OrderStatus, React.ElementType> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: Home,
  completed: CheckCircle,
  cancelled: XCircle,
  refunded: RefreshCw,
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-warning text-warning-foreground',
  processing: 'bg-primary text-primary-foreground',
  shipped: 'bg-primary text-primary-foreground',
  delivered: 'bg-success text-success-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
  refunded: 'bg-muted text-muted-foreground',
};

const inactiveColor = 'bg-muted text-muted-foreground';

export function OrderStatusTimeline({ timeline, currentStatus }: OrderStatusTimelineProps) {
  // Standard flow for visual representation
  const standardFlow: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'completed'];
  const isCancelledOrRefunded = currentStatus === 'cancelled' || currentStatus === 'refunded';

  // Get the timeline entries mapped by status
  const timelineByStatus = timeline.reduce((acc, entry) => {
    acc[entry.status] = entry;
    return acc;
  }, {} as Record<OrderStatus, OrderTimelineEntry>);

  // Find the index of current status in standard flow
  const currentIndex = standardFlow.indexOf(currentStatus);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Order Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Visual Status Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
              <div
                className={cn(
                  'h-full transition-all duration-500',
                  isCancelledOrRefunded ? 'bg-destructive' : 'bg-primary'
                )}
                style={{
                  width: isCancelledOrRefunded
                    ? '100%'
                    : `${Math.max(0, (currentIndex / (standardFlow.length - 1)) * 100)}%`,
                }}
              />
            </div>

            {/* Status Icons */}
            {standardFlow.map((status, index) => {
              const Icon = statusIcons[status];
              const isCompleted = index <= currentIndex && !isCancelledOrRefunded;
              const isCurrent = status === currentStatus && !isCancelledOrRefunded;

              return (
                <div key={status} className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isCompleted ? statusColors[status] : inactiveColor,
                      isCurrent && 'ring-4 ring-primary/20'
                    )}
                  >
                    {isCompleted && index < currentIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-xs mt-2 font-medium text-center',
                      isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {orderStatusLabels[status]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cancelled/Refunded indicator */}
          {isCancelledOrRefunded && (
            <div className="flex items-center justify-center mt-4 p-3 rounded-lg bg-destructive/10">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center mr-3', statusColors[currentStatus])}>
                {currentStatus === 'cancelled' ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </div>
              <span className="font-medium text-destructive">
                Order {orderStatusLabels[currentStatus]}
              </span>
            </div>
          )}
        </div>

        {/* Detailed Timeline */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Activity Log</h4>
          <div className="space-y-3">
            {[...timeline].reverse().map((entry, index) => {
              const Icon = statusIcons[entry.status];
              return (
                <div key={entry.id} className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      index === 0 ? statusColors[entry.status] : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {orderStatusLabels[entry.status]}
                    </p>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
