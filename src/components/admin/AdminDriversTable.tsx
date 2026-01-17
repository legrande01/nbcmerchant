import { ChevronRight, User, Truck, Star, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdminDriver, getDriverStatusColor, getVehicleTypeLabel } from '@/data/adminData';
import { formatDistanceToNow } from 'date-fns';

interface AdminDriversTableProps {
  drivers: AdminDriver[];
  onViewDriver: (driverId: string) => void;
}

export function AdminDriversTable({ drivers, onViewDriver }: AdminDriversTableProps) {
  if (drivers.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No drivers found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
            <TableHead className="hidden sm:table-cell">Deliveries</TableHead>
            <TableHead className="hidden md:table-cell">Rating</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow
              key={driver.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onViewDriver(driver.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <p className="text-xs text-muted-foreground">{driver.district}, {driver.region}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="text-sm">{driver.phone}</p>
              </TableCell>
              <TableCell>
                <Badge className={getDriverStatusColor(driver.status)} variant="secondary">
                  {driver.status === 'active' ? 'Active' : 'Suspended'}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {driver.vehiclePlate ? (
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-mono text-sm">{driver.vehiclePlate}</p>
                      <p className="text-xs text-muted-foreground">
                        {driver.vehicleType && getVehicleTypeLabel(driver.vehicleType)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <p className="font-medium">{driver.deliveryCount}</p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{driver.rating.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
