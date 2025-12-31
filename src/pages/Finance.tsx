import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EarningsOverview } from '@/components/finance/EarningsOverview';
import { PayoutsHistory } from '@/components/finance/PayoutsHistory';
import { TransactionsStatements } from '@/components/finance/TransactionsStatements';
import { FeesCompliance } from '@/components/finance/FeesCompliance';

export default function Finance() {
  const [activeTab, setActiveTab] = useState('earnings');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payments & Finance</h1>
        <p className="text-muted-foreground mt-1">
          Manage your earnings, payouts, and view financial reports
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fees">Fees & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-6">
          <EarningsOverview />
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <PayoutsHistory />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionsStatements />
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <FeesCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
