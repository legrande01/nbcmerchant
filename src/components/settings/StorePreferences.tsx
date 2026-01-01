import { useState } from 'react';
import { Store, Clock, Globe, Calendar, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  storePreferences as initialPreferences, 
  processingTimeOptions, 
  timezoneOptions, 
  dateFormatOptions,
  StorePreferencesData 
} from '@/data/settingsData';

export function StorePreferences() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<StorePreferencesData>(initialPreferences);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof StorePreferencesData, value: string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaving(false);
    
    toast({
      title: "Preferences saved",
      description: "Your store preferences have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Preferences
          </CardTitle>
          <CardDescription>
            Configure default settings for your store operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Processing Time */}
          <div className="space-y-2">
            <Label htmlFor="processingTime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Default Order Processing Time
            </Label>
            <Select
              value={preferences.defaultProcessingTime}
              onValueChange={(value) => handleChange('defaultProcessingTime', value)}
            >
              <SelectTrigger id="processingTime" className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {processingTimeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              The expected time to prepare and ship orders. Displayed to customers at checkout.
            </p>
          </div>

          {/* Currency (Locked) */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Default Currency
            </Label>
            <div className="flex items-center gap-2">
              <Input 
                value="TZS - Tanzanian Shilling" 
                disabled 
                className="w-full md:w-[300px] bg-muted/30"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Currency is set by the platform and cannot be changed. All transactions are in TZS.
            </p>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Timezone
            </Label>
            <Select
              value={preferences.timezone}
              onValueChange={(value) => handleChange('timezone', value)}
            >
              <SelectTrigger id="timezone" className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezoneOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Used for order timestamps, reports, and scheduled promotions.
            </p>
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label htmlFor="dateFormat" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Format
            </Label>
            <Select
              value={preferences.dateFormat}
              onValueChange={(value) => handleChange('dateFormat', value)}
            >
              <SelectTrigger id="dateFormat" className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFormatOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              How dates are displayed throughout the portal and in reports.
            </p>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
