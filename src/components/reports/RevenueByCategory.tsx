import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryRevenue, formatTZS } from '@/data/reportsData';

interface RevenueByCategory {
  data: CategoryRevenue[];
}

const COLORS = [
  'hsl(222, 63%, 34%)', // Primary blue
  'hsl(0, 89%, 46%)',   // Accent red  
  'hsl(142, 71%, 45%)', // Green
  'hsl(38, 92%, 50%)',  // Orange
  'hsl(262, 83%, 58%)', // Purple
  'hsl(199, 89%, 48%)', // Cyan
];

export function RevenueByCategory({ data }: RevenueByCategory) {
  const chartData = data.map(item => ({
    name: item.category,
    value: item.revenue,
    percentage: item.percentage,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; percentage: number } }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-sm text-primary">{formatTZS(item.value)}</p>
          <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
    if (!payload) return null;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
}
