import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Navigation, 
  Phone,
  Clock,
  ChevronRight,
  Filter,
  Search,
  ExternalLink,
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

const statusConfig: Record<DriverDeliveryStatus, { label: string; variant: string; color: string }> = {
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'pending', color: 'border-l-amber-500' },
  in_transit: { label: 'In Transit', variant: 'info', color: 'border-l-blue-500' },
  awaiting_buyer_confirmation: { label: 'Awaiting Confirmation', variant: 'secondary', color: 'border-l-purple-500' },
  delivered: { label: 'Delivered', variant: 'success', color: 'border-l-green-500' },
  dispute: { label: 'Dispute', variant: 'destructive', color: 'border-l-destructive' },
};

export default function DriverDeliveries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [selectedDelivery, setSelectedDelivery] = useState<DriverDelivery | null>(null);

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
    // In a real app, this would open Google Maps or similar
    if (selectedDelivery) {
      const { dropoffCoords } = selectedDelivery.route;
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${dropoffCoords.lat},${dropoffCoords.lng}`,
        '_blank'
      );
    }
  };

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
            Navigate
          </Button>
        );
      default:
        return null;
    }
  };

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
                        'p-4 cursor-pointer transition-colors border-l-4',
                        statusConfig[delivery.status].color,
                        selectedDelivery?.id === delivery.id 
                          ? 'bg-accent' 
                          : 'hover:bg-muted/50'
                      )}
                      onClick={() => handleDeliverySelect(delivery)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{delivery.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">{delivery.merchantName}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant={statusConfig[delivery.status].variant as any} className="text-xs">
                          {statusConfig[delivery.status].label}
                        </Badge>
                        <span className="text-sm font-medium text-green-600">
                          {formatCurrency(delivery.estimatedPayout)}
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
      <div className="flex-1 flex flex-col gap-4">
        {selectedDelivery ? (
          <>
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
                  <Badge variant={statusConfig[selectedDelivery.status].variant as any} className="text-sm">
                    {statusConfig[selectedDelivery.status].label}
                  </Badge>
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

                {/* Dispute Notice */}
                {selectedDelivery.status === 'dispute' && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="font-medium text-destructive">Order Under Dispute</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedDelivery.proof.rejectionReason || 'This order is under review. Resolution in progress.'}
                    </p>
                  </div>
                )}

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

            {/* Map Card */}
            <Card className="flex-1">
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
                      <div className="absolute top-4 left-8 flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
                        <span className="text-xs bg-white px-2 py-1 rounded shadow">Pickup</span>
                      </div>
                      
                      {/* Dotted path */}
                      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                        <path
                          d="M 48 32 Q 200 100 280 180"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeDasharray="8 4"
                          fill="none"
                        />
                      </svg>
                      
                      {/* Dropoff marker */}
                      <div className="absolute bottom-4 right-8 flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" />
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
