import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Truck,
  Star,
  Calendar,
  FileText,
  Clock,
  Package,
  AlertTriangle,
  UserCheck,
  UserX,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockAdminDrivers, mockAdminVehicles } from '@/data/transportAdminData';
import { toast } from 'sonner';

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  active: { label: 'Active', variant: 'default' },
  suspended: { label: 'Suspended', variant: 'destructive' },
  pending: { label: 'Pending', variant: 'outline' },
};

export default function AdminDriverDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const driver = mockAdminDrivers.find((d) => d.id === id);

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-muted-foreground">Driver not found</p>
        <Button onClick={() => navigate('/admin/drivers')}>Back to Drivers</Button>
      </div>
    );
  }

  const availableVehicles = mockAdminVehicles.filter(
    (v) => v.status === 'active' && (!v.assignedDriverId || v.assignedDriverId === driver.id)
  );

  const handleSuspend = () => {
    toast.success(`Driver ${driver.name} has been ${driver.status === 'suspended' ? 'activated' : 'suspended'}`);
    setShowSuspendDialog(false);
    setSuspendReason('');
  };

  const handleVehicleChange = () => {
    if (selectedVehicle === 'unassign') {
      toast.success(`Vehicle unassigned from ${driver.name}`);
    } else {
      toast.success(`Vehicle assigned to ${driver.name}`);
    }
    setShowVehicleDialog(false);
    setSelectedVehicle('');
  };

  const handleRequestDocumentUpdate = () => {
    toast.success('Document update request sent to driver');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/drivers')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{driver.name}</h1>
            <Badge variant={statusConfig[driver.status]?.variant || 'secondary'}>
              {statusConfig[driver.status]?.label || driver.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Driver ID: {driver.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowVehicleDialog(true)}>
            <Truck className="h-4 w-4 mr-2" />
            {driver.assignedVehicle ? 'Change Vehicle' : 'Assign Vehicle'}
          </Button>
          <Button
            variant={driver.status === 'suspended' ? 'default' : 'destructive'}
            onClick={() => setShowSuspendDialog(true)}
          >
            {driver.status === 'suspended' ? (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Activate
              </>
            ) : (
              <>
                <UserX className="h-4 w-4 mr-2" />
                Suspend
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{driver.name}</h2>
              <p className="text-muted-foreground">Driver</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{driver.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>{driver.assignedVehicle || 'No vehicle assigned'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Joined {format(new Date(driver.joinedDate), 'MMM d, yyyy')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold">{driver.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{driver.totalDeliveries}</p>
                <p className="text-sm text-muted-foreground">Deliveries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="documents">
            <TabsList className="w-full">
              <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Delivery History</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleRequestDocumentUpdate}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Request Update
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">ID Front</p>
                      {driver.documents.idFront ? (
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                          <span className="text-muted-foreground text-sm">Not uploaded</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">ID Back</p>
                      {driver.documents.idBack ? (
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                          <span className="text-muted-foreground text-sm">Not uploaded</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Selfie</p>
                      {driver.documents.selfie ? (
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                          <span className="text-muted-foreground text-sm">Not uploaded</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Driver's License</p>
                      {driver.documents.license ? (
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                          <span className="text-muted-foreground text-sm">Not uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Delivery History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Delivery ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {driver.deliveryHistory.length > 0 ? (
                        driver.deliveryHistory.map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{format(new Date(delivery.date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {delivery.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              KES {delivery.earnings.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No delivery history
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {driver.activityLog.map((activity, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {index < driver.activityLog.length - 1 && (
                            <div className="w-0.5 h-full bg-border flex-1 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(activity.timestamp), 'MMM d, yyyy HH:mm')}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Suspend/Activate Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {driver.status === 'suspended' ? 'Activate Driver' : 'Suspend Driver'}
            </DialogTitle>
            <DialogDescription>
              {driver.status === 'suspended'
                ? 'This will allow the driver to accept new deliveries.'
                : 'This will prevent the driver from accepting new deliveries.'}
            </DialogDescription>
          </DialogHeader>
          {driver.status !== 'suspended' && (
            <div className="py-4">
              <label className="text-sm font-medium">Reason for suspension</label>
              <Textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Enter reason..."
                className="mt-2"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button
              variant={driver.status === 'suspended' ? 'default' : 'destructive'}
              onClick={handleSuspend}
            >
              {driver.status === 'suspended' ? 'Activate' : 'Suspend'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vehicle Assignment Dialog */}
      <Dialog open={showVehicleDialog} onOpenChange={setShowVehicleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {driver.assignedVehicle ? 'Change Vehicle Assignment' : 'Assign Vehicle'}
            </DialogTitle>
            <DialogDescription>
              Select a vehicle to assign to this driver.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {driver.assignedVehicle && (
                  <SelectItem value="unassign">Unassign current vehicle</SelectItem>
                )}
                {availableVehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.plateNumber} - {vehicle.type} ({vehicle.loadCapacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVehicleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVehicleChange} disabled={!selectedVehicle}>
              {selectedVehicle === 'unassign' ? 'Unassign' : 'Assign'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
