import { ChevronRight, MapPin, User, Truck } from 'lucide-react';
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
import { AdminDelivery, getDeliveryStatusColor, formatCurrency } from '@/data/adminData';
import { formatDistanceToNow } from 'date-fns';

interface AdminDeliveryTableProps {
  deliveries: AdminDelivery[];
  onViewDelivery: (deliveryId: string) => void;
}

const statusLabels: Record<string, string> = {
  assigned: 'Assigned',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  dispute: 'Dispute',
};

export function AdminDeliveryTable({ deliveries, onViewDelivery }: AdminDeliveryTableProps) {
  if (deliveries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No deliveries found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Driver</TableHead>
            <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Assigned</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow
              key={delivery.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onViewDelivery(delivery.id)}
            >
              <TableCell>
                <div>
                  <p className="font-mono text-sm font-medium">{delivery.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{delivery.merchantName}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{delivery.customerName}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {delivery.dropoffAddress.split(',')[0]}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="font-medium text-sm">{delivery.driverName}</p>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <p className="font-mono text-sm">{delivery.vehiclePlate}</p>
              </TableCell>
              <TableCell>
                <Badge className={getDeliveryStatusColor(delivery.status)} variant="secondary">
                  {statusLabels[delivery.status]}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(delivery.assignedAt), { addSuffix: true })}
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
