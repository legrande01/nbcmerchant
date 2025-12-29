import { Store, Edit, Palette, Image, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StoreInfo } from '@/data/mockData';

interface StoreOverviewProps {
  store: StoreInfo;
  onNavigate: (tab: string) => void;
}

export default function StoreOverview({ store, onNavigate }: StoreOverviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Store Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Store Logo */}
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shrink-0">
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-primary-foreground font-bold text-xl">
                    {store.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{store.name}</CardTitle>
                <CardDescription className="mt-1">{store.category}</CardDescription>
              </div>
            </div>
            <Badge variant={store.status === 'active' ? 'success' : 'warning'} className="capitalize">
              {store.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{store.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{store.address.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{store.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{store.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Manage your store settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => onNavigate('profile')}
            >
              <Edit className="h-5 w-5 text-primary" />
              <span>Edit Store Info</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => onNavigate('branding')}
            >
              <Palette className="h-5 w-5 text-primary" />
              <span>Change Theme</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => onNavigate('branding')}
            >
              <Image className="h-5 w-5 text-primary" />
              <span>Upload Logo/Banner</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Customer View Preview</CardTitle>
              <CardDescription>How your store appears to customers</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Live Store
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`rounded-xl overflow-hidden border ${store.theme.mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Mock Banner */}
            <div className="h-32 bg-gradient-to-r from-primary/80 to-primary relative">
              {store.banner ? (
                <img src={store.banner} alt="Store banner" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary-foreground/50 text-sm">Banner preview</span>
                </div>
              )}
            </div>
            
            {/* Mock Store Header */}
            <div className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center -mt-10 border-4 border-background">
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-primary-foreground font-bold text-lg">
                    {store.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className={store.theme.mode === 'dark' ? 'text-white' : 'text-foreground'}>
                <h3 className="font-semibold">{store.name}</h3>
                <p className={`text-sm ${store.theme.mode === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>
                  {store.category}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
