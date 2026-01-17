import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, Filter, User, Eye, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockAdminVehicles } from '@/data/transportAdminData';

const typeIcons: Record<string, string> = { bike: '🏍️', car: '🚗', van: '🚐', truck: '🚛' };

export default function AdminFleet() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredVehicles = mockAdminVehicles.filter((v) => {
    const matchesSearch = v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesType = typeFilter === 'all' || v.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fleet</h1>
          <p className="text-muted-foreground">Manage your transport company vehicles</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Vehicle</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {['bike', 'car', 'van', 'truck'].map((type) => (
          <Card key={type}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{typeIcons[type]}</span>
                <div>
                  <p className="text-2xl font-bold">{mockAdminVehicles.filter((v) => v.type === type).length}</p>
                  <p className="text-sm text-muted-foreground capitalize">{type}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Filter className="h-5 w-5" />Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by plate number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plate Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Driver</TableHead>
                <TableHead>Operating Zone</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{vehicle.plateNumber}</TableCell>
                  <TableCell><span className="mr-2">{typeIcons[vehicle.type]}</span>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.loadCapacity}</TableCell>
                  <TableCell><Badge variant={vehicle.status === 'active' ? 'default' : 'secondary'}>{vehicle.status}</Badge></TableCell>
                  <TableCell>{vehicle.assignedDriver || <span className="text-muted-foreground">-</span>}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{vehicle.operatingZone}</TableCell>
                  <TableCell><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
