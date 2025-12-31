import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketingDashboard } from '@/components/marketing/MarketingDashboard';
import { MerchantPromotions } from '@/components/marketing/MerchantPromotions';
import { PlatformCampaigns } from '@/components/marketing/PlatformCampaigns';
import { VouchersManagement } from '@/components/marketing/VouchersManagement';

export default function Marketing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['dashboard', 'promotions', 'campaigns', 'vouchers'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Marketing & Promotions</h1>
        <p className="text-muted-foreground mt-1">
          Manage your promotions, vouchers, and participate in platform campaigns
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <MarketingDashboard />
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <MerchantPromotions />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <PlatformCampaigns />
        </TabsContent>

        <TabsContent value="vouchers" className="space-y-6">
          <VouchersManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
