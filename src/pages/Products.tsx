import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductFilters } from '@/components/products/ProductFilters';
import { BulkActionsBar } from '@/components/products/BulkActionsBar';
import { InventoryTable } from '@/components/products/InventoryTable';
import { mockProducts, Product } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialView = searchParams.get('view') || 'products';
  const initialFilter = searchParams.get('filter') || '';
  
  const [activeTab, setActiveTab] = useState(initialView);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>(initialFilter === 'low-stock' ? 'low_stock' : 'all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low_stock') {
      matchesStock = product.stock > 0 && product.stock <= product.inventory.lowStockThreshold;
    } else if (stockFilter === 'out_of_stock') {
      matchesStock = product.stock === 0;
    } else if (stockFilter === 'in_stock') {
      matchesStock = product.stock > product.inventory.lowStockThreshold;
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesStock;
  });

  const handleSelectChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleBulkArchive = () => {
    setProducts(prev => prev.map(p => 
      selectedIds.includes(p.id) ? { ...p, status: 'archived' as const } : p
    ));
    toast({
      title: 'Products Archived',
      description: `${selectedIds.length} products have been archived.`,
    });
    setSelectedIds([]);
  };

  const handleBulkStatusChange = (status: 'draft' | 'active') => {
    setProducts(prev => prev.map(p => 
      selectedIds.includes(p.id) ? { ...p, status } : p
    ));
    toast({
      title: 'Status Updated',
      description: `${selectedIds.length} products updated to ${status}.`,
    });
    setSelectedIds([]);
  };

  const handleBulkPriceUpdate = (type: 'fixed' | 'percentage', value: number) => {
    setProducts(prev => prev.map(p => {
      if (!selectedIds.includes(p.id)) return p;
      const newPrice = type === 'fixed' 
        ? p.price + value 
        : p.price * (1 + value / 100);
      return { ...p, price: Math.max(0, newPrice) };
    }));
    toast({
      title: 'Prices Updated',
      description: `${selectedIds.length} product prices have been updated.`,
    });
    setSelectedIds([]);
  };

  const handleArchiveProduct = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'archived' as const } : p
    ));
    toast({
      title: 'Product Archived',
      description: 'Product has been archived successfully.',
    });
  };

  const handleStockUpdate = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, inventory: { ...p.inventory, stock: newStock }, stock: newStock } : p
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <ProductFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                stockFilter={stockFilter}
                onStockChange={setStockFilter}
              />
            </div>
            <Button asChild className="shrink-0">
              <Link to="/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>

          {selectedIds.length > 0 && (
            <BulkActionsBar
              selectedCount={selectedIds.length}
              onClearSelection={() => setSelectedIds([])}
              onBulkArchive={handleBulkArchive}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkPriceUpdate={handleBulkPriceUpdate}
            />
          )}

          <ProductTable
            products={filteredProducts}
            selectedIds={selectedIds}
            onSelectChange={handleSelectChange}
            onArchive={handleArchiveProduct}
          />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button asChild>
              <Link to="/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
          <InventoryTable
            products={filteredProducts.filter(p => p.status !== 'archived')}
            onStockUpdate={handleStockUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
