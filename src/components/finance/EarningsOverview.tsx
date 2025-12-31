import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Calendar, 
  TrendingUp, 
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  mockFinanceData, 
  formatTZS, 
  generateEarningsStats,
  type FinancialActivity 
} from '@/data/financeData';
import { EarningsChart } from './EarningsChart';
import { PayoutRequestModal } from './PayoutRequestModal';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface EarningsOverviewProps {
  className?: string;
}

export function EarningsOverview({ className }: EarningsOverviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [timeRange, setTimeRange] = useState<'7' | '30'>('7');

  const { earnings, recentActivity } = mockFinanceData;
  const chartData = generateEarningsStats(parseInt(timeRange));

  const handleRetry = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
    }, 1000);
  };

  if (hasError) {
    return (
      <Card className={cn('p-8', className)}>
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div>
            <h3 className="font-semibold text-lg">Failed to load earnings data</h3>
            <p className="text-muted-foreground">There was an error loading your financial data.</p>
          </div>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {formatTZS(earnings.availableBalance)}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => setShowPayoutModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Payout</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {formatTZS(earnings.upcomingPayout.amount)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled: {new Date(earnings.upcomingPayout.scheduledDate).toLocaleDateString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings (This Month)</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {formatTZS(earnings.totalEarningsThisMonth)}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 ml-1">+12% vs last month</span>
                </div>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform Fees (This Month)</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {formatTZS(earnings.platformFeesThisMonth)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">3% commission rate</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Receipt className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <EarningsChart 
        data={chartData} 
        timeRange={timeRange} 
        onTimeRangeChange={setTimeRange} 
      />

      {/* Recent Financial Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Financial Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Your financial transactions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout Request Modal */}
      <PayoutRequestModal 
        open={showPayoutModal} 
        onOpenChange={setShowPayoutModal}
        availableBalance={earnings.availableBalance}
      />
    </div>
  );
}

function ActivityItem({ activity }: { activity: FinancialActivity }) {
  const isCredit = activity.type === 'credit';
  
  const getCategoryBadge = () => {
    switch (activity.category) {
      case 'sale':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">Sale</Badge>;
      case 'payout':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">Payout</Badge>;
      case 'fee':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400">Fee</Badge>;
      case 'refund':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400">Refund</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={cn(
          'p-2 rounded-full',
          isCredit ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
        )}>
          {isCredit ? (
            <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{activity.title}</p>
          <p className="text-xs text-muted-foreground">{activity.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getCategoryBadge()}
        <div className="text-right">
          <p className={cn(
            'font-semibold',
            isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {isCredit ? '+' : '-'}{formatTZS(activity.amount)}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(activity.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
