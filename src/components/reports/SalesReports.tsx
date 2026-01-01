import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Download, RefreshCcw, AlertCircle, TrendingUp, TrendingDown, DollarSign, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getSalesReportData, formatTZS, SalesRecord, mockSalesData } from '@/data/reportsData';
import { ReportsSalesChart } from './ReportsSalesChart';
import { format, parseISO, subDays } from 'date-fns';

export function SalesReports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [orderStatus, setOrderStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [comparePeriod, setComparePeriod] = useState(false);

  useEffect(() => {
    loadData();
  }, [startDate, endDate, orderStatus, paymentStatus]);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const data = getSalesReportData(startDate, endDate);
      setSalesData(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    toast({
      title: 'Export Started',
      description: 'Your sales report CSV is being generated and will download shortly.',
    });
  };

  // Calculate totals
  const totals = salesData.reduce(
    (acc, record) => ({
      orders: acc.orders + record.orders,
      revenue: acc.revenue + record.revenue,
      refunds: acc.refunds + record.refunds,
      discounts: acc.discounts + record.discounts,
      fees: acc.fees + record.fees,
      taxes: acc.taxes + record.taxes,
      netTotal: acc.netTotal + record.netTotal,
    }),
    { orders: 0, revenue: 0, refunds: 0, discounts: 0, fees: 0, taxes: 0, netTotal: 0 }
  );

  // Previous period comparison (mock)
  const previousTotals = {
    revenue: Math.round(totals.revenue * 0.88),
    netTotal: Math.round(totals.netTotal * 0.85),
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Unable to load sales data — retry.</p>
        <Button onClick={loadData} variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[160px]"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[160px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Order Status</Label>
              <Select value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment Status</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="compare" checked={comparePeriod} onCheckedChange={setComparePeriod} />
              <Label htmlFor="compare">Compare period</Label>
            </div>
            <Button onClick={handleExportCSV} variant="outline" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Gross Sales</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mt-2">{formatTZS(totals.revenue)}</p>
                {comparePeriod && (
                  <div className="flex items-center text-xs mt-1 text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {((totals.revenue / previousTotals.revenue - 1) * 100).toFixed(1)}% vs previous
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Net Sales</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mt-2">{formatTZS(totals.netTotal)}</p>
                {comparePeriod && (
                  <div className="flex items-center text-xs mt-1 text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {((totals.netTotal / previousTotals.netTotal - 1) * 100).toFixed(1)}% vs previous
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Discounts Applied</p>
                  <Minus className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mt-2 text-orange-600">{formatTZS(totals.discounts)}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Refunds</p>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-2xl font-bold mt-2 text-destructive">{formatTZS(totals.refunds)}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Platform Fees</p>
                <p className="text-xl font-bold mt-1">{formatTZS(totals.fees)}</p>
                <p className="text-xs text-muted-foreground">Reference from Finance</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Taxes (Est.)</p>
                <p className="text-xl font-bold mt-1">{formatTZS(totals.taxes)}</p>
                <p className="text-xs text-muted-foreground">Estimated VAT</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold mt-1">{totals.orders}</p>
                <p className="text-xs text-muted-foreground">In selected period</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ReportsSalesChart data={salesData} type="revenue" chartType="bar" />
          )}
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : salesData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Reports will appear once you start getting orders.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue (TZS)</TableHead>
                    <TableHead className="text-right">Refunds</TableHead>
                    <TableHead className="text-right">Net Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((record) => (
                    <TableRow key={record.date}>
                      <TableCell className="font-medium">
                        {format(parseISO(record.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">{record.orders}</TableCell>
                      <TableCell className="text-right">{formatTZS(record.revenue)}</TableCell>
                      <TableCell className="text-right text-destructive">
                        {record.refunds > 0 ? `-${formatTZS(record.refunds)}` : '-'}
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatTZS(record.netTotal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
