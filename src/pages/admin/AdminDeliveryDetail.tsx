import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Store,
  Truck,
  Clock,
  AlertTriangle,
  Image,
  CheckCircle,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockAdminDeliveries, mockAdminDrivers } from '@/data/transportAdminData';
import { toast } from 'sonner';

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
  assigned: { label: 'Assigned', variant: 'secondary', color: 'bg-gray-500' },
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'outline', color: 'bg-yellow-500' },
  in_transit: { label: 'In Transit', variant: 'default', color: 'bg-blue-500' },
  awaiting_confirmation: { label: 'Awaiting Confirmation', variant: 'outline', color: 'bg-orange-500' },
  delivered: { label: 'Delivered', variant: 'secondary', color: 'bg-green-500' },
  dispute: { label: 'Dispute', variant: 'destructive', color: 'bg-red-500' },
};

export default function AdminDeliveryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string>('');

  const delivery = mockAdminDeliveries.find((d) => d.id === id);

  if (!delivery) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-muted-foreground">Delivery not found</p>
        <Button onClick={() => navigate('/admin/deliveries')}>Back to Deliveries</Button>
      </div>
    );
  }

  const canReassign = delivery.status === 'assigned' || delivery.status === 'awaiting_pickup';
  const availableDrivers = mockAdminDrivers.filter(
    (d) => d.status === 'active' && d.availability === 'online' && d.name !== delivery.driver
  );

  const handleReassign = () => {
    if (!selectedDriver) return;
    toast.success(`Delivery reassigned to ${selectedDriver}`);
    setShowReassignDialog(false);
    setSelectedDriver('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/deliveries')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{delivery.orderId}</h1>
            <Badge variant={statusConfig[delivery.status]?.variant || 'secondary'}>
              {statusConfig[delivery.status]?.label || delivery.status}
            </Badge>
            {delivery.disputeDetails && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Under NBC Review
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Delivery ID: {delivery.id}</p>
        </div>
        {canReassign && (
          <Button onClick={() => setShowReassignDialog(true)} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reassign Driver
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Delivery Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {delivery.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === delivery.timeline.length - 1
                            ? statusConfig[delivery.status]?.color || 'bg-primary'
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                      {index < delivery.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border flex-1 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="font-medium text-sm">{event.status}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(event.timestamp), 'MMM d, yyyy HH:mm')}
                      </p>
                      {event.note && (
                        <p className="text-sm text-muted-foreground mt-1">{event.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dispute Details */}
          {delivery.disputeDetails && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Dispute Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="font-medium">{delivery.disputeDetails.reason}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Reported By</p>
                    <p className="font-medium">{delivery.disputeDetails.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reported At</p>
                    <p className="font-medium">
                      {format(new Date(delivery.disputeDetails.reportedAt), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  Status: Under NBC Review
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Proof & Verification */}
          {delivery.proofImages && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Proof & Verification (Read-Only)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {delivery.proofImages.pickupGoods && delivery.proofImages.pickupGoods.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Pickup Goods Images</p>
                    <div className="flex gap-2 flex-wrap">
                      {delivery.proofImages.pickupGoods.map((img, i) => (
                        <div
                          key={i}
                          className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center"
                        >
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {delivery.proofImages.driverSelfie && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Driver Selfie</p>
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                )}
                {delivery.proofImages.driverId && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Driver ID</p>
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                )}
                {delivery.proofImages.deliveryProof && delivery.proofImages.deliveryProof.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Delivery Proof Images</p>
                    <div className="flex gap-2 flex-wrap">
                      {delivery.proofImages.deliveryProof.map((img, i) => (
                        <div
                          key={i}
                          className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center"
                        >
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Map View</p>
                  <p className="text-sm">Pickup → Drop-off Route</p>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>{delivery.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>{delivery.dropOffLocation}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Info Cards */}
        <div className="space-y-6">
          {/* Driver Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Assigned Driver
              </CardTitle>
            </CardHeader>
            <CardContent>
              {delivery.driver ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{delivery.driver}</p>
                      <p className="text-sm text-muted-foreground">{delivery.vehicle}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No driver assigned yet</p>
              )}
            </CardContent>
          </Card>

          {/* Merchant Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Store className="h-5 w-5" />
                Merchant Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Business Name</p>
                <p className="font-medium">{delivery.merchant}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{delivery.merchantPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{delivery.pickupLocation}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{delivery.customerName}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{delivery.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{delivery.dropOffLocation}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reassign Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Driver</DialogTitle>
            <DialogDescription>
              Select a new driver to assign to this delivery. This can only be done before pickup.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger>
                <SelectValue placeholder="Select a driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.length > 0 ? (
                  availableDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.name}>
                      {driver.name} ({driver.assignedVehicle || 'No vehicle'})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No available drivers
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReassign} disabled={!selectedDriver}>
              Reassign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
