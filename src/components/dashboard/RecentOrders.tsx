import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockOrders, formatCurrency, formatDate, getOrderStatusColor } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface RecentOrdersProps {
  className?: string;
  showEmptyState?: boolean;
}

export function RecentOrders({ className, showEmptyState = false }: RecentOrdersProps) {
  const orders = showEmptyState ? [] : mockOrders.slice(0, 5);

  if (orders.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No orders yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
              When customers place orders, they'll appear here
            </p>
            <Button asChild>
              <Link to="/products">Add Your First Product</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/orders" className="text-primary">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-foreground">
                    {order.orderNumber}
                  </span>
                  <Badge variant={getOrderStatusColor(order.status) as any} className="capitalize">
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {order.customerName} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-foreground">{formatCurrency(order.total)}</p>
                <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
