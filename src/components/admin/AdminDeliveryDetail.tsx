import { ArrowLeft, MapPin, User, Truck, Phone, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AdminDelivery, getDeliveryStatusColor, formatCurrency } from '@/data/adminData';
import { format } from 'date-fns';

interface AdminDeliveryDetailProps {
  delivery: AdminDelivery;
  onBack: () => void;
}

const statusLabels: Record<string, string> = {
  assigned: 'Assigned',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  dispute: 'Dispute',
};

export function AdminDeliveryDetail({ delivery, onBack }: AdminDeliveryDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{delivery.orderNumber}</h2>
            <Badge className={getDeliveryStatusColor(delivery.status)} variant="secondary">
              {statusLabels[delivery.status]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{delivery.merchantName}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Customer & Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{delivery.customerName}</p>
                  <p className="text-sm text-muted-foreground">{delivery.customerPhone}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup</p>
                    <p className="text-sm">{delivery.pickupAddress}</p>
                  </div>
                </div>
                <div className="ml-2.5 border-l-2 border-dashed h-4" />
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Dropoff</p>
                    <p className="text-sm">{delivery.dropoffAddress}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Distance</p>
                  <p className="font-medium">{delivery.distance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Est. Time</p>
                  <p className="font-medium">{delivery.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-medium">{formatCurrency(delivery.payoutAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver & Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{delivery.driverName}</p>
                  <p className="text-sm text-muted-foreground">Driver</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-mono font-medium">{delivery.vehiclePlate}</p>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Info */}
          {delivery.status === 'dispute' && delivery.disputeReason && (
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Dispute Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{delivery.disputeReason}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Map integration coming soon</p>
                  <p className="text-xs mt-1">
                    {delivery.pickupCoords.lat.toFixed(4)}, {delivery.pickupCoords.lng.toFixed(4)} →{' '}
                    {delivery.dropoffCoords.lat.toFixed(4)}, {delivery.dropoffCoords.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proof & Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Proof & Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Pickup Verified</span>
                  {delivery.proof.pickupVerified ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Pickup Code</span>
                  {delivery.proof.pickupCode ? (
                    <span className="font-mono text-sm">{delivery.proof.pickupCode}</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">Not entered</span>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Goods Photo</span>
                  {delivery.proof.goodsPhoto ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">ID Photo</span>
                  {delivery.proof.idPhoto ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Driver Selfie</span>
                  {delivery.proof.selfie ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Delivery Photo</span>
                  {delivery.proof.deliveryPhoto ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Delivery Verified</span>
                  {delivery.proof.deliveryVerified ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {delivery.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {index < delivery.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border flex-1 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{event.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(event.timestamp), 'MMM d, HH:mm')}
                        </p>
                      </div>
                      {event.note && (
                        <p className="text-sm text-muted-foreground mt-0.5">{event.note}</p>
                      )}
                      {event.actor && (
                        <p className="text-xs text-muted-foreground mt-0.5">by {event.actor}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
