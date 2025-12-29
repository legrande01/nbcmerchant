import { useState, useEffect, useRef } from 'react';
import { Image, Palette, Upload, X, Save, Loader2, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StoreInfo, StoreTheme } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface StoreBrandingProps {
  store: StoreInfo;
  onUpdate: (store: StoreInfo) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
}

const accentColors = [
  { value: 'blue', label: 'NBC Blue', color: 'hsl(224, 62%, 34%)' },
  { value: 'red', label: 'NBC Red', color: 'hsl(356, 92%, 45%)' },
  { value: 'green', label: 'Forest Green', color: 'hsl(142, 76%, 36%)' },
  { value: 'orange', label: 'Sunset Orange', color: 'hsl(25, 95%, 53%)' },
] as const;

export default function StoreBranding({ store, onUpdate, hasUnsavedChanges, setHasUnsavedChanges }: StoreBrandingProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const [theme, setTheme] = useState<StoreTheme>(store.theme);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(store.logo);
  const [bannerPreview, setBannerPreview] = useState<string | undefined>(store.banner);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Track changes
  useEffect(() => {
    const hasChanges = 
      theme.mode !== store.theme.mode ||
      theme.accentColor !== store.theme.accentColor ||
      logoPreview !== store.logo ||
      bannerPreview !== store.banner;
    
    setHasUnsavedChanges(hasChanges);
  }, [theme, logoPreview, bannerPreview, store, setHasUnsavedChanges]);

  const handleFileUpload = (type: 'logo' | 'banner', file: File) => {
    setUploadError(null);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPG, PNG, GIF)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'logo') {
        setLogoPreview(reader.result as string);
      } else {
        setBannerPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (type: 'logo' | 'banner') => {
    if (type === 'logo') {
      setLogoPreview(undefined);
      if (logoInputRef.current) logoInputRef.current.value = '';
    } else {
      setBannerPreview(undefined);
      if (bannerInputRef.current) bannerInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const updatedStore: StoreInfo = {
      ...store,
      theme,
      logo: logoPreview,
      banner: bannerPreview,
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedStore);
    setIsSaving(false);
    setHasUnsavedChanges(false);
    
    toast({
      title: 'Branding Updated',
      description: 'Your store branding has been saved successfully.',
    });
  };

  const getAccentColorClass = (color: StoreTheme['accentColor']) => {
    switch (color) {
      case 'blue': return 'from-primary/80 to-primary';
      case 'red': return 'from-accent/80 to-accent';
      case 'green': return 'from-green-600/80 to-green-600';
      case 'orange': return 'from-orange-500/80 to-orange-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Settings */}
        <div className="space-y-6">
          {uploadError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Store Logo
              </CardTitle>
              <CardDescription>
                Upload your store logo (recommended: 200x200px, PNG or JPG)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  {logoPreview && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleRemoveImage('logo')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Store Banner
              </CardTitle>
              <CardDescription>
                Upload your store banner (recommended: 1200x300px, PNG or JPG)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="w-full h-28 bg-muted rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">1200 × 300 pixels</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('banner', e.target.files[0])}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => bannerInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Banner
                  </Button>
                  {bannerPreview && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleRemoveImage('banner')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Settings
              </CardTitle>
              <CardDescription>
                Customize your store's appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mode */}
              <div className="space-y-3">
                <Label>Store Theme</Label>
                <RadioGroup 
                  value={theme.mode} 
                  onValueChange={(value) => setTheme(prev => ({ ...prev, mode: value as 'light' | 'dark' }))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="cursor-pointer">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Accent Color */}
              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-2 gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTheme(prev => ({ ...prev, accentColor: color.value as StoreTheme['accentColor'] }))}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        theme.accentColor === color.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-sm font-medium">{color.label}</span>
                      {theme.accentColor === color.value && (
                        <Check className="h-4 w-4 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Live Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your store will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`rounded-xl overflow-hidden border ${theme.mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Banner Preview */}
                <div className={`h-28 bg-gradient-to-r ${getAccentColorClass(theme.accentColor)} relative`}>
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/50 text-sm">Your banner here</span>
                    </div>
                  )}
                </div>
                
                {/* Store Header Preview */}
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center -mt-10 border-4 overflow-hidden ${
                        theme.mode === 'dark' ? 'border-gray-900 bg-gray-800' : 'border-white bg-primary'
                      }`}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-primary-foreground font-bold text-sm">
                          {store.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className={theme.mode === 'dark' ? 'text-white' : 'text-foreground'}>
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <p className={`text-xs ${theme.mode === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>
                        {store.category}
                      </p>
                    </div>
                  </div>

                  {/* Mock Product Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-lg ${theme.mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
