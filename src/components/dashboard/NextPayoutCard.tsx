import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NextPayoutInfo, formatCurrency, formatDate } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface NextPayoutCardProps {
  payout: NextPayoutInfo;
  className?: string;
}

export function NextPayoutCard({ payout, className }: NextPayoutCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-muted-foreground">Next Payout</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/help?article=how-payouts-work" className="text-muted-foreground hover:text-foreground">
                        <HelpCircle className="h-3.5 w-3.5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Learn how payouts work</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {payout.hasScheduledPayout ? (
                <>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(payout.nextPayoutAmount || 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(payout.nextPayoutDate || '')}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Your first payout will appear here.
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs">
            <Link to="/finance">
              View
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}