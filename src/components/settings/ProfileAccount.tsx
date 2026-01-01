import { useState } from 'react';
import { User, Camera, Mail, Phone, Building, FileText, MapPin, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { profileData as initialProfile, ProfileData } from '@/data/settingsData';

export function ProfileAccount() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [saving, setSaving] = useState(false);

  const handleEdit = (field: 'email' | 'phone') => {
    setEditingField(field);
    setTempValue(profile[field]);
  };

  const handleSave = async (field: 'email' | 'phone') => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setProfile(prev => ({ ...prev, [field]: tempValue }));
    setEditingField(null);
    setSaving(false);
    
    toast({
      title: "Profile updated",
      description: `Your ${field === 'email' ? 'email address' : 'phone number'} has been updated successfully.`
    });
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleAvatarUpload = () => {
    // Mock upload
    toast({
      title: "Avatar updated",
      description: "Your profile photo has been updated successfully."
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Manage your personal account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.fullName} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {getInitials(profile.fullName)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={handleAvatarUpload}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profile.fullName}</h3>
              <Badge variant="secondary" className="mt-1">{profile.role}</Badge>
            </div>
          </div>

          <Separator />

          {/* Editable Fields */}
          <div className="grid gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={profile.fullName} disabled />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              {editingField === 'email' ? (
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSave('email')} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input id="email" value={profile.email} disabled className="flex-1" />
                  <Button size="sm" variant="outline" onClick={() => handleEdit('email')}>
                    Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              {editingField === 'phone' ? (
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSave('phone')} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input id="phone" value={profile.phone} disabled className="flex-1" />
                  <Button size="sm" variant="outline" onClick={() => handleEdit('phone')}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details (Read-only) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Details
            <Lock className="h-4 w-4 text-muted-foreground ml-2" />
          </CardTitle>
          <CardDescription>
            Verified business information from your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              These details are verified records and cannot be edited here. Contact support if changes are needed.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Business Name
              </Label>
              <Input value={profile.businessName} disabled className="bg-muted/30" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tax Identification Number (TIN)
              </Label>
              <Input value={profile.tin} disabled className="bg-muted/30" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Registered Address
              </Label>
              <Input value={profile.registeredAddress} disabled className="bg-muted/30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
