import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { ReportsOverview } from '@/components/reports/ReportsOverview';
import { SalesReports } from '@/components/reports/SalesReports';
import { ProductPerformance } from '@/components/reports/ProductPerformance';
import { OrdersCustomerInsights } from '@/components/reports/OrdersCustomerInsights';
import { ExportsDownloads } from '@/components/reports/ExportsDownloads';

export default function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Track performance, analyze trends, and make data-driven decisions
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="sales" className="py-2">Sales Reports</TabsTrigger>
          <TabsTrigger value="products" className="py-2">Product Performance</TabsTrigger>
          <TabsTrigger value="orders" className="py-2">Orders & Customers</TabsTrigger>
          <TabsTrigger value="exports" className="py-2">Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ReportsOverview onNavigate={handleTabChange} />
        </TabsContent>

        <TabsContent value="sales">
          <SalesReports />
        </TabsContent>

        <TabsContent value="products">
          <ProductPerformance />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersCustomerInsights />
        </TabsContent>

        <TabsContent value="exports">
          <ExportsDownloads />
        </TabsContent>
      </Tabs>
    </div>
  );
}
