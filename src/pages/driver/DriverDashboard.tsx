import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Wallet,
  MapPin,
  Navigation,
  Bell,
  AlertTriangle,
  ChevronRight,
  WifiOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { 
  mockDriverProfile,
  getDriverStats,
  getDeliveriesByStatus,
  getUnreadAlerts,
  formatCurrency,
  DriverDelivery,
  DriverAlert,
} from '@/data/driverData';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  onClick?: () => void;
  iconColor?: string;
}

function KPICard({ title, value, icon, onClick, iconColor = 'bg-primary/10 text-primary' }: KPICardProps) {
  return (
    <Card 
      className={cn(
        'hover:shadow-md transition-shadow',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={cn('p-3 rounded-full', iconColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const statusConfig: Record<string, { label: string; variant: string; color: string }> = {
  awaiting_pickup: { label: 'Awaiting Pickup', variant: 'pending', color: 'text-amber-600' },
  in_transit: { label: 'In Transit', variant: 'info', color: 'text-blue-600' },
  awaiting_buyer_confirmation: { label: 'Awaiting Confirmation', variant: 'secondary', color: 'text-purple-600' },
  delivered: { label: 'Delivered', variant: 'success', color: 'text-green-600' },
  dispute: { label: 'Dispute', variant: 'destructive', color: 'text-destructive' },
};

const alertTypeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  new_assignment: { icon: <Package className="h-4 w-4" />, color: 'text-primary bg-primary/10' },
  buyer_confirmed: { icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-green-600 bg-green-100' },
  proof_rejected: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-destructive bg-destructive/10' },
  dispute: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-amber-600 bg-amber-100' },
  payout: { icon: <Wallet className="h-4 w-4" />, color: 'text-green-600 bg-green-100' },
};

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOnline, setIsOnline] = useState(mockDriverProfile.isOnline);
  
  const stats = getDriverStats();
  const activeDeliveries = getDeliveriesByStatus().filter(d => 
    ['awaiting_pickup', 'in_transit', 'awaiting_buyer_confirmation'].includes(d.status)
  );
  const alerts = getUnreadAlerts().slice(0, 4);

  const handleKPIClick = (status?: string) => {
    if (status) {
      navigate(`/driver/deliveries?status=${status}`);
    } else {
      navigate('/driver/deliveries');
    }
  };

  const handleDeliveryClick = (delivery: DriverDelivery) => {
    navigate(`/driver/deliveries?selected=${delivery.id}`);
  };

  const handleAlertClick = (alert: DriverAlert) => {
    if (alert.deliveryId) {
      navigate(`/driver/deliveries?selected=${alert.deliveryId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <WifiOff className="h-5 w-5 text-amber-600" />
          <div className="flex-1">
            <p className="font-medium text-amber-800">You're offline</p>
            <p className="text-sm text-amber-700">You won't receive new delivery assignments while offline.</p>
          </div>
          <Button 
            size="sm" 
            onClick={() => setIsOnline(true)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Go Online
          </Button>
        </div>
      )}

      {/* Online/Offline Toggle */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-3 h-3 rounded-full',
              isOnline ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
            )} />
            <div>
              <p className="font-medium">{isOnline ? 'Online' : 'Offline'}</p>
              <p className="text-sm text-muted-foreground">
                {isOnline ? 'Receiving new delivery jobs' : 'Not receiving new jobs'}
              </p>
            </div>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={setIsOnline}
          />
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Deliveries"
          value={stats.activeDeliveries}
          icon={<Package className="h-5 w-5" />}
          onClick={() => handleKPIClick()}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Pending Pickups"
          value={stats.pendingPickups}
          icon={<Clock className="h-5 w-5" />}
          onClick={() => handleKPIClick('awaiting_pickup')}
          iconColor="bg-amber-100 text-amber-600"
        />
        <KPICard
          title="Awaiting Confirmation"
          value={stats.awaitingConfirmation}
          icon={<CheckCircle2 className="h-5 w-5" />}
          onClick={() => handleKPIClick('awaiting_buyer_confirmation')}
          iconColor="bg-purple-100 text-purple-600"
        />
        <KPICard
          title="Today's Earnings"
          value={formatCurrency(stats.todaysEarnings)}
          icon={<Wallet className="h-5 w-5" />}
          iconColor="bg-green-100 text-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Jobs List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Jobs</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/driver/deliveries')}
                  className="text-primary"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeDeliveries.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No active deliveries</p>
                  <p className="text-sm">New jobs will appear here when assigned</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="divide-y">
                    {activeDeliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleDeliveryClick(delivery)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{delivery.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">{delivery.merchantName}</p>
                          </div>
                          <Badge variant={statusConfig[delivery.status].variant as any}>
                            {statusConfig[delivery.status].label}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-green-600" />
                            <span className="truncate">{delivery.route.pickupAddress}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Navigation className="h-3.5 w-3.5 text-primary" />
                            <span className="truncate">{delivery.route.dropoffAddress}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t">
                          <span className="text-sm text-muted-foreground">
                            {delivery.route.distance} • {delivery.route.estimatedTime}
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(delivery.estimatedPayout)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Map Preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-10">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-primary/30" />
                  ))}
                </div>
                <div className="text-center z-10">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Dar es Salaam</p>
                  <p className="text-xs text-muted-foreground">
                    {mockDriverProfile.currentLocation.lat.toFixed(4)}, {mockDriverProfile.currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alerts
                </CardTitle>
                {alerts.length > 0 && (
                  <Badge variant="pending">{alerts.length} new</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {alerts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <p className="text-sm">No new alerts</p>
                </div>
              ) : (
                <div className="divide-y">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'p-2 rounded-full',
                          alertTypeConfig[alert.type].color
                        )}>
                          {alertTypeConfig[alert.type].icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
