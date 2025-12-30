import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/data/mockData';

interface OrderCustomerInfoProps {
  order: Order;
}

export function OrderCustomerInfo({ order }: OrderCustomerInfoProps) {
  return (
    <div className="space-y-4">
      {/* Customer Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">
                {order.customerName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{order.customerName}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{order.customerEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{order.customerPhone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{order.shippingAddress}</p>
        </CardContent>
      </Card>
    </div>
  );
}
