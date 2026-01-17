import { ArrowLeft, User, Truck, Star, Phone, Mail, Calendar, MapPin, CreditCard, Shield, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AdminDriver, getDriverStatusColor, getVehicleTypeLabel } from '@/data/adminData';
import { format } from 'date-fns';

interface AdminDriverDetailProps {
  driver: AdminDriver;
  onBack: () => void;
}

export function AdminDriverDetail({ driver, onBack }: AdminDriverDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{driver.name}</h2>
            <Badge className={getDriverStatusColor(driver.status)} variant="secondary">
              {driver.status === 'active' ? 'Active' : 'Suspended'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{driver.id}</p>
        </div>
        {driver.status === 'active' ? (
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
            <ShieldOff className="h-4 w-4 mr-2" />
            Suspend Driver
          </Button>
        ) : (
          <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950">
            <Shield className="h-4 w-4 mr-2" />
            Activate Driver
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{driver.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{driver.rating.toFixed(1)} rating</span>
                    <span className="mx-1">•</span>
                    <span>{driver.deliveryCount} deliveries</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{driver.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{driver.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{driver.district}, {driver.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {format(new Date(driver.joinedAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ID Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Identification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {driver.idType === 'nida' ? 'NIDA ID' : 'Driving License'}
                  </p>
                  <p className="font-mono">{driver.idNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assigned Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              {driver.vehiclePlate ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-mono font-semibold">{driver.vehiclePlate}</p>
                      <p className="text-sm text-muted-foreground">
                        {driver.vehicleType && getVehicleTypeLabel(driver.vehicleType)}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Vehicle Details
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">No vehicle assigned</p>
                  <Button variant="outline" size="sm">
                    Assign Vehicle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold">{driver.deliveryCount}</p>
                  <p className="text-sm text-muted-foreground">Total Deliveries</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold">{driver.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
              {driver.lastActive && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last active: {format(new Date(driver.lastActive), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
