import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Ticket, TrendingUp, Calendar, Clock, Tag, Percent, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getMarketingStats,
  mockPromotionActivity,
  formatCurrency,
} from '@/data/marketingData';
import { RedemptionChart } from './RedemptionChart';
import { format, formatDistanceToNow } from 'date-fns';

export function MarketingDashboard() {
  const navigate = useNavigate();
  const stats = getMarketingStats();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Plus className="h-4 w-4 text-blue-500" />;
      case 'activated':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'paused':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <Calendar className="h-4 w-4 text-gray-500" />;
      case 'redeemed':
        return <Tag className="h-4 w-4 text-primary" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate('/marketing?tab=promotions&action=create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
        <Button variant="outline" onClick={() => navigate('/marketing?tab=vouchers&action=create')}>
          <Ticket className="h-4 w-4 mr-2" />
          Create Voucher
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/marketing?tab=promotions&status=active')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Promotions</p>
                <p className="text-2xl font-bold text-foreground">{stats.activePromotions}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/marketing?tab=campaigns')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Campaigns</p>
                <p className="text-2xl font-bold text-foreground">{stats.upcomingCampaigns}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/marketing?tab=promotions&status=expired')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expired Promotions</p>
                <p className="text-2xl font-bold text-foreground">{stats.expiredPromotions}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Discounted Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalDiscountedRevenue)}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Redemptions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <RedemptionChart />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Promotion Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {mockPromotionActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {mockPromotionActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (activity.promotionId) {
                      navigate(`/marketing/promotions/${activity.promotionId}`);
                    }
                  }}
                >
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
