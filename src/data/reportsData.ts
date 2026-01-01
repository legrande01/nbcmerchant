// Reports & Analytics Mock Data

export interface SalesRecord {
  date: string;
  orders: number;
  revenue: number;
  refunds: number;
  discounts: number;
  fees: number;
  taxes: number;
  netTotal: number;
}

export interface ProductPerformanceRecord {
  id: string;
  name: string;
  category: string;
  views: number;
  orders: number;
  revenue: number;
  conversionRate: number;
  returnRate: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  salesTrend: { date: string; revenue: number; orders: number }[];
  promotionsApplied: string[];
  stockEvents: { date: string; event: string; impact: string }[];
}

export interface OrderAnalytics {
  date: string;
  totalOrders: number;
  fulfilled: number;
  cancelled: number;
  refunded: number;
  avgFulfillmentTime: number; // in hours
}

export interface CustomerInsight {
  newCustomers: number;
  returningCustomers: number;
  avgOrderFrequency: number;
  topRegions: { region: string; orders: number; revenue: number }[];
  repeatCustomerRevenue: number;
  totalRevenue: number;
}

export interface ReportsOverviewKPIs {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  visits: number;
  conversionRate: number;
  refundImpact: number;
  previousPeriod: {
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
  };
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
  percentage: number;
}

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  orders: number;
}

// Mock Sales Data
export const mockSalesData: SalesRecord[] = [
  { date: '2024-01-01', orders: 12, revenue: 850000, refunds: 25000, discounts: 42500, fees: 25500, taxes: 127500, netTotal: 629500 },
  { date: '2024-01-02', orders: 18, revenue: 1250000, refunds: 0, discounts: 62500, fees: 37500, taxes: 187500, netTotal: 962500 },
  { date: '2024-01-03', orders: 15, revenue: 980000, refunds: 45000, discounts: 49000, fees: 29400, taxes: 147000, netTotal: 709600 },
  { date: '2024-01-04', orders: 22, revenue: 1580000, refunds: 0, discounts: 79000, fees: 47400, taxes: 237000, netTotal: 1216600 },
  { date: '2024-01-05', orders: 28, revenue: 2100000, refunds: 75000, discounts: 105000, fees: 63000, taxes: 315000, netTotal: 1542000 },
  { date: '2024-01-06', orders: 35, revenue: 2650000, refunds: 0, discounts: 132500, fees: 79500, taxes: 397500, netTotal: 2040500 },
  { date: '2024-01-07', orders: 42, revenue: 3200000, refunds: 120000, discounts: 160000, fees: 96000, taxes: 480000, netTotal: 2344000 },
  { date: '2024-01-08', orders: 38, revenue: 2850000, refunds: 50000, discounts: 142500, fees: 85500, taxes: 427500, netTotal: 2144500 },
  { date: '2024-01-09', orders: 45, revenue: 3450000, refunds: 0, discounts: 172500, fees: 103500, taxes: 517500, netTotal: 2656500 },
  { date: '2024-01-10', orders: 52, revenue: 4100000, refunds: 200000, discounts: 205000, fees: 123000, taxes: 615000, netTotal: 2957000 },
  { date: '2024-01-11', orders: 48, revenue: 3680000, refunds: 0, discounts: 184000, fees: 110400, taxes: 552000, netTotal: 2833600 },
  { date: '2024-01-12', orders: 55, revenue: 4250000, refunds: 150000, discounts: 212500, fees: 127500, taxes: 637500, netTotal: 3122500 },
  { date: '2024-01-13', orders: 62, revenue: 4800000, refunds: 0, discounts: 240000, fees: 144000, taxes: 720000, netTotal: 3696000 },
  { date: '2024-01-14', orders: 58, revenue: 4450000, refunds: 100000, discounts: 222500, fees: 133500, taxes: 667500, netTotal: 3326500 },
  { date: '2024-01-15', orders: 65, revenue: 5100000, refunds: 0, discounts: 255000, fees: 153000, taxes: 765000, netTotal: 3927000 },
  { date: '2024-01-16', orders: 72, revenue: 5600000, refunds: 250000, discounts: 280000, fees: 168000, taxes: 840000, netTotal: 4062000 },
  { date: '2024-01-17', orders: 68, revenue: 5250000, refunds: 0, discounts: 262500, fees: 157500, taxes: 787500, netTotal: 4042500 },
  { date: '2024-01-18', orders: 75, revenue: 5850000, refunds: 175000, discounts: 292500, fees: 175500, taxes: 877500, netTotal: 4329500 },
  { date: '2024-01-19', orders: 82, revenue: 6400000, refunds: 0, discounts: 320000, fees: 192000, taxes: 960000, netTotal: 4928000 },
  { date: '2024-01-20', orders: 78, revenue: 6050000, refunds: 300000, discounts: 302500, fees: 181500, taxes: 907500, netTotal: 4358500 },
  { date: '2024-01-21', orders: 85, revenue: 6650000, refunds: 0, discounts: 332500, fees: 199500, taxes: 997500, netTotal: 5120500 },
  { date: '2024-01-22', orders: 92, revenue: 7200000, refunds: 225000, discounts: 360000, fees: 216000, taxes: 1080000, netTotal: 5319000 },
  { date: '2024-01-23', orders: 88, revenue: 6850000, refunds: 0, discounts: 342500, fees: 205500, taxes: 1027500, netTotal: 5274500 },
  { date: '2024-01-24', orders: 95, revenue: 7450000, refunds: 350000, discounts: 372500, fees: 223500, taxes: 1117500, netTotal: 5386500 },
  { date: '2024-01-25', orders: 102, revenue: 8000000, refunds: 0, discounts: 400000, fees: 240000, taxes: 1200000, netTotal: 6160000 },
  { date: '2024-01-26', orders: 98, revenue: 7650000, refunds: 275000, discounts: 382500, fees: 229500, taxes: 1147500, netTotal: 5615500 },
  { date: '2024-01-27', orders: 105, revenue: 8250000, refunds: 0, discounts: 412500, fees: 247500, taxes: 1237500, netTotal: 6352500 },
  { date: '2024-01-28', orders: 112, revenue: 8800000, refunds: 400000, discounts: 440000, fees: 264000, taxes: 1320000, netTotal: 6376000 },
  { date: '2024-01-29', orders: 108, revenue: 8450000, refunds: 0, discounts: 422500, fees: 253500, taxes: 1267500, netTotal: 6506500 },
  { date: '2024-01-30', orders: 115, revenue: 9050000, refunds: 325000, discounts: 452500, fees: 271500, taxes: 1357500, netTotal: 6643500 },
];

