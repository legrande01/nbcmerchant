// Marketing & Promotions Mock Data

export type PromotionType = 'percentage' | 'fixed' | 'buy_x_get_y';
export type PromotionStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'expired';
export type ApplyTo = 'entire_store' | 'selected_products' | 'selected_categories';
export type CampaignStatus = 'requested' | 'approved' | 'rejected';
export type VoucherStatus = 'active' | 'inactive' | 'expired';

export interface PromotionActivity {
  id: string;
  type: 'created' | 'activated' | 'paused' | 'expired' | 'redeemed';
  description: string;
  timestamp: Date;
  promotionId?: string;
}

export interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  discountValue: number;
  buyQuantity?: number;
  getQuantity?: number;
  applyTo: ApplyTo;
  appliedProducts: string[];
  appliedCategories: string[];
  startDate: Date;
  endDate?: Date;
  usagePerCustomer?: number;
  totalRedemptionLimit?: number;
  currentRedemptions: number;
  status: PromotionStatus;
  createdAt: Date;
  revenue: number;
}

export interface PlatformCampaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  eligibleCategories: string[];
  participationStatus: CampaignStatus;
  requestedAt?: Date;
  approvedAt?: Date;
  imageUrl?: string;
}

export interface Voucher {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  discountValue: number;
  minimumSpend?: number;
  expiryDate?: Date;
  usageLimit?: number;
  usagePerCustomer?: number;
  currentUsage: number;
  status: VoucherStatus;
  createdAt: Date;
}

export interface RedemptionDataPoint {
  date: string;
  redemptions: number;
  revenue: number;
}

export interface MarketingStats {
  activePromotions: number;
  upcomingCampaigns: number;
  expiredPromotions: number;
  totalDiscountedRevenue: number;
}

// Mock Promotions
export const mockPromotions: Promotion[] = [
  {
    id: 'promo-001',
    name: 'Summer Sale 20% Off',
    type: 'percentage',
    discountValue: 20,
    applyTo: 'entire_store',
    appliedProducts: [],
    appliedCategories: [],
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    usagePerCustomer: 2,
    totalRedemptionLimit: 500,
    currentRedemptions: 234,
    status: 'active',
    createdAt: new Date('2024-01-10'),
    revenue: 4850000,
  },
  {
    id: 'promo-002',
    name: 'Electronics Flash Sale',
    type: 'fixed',
    discountValue: 10000,
    applyTo: 'selected_categories',
    appliedProducts: [],
    appliedCategories: ['Electronics'],
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-01-25'),
    totalRedemptionLimit: 100,
    currentRedemptions: 45,
    status: 'active',
    createdAt: new Date('2024-01-18'),
    revenue: 1250000,
  },
  {
    id: 'promo-003',
    name: 'Buy 2 Get 1 Free - Clothing',
    type: 'buy_x_get_y',
    discountValue: 0,
    buyQuantity: 2,
    getQuantity: 1,
    applyTo: 'selected_categories',
    appliedProducts: [],
    appliedCategories: ['Clothing', 'Fashion'],
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-28'),
    currentRedemptions: 0,
    status: 'scheduled',
    createdAt: new Date('2024-01-25'),
    revenue: 0,
  },
  {
    id: 'promo-004',
    name: 'New Year Clearance',
    type: 'percentage',
    discountValue: 30,
    applyTo: 'selected_products',
    appliedProducts: ['prod-001', 'prod-003', 'prod-005'],
    appliedCategories: [],
    startDate: new Date('2023-12-26'),
    endDate: new Date('2024-01-05'),
    totalRedemptionLimit: 200,
    currentRedemptions: 200,
    status: 'expired',
    createdAt: new Date('2023-12-20'),
    revenue: 3200000,
  },
  {
    id: 'promo-005',
    name: 'Weekend Special',
    type: 'fixed',
    discountValue: 5000,
    applyTo: 'entire_store',
    appliedProducts: [],
    appliedCategories: [],
    startDate: new Date('2024-01-27'),
    endDate: new Date('2024-01-28'),
    usagePerCustomer: 1,
    currentRedemptions: 89,
    status: 'paused',
    createdAt: new Date('2024-01-26'),
    revenue: 890000,
  },
];

