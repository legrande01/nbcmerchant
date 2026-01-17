import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Package,
  Search,
  Filter,
  ChevronRight,
  MapPin,
  Clock,
  User,
  Truck,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { mockAdminDeliveries, mockAdminDrivers } from '@/data/transportAdminData';

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  assigned: { label: 'Assigned', variant: 'secondary' },
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'outline' },
  in_transit: { label: 'In Transit', variant: 'default' },
  awaiting_confirmation: { label: 'Awaiting Confirmation', variant: 'outline' },
  delivered: { label: 'Delivered', variant: 'secondary' },
  dispute: { label: 'Dispute', variant: 'destructive' },
};

export default function AdminDeliveryManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [driverFilter, setDriverFilter] = useState<string>('all');
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);

  const filteredDeliveries = mockAdminDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesDriver = driverFilter === 'all' || delivery.driver === driverFilter;
    
    return matchesSearch && matchesStatus && matchesDriver;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDeliveries(filteredDeliveries.map((d) => d.id));
    } else {
      setSelectedDeliveries([]);
    }
  };

  const handleSelectDelivery = (deliveryId: string, checked: boolean) => {
    if (checked) {
      setSelectedDeliveries([...selectedDeliveries, deliveryId]);
    } else {
      setSelectedDeliveries(selectedDeliveries.filter((id) => id !== deliveryId));
    }
  };

  const uniqueDrivers = [...new Set(mockAdminDeliveries.map((d) => d.driver).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Delivery Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all deliveries for your transport company
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAdminDeliveries.length}</p>
                <p className="text-sm text-muted-foreground">Total Deliveries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAdminDeliveries.filter((d) => d.status === 'in_transit').length}
                </p>
                <p className="text-sm text-muted-foreground">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Package className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAdminDeliveries.filter((d) => d.status === 'delivered').length}
                </p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAdminDeliveries.filter((d) => d.status === 'dispute').length}
                </p>
                <p className="text-sm text-muted-foreground">Disputes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, Order ID, or Merchant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="awaiting_pickup">Awaiting Pickup</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="awaiting_confirmation">Awaiting Confirmation</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="dispute">Dispute</SelectItem>
              </SelectContent>
            </Select>
            <Select value={driverFilter} onValueChange={setDriverFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drivers</SelectItem>
                {uniqueDrivers.map((driver) => (
                  <SelectItem key={driver} value={driver as string}>
                    {driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedDeliveries.length === filteredDeliveries.length && filteredDeliveries.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Drop-off</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/admin/deliveries/${delivery.id}`)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedDeliveries.includes(delivery.id)}
                      onCheckedChange={(checked) =>
                        handleSelectDelivery(delivery.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{delivery.orderId}</TableCell>
                  <TableCell>{delivery.merchant}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {delivery.driver || <span className="text-muted-foreground">Unassigned</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      {delivery.vehicle || <span className="text-muted-foreground">-</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[delivery.status]?.variant || 'secondary'}>
                      {statusConfig[delivery.status]?.label || delivery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[120px]">{delivery.pickupLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[120px]">{delivery.dropOffLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(new Date(delivery.assignedTime), 'MMM d, HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredDeliveries.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No deliveries found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Count */}
      {selectedDeliveries.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-full shadow-lg">
          {selectedDeliveries.length} delivery(ies) selected (view-only)
        </div>
      )}
    </div>
  );
}
