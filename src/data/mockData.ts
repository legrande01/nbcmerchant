// Mock data for NBC Merchant Portal

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'paid' | 'unpaid';

export interface OrderTimelineEntry {
  id: string;
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface OrderNote {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  shippingAddress: string;
  statusTimeline: OrderTimelineEntry[];
  notes: OrderNote[];
}

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  image?: string;
}

// Extended Product interface with variants and activity tracking
export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material' | 'style';
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  id: string;
  value: string;
  priceModifier: number;
  stockQuantity: number;
  sku: string;
}

export interface ProductActivityLog {
  id: string;
  action: 'created' | 'updated' | 'published' | 'archived' | 'restocked' | 'price_changed';
  description: string;
  timestamp: string;
  user: string;
}

export interface ProductInventory {
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  taxIncluded: boolean;
  stock: number;
  category: string;
  images: string[];
  sku: string;
  status: 'active' | 'draft' | 'archived';
  variants: ProductVariant[];
  inventory: ProductInventory;
  activityLog: ProductActivityLog[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreAddress {
  region: string;
  district: string;
  street: string;
  fullAddress: string;
}

export interface StoreTheme {
  mode: 'light' | 'dark';
  accentColor: 'blue' | 'red' | 'green' | 'orange';
}

export interface StorePolicies {
  returns: string;
  shipping: string;
  terms: string;
}

export interface BusinessDetails {
  registeredName: string;
  tin: string;
  registrationNumber: string;
  registeredAddress: string;
  registrationDate: string;
  businessType: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  logo?: string;
  banner?: string;
  address: StoreAddress;
  phone: string;
  email: string;
  currency: string;
  businessHours: string;
  theme: StoreTheme;
  policies: StorePolicies;
  businessDetails: BusinessDetails;
  createdAt: string;
  updatedAt: string;
}

export const storeCategories = [
  'Electronics & Gadgets',
  'Fashion & Apparel',
  'Home & Living',
  'Health & Beauty',
  'Food & Beverages',
  'Sports & Outdoors',
  'Books & Stationery',
  'Automotive',
  'Baby & Kids',
  'General Merchandise',
] as const;

export const productCategories = [
  'Electronics',
  'Accessories',
  'Clothing',
  'Footwear',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Books',
  'Food & Beverages',
] as const;

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

// Order status flow definitions
export const orderStatusFlow: Record<OrderStatus, OrderStatus[]> = {
  pending: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: ['completed'],
  completed: [],
  cancelled: [],
  refunded: [],
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

// Mock Orders with extended data
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'NBC-2024-001',
    customerName: 'John Mwangi',
    customerEmail: 'john.mwangi@email.com',
    customerPhone: '+255 712 345 678',
    items: [
      { id: '1', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001-BLK', quantity: 1, price: 45000 },
      { id: '2', productName: 'Phone Case - Samsung A54', sku: 'PC-SA54-CLR', quantity: 2, price: 3500 },
    ],
    subtotal: 52000,
    shippingCost: 5000,
    total: 57000,
    status: 'pending',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money (M-Pesa)',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: 'Plot 45, Masaki Road, Kinondoni, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't1', status: 'pending', timestamp: '2024-01-15T10:30:00Z', note: 'Order placed by customer' },
    ],
    notes: [
      { id: 'n1', content: 'Customer requested express delivery', createdAt: '2024-01-15T10:35:00Z', author: 'System' },
    ],
  },
  {
    id: '2',
    orderNumber: 'NBC-2024-002',
    customerName: 'Grace Wanjiku',
    customerEmail: 'grace.w@email.com',
    customerPhone: '+255 713 456 789',
    items: [
      { id: '3', productName: 'USB-C Charging Cable 2m', sku: 'USB-C2M', quantity: 3, price: 1500 },
    ],
    subtotal: 4500,
    shippingCost: 2500,
    total: 7000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Bank Transfer',
    createdAt: '2024-01-15T09:15:00Z',
    shippingAddress: 'Block B, Apartment 12, Mikocheni, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't2', status: 'pending', timestamp: '2024-01-15T09:15:00Z', note: 'Order placed by customer' },
      { id: 't3', status: 'processing', timestamp: '2024-01-15T11:00:00Z', note: 'Order confirmed and being prepared' },
    ],
    notes: [],
  },
  {
    id: '3',
    orderNumber: 'NBC-2024-003',
    customerName: 'Peter Ochieng',
    customerEmail: 'peter.o@email.com',
    customerPhone: '+255 714 567 890',
    items: [
      { id: '4', productName: 'Laptop Stand Adjustable', sku: 'LS-ADJ-SLV', quantity: 1, price: 8500 },
      { id: '5', productName: 'Wireless Mouse', sku: 'WM-001-BLK', quantity: 1, price: 2500 },
    ],
    subtotal: 11000,
    shippingCost: 3500,
    total: 14500,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-14T16:45:00Z',
    shippingAddress: 'House 78, Oyster Bay, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't4', status: 'pending', timestamp: '2024-01-14T16:45:00Z', note: 'Order placed by customer' },
      { id: 't5', status: 'processing', timestamp: '2024-01-14T18:00:00Z', note: 'Payment verified, preparing order' },
      { id: 't6', status: 'shipped', timestamp: '2024-01-15T08:30:00Z', note: 'Order dispatched via DHL Express' },
    ],
    notes: [
      { id: 'n2', content: 'Tracking number: DHL-TZ-123456', createdAt: '2024-01-15T08:35:00Z', author: 'Admin' },
    ],
  },
  {
    id: '4',
    orderNumber: 'NBC-2024-004',
    customerName: 'Amina Hassan',
    customerEmail: 'amina.h@email.com',
    customerPhone: '+255 715 678 901',
    items: [
      { id: '6', productName: 'Smart Watch Band', sku: 'SWB-001-SM', quantity: 2, price: 1800 },
    ],
    subtotal: 3600,
    shippingCost: 2000,
    total: 5600,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money (Tigo Pesa)',
    createdAt: '2024-01-13T11:20:00Z',
    shippingAddress: 'Sinza Mori, Plot 23, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't7', status: 'pending', timestamp: '2024-01-13T11:20:00Z', note: 'Order placed by customer' },
      { id: 't8', status: 'processing', timestamp: '2024-01-13T12:00:00Z', note: 'Order confirmed' },
      { id: 't9', status: 'shipped', timestamp: '2024-01-13T16:00:00Z', note: 'Out for delivery' },
      { id: 't10', status: 'delivered', timestamp: '2024-01-14T10:30:00Z', note: 'Delivered to customer' },
    ],
    notes: [
      { id: 'n3', content: 'Customer confirmed receipt via phone', createdAt: '2024-01-14T10:45:00Z', author: 'Support' },
    ],
  },
  {
    id: '5',
    orderNumber: 'NBC-2024-005',
    customerName: 'David Kamau',
    customerEmail: 'david.k@email.com',
    customerPhone: '+255 716 789 012',
    items: [
      { id: '7', productName: 'Portable Power Bank 20000mAh', sku: 'PB-20K', quantity: 1, price: 6500 },
    ],
    subtotal: 6500,
    shippingCost: 2500,
    total: 9000,
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: 'Cash on Delivery',
    createdAt: '2024-01-15T08:00:00Z',
    shippingAddress: 'Mwenge, Kijitonyama, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't11', status: 'pending', timestamp: '2024-01-15T08:00:00Z', note: 'Order placed, awaiting payment' },
    ],
    notes: [],
  },
  {
    id: '6',
    orderNumber: 'NBC-2024-006',
    customerName: 'Sarah Kimani',
    customerEmail: 'sarah.k@email.com',
    customerPhone: '+255 717 890 123',
    items: [
      { id: '8', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001-WHT', quantity: 1, price: 45000 },
      { id: '9', productName: 'USB-C Charging Cable 2m', sku: 'USB-C2M', quantity: 2, price: 1500 },
    ],
    subtotal: 48000,
    shippingCost: 0,
    total: 48000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money (M-Pesa)',
    createdAt: '2024-01-10T14:30:00Z',
    shippingAddress: 'Upanga West, Flat 5A, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't12', status: 'pending', timestamp: '2024-01-10T14:30:00Z', note: 'Order placed by customer' },
      { id: 't13', status: 'processing', timestamp: '2024-01-10T15:00:00Z', note: 'Payment confirmed' },
      { id: 't14', status: 'shipped', timestamp: '2024-01-11T09:00:00Z', note: 'Order dispatched' },
      { id: 't15', status: 'delivered', timestamp: '2024-01-11T16:00:00Z', note: 'Delivered successfully' },
      { id: 't16', status: 'completed', timestamp: '2024-01-12T10:00:00Z', note: 'Order completed by customer' },
    ],
    notes: [
      { id: 'n4', content: 'Free shipping applied (order over TZS 40,000)', createdAt: '2024-01-10T14:30:00Z', author: 'System' },
      { id: 'n5', content: 'Customer left 5-star review', createdAt: '2024-01-12T11:00:00Z', author: 'System' },
    ],
  },
  {
    id: '7',
    orderNumber: 'NBC-2024-007',
    customerName: 'Michael Banda',
    customerEmail: 'michael.b@email.com',
    customerPhone: '+255 718 901 234',
    items: [
      { id: '10', productName: 'Laptop Stand Adjustable', sku: 'LS-ADJ-GRY', quantity: 2, price: 9000 },
    ],
    subtotal: 18000,
    shippingCost: 4000,
    total: 22000,
    status: 'cancelled',
    paymentStatus: 'unpaid',
    paymentMethod: 'Bank Transfer',
    createdAt: '2024-01-12T09:00:00Z',
    shippingAddress: 'Mbezi Beach, Plot 156, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't17', status: 'pending', timestamp: '2024-01-12T09:00:00Z', note: 'Order placed, awaiting payment' },
      { id: 't18', status: 'cancelled', timestamp: '2024-01-13T09:00:00Z', note: 'Order cancelled - payment not received within 24 hours' },
    ],
    notes: [
      { id: 'n6', content: 'Customer notified about cancellation via email', createdAt: '2024-01-13T09:05:00Z', author: 'System' },
    ],
  },
  {
    id: '8',
    orderNumber: 'NBC-2024-008',
    customerName: 'Elizabeth Mwakasege',
    customerEmail: 'elizabeth.m@email.com',
    customerPhone: '+255 719 012 345',
    items: [
      { id: '11', productName: 'Smart Watch Band', sku: 'SWB-001-LG', quantity: 1, price: 1800 },
      { id: '12', productName: 'Wireless Mouse', sku: 'WM-001-WHT', quantity: 1, price: 2500 },
    ],
    subtotal: 4300,
    shippingCost: 2500,
    total: 6800,
    status: 'refunded',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-08T10:00:00Z',
    shippingAddress: 'Kariakoo, Street 45, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't19', status: 'pending', timestamp: '2024-01-08T10:00:00Z', note: 'Order placed by customer' },
      { id: 't20', status: 'processing', timestamp: '2024-01-08T11:00:00Z', note: 'Payment confirmed' },
      { id: 't21', status: 'shipped', timestamp: '2024-01-08T16:00:00Z', note: 'Order dispatched' },
      { id: 't22', status: 'delivered', timestamp: '2024-01-09T12:00:00Z', note: 'Delivered to customer' },
      { id: 't23', status: 'refunded', timestamp: '2024-01-11T14:00:00Z', note: 'Refund processed by platform admin - defective product' },
    ],
    notes: [
      { id: 'n7', content: 'Customer reported defective mouse', createdAt: '2024-01-10T10:00:00Z', author: 'Support' },
      { id: 'n8', content: 'Refund approved by admin', createdAt: '2024-01-11T13:00:00Z', author: 'Admin' },
    ],
  },
  {
    id: '9',
    orderNumber: 'NBC-2024-009',
    customerName: 'Joseph Mushi',
    customerEmail: 'joseph.m@email.com',
    customerPhone: '+255 720 123 456',
    items: [
      { id: '13', productName: 'Portable Power Bank 20000mAh', sku: 'PB-20K', quantity: 2, price: 6500 },
      { id: '14', productName: 'USB-C Charging Cable 2m', sku: 'USB-C2M', quantity: 4, price: 1500 },
    ],
    subtotal: 19000,
    shippingCost: 0,
    total: 19000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money (Airtel Money)',
    createdAt: '2024-01-15T07:30:00Z',
    shippingAddress: 'Ilala, Buguruni, Street 12, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't24', status: 'pending', timestamp: '2024-01-15T07:30:00Z', note: 'Order placed by customer' },
      { id: 't25', status: 'processing', timestamp: '2024-01-15T08:00:00Z', note: 'Payment verified, preparing order' },
    ],
    notes: [
      { id: 'n9', content: 'Bulk order - free shipping applied', createdAt: '2024-01-15T07:30:00Z', author: 'System' },
    ],
  },
  {
    id: '10',
    orderNumber: 'NBC-2024-010',
    customerName: 'Rose Nyerere',
    customerEmail: 'rose.n@email.com',
    customerPhone: '+255 721 234 567',
    items: [
      { id: '15', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001-BLU', quantity: 1, price: 47000 },
    ],
    subtotal: 47000,
    shippingCost: 0,
    total: 47000,
    status: 'pending',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money (M-Pesa)',
    createdAt: '2024-01-15T11:00:00Z',
    shippingAddress: 'Msasani Peninsula, Villa 8, Dar es Salaam, Tanzania',
    statusTimeline: [
      { id: 't26', status: 'pending', timestamp: '2024-01-15T11:00:00Z', note: 'Order placed by customer' },
    ],
    notes: [],
  },
];

