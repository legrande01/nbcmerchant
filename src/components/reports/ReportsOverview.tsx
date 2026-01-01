import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Eye, 
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  getReportsOverviewKPIs, 
  mockSalesData, 
  mockCategoryRevenue, 
  mockTopProducts,
  formatTZS,
  calculateTrend,
  ReportsOverviewKPIs
} from '@/data/reportsData';
import { ReportsSalesChart } from './ReportsSalesChart';
import { RevenueByCategory } from './RevenueByCategory';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReportsOverviewProps {
  onNavigate: (tab: string) => void;
}

export function ReportsOverview({ onNavigate }: ReportsOverviewProps) {
  const [period, setPeriod] = useState<'today' | '7days' | '30days' | 'custom'>('7days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [kpis, setKpis] = useState<ReportsOverviewKPIs | null>(null);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getReportsOverviewKPIs(period);
      setKpis(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Unable to load analytics — retry.</p>
        <Button onClick={loadData} variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const salesTrend = kpis ? calculateTrend(kpis.totalSales, kpis.previousPeriod.totalSales) : null;
  const ordersTrend = kpis ? calculateTrend(kpis.totalOrders, kpis.previousPeriod.totalOrders) : null;
  const aovTrend = kpis ? calculateTrend(kpis.avgOrderValue, kpis.previousPeriod.avgOrderValue) : null;

  const kpiCards = [
    {
      title: 'Total Sales',
      value: kpis ? formatTZS(kpis.totalSales) : '',
      icon: DollarSign,
      trend: salesTrend,
      onClick: () => onNavigate('sales'),
    },
    {
      title: 'Total Orders',
      value: kpis?.totalOrders.toString() || '',
      icon: ShoppingCart,
      trend: ordersTrend,
      onClick: () => onNavigate('orders'),
    },
    {
      title: 'Avg Order Value',
      value: kpis ? formatTZS(kpis.avgOrderValue) : '',
      icon: TrendingUp,
      trend: aovTrend,
      onClick: () => onNavigate('sales'),
    },
    {
      title: 'Conversion Rate',
      value: kpis ? `${kpis.conversionRate}%` : '',
      subtitle: kpis ? `${kpis.visits.toLocaleString()} visits` : '',
      icon: Eye,
      onClick: () => onNavigate('products'),
    },
    {
      title: 'Refund Impact',
      value: kpis ? formatTZS(kpis.refundImpact) : '',
      icon: RefreshCcw,
      isNegative: true,
      onClick: () => onNavigate('orders'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Time period:</span>
          <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((card) => (
          <Card 
            key={card.title} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={card.onClick}
          >
            <CardContent className="pt-6">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-28" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <card.icon className={`h-4 w-4 ${card.isNegative ? 'text-destructive' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="mt-2">
                    <p className={`text-2xl font-bold ${card.isNegative ? 'text-destructive' : ''}`}>
                      {card.value}
                    </p>
                    {card.subtitle && (
                      <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                    )}
                    {card.trend && (
                      <div className={`flex items-center text-xs mt-1 ${card.trend.isPositive ? 'text-green-600' : 'text-destructive'}`}>
                        {card.trend.isPositive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>{card.trend.value}% vs previous</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('sales')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Sales Over Time</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <ReportsSalesChart data={mockSalesData.slice(-7)} type="revenue" />
            )}
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('products')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Revenue by Category</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <RevenueByCategory data={mockCategoryRevenue} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('products')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Top 5 Products by Revenue</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mockTopProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-5">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">{formatTZS(product.revenue)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('products')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Top Categories</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mockCategoryRevenue.slice(0, 5).map((category, index) => (
                  <div
                    key={category.category}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-5">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{category.category}</p>
                        <p className="text-xs text-muted-foreground">{category.percentage}% of total</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">{formatTZS(category.revenue)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Based on available data — some metrics are estimates.
        </AlertDescription>
      </Alert>
    </div>
  );
}
