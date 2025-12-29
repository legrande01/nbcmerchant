import { Link } from 'react-router-dom';
import { AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface InventoryAlertsProps {
  className?: string;
}

export function InventoryAlerts({ className }: InventoryAlertsProps) {
  const lowStockProducts = mockProducts.filter((product) => product.stock <= 5);

  if (lowStockProducts.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Inventory Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">All products are well stocked!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Inventory Alerts
          </CardTitle>
          <Badge variant="warning">{lowStockProducts.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
              </div>
              <Badge
                variant={product.stock === 0 ? 'error' : 'warning'}
                className="ml-2"
              >
                {product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
              </Badge>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/products">Manage Products</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
