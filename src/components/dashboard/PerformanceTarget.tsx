import { useState } from 'react';
import { Target, Edit2, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RevenueTarget, formatCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PerformanceTargetProps {
  target: RevenueTarget;
  className?: string;
}

export function PerformanceTarget({ target: initialTarget, className }: PerformanceTargetProps) {
  const [target, setTarget] = useState(initialTarget);
  const [isOpen, setIsOpen] = useState(false);
  const [newTargetAmount, setNewTargetAmount] = useState(
    initialTarget.targetAmount?.toString() || ''
  );
  const { toast } = useToast();

  const handleSaveTarget = () => {
    const amount = parseInt(newTargetAmount);
    if (amount > 0) {
      const newPercent = Math.min(100, Math.round((target.currentAmount || 0) / amount * 100));
      setTarget({
        ...target,
        hasTarget: true,
        targetAmount: amount,
        percentComplete: newPercent,
      });
      setIsOpen(false);
      toast({
        title: 'Target updated',
        description: `Your ${target.month} revenue target has been set to ${formatCurrency(amount)}.`,
      });
    }
  };

  if (!target.hasTarget) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Revenue Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <Target className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              Set a monthly revenue target to track your progress.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Set Target</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Revenue Target</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Monthly Target (TZS)</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="e.g. 5000000"
                      value={newTargetAmount}
                      onChange={(e) => setNewTargetAmount(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveTarget}>Save Target</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {target.month} Goal
          </CardTitle>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/help?article=revenue-tracking" className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Understanding dashboard metrics</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Revenue Target</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Monthly Target (TZS)</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="e.g. 5000000"
                      value={newTargetAmount}
                      onChange={(e) => setNewTargetAmount(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveTarget}>Save Target</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{target.percentComplete}%</span>
          </div>
          <Progress value={target.percentComplete} className="h-2.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(target.currentAmount || 0)}</span>
            <span>{formatCurrency(target.targetAmount || 0)}</span>
          </div>
          <p className="text-sm text-center pt-2">
            <span className={cn(
              'font-medium',
              (target.percentComplete || 0) >= 100 ? 'text-success' : 'text-foreground'
            )}>
              {(target.percentComplete || 0) >= 100 
                ? `Congratulations! You've reached your ${target.month} goal!`
                : `You've reached ${target.percentComplete}% of your ${target.month} goal.`
              }
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}