import { useState } from 'react';
import { ArrowLeft, Car, User, MapPin, Calendar, Weight, Power, PowerOff, UserMinus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { AdminVehicle, AdminDriver, getVehicleStatusColor, getVehicleTypeLabel, getAvailableDriversForVehicle } from '@/data/adminData';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface AdminVehicleDetailProps {
  vehicle: AdminVehicle;
  onBack: () => void;
}

export function AdminVehicleDetail({ vehicle, onBack }: AdminVehicleDetailProps) {
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');
  const availableDrivers = getAvailableDriversForVehicle();

  const handleReassign = () => {
    if (selectedDriverId) {
      toast.success('Vehicle reassigned successfully');
      setIsReassignOpen(false);
      setSelectedDriverId('');
    }
  };

  const handleToggleStatus = () => {
    if (vehicle.status === 'active') {
      toast.success('Vehicle deactivated');
    } else {
      toast.success('Vehicle activated');
    }
  };

  const handleUnassign = () => {
    toast.success('Driver unassigned from vehicle');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold font-mono">{vehicle.plateNumber}</h2>
            <Badge className={getVehicleStatusColor(vehicle.status)} variant="secondary">
              {vehicle.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{getVehicleTypeLabel(vehicle.type)}</p>
        </div>
        {vehicle.status === 'active' ? (
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
            onClick={handleToggleStatus}
          >
            <PowerOff className="h-4 w-4 mr-2" />
            Deactivate
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950"
            onClick={handleToggleStatus}
          >
            <Power className="h-4 w-4 mr-2" />
            Activate
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Car className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-lg">{vehicle.plateNumber}</p>
                  <p className="text-sm text-muted-foreground">{getVehicleTypeLabel(vehicle.type)}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{vehicle.capacityKg} kg</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Operating Area</p>
                    <p className="font-medium">
                      {vehicle.ward && `${vehicle.ward}, `}
                      {vehicle.district}, {vehicle.region}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Added</p>
                    <p className="font-medium">{format(new Date(vehicle.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Assigned Driver */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assigned Driver</CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.assignedDriverName ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{vehicle.assignedDriverName}</p>
                      <p className="text-sm text-muted-foreground">{vehicle.assignedDriverId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsReassignOpen(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Reassign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      onClick={handleUnassign}
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Unassign
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">No driver assigned</p>
                  <Button variant="outline" size="sm" onClick={() => setIsReassignOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Driver
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Last Updated */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Last updated: {format(new Date(vehicle.updatedAt), 'MMM d, yyyy HH:mm')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reassign Dialog */}
      <Dialog open={isReassignOpen} onOpenChange={setIsReassignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {vehicle.assignedDriverName ? 'Reassign Vehicle' : 'Assign Driver'}
            </DialogTitle>
            <DialogDescription>
              Select a driver to assign to this vehicle. Only active drivers without a current vehicle assignment are shown.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.length > 0 ? (
                  availableDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} - {driver.district}
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
            <Button variant="outline" onClick={() => setIsReassignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReassign} disabled={!selectedDriverId}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
