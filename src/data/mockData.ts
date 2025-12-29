// Mock data for NBC Merchant Portal

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  sku: string;
  status: 'active' | 'draft' | 'out_of_stock';
}

export interface StoreInfo {
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  businessHours: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'update';
  createdAt: string;
  read: boolean;
}

export interface DailyStats {
  date: string;
  orders: number;
  revenue: number;
}

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'NBC-2024-001',
    customerName: 'John Mwangi',
    customerEmail: 'john.mwangi@email.com',
    items: [
      { id: '1', productName: 'Wireless Bluetooth Headphones', quantity: 1, price: 45000 },
      { id: '2', productName: 'Phone Case - Samsung A54', quantity: 2, price: 3500 },
    ],
    total: 52000,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: 'Westlands, Nairobi, Kenya',
  },
  {
    id: '2',
    orderNumber: 'NBC-2024-002',
    customerName: 'Grace Wanjiku',
    customerEmail: 'grace.w@email.com',
    items: [
      { id: '3', productName: 'USB-C Charging Cable 2m', quantity: 3, price: 1500 },
    ],
    total: 4500,
    status: 'processing',
    createdAt: '2024-01-15T09:15:00Z',
    shippingAddress: 'Kilimani, Nairobi, Kenya',
  },
  {
    id: '3',
    orderNumber: 'NBC-2024-003',
    customerName: 'Peter Ochieng',
    customerEmail: 'peter.o@email.com',
    items: [
      { id: '4', productName: 'Laptop Stand Adjustable', quantity: 1, price: 8500 },
      { id: '5', productName: 'Wireless Mouse', quantity: 1, price: 2500 },
    ],
    total: 11000,
    status: 'shipped',
    createdAt: '2024-01-14T16:45:00Z',
    shippingAddress: 'Karen, Nairobi, Kenya',
  },
  {
    id: '4',
    orderNumber: 'NBC-2024-004',
    customerName: 'Amina Hassan',
    customerEmail: 'amina.h@email.com',
    items: [
      { id: '6', productName: 'Smart Watch Band', quantity: 2, price: 1800 },
    ],
    total: 3600,
    status: 'delivered',
    createdAt: '2024-01-13T11:20:00Z',
    shippingAddress: 'Mombasa Road, Nairobi, Kenya',
  },
  {
    id: '5',
    orderNumber: 'NBC-2024-005',
    customerName: 'David Kamau',
    customerEmail: 'david.k@email.com',
    items: [
      { id: '7', productName: 'Portable Power Bank 20000mAh', quantity: 1, price: 6500 },
    ],
    total: 6500,
    status: 'pending',
    createdAt: '2024-01-15T08:00:00Z',
    shippingAddress: 'Lavington, Nairobi, Kenya',
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 45000,
    stock: 24,
    category: 'Electronics',
    sku: 'WBH-001',
    status: 'active',
  },
  {
    id: '2',
    name: 'Phone Case - Samsung A54',
    description: 'Durable protective case for Samsung Galaxy A54',
    price: 3500,
    stock: 3,
    category: 'Accessories',
    sku: 'PC-SA54',
    status: 'active',
  },
  {
    id: '3',
    name: 'USB-C Charging Cable 2m',
    description: 'Fast charging USB-C cable, 2 meters long',
    price: 1500,
    stock: 0,
    category: 'Accessories',
    sku: 'USB-C2M',
    status: 'out_of_stock',
  },
  {
    id: '4',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height',
    price: 8500,
    stock: 12,
    category: 'Electronics',
    sku: 'LS-ADJ',
    status: 'active',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    price: 2500,
    stock: 2,
    category: 'Electronics',
    sku: 'WM-001',
    status: 'active',
  },
  {
    id: '6',
    name: 'Smart Watch Band',
    description: 'Replacement band for popular smart watches',
    price: 1800,
    stock: 45,
    category: 'Accessories',
    sku: 'SWB-001',
    status: 'active',
  },
  {
    id: '7',
    name: 'Portable Power Bank 20000mAh',
    description: 'High capacity power bank with fast charging',
    price: 6500,
    stock: 8,
    category: 'Electronics',
    sku: 'PB-20K',
    status: 'active',
  },
];

