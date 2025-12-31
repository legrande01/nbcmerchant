import { useState } from 'react';
import { RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Voucher, generateVoucherCode } from '@/data/marketingData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CreateVoucherModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (voucher: Voucher) => void;
}

export function CreateVoucherModal({ open, onClose, onSubmit }: CreateVoucherModalProps) {
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minimumSpend, setMinimumSpend] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [usageLimit, setUsageLimit] = useState('');
  const [usagePerCustomer, setUsagePerCustomer] = useState('');

  const resetForm = () => {
    setCode('');
    setType('percentage');
    setDiscountValue('');
    setMinimumSpend('');
    setExpiryDate(undefined);
    setUsageLimit('');
    setUsagePerCustomer('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGenerateCode = () => {
    setCode(generateVoucherCode());
  };

  const handleSubmit = () => {
    const newVoucher: Voucher = {
      id: `vouch-${Date.now()}`,
      code: code.toUpperCase(),
      type,
      discountValue: parseFloat(discountValue),
      minimumSpend: minimumSpend ? parseFloat(minimumSpend) : undefined,
      expiryDate,
      usageLimit: usageLimit ? parseInt(usageLimit) : undefined,
      usagePerCustomer: usagePerCustomer ? parseInt(usagePerCustomer) : undefined,
      currentUsage: 0,
      status: 'active',
      createdAt: new Date(),
    };
    onSubmit(newVoucher);
    resetForm();
  };

  const isValid = code.trim().length >= 4 && parseFloat(discountValue) > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Voucher</DialogTitle>
          <DialogDescription>
            Create a new voucher code for your customers to use at checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Voucher Code */}
          <div className="space-y-2">
            <Label htmlFor="voucher-code">Voucher Code</Label>
            <div className="flex gap-2">
              <Input
                id="voucher-code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g., SUMMER20"
                className="font-mono uppercase"
              />
              <Button variant="outline" size="icon" onClick={handleGenerateCode} type="button">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Minimum 4 characters</p>
          </div>

          {/* Discount Type */}
          <div className="space-y-3">
            <Label>Discount Type</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as 'percentage' | 'fixed')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="voucher-percentage" />
                <Label htmlFor="voucher-percentage" className="cursor-pointer">
                  Percentage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="voucher-fixed" />
                <Label htmlFor="voucher-fixed" className="cursor-pointer">
                  Fixed Amount
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <Label htmlFor="voucher-value">
              Discount Value {type === 'percentage' ? '(%)' : '(TZS)'}
            </Label>
            <Input
              id="voucher-value"
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={type === 'percentage' ? '10' : '5000'}
            />
          </div>

          {/* Minimum Spend */}
          <div className="space-y-2">
            <Label htmlFor="min-spend">Minimum Order Value (TZS) - Optional</Label>
            <Input
              id="min-spend"
              type="number"
              value={minimumSpend}
              onChange={(e) => setMinimumSpend(e.target.value)}
              placeholder="No minimum"
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label>Expiry Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !expiryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, 'PPP') : 'No expiry date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Usage Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usage-limit">Total Usage Limit</Label>
              <Input
                id="usage-limit"
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="Unlimited"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="per-customer">Per Customer</Label>
              <Input
                id="per-customer"
                type="number"
                value={usagePerCustomer}
                onChange={(e) => setUsagePerCustomer(e.target.value)}
                placeholder="Unlimited"
                min="1"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create Voucher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
