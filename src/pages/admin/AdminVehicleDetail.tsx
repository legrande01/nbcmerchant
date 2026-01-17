import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Truck,
  User,
  MapPin,
  Package,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { mockAdminVehicles, mockAdminDrivers } from '@/data/transportAdminData';

const typeIcons: Record<string, string> = { bike: '🏍️', car: '🚗', van: '🚐', truck: '🚛' };

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

const deliveryStatusColors: Record<string, string> = {
  delivered: 'bg-green-100 text-green-800',
  in_transit: 'bg-blue-100 text-blue-800',
  awaiting_pickup: 'bg-yellow-100 text-yellow-800',
  dispute: 'bg-red-100 text-red-800',
};

export default function AdminVehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDriverDialog, setShowDriverDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  const vehicle = mockAdminVehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Vehicle Not Found</h2>
          <p className="text-muted-foreground mb-4">The vehicle you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/admin/fleet')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Fleet
          </Button>
        </div>
      </div>
    );
  }

  const availableDrivers = mockAdminDrivers.filter(
    (driver) =>
      driver.status === 'active' &&
      (!driver.assignedVehicle || driver.id === vehicle.assignedDriverId)
  );

  const handleDriverAssignment = () => {
    if (vehicle.status === 'inactive') {
      toast.error('Cannot assign driver to an inactive vehicle');
      return;
    }

    const driver = mockAdminDrivers.find((d) => d.id === selectedDriverId);
    const action = selectedDriverId ? 'assigned' : 'unassigned';
    const message = selectedDriverId
      ? `${driver?.name} has been assigned to ${vehicle.plateNumber}`
      : `Driver has been unassigned from ${vehicle.plateNumber}`;

    toast.success(message);
    setShowDriverDialog(false);
    setSelectedDriverId('');
  };

  const handleStatusChange = (newStatus: 'active' | 'inactive') => {
    if (newStatus === 'inactive' && vehicle.activeDeliveries > 0) {
      toast.error('Cannot deactivate vehicle with active deliveries');
      return;
    }

    const message =
      newStatus === 'active'
        ? `${vehicle.plateNumber} has been activated`
        : `${vehicle.plateNumber} has been deactivated`;

    toast.success(message);
    setShowStatusDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/fleet')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{typeIcons[vehicle.type]}</span>
              <h1 className="text-2xl font-bold">{vehicle.plateNumber}</h1>
              <Badge className={statusColors[vehicle.status]}>{vehicle.status}</Badge>
            </div>
            <p className="text-muted-foreground capitalize">{vehicle.type} • {vehicle.loadCapacity}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowStatusDialog(true)}
          >
            {vehicle.status === 'active' ? (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate
              </>
            )}
          </Button>
          <Button onClick={() => setShowDriverDialog(true)} disabled={vehicle.status === 'inactive'}>
            <User className="h-4 w-4 mr-2" />
            {vehicle.assignedDriver ? 'Change Driver' : 'Assign Driver'}
          </Button>
        </div>
      </div>

      {/* Vehicle Info Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Assigned Driver</p>
                <p className="font-semibold">{vehicle.assignedDriver || 'Unassigned'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Operating Zone</p>
                <p className="font-semibold text-sm">{vehicle.operatingZone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Deliveries</p>
                <p className="font-semibold">{vehicle.activeDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Insurance Expiry</p>
                <p className="font-semibold">
                  {vehicle.insuranceExpiry
                    ? format(new Date(vehicle.insuranceExpiry), 'dd MMM yyyy')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          <TabsTrigger value="activity">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plate Number</p>
                    <p className="font-medium">{vehicle.plateNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium capitalize">
                      {typeIcons[vehicle.type]} {vehicle.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Load Capacity</p>
                    <p className="font-medium">{vehicle.loadCapacity}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={statusColors[vehicle.status]}>{vehicle.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Maintenance</p>
                    <p className="font-medium">
                      {vehicle.lastMaintenance
                        ? format(new Date(vehicle.lastMaintenance), 'dd MMM yyyy')
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operating Zone</p>
                    <p className="font-medium">{vehicle.operatingZone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries">
          <div className="space-y-4">
            {/* Current Delivery */}
            {vehicle.currentDelivery && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    Current Active Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{vehicle.currentDelivery.orderId}</p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.currentDelivery.dropOffLocation}
                      </p>
                    </div>
                    <Badge className={deliveryStatusColors[vehicle.currentDelivery.status]}>
                      {vehicle.currentDelivery.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Completed Deliveries</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {vehicle.recentDeliveries && vehicle.recentDeliveries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Drop-off Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicle.recentDeliveries.slice(0, 5).map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-medium">{delivery.orderId}</TableCell>
                          <TableCell>{format(new Date(delivery.date), 'dd MMM yyyy')}</TableCell>
                          <TableCell>{delivery.dropOffLocation}</TableCell>
                          <TableCell>
                            <Badge className={deliveryStatusColors[delivery.status] || 'bg-gray-100'}>
                              {delivery.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent deliveries
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.activityHistory && vehicle.activityHistory.length > 0 ? (
                <div className="space-y-4">
                  {vehicle.activityHistory.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 pb-4 border-b last:border-0"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {activity.action === 'assigned' && <User className="h-5 w-5 text-primary" />}
                        {activity.action === 'unassigned' && (
                          <User className="h-5 w-5 text-muted-foreground" />
                        )}
                        {activity.action === 'activated' && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {activity.action === 'deactivated' && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        {activity.action === 'created' && <Truck className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium capitalize">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        {activity.driverName && (
                          <p className="text-sm text-muted-foreground">
                            Driver: {activity.driverName}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(activity.timestamp), 'dd MMM yyyy, HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No activity history</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Driver Assignment Dialog */}
      <Dialog open={showDriverDialog} onOpenChange={setShowDriverDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {vehicle.assignedDriver ? 'Reassign Driver' : 'Assign Driver'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              {vehicle.assignedDriver
                ? `Currently assigned to: ${vehicle.assignedDriver}`
                : 'No driver currently assigned'}
            </p>
            <div>
              <label className="text-sm font-medium">Select Driver</label>
              <Select 
                value={selectedDriverId || "none"} 
                onValueChange={(value) => setSelectedDriverId(value === "none" ? "" : value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassign driver</SelectItem>
                  {availableDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} - {driver.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDriverDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDriverAssignment}>
              {selectedDriverId ? 'Assign Driver' : 'Unassign Driver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {vehicle.status === 'active' ? 'Deactivate Vehicle' : 'Activate Vehicle'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {vehicle.status === 'active' ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to deactivate this vehicle?
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Vehicle will not receive new deliveries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Vehicle will remain visible in the fleet list
                  </li>
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Activating this vehicle will allow it to receive new delivery assignments.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
            <Button
              variant={vehicle.status === 'active' ? 'destructive' : 'default'}
              onClick={() =>
                handleStatusChange(vehicle.status === 'active' ? 'inactive' : 'active')
              }
            >
              {vehicle.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
