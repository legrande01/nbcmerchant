import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Navigation, 
  Phone,
  Clock,
  Filter,
  Search,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  mockDriverDeliveries,
  formatCurrency,
  DriverDelivery,
  DriverDeliveryStatus,
} from '@/data/driverData';
import { DeliveryTimeline } from '@/components/driver/DeliveryTimeline';
import { useDelivery } from '@/contexts/DeliveryContext';

const statusConfig: Record<DriverDeliveryStatus, { label: string; variant: string; bgColor: string }> = {
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'default', bgColor: 'bg-blue-500' },
  in_transit: { label: 'In Transit', variant: 'pending', bgColor: 'bg-orange-500' },
  awaiting_buyer_confirmation: { label: 'Awaiting Confirmation', variant: 'secondary', bgColor: 'bg-purple-500' },
  delivered: { label: 'Delivered', variant: 'success', bgColor: 'bg-green-500' },
  dispute: { label: 'Dispute', variant: 'destructive', bgColor: 'bg-destructive' },
};

// Status pill component for clean list display
function StatusPill({ status }: { status: DriverDeliveryStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white',
      config.bgColor
    )}>
      {config.label}
    </span>
  );
}

export default function DriverDeliveries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedDelivery, setSelectedDelivery } = useDelivery();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');

  // Filter deliveries
  const filteredDeliveries = mockDriverDeliveries.filter(delivery => {
    const matchesSearch = 
      delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Select delivery from URL param
  useEffect(() => {
    const selectedId = searchParams.get('selected');
    if (selectedId) {
      const delivery = mockDriverDeliveries.find(d => d.id === selectedId);
      if (delivery) {
        setSelectedDelivery(delivery);
      }
    } else if (filteredDeliveries.length > 0 && !selectedDelivery) {
      setSelectedDelivery(filteredDeliveries[0]);
    }
  }, [searchParams]);

  const handleDeliverySelect = (delivery: DriverDelivery) => {
    setSelectedDelivery(delivery);
    setSearchParams(prev => {
      prev.set('selected', delivery.id);
      return prev;
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setSearchParams(prev => {
      if (value === 'all') {
        prev.delete('status');
      } else {
        prev.set('status', value);
      }
      return prev;
    });
  };

  const handleStartPickup = () => {
    if (selectedDelivery) {
      navigate(`/driver/verification?delivery=${selectedDelivery.id}&type=pickup`);
    }
  };

  const handleNavigate = () => {
    if (selectedDelivery) {
      const { dropoffCoords } = selectedDelivery.route;
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${dropoffCoords.lat},${dropoffCoords.lng}`,
        '_blank'
      );
    }
  };

  // State-driven action buttons
  const renderActionButton = (delivery: DriverDelivery) => {
    switch (delivery.status) {
      case 'awaiting_pickup':
        return (
          <Button onClick={handleStartPickup} className="w-full">
            Start Pickup
          </Button>
        );
      case 'in_transit':
        return (
          <Button onClick={handleNavigate} className="w-full">
            <Navigation className="h-4 w-4 mr-2" />
            Navigate to Customer
          </Button>
        );
      case 'awaiting_buyer_confirmation':
        return (
          <Button disabled className="w-full" variant="secondary">
            Waiting for Customer
          </Button>
        );
      case 'dispute':
        return (
          <Button disabled className="w-full" variant="destructive">
            Under Dispute
          </Button>
        );
      case 'delivered':
      default:
        return null;
    }
  };

  // Map highlight logic based on status
  const getMapHighlight = (status: DriverDeliveryStatus) => {
    switch (status) {
      case 'awaiting_pickup':
        return { pickup: true, route: false, dropoff: false };
      case 'in_transit':
        return { pickup: false, route: true, dropoff: true };
      case 'awaiting_buyer_confirmation':
      case 'delivered':
      case 'dispute':
        return { pickup: false, route: false, dropoff: true };
      default:
        return { pickup: true, route: false, dropoff: false };
    }
  };

  const mapHighlight = selectedDelivery ? getMapHighlight(selectedDelivery.status) : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Left Panel - Deliveries List */}
      <div className="w-full lg:w-96 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3 space-y-3">
            <CardTitle>My Deliveries</CardTitle>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deliveries</SelectItem>
                <SelectItem value="awaiting_pickup">Awaiting Pickup</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="awaiting_buyer_confirmation">Awaiting Confirmation</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="dispute">Dispute</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full">
              {filteredDeliveries.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No deliveries found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className={cn(
                        'p-4 cursor-pointer transition-colors',
                        selectedDelivery?.id === delivery.id 
                          ? 'bg-primary/10' 
                          : 'hover:bg-muted/50'
                      )}
                      onClick={() => handleDeliverySelect(delivery)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{delivery.orderNumber}</p>
                          <p className="text-sm text-muted-foreground truncate">{delivery.merchantName}</p>
                        </div>
                        <span className="text-sm font-medium text-green-600 ml-2">
                          {formatCurrency(delivery.estimatedPayout)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <StatusPill status={delivery.status} />
                        <span className="text-xs text-muted-foreground">
                          {delivery.route.distance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Delivery Details */}
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {selectedDelivery ? (
          <>
            {/* Dispute Warning Banner */}
            {selectedDelivery.status === 'dispute' && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="font-medium text-destructive">This delivery is under dispute</p>
                  <p className="text-sm text-muted-foreground">No actions are allowed until the dispute is resolved.</p>
                </div>
              </div>
            )}

            {/* Delivery Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedDelivery.orderNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Assigned {new Date(selectedDelivery.assignedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusPill status={selectedDelivery.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Route Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup</p>
                      <p className="font-medium">{selectedDelivery.merchantName}</p>
                      <p className="text-sm text-muted-foreground">{selectedDelivery.route.pickupAddress}</p>
                      <Button variant="ghost" size="sm" className="h-7 px-2 mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {selectedDelivery.merchantPhone}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-1">
                    <div className="w-0.5 h-8 bg-border ml-1" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{selectedDelivery.route.distance} • {selectedDelivery.route.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Drop-off</p>
                      <p className="font-medium">{selectedDelivery.customerName}</p>
                      <p className="text-sm text-muted-foreground">{selectedDelivery.route.dropoffAddress}</p>
                      <Button variant="ghost" size="sm" className="h-7 px-2 mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {selectedDelivery.customerPhone}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Items */}
                <div>
                  <p className="text-sm font-medium mb-2">Items ({selectedDelivery.items.length})</p>
                  <ul className="space-y-1">
                    {selectedDelivery.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Package className="h-3 w-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Payout */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Payout</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(selectedDelivery.estimatedPayout)}
                  </span>
                </div>

                {/* Awaiting Confirmation Notice */}
                {selectedDelivery.status === 'awaiting_buyer_confirmation' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="font-medium text-purple-800">Awaiting Buyer Confirmation</p>
                    <p className="text-sm text-purple-700 mt-1">
                      Customer must confirm delivery to complete the order.
                    </p>
                  </div>
                )}

                {/* Action Button */}
                {renderActionButton(selectedDelivery)}
              </CardContent>
            </Card>

            {/* Delivery Journey Timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Delivery Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryTimeline 
                  status={selectedDelivery.status}
                  assignedAt={selectedDelivery.assignedAt}
                  pickedUpAt={selectedDelivery.pickedUpAt}
                  deliveredAt={selectedDelivery.deliveredAt}
                />
              </CardContent>
            </Card>

            {/* Map Card */}
            <Card className="flex-1 min-h-[200px]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Route Map</CardTitle>
                  {selectedDelivery.status === 'in_transit' && (
                    <Button variant="outline" size="sm" onClick={handleNavigate}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-10">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="border border-primary/30" />
                    ))}
                  </div>
                  
                  {/* Mock route visualization */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Pickup marker */}
                      <div className={cn(
                        "absolute top-4 left-8 flex items-center gap-2 transition-opacity",
                        mapHighlight?.pickup ? 'opacity-100' : 'opacity-50'
                      )}>
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 border-white shadow-lg",
                          mapHighlight?.pickup ? 'bg-green-500 ring-2 ring-green-300' : 'bg-green-500'
                        )} />
                        <span className="text-xs bg-white px-2 py-1 rounded shadow">Pickup</span>
                      </div>
                      
                      {/* Dotted path */}
                      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                        <path
                          d="M 48 32 Q 200 100 280 180"
                          stroke={mapHighlight?.route ? 'hsl(var(--primary))' : '#ccc'}
                          strokeWidth={mapHighlight?.route ? '3' : '2'}
                          strokeDasharray={mapHighlight?.route ? '0' : '8 4'}
                          fill="none"
                        />
                      </svg>
                      
                      {/* Dropoff marker */}
                      <div className={cn(
                        "absolute bottom-4 right-8 flex items-center gap-2 transition-opacity",
                        mapHighlight?.dropoff ? 'opacity-100' : 'opacity-50'
                      )}>
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 border-white shadow-lg",
                          mapHighlight?.dropoff ? 'bg-primary ring-2 ring-primary/30' : 'bg-primary'
                        )} />
                        <span className="text-xs bg-white px-2 py-1 rounded shadow">Drop-off</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Select a delivery to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
