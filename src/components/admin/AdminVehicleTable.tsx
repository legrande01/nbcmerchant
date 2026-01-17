import { ChevronRight, Car, User } from 'lucide-react';
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
import { AdminVehicle, getVehicleStatusColor, getVehicleTypeLabel } from '@/data/adminData';

interface AdminVehicleTableProps {
  vehicles: AdminVehicle[];
  onViewVehicle: (vehicleId: string) => void;
}

export function AdminVehicleTable({ vehicles, onViewVehicle }: AdminVehicleTableProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No vehicles found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plate Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Capacity</TableHead>
            <TableHead className="hidden lg:table-cell">Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Driver</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow
              key={vehicle.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onViewVehicle(vehicle.id)}
            >
              <TableCell>
                <p className="font-mono font-medium">{vehicle.plateNumber}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm">{getVehicleTypeLabel(vehicle.type)}</p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="text-sm">{vehicle.capacityKg} kg</p>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <p className="text-sm">{vehicle.ward || vehicle.district}</p>
                <p className="text-xs text-muted-foreground">{vehicle.region}</p>
              </TableCell>
              <TableCell>
                <Badge className={getVehicleStatusColor(vehicle.status)} variant="secondary">
                  {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {vehicle.assignedDriverName ? (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{vehicle.assignedDriverName}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Unassigned</span>
                )}
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
