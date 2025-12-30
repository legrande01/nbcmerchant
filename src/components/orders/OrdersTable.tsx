import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Order,
  formatCurrency,
  formatDate,
  getOrderStatusColor,
  getPaymentStatusColor,
  orderStatusLabels,
} from '@/data/mockData';

interface OrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
  showEmptyState?: boolean;
}

export function OrdersTable({ orders, isLoading = false, showEmptyState = false }: OrdersTableProps) {
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (orders.length === 0 || showEmptyState) {
    return (
      <Card>
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              New orders will appear here when customers make purchases from your store.
            </p>
            <Button asChild>
              <Link to="/products">View Products</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    // Navigate on row click
                    window.location.href = `/orders/${order.id}`;
                  }}
                >
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="font-semibold">{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getPaymentStatusColor(order.paymentStatus) as any}
                      className="capitalize"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getOrderStatusColor(order.status) as any}
                    >
                      {orderStatusLabels[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to={`/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
