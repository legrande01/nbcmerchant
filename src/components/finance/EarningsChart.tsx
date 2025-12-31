import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from '@/lib/utils';

interface EarningsChartProps {
  data: { date: string; earnings: number; fees: number }[];
  timeRange: '7' | '30';
  onTimeRangeChange: (range: '7' | '30') => void;
  className?: string;
}

export function EarningsChart({ data, timeRange, onTimeRangeChange, className }: EarningsChartProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Earnings Trend</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeRangeChange('7')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeRangeChange('30')}
          >
            30 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  padding: '12px',
                }}
                formatter={(value: number, name: string) => [
                  `TZS ${value.toLocaleString()}`,
                  name === 'earnings' ? 'Earnings' : 'Fees'
                ]}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
              <Area
                type="monotone"
                dataKey="fees"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                fill="url(#feesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Fees</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
