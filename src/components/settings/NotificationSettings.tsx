import { useState } from 'react';
import { Bell, Package, AlertTriangle, CreditCard, Megaphone, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { notificationPreferences, NotificationPreferences } from '@/data/settingsData';

interface NotificationOption {
  key: keyof NotificationPreferences;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export function NotificationSettings() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>(notificationPreferences);

  const notificationOptions: NotificationOption[] = [
    {
      key: 'orderUpdates',
      label: 'Order Updates',
      description: 'Get notified when you receive new orders, cancellations, or status changes',
      icon: <Package className="h-5 w-5 text-primary" />
    },
    {
      key: 'lowStockAlerts',
      label: 'Low Stock Alerts',
      description: 'Receive alerts when product inventory falls below threshold',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
    },
    {
      key: 'payoutNotifications',
      label: 'Payout Notifications',
      description: 'Get notified about payout processing, completions, and issues',
      icon: <CreditCard className="h-5 w-5 text-green-500" />
    },
    {
      key: 'marketingApprovals',
      label: 'Marketing Campaign Approvals',
      description: 'Notifications about platform campaign participation requests',
      icon: <Megaphone className="h-5 w-5 text-blue-500" />
    },
    {
      key: 'systemAnnouncements',
      label: 'System Announcements',
      description: 'Important updates about NBC Sokoni platform features and maintenance',
      icon: <Info className="h-5 w-5 text-muted-foreground" />
    }
  ];

  const handleToggle = async (key: keyof NotificationPreferences) => {
    const newValue = !preferences[key];
    setPreferences(prev => ({ ...prev, [key]: newValue }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    toast({
      title: "Saved",
      description: `${notificationOptions.find(o => o.key === key)?.label} ${newValue ? 'enabled' : 'disabled'}.`,
      duration: 2000
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {notificationOptions.map((option, index) => (
              <div key={option.key}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">{option.icon}</div>
                    <div className="space-y-1">
                      <Label 
                        htmlFor={option.key} 
                        className="text-base font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id={option.key}
                    checked={preferences[option.key]}
                    onCheckedChange={() => handleToggle(option.key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Notifications are delivered to your registered email and appear in the notification center 
            within the portal. SMS notifications may be available in future updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
