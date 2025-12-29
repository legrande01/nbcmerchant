import { useState } from 'react';
import { Store, MapPin, Phone, Mail, Clock, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { mockStoreInfo } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function StoreManagement() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [storeInfo, setStoreInfo] = useState(mockStoreInfo);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: 'Store updated',
        description: 'Your store information has been saved.',
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Store Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Profile
          </CardTitle>
          <CardDescription>
            Manage your store's public information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">TH</span>
            </div>
            <div>
              <Button variant="outline" size="sm">Change Logo</Button>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: 200x200px, PNG or JPG
              </p>
            </div>
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" value={storeInfo.currency} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Store Description</Label>
            <Textarea
              id="description"
              value={storeInfo.description}
              onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How customers can reach you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={storeInfo.email}
                onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={storeInfo.phone}
                onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Business Address
            </Label>
            <Input
              id="address"
              value={storeInfo.address}
              onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Business Hours
            </Label>
            <Input
              id="hours"
              value={storeInfo.businessHours}
              onChange={(e) => setStoreInfo({ ...storeInfo, businessHours: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
