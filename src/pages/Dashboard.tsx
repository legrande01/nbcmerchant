import { ShoppingCart, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { InventoryAlerts } from '@/components/dashboard/InventoryAlerts';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { StoreStatusBanner } from '@/components/dashboard/StoreStatusBanner';
import { NextPayoutCard } from '@/components/dashboard/NextPayoutCard';
import { TaskChecklist } from '@/components/dashboard/TaskChecklist';
import { FulfillmentQueue } from '@/components/dashboard/FulfillmentQueue';
import { PerformanceTarget } from '@/components/dashboard/PerformanceTarget';
import { CustomerReviews } from '@/components/dashboard/CustomerReviews';
import { getDashboardData, getDashboardEnhancements, formatCurrency } from '@/data/mockData';

export default function Dashboard() {
  const dashboardData = getDashboardData();
  const enhancements = getDashboardEnhancements();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Store Status Banner */}
      <StoreStatusBanner storeStatus={enhancements.storeStatus} />

      {/* KPI Cards + Next Payout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Today's Orders"
          value={dashboardData.orders.todaysCount}
          icon={ShoppingCart}
          trend={{ 
            value: dashboardData.orders.trends.todaysCountChange, 
            isPositive: dashboardData.orders.trends.todaysCountIsPositive,
            label: 'vs yesterday'
          }}
          href="/orders"
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Today's Revenue"
          value={formatCurrency(dashboardData.sales.todaysRevenue)}
          icon={DollarSign}
          trend={{ 
            value: dashboardData.sales.trends.revenueChange, 
            isPositive: dashboardData.sales.trends.revenueIsPositive,
            label: '% vs yesterday'
          }}
          href="/orders"
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Low Stock Items"
          value={dashboardData.inventory.lowStockCount}
          icon={AlertTriangle}
          trend={{ 
            value: dashboardData.inventory.trends.lowStockChange, 
            isPositive: dashboardData.inventory.trends.lowStockIsPositive,
            label: 'vs last week'
          }}
          href="/products"
          iconColor="bg-warning/10 text-warning"
        />
        <KPICard
          title="Pending Orders"
          value={dashboardData.orders.pendingCount}
          icon={Clock}
          trend={{ 
            value: dashboardData.orders.trends.pendingCountChange, 
            isPositive: dashboardData.orders.trends.pendingCountIsPositive,
            label: 'vs yesterday'
          }}
          href="/orders"
          searchParams={{ status: 'pending' }}
          iconColor="bg-accent/10 text-accent"
        />
        <NextPayoutCard payout={enhancements.nextPayout} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - Takes 2 columns */}
        <SalesChart className="lg:col-span-2" />

        {/* Quick Actions + Performance Target */}
        <div className="space-y-6">
          <QuickActions />
          <PerformanceTarget target={enhancements.revenueTarget} />
        </div>
      </div>

      {/* Fulfillment & Task Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FulfillmentQueue alerts={enhancements.fulfillmentAlerts} />
        <TaskChecklist items={enhancements.checklist} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <RecentOrders className="lg:col-span-2" />

        {/* Right Column */}
        <div className="space-y-6">
          <CustomerReviews reviews={enhancements.reviews} />
          <InventoryAlerts />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
}