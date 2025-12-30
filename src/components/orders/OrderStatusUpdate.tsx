import { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OrderStatus, orderStatusFlow, orderStatusLabels } from '@/data/mockData';

interface OrderStatusUpdateProps {
  currentStatus: OrderStatus;
  onStatusUpdate: (newStatus: OrderStatus) => void;
}

export function OrderStatusUpdate({ currentStatus, onStatusUpdate }: OrderStatusUpdateProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const availableTransitions = orderStatusFlow[currentStatus] || [];
  const canUpdate = availableTransitions.length > 0 && currentStatus !== 'refunded';

  const handleUpdateClick = () => {
    if (selectedStatus) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmUpdate = () => {
    if (selectedStatus) {
      onStatusUpdate(selectedStatus);
      setSelectedStatus('');
      setShowConfirmDialog(false);
    }
  };

  // Check if current status is terminal
  const isTerminalStatus = ['completed', 'cancelled', 'refunded'].includes(currentStatus);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Update Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStatus === 'refunded' && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Refunds are handled by platform administrators. Contact support if you have questions about this refund.
              </AlertDescription>
            </Alert>
          )}

          {isTerminalStatus && currentStatus !== 'refunded' && (
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertDescription>
                This order is {orderStatusLabels[currentStatus].toLowerCase()} and cannot be updated further.
              </AlertDescription>
            </Alert>
          )}

          {canUpdate ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {availableTransitions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {orderStatusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateClick}
                disabled={!selectedStatus}
                className="whitespace-nowrap"
              >
                Update Status
              </Button>
            </div>
          ) : null}

          {/* Refund notice */}
          {!isTerminalStatus && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Refunds are handled by platform administrators. If a customer requests a refund, please contact support.
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Confirm Status Update
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the order status from{' '}
              <span className="font-medium text-foreground">{orderStatusLabels[currentStatus]}</span>{' '}
              to{' '}
              <span className="font-medium text-foreground">
                {selectedStatus ? orderStatusLabels[selectedStatus] : ''}
              </span>
              ?
              {selectedStatus === 'cancelled' && (
                <span className="block mt-2 text-destructive">
                  This action cannot be undone. The order will be marked as cancelled.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUpdate}>
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
