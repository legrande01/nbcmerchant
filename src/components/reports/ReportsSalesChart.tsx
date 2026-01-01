import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { SalesRecord } from '@/data/reportsData';
import { format, parseISO } from 'date-fns';

interface ReportsSalesChartProps {
  data: SalesRecord[];
  type: 'revenue' | 'orders';
  chartType?: 'area' | 'bar';
}

export function ReportsSalesChart({ data, type, chartType = 'area' }: ReportsSalesChartProps) {
  const chartData = data.map(record => ({
    date: format(parseISO(record.date), 'MMM dd'),
    value: type === 'revenue' ? record.revenue : record.orders,
    refunds: record.refunds,
    netTotal: record.netTotal,
  }));

  const formatValue = (value: number) => {
    if (type === 'revenue') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toString();
    }
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-primary">
            {type === 'revenue' ? `TZS ${payload[0].value.toLocaleString()}` : `${payload[0].value} orders`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            className="text-muted-foreground"
          />
          <YAxis 
            tickFormatter={formatValue} 
            tick={{ fontSize: 12 }} 
            className="text-muted-foreground"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          className="text-muted-foreground"
        />
        <YAxis 
          tickFormatter={formatValue} 
          tick={{ fontSize: 12 }} 
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
