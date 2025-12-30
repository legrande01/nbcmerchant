import { CreditCard, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Order,
  formatCurrency,
  formatDate,
  formatTime,
  getOrderStatusColor,
  getPaymentStatusColor,
  orderStatusLabels,
} from '@/data/mockData';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Order Total */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Total</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(order.total)}</p>
          </div>

          {/* Date & Time */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Date</p>
            <p className="font-medium text-foreground">{formatDate(order.createdAt)}</p>
            <p className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</p>
          </div>

          {/* Payment Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment</p>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={getPaymentStatusColor(order.paymentStatus) as any} className="capitalize">
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {order.paymentMethod.includes('Card') ? (
                <CreditCard className="h-3.5 w-3.5" />
              ) : (
                <Wallet className="h-3.5 w-3.5" />
              )}
              <span className="truncate">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Status</p>
            <Badge variant={getOrderStatusColor(order.status) as any} className="text-sm">
              {orderStatusLabels[order.status]}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
