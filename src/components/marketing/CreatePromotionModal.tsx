import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Promotion, PromotionType, ApplyTo } from '@/data/marketingData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { productCategories } from '@/data/mockData';

interface CreatePromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (promotion: Promotion) => void;
}

type Step = 1 | 2 | 3 | 4;

export function CreatePromotionModal({ open, onClose, onSubmit }: CreatePromotionModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [type, setType] = useState<PromotionType>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [buyQuantity, setBuyQuantity] = useState('2');
  const [getQuantity, setGetQuantity] = useState('1');
  const [applyTo, setApplyTo] = useState<ApplyTo>('entire_store');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [usagePerCustomer, setUsagePerCustomer] = useState('');
  const [totalLimit, setTotalLimit] = useState('');

  const resetForm = () => {
    setStep(1);
    setName('');
    setType('percentage');
    setDiscountValue('');
    setBuyQuantity('2');
    setGetQuantity('1');
    setApplyTo('entire_store');
    setSelectedCategories([]);
    setStartDate(new Date());
    setEndDate(undefined);
    setUsagePerCustomer('');
    setTotalLimit('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const newPromotion: Promotion = {
      id: `promo-${Date.now()}`,
      name,
      type,
      discountValue: type === 'buy_x_get_y' ? 0 : parseFloat(discountValue),
      buyQuantity: type === 'buy_x_get_y' ? parseInt(buyQuantity) : undefined,
      getQuantity: type === 'buy_x_get_y' ? parseInt(getQuantity) : undefined,
      applyTo,
      appliedProducts: [],
      appliedCategories: applyTo === 'selected_categories' ? selectedCategories : [],
      startDate: startDate || new Date(),
      endDate,
      usagePerCustomer: usagePerCustomer ? parseInt(usagePerCustomer) : undefined,
      totalRedemptionLimit: totalLimit ? parseInt(totalLimit) : undefined,
      currentRedemptions: 0,
      status: startDate && startDate > new Date() ? 'scheduled' : 'active',
      createdAt: new Date(),
      revenue: 0,
    };
    onSubmit(newPromotion);
    resetForm();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        if (!name.trim()) return false;
        if (type === 'buy_x_get_y') return parseInt(buyQuantity) > 0 && parseInt(getQuantity) > 0;
        return parseFloat(discountValue) > 0;
      case 2:
        if (applyTo === 'selected_categories') return selectedCategories.length > 0;
        return true;
      case 3:
        return !!startDate;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="promo-name">Promotion Name</Label>
              <Input
                id="promo-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Summer Sale 20% Off"
              />
            </div>

            <div className="space-y-3">
              <Label>Promotion Type</Label>
              <RadioGroup value={type} onValueChange={(v) => setType(v as PromotionType)}>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage" className="flex-1 cursor-pointer">
                    <div className="font-medium">Percentage Discount</div>
                    <div className="text-sm text-muted-foreground">e.g., 10% off</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                    <div className="font-medium">Fixed Amount Discount</div>
                    <div className="text-sm text-muted-foreground">e.g., TZS 5,000 off</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="buy_x_get_y" id="buy_x_get_y" />
                  <Label htmlFor="buy_x_get_y" className="flex-1 cursor-pointer">
                    <div className="font-medium">Buy X Get Y</div>
                    <div className="text-sm text-muted-foreground">e.g., Buy 2 Get 1 Free</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {type !== 'buy_x_get_y' && (
              <div className="space-y-2">
                <Label htmlFor="discount-value">
                  Discount Value {type === 'percentage' ? '(%)' : '(TZS)'}
                </Label>
                <Input
                  id="discount-value"
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={type === 'percentage' ? '10' : '5000'}
                />
              </div>
            )}

            {type === 'buy_x_get_y' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buy-qty">Buy Quantity</Label>
                  <Input
                    id="buy-qty"
                    type="number"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="get-qty">Get Quantity (Free)</Label>
                  <Input
                    id="get-qty"
                    type="number"
                    value={getQuantity}
                    onChange={(e) => setGetQuantity(e.target.value)}
                    min="1"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Apply To</Label>
              <RadioGroup value={applyTo} onValueChange={(v) => setApplyTo(v as ApplyTo)}>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="entire_store" id="entire_store" />
                  <Label htmlFor="entire_store" className="flex-1 cursor-pointer">
                    <div className="font-medium">Entire Store</div>
                    <div className="text-sm text-muted-foreground">Applies to all products</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="selected_categories" id="selected_categories" />
                  <Label htmlFor="selected_categories" className="flex-1 cursor-pointer">
                    <div className="font-medium">Selected Categories</div>
                    <div className="text-sm text-muted-foreground">Choose specific categories</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="selected_products" id="selected_products" />
                  <Label htmlFor="selected_products" className="flex-1 cursor-pointer">
                    <div className="font-medium">Selected Products</div>
                    <div className="text-sm text-muted-foreground">Choose specific products</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {applyTo === 'selected_categories' && (
              <div className="space-y-3">
                <Label>Select Categories</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {productCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {applyTo === 'selected_products' && (
              <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
                Product selection will be available in the full version.
                <br />
                For now, the promotion will apply to all products.
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : 'No end date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => startDate ? date < startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {startDate && startDate > new Date()
                ? 'This promotion will be scheduled and activate automatically on the start date.'
                : 'This promotion will be active immediately after creation.'}
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usage-per-customer">Usage Per Customer (Optional)</Label>
              <Input
                id="usage-per-customer"
                type="number"
                value={usagePerCustomer}
                onChange={(e) => setUsagePerCustomer(e.target.value)}
                placeholder="Unlimited"
                min="1"
              />
              <p className="text-sm text-muted-foreground">
                How many times each customer can use this promotion
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-limit">Total Redemption Limit (Optional)</Label>
              <Input
                id="total-limit"
                type="number"
                value={totalLimit}
                onChange={(e) => setTotalLimit(e.target.value)}
                placeholder="Unlimited"
                min="1"
              />
              <p className="text-sm text-muted-foreground">
                Maximum number of times this promotion can be used in total
              </p>
            </div>

            {/* Summary */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">Promotion Summary</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Name:</span> {name}</p>
                <p><span className="text-muted-foreground">Type:</span> {type === 'percentage' ? `${discountValue}% off` : type === 'fixed' ? `TZS ${discountValue} off` : `Buy ${buyQuantity} Get ${getQuantity}`}</p>
                <p><span className="text-muted-foreground">Applies to:</span> {applyTo.replace('_', ' ')}</p>
                <p><span className="text-muted-foreground">Duration:</span> {startDate ? format(startDate, 'PPP') : 'Not set'} - {endDate ? format(endDate, 'PPP') : 'No end date'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Promotion Type',
    'Apply To',
    'Duration',
    'Limits',
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Promotion</DialogTitle>
          <DialogDescription>
            Step {step} of 4: {stepTitles[step - 1]}
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                'h-1 flex-1 rounded-full',
                s <= step ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : handleClose()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {step > 1 ? 'Back' : 'Cancel'}
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((s) => (s + 1) as Step)} disabled={!canProceed()}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Create Promotion
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
