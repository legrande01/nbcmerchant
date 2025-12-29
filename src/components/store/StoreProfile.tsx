import { useState, useEffect } from 'react';
import { Store, MapPin, Phone, Mail, Clock, Save, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StoreInfo, storeCategories } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface StoreProfileProps {
  store: StoreInfo;
  onUpdate: (store: StoreInfo) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
}

interface FormErrors {
  name?: string;
  description?: string;
  category?: string;
  region?: string;
  district?: string;
  street?: string;
  phone?: string;
  email?: string;
}

export default function StoreProfile({ store, onUpdate, hasUnsavedChanges, setHasUnsavedChanges }: StoreProfileProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [formData, setFormData] = useState({
    name: store.name,
    description: store.description,
    category: store.category,
    region: store.address.region,
    district: store.address.district,
    street: store.address.street,
    phone: store.phone,
    email: store.email,
    businessHours: store.businessHours,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Track changes
  useEffect(() => {
    const hasChanges = 
      formData.name !== store.name ||
      formData.description !== store.description ||
      formData.category !== store.category ||
      formData.region !== store.address.region ||
      formData.district !== store.address.district ||
      formData.street !== store.address.street ||
      formData.phone !== store.phone ||
      formData.email !== store.email ||
      formData.businessHours !== store.businessHours;
    
    setHasUnsavedChanges(hasChanges);
  }, [formData, store, setHasUnsavedChanges]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Store name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Store description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.region.trim()) {
      newErrors.region = 'Region is required';
    }
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    setSaveError(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate occasional error (10% chance)
    if (Math.random() < 0.1) {
      setSaveError(true);
      setIsSaving(false);
      toast({
        title: 'Save Failed',
        description: 'Unable to save changes. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    const updatedStore: StoreInfo = {
      ...store,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      address: {
        region: formData.region,
        district: formData.district,
        street: formData.street,
        fullAddress: `${formData.street}, ${formData.district}, ${formData.region}, Tanzania`,
      },
      phone: formData.phone,
      email: formData.email,
      businessHours: formData.businessHours,
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedStore);
    setIsSaving(false);
    setHasUnsavedChanges(false);
    
    toast({
      title: 'Store Updated',
      description: 'Your store profile has been saved successfully.',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {saveError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to save changes. Please check your connection and try again.</span>
            <Button variant="outline" size="sm" onClick={handleSave}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Update your store's public profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">
              Store Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="storeName"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
              placeholder="Enter your store name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
            <p className="text-xs text-muted-foreground">
              This is how customers will see your store
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Store Category <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {storeCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Store Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-destructive' : ''}
              placeholder="Describe what your store offers..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
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
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
                placeholder="store@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
                placeholder="+255 7XX XXX XXX"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Business Hours
            </Label>
            <Input
              id="hours"
              value={formData.businessHours}
              onChange={(e) => handleInputChange('businessHours', e.target.value)}
              placeholder="e.g., Mon-Sat: 8:00 AM - 6:00 PM"
            />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Store Location
          </CardTitle>
          <CardDescription>
            Your physical store address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">
                Region <span className="text-destructive">*</span>
              </Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className={errors.region ? 'border-destructive' : ''}
                placeholder="e.g., Dar es Salaam"
              />
              {errors.region && (
                <p className="text-sm text-destructive">{errors.region}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">
                District <span className="text-destructive">*</span>
              </Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className={errors.district ? 'border-destructive' : ''}
                placeholder="e.g., Kinondoni"
              />
              {errors.district && (
                <p className="text-sm text-destructive">{errors.district}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">
              Street Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className={errors.street ? 'border-destructive' : ''}
              placeholder="Enter your street address"
            />
            {errors.street && (
              <p className="text-sm text-destructive">{errors.street}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-muted-foreground">
          {hasUnsavedChanges ? (
            <span className="text-warning">You have unsaved changes</span>
          ) : (
            'All changes saved'
          )}
        </p>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !hasUnsavedChanges}
          className="min-w-[140px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
