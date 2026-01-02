import { useState } from 'react';
import { Package, Truck, CheckCircle2, AlertTriangle, Clock, User, Camera, CreditCard, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OrderFulfilment as OrderFulfilmentType, FulfilmentStatus } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface OrderFulfilmentProps {
  fulfilment: OrderFulfilmentType;
  onConfirmPickup?: () => void;
}

const statusConfig: Record<FulfilmentStatus, { label: string; variant: 'default' | 'secondary' | 'warning' | 'success' | 'destructive' | 'pending'; icon: React.ElementType }> = {
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'warning', icon: Package },
  pickup_verification: { label: 'Pickup Verification', variant: 'pending', icon: Clock },
  in_transit: { label: 'In Transit', variant: 'secondary', icon: Truck },
  awaiting_buyer_confirmation: { label: 'Awaiting Buyer Confirmation', variant: 'pending', icon: Clock },
  delivered: { label: 'Delivered', variant: 'success', icon: CheckCircle2 },
  dispute: { label: 'Delivery Dispute', variant: 'destructive', icon: AlertTriangle },
};

export function OrderFulfilment({ fulfilment, onConfirmPickup }: OrderFulfilmentProps) {
  const [isHandoverStarted, setIsHandoverStarted] = useState(false);
  const config = statusConfig[fulfilment.status];
  const StatusIcon = config.icon;

  const handleConfirmPickup = () => {
    setIsHandoverStarted(true);
    onConfirmPickup?.();
  };

  const renderVerificationChecklist = () => {
    if (!fulfilment.verification) return null;
    
    const items = [
      { label: 'Goods Image', status: fulfilment.verification.goodsImage, icon: Camera },
      { label: 'Transporter ID', status: fulfilment.verification.transporterId, icon: CreditCard },
      { label: 'Transporter Photo', status: fulfilment.verification.transporterPhoto, icon: User },
    ];

    return (
      <div className="space-y-3 mt-4">
        <p className="text-sm text-muted-foreground">Verification Checklist:</p>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm flex-1">{item.label}</span>
              <Badge variant={item.status === 'verified' ? 'success' : 'pending'}>
                {item.status === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (fulfilment.status) {
      case 'awaiting_pickup':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your order is packed and ready. The transporter will arrive to collect it soon.
            </p>
            {isHandoverStarted ? (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Waiting for transporter verification…
                </AlertDescription>
              </Alert>
            ) : (
              <Button onClick={handleConfirmPickup} className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Confirm Pickup / Start Handover
              </Button>
            )}
          </div>
        );

      case 'pickup_verification':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Transporter is verifying the pickup. Please wait for confirmation.
            </p>
            {renderVerificationChecklist()}
          </div>
        );

      case 'in_transit':
        return (
          <div className="space-y-4">
            {fulfilment.transporterName && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Transporter:</span>{' '}
                  <span className="font-medium">{fulfilment.transporterName}</span>
                </span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Order is on the way to the customer.
            </p>
          </div>
        );

      case 'awaiting_buyer_confirmation':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Customer must confirm delivery to complete the order.
            </p>
          </div>
        );

      case 'delivered':
        return (
          <div className="space-y-4">
            {fulfilment.deliveredAt && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-success/10">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Delivered:</span>{' '}
                  <span className="font-medium">
                    {new Date(fulfilment.deliveredAt).toLocaleString()}
                  </span>
                </span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Payouts will be released automatically.
            </p>
          </div>
        );

      case 'dispute':
        return (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This order is under dispute. Resolution coming soon.
              </AlertDescription>
            </Alert>
            {fulfilment.disputeReason && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Reason:</span> {fulfilment.disputeReason}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Fulfilment & Delivery</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/help?article=fulfilment-process">
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn about the fulfilment process</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant={config.variant}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
