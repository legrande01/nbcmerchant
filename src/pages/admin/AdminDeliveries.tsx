import { useState } from 'react';
import { Truck, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AdminDeliveryFilters } from '@/components/admin/AdminDeliveryFilters';
import { AdminDeliveryTable } from '@/components/admin/AdminDeliveryTable';
import { AdminDeliveryDetail } from '@/components/admin/AdminDeliveryDetail';
import { mockAdminDeliveries, AdminDeliveryStatus, getAdminDeliveryById } from '@/data/adminData';

export default function AdminDeliveries() {
  const [activeFilter, setActiveFilter] = useState<AdminDeliveryStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);

  const filteredDeliveries = mockAdminDeliveries.filter((delivery) => {
    const matchesFilter = activeFilter === 'all' || delivery.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: mockAdminDeliveries.length,
    assigned: mockAdminDeliveries.filter(d => d.status === 'assigned').length,
    in_transit: mockAdminDeliveries.filter(d => d.status === 'in_transit').length,
    delivered: mockAdminDeliveries.filter(d => d.status === 'delivered').length,
    dispute: mockAdminDeliveries.filter(d => d.status === 'dispute').length,
  };

  const selectedDelivery = selectedDeliveryId ? getAdminDeliveryById(selectedDeliveryId) : null;

  if (selectedDelivery) {
    return <AdminDeliveryDetail delivery={selectedDelivery} onBack={() => setSelectedDeliveryId(null)} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Management
          </CardTitle>
          <CardDescription>View and monitor all company deliveries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <AdminDeliveryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} counts={counts} />
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <AdminDeliveryTable deliveries={filteredDeliveries} onViewDelivery={setSelectedDeliveryId} />
        </CardContent>
      </Card>
    </div>
  );
}
