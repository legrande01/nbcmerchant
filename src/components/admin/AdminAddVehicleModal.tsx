import { useState } from 'react';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { tanzaniaRegions, tanzaniaDistricts, tanzaniaWards, AdminVehicleType } from '@/data/adminData';
import { toast } from 'sonner';

interface AdminAddVehicleModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminAddVehicleModal({ open, onClose }: AdminAddVehicleModalProps) {
  const [plateNumber, setPlateNumber] = useState('');
  const [type, setType] = useState<AdminVehicleType | ''>('');
  const [capacity, setCapacity] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDistricts = region ? tanzaniaDistricts[region] || [] : [];
  const availableWards = district ? tanzaniaWards[district] || [] : [];

  const resetForm = () => {
    setPlateNumber('');
    setType('');
    setCapacity('');
    setRegion('');
    setDistrict('');
    setWard('');
  };

  const handleSubmit = async () => {
    if (!plateNumber || !type || !capacity || !region || !district) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Vehicle added successfully');
    resetForm();
    onClose();
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Add New Vehicle
          </DialogTitle>
          <DialogDescription>
            Add a new vehicle to your fleet. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Plate Number */}
          <div className="grid gap-2">
            <Label htmlFor="plate">Plate Number *</Label>
            <Input
              id="plate"
              placeholder="T 123 ABC"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
            />
          </div>

          {/* Type */}
          <div className="grid gap-2">
            <Label>Vehicle Type *</Label>
            <Select value={type} onValueChange={(value) => setType(value as AdminVehicleType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bike">Motorcycle</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Capacity */}
          <div className="grid gap-2">
            <Label htmlFor="capacity">Capacity (kg) *</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="30"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>

          {/* Region */}
          <div className="grid gap-2">
            <Label>Region *</Label>
            <Select
              value={region}
              onValueChange={(value) => {
                setRegion(value);
                setDistrict('');
                setWard('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {tanzaniaRegions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District */}
          <div className="grid gap-2">
            <Label>District *</Label>
            <Select
              value={district}
              onValueChange={(value) => {
                setDistrict(value);
                setWard('');
              }}
              disabled={!region}
            >
              <SelectTrigger>
                <SelectValue placeholder={region ? 'Select district' : 'Select region first'} />
              </SelectTrigger>
              <SelectContent>
                {availableDistricts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ward */}
          <div className="grid gap-2">
            <Label>Ward (Optional)</Label>
            <Select value={ward} onValueChange={setWard} disabled={!district || availableWards.length === 0}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !district
                      ? 'Select district first'
                      : availableWards.length === 0
                        ? 'No wards available'
                        : 'Select ward'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableWards.map((w) => (
                  <SelectItem key={w} value={w}>
                    {w}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Vehicle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
