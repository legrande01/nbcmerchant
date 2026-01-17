import { useState } from 'react';
import { Building2, Bell, Shield, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { mockCompanyProfile } from '@/data/transportAdminData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({
    newDelivery: true,
    driverIssues: true,
    disputes: true,
    completedDeliveries: false,
  });

  const handlePasswordChange = () => toast.success('Password updated successfully');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList><TabsTrigger value="company">Company Profile</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="sessions">Sessions</TabsTrigger></TabsList>

        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Company Profile</CardTitle><CardDescription>Your company information (read-only)</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><Label>Company Name</Label><Input value={mockCompanyProfile.name} readOnly className="mt-2 bg-muted" /></div>
                <div><Label>Registration Number</Label><Input value={mockCompanyProfile.registrationNumber} readOnly className="mt-2 bg-muted" /></div>
                <div><Label>Contact Person</Label><Input value={mockCompanyProfile.contactPerson} readOnly className="mt-2 bg-muted" /></div>
                <div><Label>Phone</Label><Input value={mockCompanyProfile.phone} readOnly className="mt-2 bg-muted" /></div>
                <div><Label>Email</Label><Input value={mockCompanyProfile.email} readOnly className="mt-2 bg-muted" /></div>
                <div><Label>Joined</Label><Input value={format(new Date(mockCompanyProfile.joinedDate), 'MMM d, yyyy')} readOnly className="mt-2 bg-muted" /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input value={mockCompanyProfile.address} readOnly className="mt-2 bg-muted" /></div>
              </div>
              <div className="flex gap-4 pt-4">
                <Badge variant="outline">Fleet Size: {mockCompanyProfile.fleetSize}</Badge>
                <Badge variant="outline">Active Drivers: {mockCompanyProfile.activeDrivers}</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({ newDelivery: 'New Delivery Assigned', driverIssues: 'Driver Issues', disputes: 'Disputes', completedDeliveries: 'Completed Deliveries' }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch checked={notifications[key as keyof typeof notifications]} onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Password & Security</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Current Password</Label><Input type="password" className="mt-2" /></div>
              <div><Label>New Password</Label><Input type="password" className="mt-2" /></div>
              <div><Label>Confirm New Password</Label><Input type="password" className="mt-2" /></div>
              <Button onClick={handlePasswordChange}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Monitor className="h-5 w-5" />Active Sessions</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3"><Monitor className="h-5 w-5 text-muted-foreground" /><div><p className="font-medium">Current Session</p><p className="text-sm text-muted-foreground">Chrome on Windows • Nairobi, Kenya</p></div></div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