// Mock Store Info
export const mockStoreInfo: StoreInfo = {
  name: 'TechHub Electronics',
  description: 'Your one-stop shop for quality electronics and accessories in Dar es Salaam',
  address: 'Masaki Business Park, Dar es Salaam, Tanzania',
  phone: '+255 712 345 678',
  email: 'info@techhub.co.tz',
  currency: 'TZS',
  businessHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Feature: Bulk Product Upload',
    message: 'You can now upload multiple products at once using our new CSV import feature.',
    type: 'update',
    createdAt: '2024-01-15T08:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'USB-C Charging Cable 2m is out of stock. Consider restocking soon.',
    type: 'warning',
    createdAt: '2024-01-14T14:30:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment for order NBC-2024-003 has been confirmed.',
    type: 'success',
    createdAt: '2024-01-14T12:00:00Z',
    read: true,
  },
  {
    id: '4',
    title: 'Tip: Improve Your Listings',
    message: 'Add high-quality images to your products to increase sales by up to 30%.',
    type: 'info',
    createdAt: '2024-01-13T10:00:00Z',
    read: true,
  },
];

// Mock Daily Stats (Last 30 days)
export const generateDailyStats = (days: number): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic-looking random data
    const baseOrders = Math.floor(Math.random() * 8) + 3;
    const baseRevenue = baseOrders * (Math.floor(Math.random() * 15000) + 10000);
    
    stats.push({
      date: date.toISOString().split('T')[0],
      orders: baseOrders,
      revenue: baseRevenue,
    });
  }
  
  return stats;
};

// Helper functions
export const getOrderStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'processing':
      return 'warning';
    case 'shipped':
      return 'default';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'secondary';
  }
};

export const formatCurrency = (amount: number) => {
  return `TZS ${new Intl.NumberFormat('en-TZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Structured Dashboard Data - Future-proof for backend integration
export interface DashboardData {
  orders: {
    todaysCount: number;
    pendingCount: number;
    trends: {
      todaysCountChange: number;
      todaysCountIsPositive: boolean;
      pendingCountChange: number;
      pendingCountIsPositive: boolean;
    };
  };
  sales: {
    todaysRevenue: number;
    trends: {
      revenueChange: number;
      revenueIsPositive: boolean;
    };
  };
  inventory: {
    lowStockCount: number;
    trends: {
      lowStockChange: number;
      lowStockIsPositive: boolean;
    };
  };
}

export const getDashboardData = (): DashboardData => {
  // Calculate from mock data - replace with API calls later
  const todaysOrders = mockOrders.filter(
    order => new Date(order.createdAt).toDateString() === new Date().toDateString()
  ).length || 8;
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  
  const lowStockProducts = mockProducts.filter(product => product.stock <= 5).length;
  
  const todaysRevenue = mockOrders
    .filter(order => new Date(order.createdAt).toDateString() === new Date().toDateString())
    .reduce((sum, order) => sum + order.total, 0) || 245000;
  
  return {
    orders: {
      todaysCount: todaysOrders,
      pendingCount: pendingOrders,
      trends: {
        todaysCountChange: 12,
        todaysCountIsPositive: true,
        pendingCountChange: 2,
        pendingCountIsPositive: false,
      },
    },
    sales: {
      todaysRevenue: todaysRevenue,
      trends: {
        revenueChange: 8,
        revenueIsPositive: true,
      },
    },
    inventory: {
      lowStockCount: lowStockProducts,
      trends: {
        lowStockChange: 3,
        lowStockIsPositive: false,
      },
    },
  };
};

// Legacy function for backwards compatibility
export const getDashboardKPIs = () => {
  const data = getDashboardData();
  return {
    todayOrders: data.orders.todaysCount,
    pendingOrders: data.orders.pendingCount,
    lowStockProducts: data.inventory.lowStockCount,
    todayRevenue: data.sales.todaysRevenue,
  };
};