// Mock Platform Campaigns
export const mockCampaigns: PlatformCampaign[] = [
  {
    id: 'camp-001',
    name: 'NBC Black Friday 2024',
    description: 'Join the biggest shopping event of the year! NBC covers additional marketing and promotion costs.',
    startDate: new Date('2024-11-29'),
    endDate: new Date('2024-12-02'),
    discountType: 'percentage',
    discountValue: 25,
    eligibleCategories: ['Electronics', 'Fashion', 'Home & Living'],
    participationStatus: 'approved',
    requestedAt: new Date('2024-10-15'),
    approvedAt: new Date('2024-10-20'),
  },
  {
    id: 'camp-002',
    name: 'Holiday Season Sale',
    description: 'End-of-year celebration with special discounts across all categories. Featured placement on NBC homepage.',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2024-12-31'),
    discountType: 'percentage',
    discountValue: 15,
    eligibleCategories: ['All Categories'],
    participationStatus: 'requested',
    requestedAt: new Date('2024-11-01'),
  },
  {
    id: 'camp-003',
    name: 'NBC Sponsored: Electronics Week',
    description: 'A week dedicated to electronics with exclusive deals and free shipping on selected items.',
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-02-17'),
    discountType: 'fixed',
    discountValue: 20000,
    eligibleCategories: ['Electronics', 'Phones & Tablets', 'Computers'],
    participationStatus: 'rejected',
    requestedAt: new Date('2024-01-20'),
  },
  {
    id: 'camp-004',
    name: 'Valentine\'s Day Special',
    description: 'Love is in the air! Special promotion for gifts, jewelry, and fashion items.',
    startDate: new Date('2024-02-07'),
    endDate: new Date('2024-02-14'),
    discountType: 'percentage',
    discountValue: 20,
    eligibleCategories: ['Fashion', 'Jewelry', 'Gifts'],
    participationStatus: 'approved',
    requestedAt: new Date('2024-01-25'),
    approvedAt: new Date('2024-01-28'),
  },
];

// Mock Vouchers
export const mockVouchers: Voucher[] = [
  {
    id: 'vouch-001',
    code: 'WELCOME10',
    type: 'percentage',
    discountValue: 10,
    minimumSpend: 50000,
    usagePerCustomer: 1,
    currentUsage: 156,
    status: 'active',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'vouch-002',
    code: 'SAVE5K',
    type: 'fixed',
    discountValue: 5000,
    minimumSpend: 30000,
    usageLimit: 200,
    currentUsage: 89,
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'vouch-003',
    code: 'VIP20OFF',
    type: 'percentage',
    discountValue: 20,
    minimumSpend: 100000,
    usagePerCustomer: 2,
    usageLimit: 50,
    currentUsage: 50,
    status: 'expired',
    expiryDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'vouch-004',
    code: 'FLASH15',
    type: 'percentage',
    discountValue: 15,
    expiryDate: new Date('2024-03-01'),
    usageLimit: 100,
    currentUsage: 23,
    status: 'inactive',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 'vouch-005',
    code: 'BIGSPENDER',
    type: 'fixed',
    discountValue: 25000,
    minimumSpend: 200000,
    usagePerCustomer: 1,
    currentUsage: 12,
    status: 'active',
    createdAt: new Date('2024-01-10'),
  },
];

// Mock Redemption Data (last 30 days)
export const mockRedemptionData: RedemptionDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    redemptions: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 500000) + 100000,
  };
});

// Mock Recent Activity
export const mockPromotionActivity: PromotionActivity[] = [
  {
    id: 'act-001',
    type: 'redeemed',
    description: 'Summer Sale 20% Off was redeemed 15 times',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    promotionId: 'promo-001',
  },
  {
    id: 'act-002',
    type: 'activated',
    description: 'Electronics Flash Sale is now active',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    promotionId: 'promo-002',
  },
  {
    id: 'act-003',
    type: 'created',
    description: 'New promotion "Buy 2 Get 1 Free" created',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    promotionId: 'promo-003',
  },
  {
    id: 'act-004',
    type: 'paused',
    description: 'Weekend Special has been paused',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    promotionId: 'promo-005',
  },
  {
    id: 'act-005',
    type: 'expired',
    description: 'New Year Clearance has expired',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    promotionId: 'promo-004',
  },
];

// Helper Functions
export function getMarketingStats(): MarketingStats {
  const now = new Date();
  return {
    activePromotions: mockPromotions.filter(p => p.status === 'active').length,
    upcomingCampaigns: mockCampaigns.filter(c => new Date(c.startDate) > now).length,
    expiredPromotions: mockPromotions.filter(p => p.status === 'expired').length,
    totalDiscountedRevenue: mockPromotions.reduce((sum, p) => sum + p.revenue, 0),
  };
}

export function getPromotionById(id: string): Promotion | undefined {
  return mockPromotions.find(p => p.id === id);
}

export function getCampaignById(id: string): PlatformCampaign | undefined {
  return mockCampaigns.find(c => c.id === id);
}

export function getVoucherById(id: string): Voucher | undefined {
  return mockVouchers.find(v => v.id === id);
}

export function formatCurrency(amount: number): string {
  return `TZS ${amount.toLocaleString()}`;
}

export function getPromotionStatusColor(status: PromotionStatus): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'expired':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    case 'draft':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getCampaignStatusColor(status: CampaignStatus): string {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'requested':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getVoucherStatusColor(status: VoucherStatus): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'expired':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getPromotionTypeLabel(type: PromotionType): string {
  switch (type) {
    case 'percentage':
      return 'Percentage Discount';
    case 'fixed':
      return 'Fixed Amount';
    case 'buy_x_get_y':
      return 'Buy X Get Y';
    default:
      return type;
  }
}

export function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
