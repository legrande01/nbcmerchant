import { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminDriversTable } from '@/components/admin/AdminDriversTable';
import { AdminDriverDetail } from '@/components/admin/AdminDriverDetail';
import { mockAdminDrivers, AdminDriverStatus, getAdminDriverById } from '@/data/adminData';

export default function AdminDrivers() {
  const [statusFilter, setStatusFilter] = useState<AdminDriverStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const filteredDrivers = mockAdminDrivers.filter((driver) => {
    const matchesFilter = statusFilter === 'all' || driver.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const selectedDriver = selectedDriverId ? getAdminDriverById(selectedDriverId) : null;

  if (selectedDriver) {
    return <AdminDriverDetail driver={selectedDriver} onBack={() => setSelectedDriverId(null)} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Drivers
          </CardTitle>
          <CardDescription>Manage drivers in your transport company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>
                All ({mockAdminDrivers.length})
              </Button>
              <Button variant={statusFilter === 'active' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('active')}>
                Active ({mockAdminDrivers.filter(d => d.status === 'active').length})
              </Button>
              <Button variant={statusFilter === 'suspended' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('suspended')}>
                Suspended ({mockAdminDrivers.filter(d => d.status === 'suspended').length})
              </Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search drivers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
          </div>
          <AdminDriversTable drivers={filteredDrivers} onViewDriver={setSelectedDriverId} />
        </CardContent>
      </Card>
    </div>
  );
}
