import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, GripVertical, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Product, ProductVariant, productCategories } from '@/data/mockData';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Partial<Product>, publish: boolean) => Promise<void>;
  isLoading?: boolean;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  price: string;
  compareAtPrice: string;
  taxIncluded: boolean;
  sku: string;
  stock: string;
  lowStockThreshold: string;
  trackInventory: boolean;
  variants: ProductVariant[];
  images: string[];
}

const initialFormData: FormData = {
  name: '',
  description: '',
  category: '',
  price: '',
  compareAtPrice: '',
  taxIncluded: true,
  sku: '',
  stock: '',
  lowStockThreshold: '5',
  trackInventory: true,
  variants: [],
  images: [],
};

export function ProductForm({ product, onSave, isLoading }: ProductFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [hasChanges, setHasChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        compareAtPrice: product.compareAtPrice?.toString() || '',
        taxIncluded: product.taxIncluded,
        sku: product.sku,
        stock: product.stock.toString(),
        lowStockThreshold: product.inventory.lowStockThreshold.toString(),
        trackInventory: product.inventory.trackInventory,
        variants: product.variants,
        images: product.images,
      });
    }
  }, [product]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }
    if (formData.trackInventory && (!formData.stock || parseInt(formData.stock) < 0)) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (publish: boolean) => {
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(
        {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
          taxIncluded: formData.taxIncluded,
          sku: formData.sku,
          stock: parseInt(formData.stock) || 0,
          images: formData.images,
          variants: formData.variants,
          inventory: {
            stock: parseInt(formData.stock) || 0,
            lowStockThreshold: parseInt(formData.lowStockThreshold) || 5,
            trackInventory: formData.trackInventory,
          },
          status: publish ? 'active' : 'draft',
        },
        publish
      );
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      setPendingNavigation('/products');
      setShowUnsavedDialog(true);
    } else {
      navigate('/products');
    }
  };

  const confirmNavigation = () => {
    setShowUnsavedDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  // Variant Management
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `v-${Date.now()}`,
      name: '',
      type: 'size',
      options: [],
    };
    updateField('variants', [...formData.variants, newVariant]);
  };

  const updateVariant = (index: number, updates: Partial<ProductVariant>) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], ...updates };
    updateField('variants', newVariants);
  };

  const removeVariant = (index: number) => {
    updateField('variants', formData.variants.filter((_, i) => i !== index));
  };

  const addVariantOption = (variantIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options.push({
      id: `vo-${Date.now()}`,
      value: '',
      priceModifier: 0,
      stockQuantity: 0,
      sku: '',
    });
    updateField('variants', newVariants);
  };

  const updateVariantOption = (
    variantIndex: number,
    optionIndex: number,
    updates: Partial<ProductVariant['options'][0]>
  ) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options[optionIndex] = {
      ...newVariants[variantIndex].options[optionIndex],
      ...updates,
    };
    updateField('variants', newVariants);
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options = newVariants[variantIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    updateField('variants', newVariants);
  };

  // Mock image upload
  const handleImageUpload = () => {
    // Simulate adding a placeholder image
    const mockImageUrl = `https://via.placeholder.com/300?text=Product+${formData.images.length + 1}`;
    updateField('images', [...formData.images, mockImageUrl]);
    toast({
      title: 'Image Added',
      description: 'Image uploaded successfully (mock).',
    });
  };

  const removeImage = (index: number) => {
    updateField('images', formData.images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {product ? 'Edit Product' : 'New Product'}
            </h1>
            <p className="text-muted-foreground">
              {product ? 'Update product details' : 'Add a new product to your catalog'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isSaving}>
            {isSaving ? 'Publishing...' : product?.status === 'active' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter product name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe your product..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => updateField('category', v)}
                >
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price (TZS) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="0"
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare-at Price (TZS)</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => updateField('compareAtPrice', e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Original price before discount
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="taxIncluded">Tax Included</Label>
                  <p className="text-sm text-muted-foreground">
                    Price includes VAT
                  </p>
                </div>
                <Switch
                  id="taxIncluded"
                  checked={formData.taxIncluded}
                  onCheckedChange={(v) => updateField('taxIncluded', v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">
                    SKU <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => updateField('sku', e.target.value)}
                    placeholder="ABC-123"
                    className={errors.sku ? 'border-destructive' : ''}
                  />
                  {errors.sku && (
                    <p className="text-sm text-destructive">{errors.sku}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => updateField('stock', e.target.value)}
                    placeholder="0"
                    disabled={!formData.trackInventory}
                    className={errors.stock ? 'border-destructive' : ''}
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive">{errors.stock}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => updateField('lowStockThreshold', e.target.value)}
                    placeholder="5"
                    disabled={!formData.trackInventory}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trackInventory">Track Inventory</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor stock levels
                  </p>
                </div>
                <Switch
                  id="trackInventory"
                  checked={formData.trackInventory}
                  onCheckedChange={(v) => updateField('trackInventory', v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Variants</CardTitle>
              <Button variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-1" />
                Add Variant
              </Button>
            </CardHeader>
            <CardContent>
              {formData.variants.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No variants added. Add size, color, or other options.
                </p>
              ) : (
                <div className="space-y-6">
                  {formData.variants.map((variant, vIndex) => (
                    <div key={variant.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <Input
                            value={variant.name}
                            onChange={(e) =>
                              updateVariant(vIndex, { name: e.target.value })
                            }
                            placeholder="Variant name (e.g., Size)"
                            className="max-w-[200px]"
                          />
                          <Select
                            value={variant.type}
                            onValueChange={(v) =>
                              updateVariant(vIndex, { type: v as ProductVariant['type'] })
                            }
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="size">Size</SelectItem>
                              <SelectItem value="color">Color</SelectItem>
                              <SelectItem value="material">Material</SelectItem>
                              <SelectItem value="style">Style</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeVariant(vIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {variant.options.map((option, oIndex) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 pl-8"
                          >
                            <Input
                              value={option.value}
                              onChange={(e) =>
                                updateVariantOption(vIndex, oIndex, {
                                  value: e.target.value,
                                })
                              }
                              placeholder="Option value"
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              value={option.priceModifier}
                              onChange={(e) =>
                                updateVariantOption(vIndex, oIndex, {
                                  priceModifier: parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="+/- Price"
                              className="w-24"
                            />
                            <Input
                              type="number"
                              value={option.stockQuantity}
                              onChange={(e) =>
                                updateVariantOption(vIndex, oIndex, {
                                  stockQuantity: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Stock"
                              className="w-20"
                            />
                            <Input
                              value={option.sku}
                              onChange={(e) =>
                                updateVariantOption(vIndex, oIndex, {
                                  sku: e.target.value,
                                })
                              }
                              placeholder="SKU"
                              className="w-28"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeVariantOption(vIndex, oIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addVariantOption(vIndex)}
                          className="ml-8"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleImageUpload}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Upload Images</p>
                <p className="text-xs text-muted-foreground">
                  Recommended: 1000x1000px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Status Info */}
          {product && (
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Status</span>
                  <span className="font-medium capitalize">{product.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation}>
              Leave Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