// Mock Product Performance Data
export const mockProductPerformance: ProductPerformanceRecord[] = [
  {
    id: 'prod-001',
    name: 'Premium Leather Wallet',
    category: 'Accessories',
    views: 2450,
    orders: 156,
    revenue: 7800000,
    conversionRate: 6.4,
    returnRate: 2.1,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 250000, orders: 5 },
      { date: '2024-01-08', revenue: 300000, orders: 6 },
      { date: '2024-01-15', revenue: 450000, orders: 9 },
      { date: '2024-01-22', revenue: 380000, orders: 8 },
    ],
    promotionsApplied: ['New Year Sale', '10% First Order'],
    stockEvents: [
      { date: '2024-01-10', event: 'Low stock alert', impact: 'Sales dip observed' },
      { date: '2024-01-12', event: 'Restocked', impact: 'Sales recovered' },
    ],
  },
  {
    id: 'prod-002',
    name: 'Wireless Bluetooth Earbuds',
    category: 'Electronics',
    views: 3820,
    orders: 245,
    revenue: 12250000,
    conversionRate: 6.4,
    returnRate: 3.5,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 400000, orders: 8 },
      { date: '2024-01-08', revenue: 550000, orders: 11 },
      { date: '2024-01-15', revenue: 620000, orders: 12 },
      { date: '2024-01-22', revenue: 480000, orders: 10 },
    ],
    promotionsApplied: ['Black Friday', 'Weekend Deal'],
    stockEvents: [],
  },
  {
    id: 'prod-003',
    name: 'Cotton T-Shirt Bundle',
    category: 'Clothing',
    views: 1890,
    orders: 89,
    revenue: 2670000,
    conversionRate: 4.7,
    returnRate: 5.2,
    status: 'low_stock',
    salesTrend: [
      { date: '2024-01-01', revenue: 150000, orders: 5 },
      { date: '2024-01-08', revenue: 180000, orders: 6 },
      { date: '2024-01-15', revenue: 120000, orders: 4 },
      { date: '2024-01-22', revenue: 90000, orders: 3 },
    ],
    promotionsApplied: [],
    stockEvents: [
      { date: '2024-01-20', event: 'Low stock', impact: 'Limited size availability' },
    ],
  },
  {
    id: 'prod-004',
    name: 'Smart Watch Pro',
    category: 'Electronics',
    views: 5200,
    orders: 312,
    revenue: 46800000,
    conversionRate: 6.0,
    returnRate: 1.8,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 1500000, orders: 10 },
      { date: '2024-01-08', revenue: 1800000, orders: 12 },
      { date: '2024-01-15', revenue: 2100000, orders: 14 },
      { date: '2024-01-22', revenue: 1950000, orders: 13 },
    ],
    promotionsApplied: ['Holiday Sale', 'NBC Sponsored'],
    stockEvents: [],
  },
  {
    id: 'prod-005',
    name: 'Organic Coffee Beans 1kg',
    category: 'Food & Beverages',
    views: 980,
    orders: 67,
    revenue: 1675000,
    conversionRate: 6.8,
    returnRate: 0.5,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 100000, orders: 4 },
      { date: '2024-01-08', revenue: 125000, orders: 5 },
      { date: '2024-01-15', revenue: 150000, orders: 6 },
      { date: '2024-01-22', revenue: 175000, orders: 7 },
    ],
    promotionsApplied: ['Weekend Deal'],
    stockEvents: [],
  },
  {
    id: 'prod-006',
    name: 'Yoga Mat Premium',
    category: 'Sports & Fitness',
    views: 1450,
    orders: 78,
    revenue: 3900000,
    conversionRate: 5.4,
    returnRate: 1.2,
    status: 'out_of_stock',
    salesTrend: [
      { date: '2024-01-01', revenue: 200000, orders: 4 },
      { date: '2024-01-08', revenue: 250000, orders: 5 },
      { date: '2024-01-15', revenue: 100000, orders: 2 },
      { date: '2024-01-22', revenue: 0, orders: 0 },
    ],
    promotionsApplied: ['New Year Fitness'],
    stockEvents: [
      { date: '2024-01-18', event: 'Out of stock', impact: 'Sales stopped' },
    ],
  },
  {
    id: 'prod-007',
    name: 'Handmade Ceramic Vase',
    category: 'Home & Living',
    views: 720,
    orders: 34,
    revenue: 2720000,
    conversionRate: 4.7,
    returnRate: 2.9,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 160000, orders: 2 },
      { date: '2024-01-08', revenue: 240000, orders: 3 },
      { date: '2024-01-15', revenue: 320000, orders: 4 },
      { date: '2024-01-22', revenue: 400000, orders: 5 },
    ],
    promotionsApplied: [],
    stockEvents: [],
  },
  {
    id: 'prod-008',
    name: 'USB-C Charging Cable 2m',
    category: 'Electronics',
    views: 4100,
    orders: 523,
    revenue: 5230000,
    conversionRate: 12.8,
    returnRate: 1.5,
    status: 'active',
    salesTrend: [
      { date: '2024-01-01', revenue: 100000, orders: 10 },
      { date: '2024-01-08', revenue: 150000, orders: 15 },
      { date: '2024-01-15', revenue: 200000, orders: 20 },
      { date: '2024-01-22', revenue: 180000, orders: 18 },
    ],
    promotionsApplied: ['Buy 2 Get 1'],
    stockEvents: [],
  },
];

