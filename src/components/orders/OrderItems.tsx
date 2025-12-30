import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order, formatCurrency } from '@/data/mockData';

interface OrderItemsProps {
  order: Order;
}

export function OrderItems({ order }: OrderItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Items ({order.items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg"
            >
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.productName}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>SKU: {item.sku}</span>
                  <span>•</span>
                  <span>Qty: {item.quantity}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(item.price)} each
                </p>
              </div>
              <p className="font-semibold text-foreground text-right">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {order.shippingCost === 0 ? 'Free' : formatCurrency(order.shippingCost)}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
