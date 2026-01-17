import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Truck, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { mockAdminDrivers, tanzaniaRegions, AdminVehicle } from '@/data/transportAdminData';

const vehicleFormSchema = z.object({
  plateNumber: z.string().min(1, 'Plate number is required').max(20, 'Plate number is too long'),
  type: z.enum(['bike', 'car', 'van', 'truck'], { required_error: 'Vehicle type is required' }),
  loadCapacity: z.string().min(1, 'Load capacity is required'),
  region: z.string().min(1, 'Region is required'),
  district: z.string().min(1, 'District is required'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }),
  assignedDriverId: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

interface AddVehicleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleAdded: (vehicle: AdminVehicle) => void;
}

const typeIcons: Record<string, string> = { bike: '🏍️', car: '🚗', van: '🚐', truck: '🚛' };

export function AddVehicleModal({ open, onOpenChange, onVehicleAdded }: AddVehicleModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      plateNumber: '',
      type: undefined,
      loadCapacity: '',
      region: '',
      district: '',
      status: 'active',
      assignedDriverId: '',
    },
  });

  const availableDrivers = mockAdminDrivers.filter(
    (driver) => driver.status === 'active' && !driver.assignedVehicle
  );

  const selectedRegionData = tanzaniaRegions.find((r) => r.name === selectedRegion);

  const onSubmit = (data: VehicleFormValues) => {
    const driver = data.assignedDriverId
      ? mockAdminDrivers.find((d) => d.id === data.assignedDriverId)
      : null;

    const newVehicle: AdminVehicle = {
      id: `VEH-${Date.now()}`,
      plateNumber: data.plateNumber.toUpperCase(),
      type: data.type,
      loadCapacity: `${data.loadCapacity} kg`,
      status: data.status,
      assignedDriver: driver?.name || null,
      assignedDriverId: data.assignedDriverId || null,
      operatingZone: `${data.region} - ${data.district}`,
      activeDeliveries: 0,
      activityHistory: [
        {
          id: `ACT-${Date.now()}`,
          action: 'created',
          timestamp: new Date().toISOString(),
          details: 'Vehicle registered',
        },
      ],
      recentDeliveries: [],
      currentDelivery: null,
    };

    onVehicleAdded(newVehicle);
    toast.success('Vehicle added successfully');
    form.reset();
    setSelectedRegion('');
    onOpenChange(false);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    form.setValue('region', value);
    form.setValue('district', '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Add New Vehicle
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="T 123 ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(['bike', 'car', 'van', 'truck'] as const).map((type) => (
                          <SelectItem key={type} value={type}>
                            <span className="flex items-center gap-2">
                              {typeIcons[type]} <span className="capitalize">{type}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loadCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Load Capacity (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select onValueChange={handleRegionChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tanzaniaRegions.map((region) => (
                          <SelectItem key={region.name} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedRegion}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedRegionData?.districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedDriverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Driver (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">No driver assigned</SelectItem>
                      {availableDrivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name} - {driver.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Vehicle</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
