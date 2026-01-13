import { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Car,
  Star,
  Package,
  Wallet,
  Edit,
  Camera,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockDriverProfile, mockDriverStats, formatCurrency } from '@/data/driverData';
import { toast } from '@/hooks/use-toast';

export default function DriverProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockDriverProfile);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {mockDriverStats.rating} Rating
                </Badge>
                <Badge variant="outline">
                  {mockDriverStats.totalDeliveries} Deliveries
                </Badge>
              </div>
            </div>

            <Button 
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Package className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{mockDriverStats.totalDeliveries}</p>
            <p className="text-sm text-muted-foreground">Total Deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 mx-auto text-amber-500 mb-2" />
            <p className="text-2xl font-bold">{mockDriverStats.rating}</p>
            <p className="text-sm text-muted-foreground">Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Wallet className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold">{formatCurrency(mockDriverStats.todaysEarnings)}</p>
            <p className="text-sm text-muted-foreground">Today's Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Package className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold">{mockDriverStats.activeDeliveries}</p>
            <p className="text-sm text-muted-foreground">Active Jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
          <CardDescription>Your registered vehicle details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              {isEditing ? (
                <Input
                  id="vehicleType"
                  value={profile.vehicleType}
                  onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.vehicleType}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehiclePlate">License Plate</Label>
              {isEditing ? (
                <Input
                  id="vehiclePlate"
                  value={profile.vehiclePlate}
                  onChange={(e) => setProfile({ ...profile, vehiclePlate: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <span className="font-mono">{profile.vehiclePlate}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            View Earnings History
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Download Tax Documents
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
            Deactivate Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