// Mock Order Analytics Data
export const mockOrderAnalytics: OrderAnalytics[] = [
  { date: '2024-01-01', totalOrders: 12, fulfilled: 10, cancelled: 1, refunded: 1, avgFulfillmentTime: 28 },
  { date: '2024-01-02', totalOrders: 18, fulfilled: 16, cancelled: 2, refunded: 0, avgFulfillmentTime: 32 },
  { date: '2024-01-03', totalOrders: 15, fulfilled: 13, cancelled: 1, refunded: 1, avgFulfillmentTime: 26 },
  { date: '2024-01-04', totalOrders: 22, fulfilled: 20, cancelled: 1, refunded: 1, avgFulfillmentTime: 24 },
  { date: '2024-01-05', totalOrders: 28, fulfilled: 25, cancelled: 2, refunded: 1, avgFulfillmentTime: 30 },
  { date: '2024-01-06', totalOrders: 35, fulfilled: 32, cancelled: 2, refunded: 1, avgFulfillmentTime: 36 },
  { date: '2024-01-07', totalOrders: 42, fulfilled: 38, cancelled: 3, refunded: 1, avgFulfillmentTime: 42 },
];

// Mock Customer Insights
export const mockCustomerInsights: CustomerInsight = {
  newCustomers: 245,
  returningCustomers: 112,
  avgOrderFrequency: 2.3,
  topRegions: [
    { region: 'Dar es Salaam', orders: 456, revenue: 45600000 },
    { region: 'Arusha', orders: 234, revenue: 23400000 },
    { region: 'Mwanza', orders: 189, revenue: 18900000 },
    { region: 'Dodoma', orders: 145, revenue: 14500000 },
    { region: 'Mbeya', orders: 98, revenue: 9800000 },
  ],
  repeatCustomerRevenue: 38400000,
  totalRevenue: 120000000,
};

