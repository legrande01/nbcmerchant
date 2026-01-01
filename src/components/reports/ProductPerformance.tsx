import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RefreshCcw, AlertCircle, Eye, TrendingUp, TrendingDown, Package, AlertTriangle } from 'lucide-react';
import { 
  getProductPerformanceData, 
  formatTZS, 
  ProductPerformanceRecord,
  mockCategoryRevenue
} from '@/data/reportsData';
import { ReportsSalesChart } from './ReportsSalesChart';

export function ProductPerformance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<ProductPerformanceRecord[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductPerformanceRecord | null>(null);

  const categories = ['all', ...new Set(mockCategoryRevenue.map(c => c.category))];

  useEffect(() => {
    loadData();
  }, [categoryFilter, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const data = getProductPerformanceData(categoryFilter, statusFilter);
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'low_stock':
        return <Badge className="bg-orange-100 text-orange-800">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Unable to load product data — retry.</p>
        <Button onClick={loadData} variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.filter(c => c !== 'all').map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue (TZS)</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead className="text-right">Returns</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow 
                      key={product.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{product.orders}</TableCell>
                      <TableCell className="text-right">{formatTZS(product.revenue)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {product.conversionRate >= 5 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-orange-600" />
                          )}
                          {product.conversionRate}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={product.returnRate > 3 ? 'text-destructive' : ''}>
                          {product.returnRate}%
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Analytics Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Stats */}
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold">{formatTZS(selectedProduct.revenue)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-xl font-bold">{selectedProduct.orders}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-xl font-bold">{selectedProduct.conversionRate}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Return Rate</p>
                  <p className="text-xl font-bold">{selectedProduct.returnRate}%</p>
                </div>
              </div>

              {/* Sales Trend */}
              <div>
                <h4 className="font-medium mb-4">Sales Trend</h4>
                <ReportsSalesChart 
                  data={selectedProduct.salesTrend.map(t => ({
                    date: t.date,
                    orders: t.orders,
                    revenue: t.revenue,
                    refunds: 0,
                    discounts: 0,
                    fees: 0,
                    taxes: 0,
                    netTotal: t.revenue,
                  }))} 
                  type="revenue" 
                />
              </div>

              {/* Promotions Applied */}
              {selectedProduct.promotionsApplied.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Promotions Applied</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.promotionsApplied.map((promo, idx) => (
                      <Badge key={idx} variant="secondary">{promo}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Events */}
              {selectedProduct.stockEvents.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Inventory Events</h4>
                  <div className="space-y-2">
                    {selectedProduct.stockEvents.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                        <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{event.event}</p>
                          <p className="text-xs text-muted-foreground">{event.date} — {event.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
