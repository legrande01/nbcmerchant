import { Settings, Building2, Bell, Shield, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminSettings() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Manage your transport company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Swift Transport Ltd" />
                </div>
                <div className="grid gap-2">
                  <Label>Registration Number</Label>
                  <Input defaultValue="TZ-TRANS-2023-001" />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Phone</Label>
                  <Input defaultValue="+255 22 123 4567" />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="admin@swifttransport.co.tz" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Business Address</Label>
                <Input defaultValue="Plot 45, Nyerere Road, Ilala, Dar es Salaam" />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Delivery Assignments</p>
                  <p className="text-sm text-muted-foreground">Get notified when new deliveries are assigned</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delivery Disputes</p>
                  <p className="text-sm text-muted-foreground">Alert when a delivery is disputed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Driver Status Changes</p>
                  <p className="text-sm text-muted-foreground">Notify when driver goes online/offline</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive daily summary emails</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your admin account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Admin User" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@swifttransport.co.tz" />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+255 712 000 000" />
                </div>
              </div>
              <Button onClick={handleSave}>Update Account</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
