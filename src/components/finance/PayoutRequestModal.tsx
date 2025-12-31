import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  formatTZS, 
  mockPayoutDestinations, 
  mockFeesInfo,
  type PayoutDestinationType,
  type PayoutInterval 
} from '@/data/financeData';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Building2, Smartphone, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PayoutRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
}

export function PayoutRequestModal({ open, onOpenChange, availableBalance }: PayoutRequestModalProps) {
  const { toast } = useToast();
  const [destinationType, setDestinationType] = useState<PayoutDestinationType>('bank');
  const [amount, setAmount] = useState(availableBalance.toString());
  const [interval, setInterval] = useState<PayoutInterval>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDestination = mockPayoutDestinations.find(d => d.type === destinationType);
  const amountNumber = parseInt(amount) || 0;
  const fees = Math.round(amountNumber * (mockFeesInfo.paymentProcessingFee / 100));
  const netAmount = amountNumber - fees;
  const isValidAmount = amountNumber >= mockFeesInfo.minimumPayout && amountNumber <= availableBalance;

  const handleSubmit = async () => {
    if (!isValidAmount) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onOpenChange(false);
    
    toast({
      title: 'Payout Requested',
      description: `Your payout request for ${formatTZS(netAmount)} has been submitted and is pending review.`,
    });
    
    // Reset form
    setAmount(availableBalance.toString());
    setDestinationType('bank');
    setInterval('monthly');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>
            Request a withdrawal from your available balance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Balance (Read-only) */}
          <div className="space-y-2">
            <Label>Available Balance</Label>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xl font-bold text-primary">{formatTZS(availableBalance)}</p>
            </div>
          </div>

          {/* Payout Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination">Payout Destination</Label>
            <Select value={destinationType} onValueChange={(v) => setDestinationType(v as PayoutDestinationType)}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Bank Transfer
                  </div>
                </SelectItem>
                <SelectItem value="mobile">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile Money
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {selectedDestination && (
              <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1 mt-2">
                {selectedDestination.type === 'bank' ? (
                  <>
                    <p><span className="text-muted-foreground">Bank:</span> {selectedDestination.bankName}</p>
                    <p><span className="text-muted-foreground">Account:</span> {selectedDestination.accountNumber}</p>
                    <p><span className="text-muted-foreground">Holder:</span> {selectedDestination.accountHolder}</p>
                  </>
                ) : (
                  <>
                    <p><span className="text-muted-foreground">Provider:</span> {selectedDestination.mobileProvider}</p>
                    <p><span className="text-muted-foreground">Number:</span> {selectedDestination.mobileNumber}</p>
                    <p><span className="text-muted-foreground">Name:</span> {selectedDestination.accountHolder}</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (TZS)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={mockFeesInfo.minimumPayout}
              max={availableBalance}
            />
            {amountNumber < mockFeesInfo.minimumPayout && amountNumber > 0 && (
              <p className="text-xs text-destructive">Minimum payout amount is {formatTZS(mockFeesInfo.minimumPayout)}</p>
            )}
            {amountNumber > availableBalance && (
              <p className="text-xs text-destructive">Amount exceeds available balance</p>
            )}
          </div>

          {/* Breakdown */}
          {isValidAmount && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gross Amount</span>
                <span>{formatTZS(amountNumber)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processing Fee ({mockFeesInfo.paymentProcessingFee}%)</span>
                <span className="text-destructive">-{formatTZS(fees)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Net Payout</span>
                <span className="text-primary">{formatTZS(netAmount)}</span>
              </div>
            </div>
          )}

          {/* Preferred Interval */}
          <div className="space-y-2">
            <Label htmlFor="interval">Preferred Payout Interval</Label>
            <Select value={interval} onValueChange={(v) => setInterval(v as PayoutInterval)}>
              <SelectTrigger id="interval">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Requests are reviewed by NBC before processing. Payouts typically take 1-3 business days.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValidAmount || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
