import { Info, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockNotifications, Notification } from '@/data/mockData';
import { cn } from '@/lib/utils';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return <Info className="h-4 w-4 text-primary" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'update':
      return <Sparkles className="h-4 w-4 text-accent" />;
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />;
  }
};

const getNotificationBg = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'bg-primary/5 border-primary/20';
    case 'warning':
      return 'bg-warning/5 border-warning/20';
    case 'success':
      return 'bg-success/5 border-success/20';
    case 'update':
      return 'bg-accent/5 border-accent/20';
    default:
      return 'bg-secondary border-border';
  }
};

interface NotificationsPanelProps {
  className?: string;
}

export function NotificationsPanel({ className }: NotificationsPanelProps) {
  const notifications = mockNotifications.slice(0, 4);

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'p-3 rounded-lg border transition-colors cursor-pointer hover:opacity-80',
                getNotificationBg(notification.type)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
