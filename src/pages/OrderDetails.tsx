import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { OrderSummary } from '@/components/orders/OrderSummary';
import { OrderStatusTimeline } from '@/components/orders/OrderStatusTimeline';
import { OrderItems } from '@/components/orders/OrderItems';
import { OrderCustomerInfo } from '@/components/orders/OrderCustomerInfo';
import { OrderStatusUpdate } from '@/components/orders/OrderStatusUpdate';
import { OrderNotes } from '@/components/orders/OrderNotes';
import { mockOrders, Order, OrderStatus, orderStatusLabels } from '@/data/mockData';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find order and create local state for updates
  const initialOrder = mockOrders.find((o) => o.id === id);
  const [order, setOrder] = useState<Order | undefined>(initialOrder);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Order not found</h2>
        <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    const newTimelineEntry = {
      id: `t-${Date.now()}`,
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: `Status updated to ${orderStatusLabels[newStatus]}`,
    };

    setOrder((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: newStatus,
        statusTimeline: [...prev.statusTimeline, newTimelineEntry],
      };
    });

    toast({
      title: 'Status Updated',
      description: `Order status changed to ${orderStatusLabels[newStatus]}`,
    });
  };

  const handleAddNote = (content: string) => {
    const newNote = {
      id: `n-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      author: 'Merchant',
    };

    setOrder((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notes: [...prev.notes, newNote],
      };
    });

    toast({
      title: 'Note Added',
      description: 'Your note has been saved.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.orderNumber}</h1>
            <p className="text-muted-foreground">Order Details</p>
          </div>
        </div>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </Button>
      </div>

      {/* Summary Card */}
      <OrderSummary order={order} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Items & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItems order={order} />
          <OrderStatusTimeline timeline={order.statusTimeline} currentStatus={order.status} />
        </div>

        {/* Right Column - Customer, Status Update, Notes */}
        <div className="space-y-6">
          <OrderCustomerInfo order={order} />
          <OrderStatusUpdate currentStatus={order.status} onStatusUpdate={handleStatusUpdate} />
          <OrderNotes notes={order.notes} onAddNote={handleAddNote} />
        </div>
      </div>
    </div>
  );
}
