import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DriverDeliveryStatus } from '@/data/driverData';

interface DeliveryTimelineProps {
  status: DriverDeliveryStatus;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}

const timelineSteps = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'pickup_confirmed', label: 'Pickup Confirmed' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'awaiting_confirmation', label: 'Awaiting Buyer Confirmation' },
  { key: 'delivered', label: 'Delivered' },
];

function getActiveStep(status: DriverDeliveryStatus): number {
  switch (status) {
    case 'awaiting_pickup':
      return 0;
    case 'in_transit':
      return 2;
    case 'awaiting_buyer_confirmation':
      return 3;
    case 'delivered':
      return 4;
    case 'dispute':
      return 4; // Show as delivered but with dispute state
    default:
      return 0;
  }
}

export function DeliveryTimeline({ status, assignedAt, pickedUpAt, deliveredAt }: DeliveryTimelineProps) {
  const activeStep = getActiveStep(status);
  const isDispute = status === 'dispute';

  const getStepTime = (stepKey: string): string | null => {
    switch (stepKey) {
      case 'assigned':
        return assignedAt ? new Date(assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
      case 'pickup_confirmed':
      case 'in_transit':
        return pickedUpAt ? new Date(pickedUpAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
      case 'delivered':
        return deliveredAt ? new Date(deliveredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-0">
      {timelineSteps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const stepTime = getStepTime(step.key);

        return (
          <div key={step.key} className="flex gap-3">
            {/* Vertical line and dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  isCompleted && 'bg-green-500 text-white',
                  isCurrent && !isDispute && 'bg-primary text-primary-foreground',
                  isCurrent && isDispute && 'bg-destructive text-destructive-foreground',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isCurrent ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              {index < timelineSteps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-8 my-1',
                    isCompleted ? 'bg-green-500' : 'bg-muted'
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div className="pb-4">
              <p
                className={cn(
                  'text-sm font-medium',
                  isCompleted && 'text-green-700',
                  isCurrent && !isDispute && 'text-primary',
                  isCurrent && isDispute && 'text-destructive',
                  !isCompleted && !isCurrent && 'text-muted-foreground'
                )}
              >
                {step.label}
                {isCurrent && isDispute && ' (Disputed)'}
              </p>
              {stepTime && (
                <p className="text-xs text-muted-foreground">{stepTime}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