// Mock Category Revenue
export const mockCategoryRevenue: CategoryRevenue[] = [
  { category: 'Electronics', revenue: 64280000, percentage: 42 },
  { category: 'Clothing', revenue: 24600000, percentage: 16 },
  { category: 'Accessories', revenue: 21500000, percentage: 14 },
  { category: 'Home & Living', revenue: 18400000, percentage: 12 },
  { category: 'Food & Beverages', revenue: 12300000, percentage: 8 },
  { category: 'Sports & Fitness', revenue: 12220000, percentage: 8 },
];

// Mock Top Products
export const mockTopProducts: TopProduct[] = [
  { id: 'prod-004', name: 'Smart Watch Pro', revenue: 46800000, orders: 312 },
  { id: 'prod-002', name: 'Wireless Bluetooth Earbuds', revenue: 12250000, orders: 245 },
  { id: 'prod-001', name: 'Premium Leather Wallet', revenue: 7800000, orders: 156 },
  { id: 'prod-008', name: 'USB-C Charging Cable 2m', revenue: 5230000, orders: 523 },
  { id: 'prod-006', name: 'Yoga Mat Premium', revenue: 3900000, orders: 78 },
];

// Helper functions
export function getReportsOverviewKPIs(period: 'today' | '7days' | '30days' | 'custom' = '7days'): ReportsOverviewKPIs {
  const salesData = period === 'today' ? mockSalesData.slice(-1) : 
                    period === '7days' ? mockSalesData.slice(-7) : 
                    mockSalesData;
  
  const totalSales = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
  const visits = totalOrders * 15; // Mock: 15 visits per order
  const conversionRate = visits > 0 ? parseFloat(((totalOrders / visits) * 100).toFixed(1)) : 0;
  const refundImpact = salesData.reduce((sum, day) => sum + day.refunds, 0);

  // Previous period for comparison
  const previousMultiplier = period === 'today' ? 0.85 : period === '7days' ? 0.92 : 0.88;
  
  return {
    totalSales,
    totalOrders,
    avgOrderValue,
    visits,
    conversionRate,
    refundImpact,
    previousPeriod: {
      totalSales: Math.round(totalSales * previousMultiplier),
      totalOrders: Math.round(totalOrders * previousMultiplier),
      avgOrderValue: Math.round(avgOrderValue * 1.02),
    },
  };
}

export function getSalesReportData(startDate?: string, endDate?: string): SalesRecord[] {
  if (!startDate || !endDate) return mockSalesData;
  return mockSalesData.filter(record => record.date >= startDate && record.date <= endDate);
}

export function getProductPerformanceData(
  category?: string,
  status?: string
): ProductPerformanceRecord[] {
  let filtered = [...mockProductPerformance];
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(p => p.status === status);
  }
  return filtered;
}

export function getProductById(id: string): ProductPerformanceRecord | undefined {
  return mockProductPerformance.find(p => p.id === id);
}

export function getOrderAnalytics(days: number = 7): OrderAnalytics[] {
  return mockOrderAnalytics.slice(-days);
}

export function formatTZS(amount: number): string {
  return `TZS ${amount.toLocaleString('en-TZ')}`;
}

export function calculateTrend(current: number, previous: number): { value: number; isPositive: boolean } {
  if (previous === 0) return { value: 0, isPositive: true };
  const change = ((current - previous) / previous) * 100;
  return { value: parseFloat(Math.abs(change).toFixed(1)), isPositive: change >= 0 };
}

// Get aggregated metrics
export function getAggregatedOrderMetrics(): {
  avgFulfillmentTime: number;
  cancellationRate: number;
  refundRate: number;
  totalOrders: number;
} {
  const data = mockOrderAnalytics;
  const totalOrders = data.reduce((sum, d) => sum + d.totalOrders, 0);
  const totalCancelled = data.reduce((sum, d) => sum + d.cancelled, 0);
  const totalRefunded = data.reduce((sum, d) => sum + d.refunded, 0);
  const avgFulfillmentTime = data.reduce((sum, d) => sum + d.avgFulfillmentTime, 0) / data.length;

  return {
    avgFulfillmentTime: parseFloat(avgFulfillmentTime.toFixed(1)),
    cancellationRate: parseFloat(((totalCancelled / totalOrders) * 100).toFixed(1)),
    refundRate: parseFloat(((totalRefunded / totalOrders) * 100).toFixed(1)),
    totalOrders,
  };
}
