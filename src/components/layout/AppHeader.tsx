import { 
  Bell, 
  Menu, 
  Search, 
  User, 
  LogOut,
  Truck,
  CheckCircle,
  XCircle,
  UserCheck,
  AlertTriangle,
  Wallet,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockNotifications } from '@/data/mockData';
import { 
  driverNotifications, 
  getUnreadDriverNotifications,
  getNotificationRoute,
  DriverNotificationType 
} from '@/data/driverNotificationsData';
import { Badge } from '@/components/ui/badge';
import { RoleSwitcher } from './RoleSwitcher';
import { useRole } from '@/contexts/RoleContext';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const driverNotificationIcons: Record<DriverNotificationType, React.ComponentType<{ className?: string }>> = {
  new_delivery: Truck,
  pickup_approved: CheckCircle,
  pickup_rejected: XCircle,
  buyer_confirmed: UserCheck,
  dispute_raised: AlertTriangle,
  payment_confirmed: Wallet,
  offline_warning: WifiOff,
};

const driverNotificationColors: Record<DriverNotificationType, string> = {
  new_delivery: 'text-blue-500',
  pickup_approved: 'text-emerald-500',
  pickup_rejected: 'text-red-500',
  buyer_confirmed: 'text-emerald-500',
  dispute_raised: 'text-amber-500',
  payment_confirmed: 'text-emerald-500',
  offline_warning: 'text-amber-500',
};

export function AppHeader({ onMenuClick, title = 'Dashboard' }: AppHeaderProps) {
  const { user, logout, currentRole } = useRole();
  const navigate = useNavigate();

  // Use different notifications based on role
  const isDriver = currentRole === 'driver';
  const isTransportAdmin = currentRole === 'transport_admin';
  const notifications = isDriver ? driverNotifications : mockNotifications;
  const unreadCount = isDriver 
    ? getUnreadDriverNotifications().length 
    : mockNotifications.filter(n => !n.read).length;

  const handleSignOut = () => {
    logout();
    navigate('/auth');
  };

  const handleNotificationClick = (notification: any) => {
    if (isDriver) {
      const route = getNotificationRoute(notification);
      navigate(route);
    }
  };

  const displayName = user?.name || 'User';
  const displayEmail = user?.email || '';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={isDriver ? "Search deliveries..." : isTransportAdmin ? "Search deliveries, drivers..." : "Search products, orders..."}
            className="pl-9 w-64 bg-secondary border-0"
          />
        </div>

        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="pending" className="text-xs">{unreadCount} new</Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isDriver ? (
              // Driver notifications with icons and deep-linking
              driverNotifications.slice(0, 5).map((notification) => {
                const Icon = driverNotificationIcons[notification.type];
                const colorClass = driverNotificationColors[notification.type];
                return (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className="flex items-start gap-3 py-3 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={`mt-0.5 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                        )}
                        <span className="font-medium text-sm truncate">{notification.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </span>
                    </div>
                  </DropdownMenuItem>
                );
              })
            ) : (
              // Merchant notifications (unchanged)
              mockNotifications.slice(0, 4).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <span className="w-2 h-2 bg-accent rounded-full" />
                    )}
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </span>
                </DropdownMenuItem>
              ))
            )}
            {isDriver && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="justify-center text-primary text-sm"
                  onClick={() => navigate('/driver/deliveries')}
                >
                  View all notifications
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{displayName}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {displayEmail}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(isDriver ? '/driver/profile' : isTransportAdmin ? '/admin/settings' : '/settings')}>
              Profile Settings
            </DropdownMenuItem>
            {!isDriver && !isTransportAdmin && (
              <DropdownMenuItem onClick={() => navigate('/store')}>
                Store Settings
              </DropdownMenuItem>
            )}
            {isDriver && (
              <DropdownMenuItem onClick={() => navigate('/driver/payments')}>
                Payments
              </DropdownMenuItem>
            )}
            {isTransportAdmin && (
              <DropdownMenuItem onClick={() => navigate('/admin/fleet')}>
                Fleet Management
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
