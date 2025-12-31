import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { mockRedemptionData } from '@/data/marketingData';
import { format, parseISO } from 'date-fns';

type TimeRange = '7days' | '30days';

export function RedemptionChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');

  const chartData = useMemo(() => {
    const days = timeRange === '7days' ? 7 : 30;
    return mockRedemptionData.slice(-days).map((item) => ({
      ...item,
      formattedDate: format(parseISO(item.date), timeRange === '7days' ? 'EEE' : 'MMM d'),
    }));
  }, [timeRange]);

  const totalRedemptions = chartData.reduce((sum, item) => sum + item.redemptions, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total Redemptions</p>
          <p className="text-2xl font-bold text-foreground">{totalRedemptions}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7days')}
          >
            Last 7 days
          </Button>
          <Button
            variant={timeRange === '30days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30days')}
          >
            Last 30 days
          </Button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="redemptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [value, 'Redemptions']}
            />
            <Area
              type="monotone"
              dataKey="redemptions"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#redemptionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
