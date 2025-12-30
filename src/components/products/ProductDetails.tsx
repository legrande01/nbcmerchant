import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Archive,
  Package,
  Tag,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Product,
  formatCurrency,
  formatDateTime,
  getProductStatusColor,
  getProductStatusLabel,
} from '@/data/mockData';

interface ProductDetailsProps {
  product: Product;
  onArchive: () => void;
}

export function ProductDetails({ product, onArchive }: ProductDetailsProps) {
  const navigate = useNavigate();

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { label: 'Out of stock', variant: 'error' as const, icon: AlertCircle };
    }
    if (product.stock <= product.inventory.lowStockThreshold) {
      return { label: 'Low stock', variant: 'warning' as const, icon: AlertCircle };
    }
    return { label: 'In stock', variant: 'success' as const, icon: Package };
  };

  const stockStatus = getStockStatus();

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'created':
        return '🆕';
      case 'published':
        return '🚀';
      case 'updated':
        return '✏️';
      case 'archived':
        return '📦';
      case 'restocked':
        return '📥';
      case 'price_changed':
        return '💰';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <Badge variant={getProductStatusColor(product.status) as any}>
                {getProductStatusLabel(product.status)}
              </Badge>
            </div>
            <p className="text-muted-foreground">{product.sku}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {product.status !== 'archived' && (
            <Button variant="outline" onClick={onArchive}>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
          )}
          <Button onClick={() => navigate(`/products/${product.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              {product.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((img, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No images uploaded</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {product.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          {/* Variants */}
          {product.variants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <h4 className="font-medium mb-2 capitalize">
                        {variant.name} ({variant.type})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm"
                          >
                            <span className="font-medium">{option.value}</span>
                            {option.priceModifier !== 0 && (
                              <span className="text-muted-foreground">
                                {option.priceModifier > 0 ? '+' : ''}
                                {formatCurrency(option.priceModifier)}
                              </span>
                            )}
                            <span className="text-muted-foreground">
                              • {option.stockQuantity} in stock
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.activityLog.map((log, index) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-3 ${
                      index < product.activityLog.length - 1 ? 'pb-4 border-b' : ''
                    }`}
                  >
                    <span className="text-xl">{getActivityIcon(log.action)}</span>
                    <div className="flex-1">
                      <p className="font-medium">{log.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(log.timestamp)} by {log.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price</span>
                <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
              </div>
              {product.compareAtPrice && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Compare at</span>
                  <span className="line-through text-muted-foreground">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax</span>
                <span>{product.taxIncluded ? 'Included' : 'Not included'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <stockStatus.icon className="h-5 w-5" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">{product.stock} units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Low stock alert</span>
                <span>{product.inventory.lowStockThreshold} units</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-mono text-sm">{product.sku}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDateTime(product.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated</span>
                <span>{formatDateTime(product.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
