import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCcw, 
  AlertCircle, 
  Clock, 
  XCircle, 
  RotateCcw, 
  Users, 
  MapPin,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  getAggregatedOrderMetrics, 
  mockCustomerInsights, 
  formatTZS 
} from '@/data/reportsData';

export function OrdersCustomerInsights() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderMetrics, setOrderMetrics] = useState<ReturnType<typeof getAggregatedOrderMetrics> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const metrics = getAggregatedOrderMetrics();
      setOrderMetrics(metrics);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const repeatPercentage = Math.round(
    (mockCustomerInsights.repeatCustomerRevenue / mockCustomerInsights.totalRevenue) * 100
  );

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

  return (
    <div className="space-y-6">
      {/* Order Analytics Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Order Analytics</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <Skeleton className="h-16 w-full" />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Avg. Fulfillment Time</p>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{orderMetrics?.avgFulfillmentTime} hrs</p>
                  <p className="text-xs text-muted-foreground mt-1">~{(orderMetrics?.avgFulfillmentTime || 0) / 24 < 1 ? 'Less than 1 day' : `${((orderMetrics?.avgFulfillmentTime || 0) / 24).toFixed(1)} days`}</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Cancellation Rate</p>
                    <XCircle className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{orderMetrics?.cancellationRate}%</p>
                  <Progress value={orderMetrics?.cancellationRate || 0} className="mt-2 h-1" />
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
                    <p className="text-sm font-medium text-muted-foreground">Refund Rate</p>
                    <RotateCcw className="h-4 w-4 text-destructive" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{orderMetrics?.refundRate}%</p>
                  <Progress value={orderMetrics?.refundRate || 0} className="mt-2 h-1" />
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
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{orderMetrics?.totalOrders}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Insights Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Insights</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Customer Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">New Customers</p>
                      <p className="text-2xl font-bold">{mockCustomerInsights.newCustomers}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Returning Customers</p>
                      <p className="text-2xl font-bold">{mockCustomerInsights.returningCustomers}</p>
                    </div>
                  </div>
                  
                  <div className="relative pt-4">
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary" 
                        style={{ 
                          width: `${(mockCustomerInsights.newCustomers / (mockCustomerInsights.newCustomers + mockCustomerInsights.returningCustomers)) * 100}%` 
                        }}
                      />
                      <div 
                        className="bg-primary/50" 
                        style={{ 
                          width: `${(mockCustomerInsights.returningCustomers / (mockCustomerInsights.newCustomers + mockCustomerInsights.returningCustomers)) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>New ({Math.round((mockCustomerInsights.newCustomers / (mockCustomerInsights.newCustomers + mockCustomerInsights.returningCustomers)) * 100)}%)</span>
                      <span>Returning ({Math.round((mockCustomerInsights.returningCustomers / (mockCustomerInsights.newCustomers + mockCustomerInsights.returningCustomers)) * 100)}%)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Avg. Order Frequency</p>
                      <p className="font-medium">{mockCustomerInsights.avgOrderFrequency} orders/customer</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Regions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Top Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div className="space-y-3">
                  {mockCustomerInsights.topRegions.map((region, index) => (
                    <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground w-5">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{region.region}</p>
                          <p className="text-xs text-muted-foreground">{region.orders} orders</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm">{formatTZS(region.revenue)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Insights Text */}
      <div className="space-y-3">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your repeat customers make up <strong>{repeatPercentage}%</strong> of revenue.
          </AlertDescription>
        </Alert>
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Orders take an average of <strong>{((orderMetrics?.avgFulfillmentTime || 0) / 24).toFixed(1)} days</strong> to process.
          </AlertDescription>
        </Alert>
      </div>

      {/* Refund Note */}
      <Alert variant="default" className="bg-muted/50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Refunds are handled by platform administrators. Contact support for refund-related inquiries.
        </AlertDescription>
      </Alert>
    </div>
  );
}