// Mock Products with extended data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation. Features include 30-hour battery life, comfortable ear cushions, and premium sound quality.',
    price: 45000,
    compareAtPrice: 55000,
    taxIncluded: true,
    stock: 24,
    category: 'Electronics',
    images: [],
    sku: 'WBH-001',
    status: 'active',
    variants: [
      {
        id: 'v1',
        name: 'Color',
        type: 'color',
        options: [
          { id: 'v1o1', value: 'Black', priceModifier: 0, stockQuantity: 12, sku: 'WBH-001-BLK' },
          { id: 'v1o2', value: 'White', priceModifier: 0, stockQuantity: 8, sku: 'WBH-001-WHT' },
          { id: 'v1o3', value: 'Blue', priceModifier: 2000, stockQuantity: 4, sku: 'WBH-001-BLU' },
        ],
      },
    ],
    inventory: {
      stock: 24,
      lowStockThreshold: 5,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a1', action: 'created', description: 'Product created', timestamp: '2024-01-01T10:00:00Z', user: 'Admin' },
      { id: 'a2', action: 'published', description: 'Product published to store', timestamp: '2024-01-02T09:00:00Z', user: 'Admin' },
      { id: 'a3', action: 'price_changed', description: 'Price updated from TZS 50,000 to TZS 45,000', timestamp: '2024-01-10T14:30:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '2',
    name: 'Phone Case - Samsung A54',
    description: 'Durable protective case for Samsung Galaxy A54. Made from premium silicone with shock-absorbing corners.',
    price: 3500,
    taxIncluded: true,
    stock: 3,
    category: 'Accessories',
    images: [],
    sku: 'PC-SA54',
    status: 'active',
    variants: [
      {
        id: 'v2',
        name: 'Color',
        type: 'color',
        options: [
          { id: 'v2o1', value: 'Clear', priceModifier: 0, stockQuantity: 1, sku: 'PC-SA54-CLR' },
          { id: 'v2o2', value: 'Black', priceModifier: 0, stockQuantity: 2, sku: 'PC-SA54-BLK' },
        ],
      },
    ],
    inventory: {
      stock: 3,
      lowStockThreshold: 10,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a4', action: 'created', description: 'Product created', timestamp: '2024-01-05T11:00:00Z', user: 'Admin' },
      { id: 'a5', action: 'published', description: 'Product published to store', timestamp: '2024-01-05T11:30:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-05T11:30:00Z',
  },
  {
    id: '3',
    name: 'USB-C Charging Cable 2m',
    description: 'Fast charging USB-C cable, 2 meters long. Supports up to 100W power delivery.',
    price: 1500,
    taxIncluded: true,
    stock: 0,
    category: 'Accessories',
    images: [],
    sku: 'USB-C2M',
    status: 'active',
    variants: [],
    inventory: {
      stock: 0,
      lowStockThreshold: 20,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a6', action: 'created', description: 'Product created', timestamp: '2024-01-03T09:00:00Z', user: 'Admin' },
      { id: 'a7', action: 'published', description: 'Product published to store', timestamp: '2024-01-03T09:30:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-03T09:00:00Z',
    updatedAt: '2024-01-03T09:30:00Z',
  },
  {
    id: '4',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height. Compatible with laptops up to 17 inches.',
    price: 8500,
    compareAtPrice: 12000,
    taxIncluded: true,
    stock: 12,
    category: 'Electronics',
    images: [],
    sku: 'LS-ADJ',
    status: 'active',
    variants: [
      {
        id: 'v3',
        name: 'Material',
        type: 'material',
        options: [
          { id: 'v3o1', value: 'Aluminum Silver', priceModifier: 0, stockQuantity: 8, sku: 'LS-ADJ-SLV' },
          { id: 'v3o2', value: 'Aluminum Space Gray', priceModifier: 500, stockQuantity: 4, sku: 'LS-ADJ-GRY' },
        ],
      },
    ],
    inventory: {
      stock: 12,
      lowStockThreshold: 5,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a8', action: 'created', description: 'Product created', timestamp: '2024-01-02T08:00:00Z', user: 'Admin' },
      { id: 'a9', action: 'published', description: 'Product published to store', timestamp: '2024-01-02T10:00:00Z', user: 'Admin' },
      { id: 'a10', action: 'restocked', description: 'Inventory restocked: +20 units', timestamp: '2024-01-08T15:00:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-02T08:00:00Z',
    updatedAt: '2024-01-08T15:00:00Z',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life. Features silent click and adjustable DPI.',
    price: 2500,
    taxIncluded: true,
    stock: 2,
    category: 'Electronics',
    images: [],
    sku: 'WM-001',
    status: 'active',
    variants: [
      {
        id: 'v4',
        name: 'Color',
        type: 'color',
        options: [
          { id: 'v4o1', value: 'Black', priceModifier: 0, stockQuantity: 1, sku: 'WM-001-BLK' },
          { id: 'v4o2', value: 'White', priceModifier: 0, stockQuantity: 1, sku: 'WM-001-WHT' },
        ],
      },
    ],
    inventory: {
      stock: 2,
      lowStockThreshold: 10,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a11', action: 'created', description: 'Product created', timestamp: '2024-01-04T12:00:00Z', user: 'Admin' },
      { id: 'a12', action: 'published', description: 'Product published to store', timestamp: '2024-01-04T13:00:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-04T12:00:00Z',
    updatedAt: '2024-01-04T13:00:00Z',
  },
  {
    id: '6',
    name: 'Smart Watch Band',
    description: 'Replacement band for popular smart watches. Made from durable silicone.',
    price: 1800,
    taxIncluded: true,
    stock: 45,
    category: 'Accessories',
    images: [],
    sku: 'SWB-001',
    status: 'active',
    variants: [
      {
        id: 'v5',
        name: 'Size',
        type: 'size',
        options: [
          { id: 'v5o1', value: 'Small (38-40mm)', priceModifier: 0, stockQuantity: 15, sku: 'SWB-001-SM' },
          { id: 'v5o2', value: 'Large (42-44mm)', priceModifier: 0, stockQuantity: 15, sku: 'SWB-001-LG' },
          { id: 'v5o3', value: 'XL (45-49mm)', priceModifier: 200, stockQuantity: 15, sku: 'SWB-001-XL' },
        ],
      },
    ],
    inventory: {
      stock: 45,
      lowStockThreshold: 10,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a13', action: 'created', description: 'Product created', timestamp: '2024-01-06T10:00:00Z', user: 'Admin' },
      { id: 'a14', action: 'published', description: 'Product published to store', timestamp: '2024-01-06T10:30:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-06T10:00:00Z',
    updatedAt: '2024-01-06T10:30:00Z',
  },
  {
    id: '7',
    name: 'Portable Power Bank 20000mAh',
    description: 'High capacity power bank with fast charging. Features dual USB-A and USB-C ports.',
    price: 6500,
    taxIncluded: true,
    stock: 8,
    category: 'Electronics',
    images: [],
    sku: 'PB-20K',
    status: 'active',
    variants: [],
    inventory: {
      stock: 8,
      lowStockThreshold: 5,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a15', action: 'created', description: 'Product created', timestamp: '2024-01-07T09:00:00Z', user: 'Admin' },
      { id: 'a16', action: 'published', description: 'Product published to store', timestamp: '2024-01-07T09:30:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-07T09:00:00Z',
    updatedAt: '2024-01-07T09:30:00Z',
  },
  {
    id: '8',
    name: 'Premium Cotton T-Shirt',
    description: 'High-quality cotton t-shirt with comfortable fit. Available in multiple sizes and colors.',
    price: 15000,
    compareAtPrice: 18000,
    taxIncluded: true,
    stock: 0,
    category: 'Clothing',
    images: [],
    sku: 'TS-PREM',
    status: 'draft',
    variants: [
      {
        id: 'v6',
        name: 'Size',
        type: 'size',
        options: [
          { id: 'v6o1', value: 'S', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-S' },
          { id: 'v6o2', value: 'M', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-M' },
          { id: 'v6o3', value: 'L', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-L' },
          { id: 'v6o4', value: 'XL', priceModifier: 500, stockQuantity: 0, sku: 'TS-PREM-XL' },
        ],
      },
      {
        id: 'v7',
        name: 'Color',
        type: 'color',
        options: [
          { id: 'v7o1', value: 'White', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-WHT' },
          { id: 'v7o2', value: 'Black', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-BLK' },
          { id: 'v7o3', value: 'Navy', priceModifier: 0, stockQuantity: 0, sku: 'TS-PREM-NVY' },
        ],
      },
    ],
    inventory: {
      stock: 0,
      lowStockThreshold: 20,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a17', action: 'created', description: 'Product created', timestamp: '2024-01-12T14:00:00Z', user: 'Admin' },
    ],
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-12T14:00:00Z',
  },
  {
    id: '9',
    name: 'Vintage Leather Wallet',
    description: 'Handcrafted leather wallet with RFID blocking. Features multiple card slots and bill compartment.',
    price: 25000,
    taxIncluded: true,
    stock: 15,
    category: 'Accessories',
    images: [],
    sku: 'WLT-VNT',
    status: 'archived',
    variants: [
      {
        id: 'v8',
        name: 'Color',
        type: 'color',
        options: [
          { id: 'v8o1', value: 'Brown', priceModifier: 0, stockQuantity: 10, sku: 'WLT-VNT-BRN' },
          { id: 'v8o2', value: 'Black', priceModifier: 0, stockQuantity: 5, sku: 'WLT-VNT-BLK' },
        ],
      },
    ],
    inventory: {
      stock: 15,
      lowStockThreshold: 5,
      trackInventory: true,
    },
    activityLog: [
      { id: 'a18', action: 'created', description: 'Product created', timestamp: '2023-11-01T10:00:00Z', user: 'Admin' },
      { id: 'a19', action: 'published', description: 'Product published to store', timestamp: '2023-11-01T11:00:00Z', user: 'Admin' },
      { id: 'a20', action: 'archived', description: 'Product archived - discontinued', timestamp: '2024-01-10T16:00:00Z', user: 'Admin' },
    ],
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2024-01-10T16:00:00Z',
  },
];

// Product data accessor functions
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

export const getProductsByStatus = (status: Product['status']): Product[] => {
  return mockProducts.filter(p => p.status === status);
};

export const getLowStockProducts = (threshold?: number): Product[] => {
  return mockProducts.filter(p => {
    const limit = threshold ?? p.inventory.lowStockThreshold;
    return p.stock <= limit && p.status !== 'archived';
  });
};

export const getOutOfStockProducts = (): Product[] => {
  return mockProducts.filter(p => p.stock === 0 && p.status !== 'archived');
};

// Order data accessor functions
export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(o => o.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return mockOrders.filter(o => o.status === status);
};

export const getOrdersByPaymentStatus = (paymentStatus: PaymentStatus): Order[] => {
  return mockOrders.filter(o => o.paymentStatus === paymentStatus);
};

// Mock Store Info
export const mockStoreInfo: StoreInfo = {
  id: 'store-001',
  name: 'TechHub Electronics',
  description: 'Your one-stop shop for quality electronics and accessories in Dar es Salaam. We offer the latest gadgets, phone accessories, and computer peripherals at competitive prices.',
  category: 'Electronics & Gadgets',
  status: 'active',
  address: {
    region: 'Dar es Salaam',
    district: 'Kinondoni',
    street: 'Masaki Business Park, Plot 123',
    fullAddress: 'Masaki Business Park, Kinondoni, Dar es Salaam, Tanzania',
  },
  phone: '+255 712 345 678',
  email: 'info@techhub.co.tz',
  currency: 'TZS',
  businessHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
  theme: {
    mode: 'light',
    accentColor: 'blue',
  },
  policies: {
    returns: 'Items can be returned within 7 days of purchase in original packaging. Refunds are processed within 3-5 business days after inspection. Electronics must be unopened for full refund.',
    shipping: 'We deliver across Tanzania. Dar es Salaam: 1-2 business days. Other regions: 3-7 business days. Free shipping on orders above TZS 100,000.',
    terms: 'By purchasing from TechHub Electronics, you agree to our terms of service. All products come with manufacturer warranty. We reserve the right to refuse service to anyone.',
  },
  businessDetails: {
    registeredName: 'TechHub Electronics Tanzania Limited',
    tin: 'TIN-123-456-789',
    registrationNumber: 'BRELA-2021-00456',
    registeredAddress: 'P.O. Box 12345, Dar es Salaam, Tanzania',
    registrationDate: '2021-03-15',
    businessType: 'Limited Liability Company',
  },
  createdAt: '2021-03-15T10:00:00Z',
  updatedAt: '2024-01-10T14:30:00Z',
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
export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'processing':
      return 'warning';
    case 'shipped':
      return 'default';
    case 'delivered':
      return 'success';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    case 'refunded':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export const getPaymentStatusColor = (status: PaymentStatus): string => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'unpaid':
      return 'warning';
    default:
      return 'secondary';
  }
};

export const getProductStatusColor = (status: Product['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'draft':
      return 'warning';
    case 'archived':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export const getProductStatusLabel = (status: Product['status']) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'draft':
      return 'Draft';
    case 'archived':
      return 'Archived';
    default:
      return status;
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

export const formatDateTime = (dateString: string) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
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
  
  const lowStockProducts = mockProducts.filter(product => 
    product.stock <= product.inventory.lowStockThreshold && product.status !== 'archived'
  ).length;
  
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
