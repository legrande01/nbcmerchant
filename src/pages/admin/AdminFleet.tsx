import { useState } from 'react';
import { Car, Search, Plus, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminVehicleTable } from '@/components/admin/AdminVehicleTable';
import { AdminVehicleDetail } from '@/components/admin/AdminVehicleDetail';
import { AdminAddVehicleModal } from '@/components/admin/AdminAddVehicleModal';
import { AdminVehicleCSVImport } from '@/components/admin/AdminVehicleCSVImport';
import { mockAdminVehicles, AdminVehicleStatus, getAdminVehicleById } from '@/data/adminData';

export default function AdminFleet() {
  const [statusFilter, setStatusFilter] = useState<AdminVehicleStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const filteredVehicles = mockAdminVehicles.filter((vehicle) => {
    const matchesFilter = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.assignedDriverName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedVehicle = selectedVehicleId ? getAdminVehicleById(selectedVehicleId) : null;

  if (selectedVehicle) {
    return <AdminVehicleDetail vehicle={selectedVehicle} onBack={() => setSelectedVehicleId(null)} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Fleet Management
            </CardTitle>
            <CardDescription>Manage vehicles in your transport fleet</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>
                All ({mockAdminVehicles.length})
              </Button>
              <Button variant={statusFilter === 'active' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('active')}>
                Active ({mockAdminVehicles.filter(v => v.status === 'active').length})
              </Button>
              <Button variant={statusFilter === 'inactive' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('inactive')}>
                Inactive ({mockAdminVehicles.filter(v => v.status === 'inactive').length})
              </Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vehicles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
          </div>
          <AdminVehicleTable vehicles={filteredVehicles} onViewVehicle={setSelectedVehicleId} />
        </CardContent>
      </Card>
      <AdminAddVehicleModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <AdminVehicleCSVImport open={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </div>
  );
}
