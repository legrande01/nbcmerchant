import { useState } from 'react';
import { X, Archive, Tag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkArchive: () => void;
  onBulkStatusChange: (status: 'active' | 'draft') => void;
  onBulkPriceUpdate: (type: 'fixed' | 'percentage', value: number) => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkArchive,
  onBulkStatusChange,
  onBulkPriceUpdate,
}: BulkActionsBarProps) {
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [priceUpdateType, setPriceUpdateType] = useState<'fixed' | 'percentage'>('percentage');
  const [priceValue, setPriceValue] = useState('');

  const handlePriceSubmit = () => {
    const value = parseFloat(priceValue);
    if (!isNaN(value)) {
      onBulkPriceUpdate(priceUpdateType, value);
      setPriceDialogOpen(false);
      setPriceValue('');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            {selectedCount} product{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select onValueChange={(v) => onBulkStatusChange(v as 'active' | 'draft')}>
            <SelectTrigger className="w-[140px] h-8">
              <Tag className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Set Active</SelectItem>
              <SelectItem value="draft">Set Draft</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => setPriceDialogOpen(true)}>
            <DollarSign className="h-4 w-4 mr-1" />
            Update Price
          </Button>

          <Button variant="destructive" size="sm" onClick={onBulkArchive}>
            <Archive className="h-4 w-4 mr-1" />
            Archive
          </Button>
        </div>
      </div>

      <Dialog open={priceDialogOpen} onOpenChange={setPriceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Price</DialogTitle>
            <DialogDescription>
              Apply a price adjustment to {selectedCount} selected product{selectedCount !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <Select
                value={priceUpdateType}
                onValueChange={(v) => setPriceUpdateType(v as 'fixed' | 'percentage')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (TZS)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                {priceUpdateType === 'percentage' ? 'Percentage' : 'Amount'}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={priceUpdateType === 'percentage' ? 'e.g., 10 or -10' : 'e.g., 1000 or -500'}
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {priceUpdateType === 'percentage' ? '%' : 'TZS'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use negative values to decrease prices.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPriceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePriceSubmit} disabled={!priceValue}>
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
