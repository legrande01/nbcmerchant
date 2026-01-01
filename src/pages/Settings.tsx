import { useSearchParams } from 'react-router-dom';
import { User, Shield, Bell, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileAccount } from '@/components/settings/ProfileAccount';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { StorePreferences } from '@/components/settings/StorePreferences';

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and security</p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Store</span>
          </TabsTrigger>
        </TabsList>

        <div className="max-w-4xl">
          <TabsContent value="profile" className="mt-0">
            <ProfileAccount />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="preferences" className="mt-0">
            <StorePreferences />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
