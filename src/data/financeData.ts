// Finance Mock Data for NBC Merchant Portal

export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed';
export type PayoutDestinationType = 'bank' | 'mobile';
export type TransactionType = 'credit' | 'debit';
export type PayoutInterval = 'weekly' | 'monthly' | 'quarterly';

export interface PayoutDestination {
  type: PayoutDestinationType;
  bankName?: string;
  accountHolder: string;
  accountNumber: string; // Masked: ***1234
  mobileProvider?: string;
  mobileNumber?: string; // Masked: ***456
}

export interface PayoutTimelineEntry {
  id: string;
  status: PayoutStatus;
  timestamp: string;
  note?: string;
}

export interface Payout {
  id: string;
  payoutNumber: string;
  grossAmount: number;
  fees: number;
  netAmount: number;
  status: PayoutStatus;
  destination: PayoutDestination;
  referenceNumber: string;
  requestedAt: string;
  processedAt?: string;
  timeline: PayoutTimelineEntry[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  orderId?: string;
  payoutId?: string;
}

export interface FinancialActivity {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: 'sale' | 'payout' | 'fee' | 'refund' | 'adjustment';
}

export interface EarningsData {
  availableBalance: number;
  upcomingPayout: {
    amount: number;
    scheduledDate: string;
  };
  totalEarningsThisMonth: number;
  platformFeesThisMonth: number;
}

export interface FeesInfo {
  commissionRate: number;
  paymentProcessingFee: number;
  minimumPayout: number;
  taxWithholdingRate: number;
}

export interface FinanceData {
  earnings: EarningsData;
  payouts: Payout[];
  transactions: Transaction[];
  fees: FeesInfo;
  recentActivity: FinancialActivity[];
}

// Payout status labels
export const payoutStatusLabels: Record<PayoutStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  paid: 'Paid',
  failed: 'Failed',
};

// Mock payout destinations (set during onboarding)
export const mockPayoutDestinations: PayoutDestination[] = [
  {
    type: 'bank',
    bankName: 'NBC Bank Tanzania',
    accountHolder: 'Sokoni Electronics Ltd',
    accountNumber: '***4521',
  },
  {
    type: 'mobile',
    accountHolder: 'Sokoni Electronics Ltd',
    accountNumber: '***456',
    mobileProvider: 'M-Pesa',
    mobileNumber: '+255 7** *** 456',
  },
];

// Mock Payouts
export const mockPayouts: Payout[] = [
  {
    id: 'p1',
    payoutNumber: 'PAY-2024-001',
    grossAmount: 450000,
    fees: 13500,
    netAmount: 436500,
    status: 'paid',
    destination: mockPayoutDestinations[0],
    referenceNumber: 'NBC-REF-2024-001-XYZ',
    requestedAt: '2024-01-08T10:00:00Z',
    processedAt: '2024-01-10T14:30:00Z',
    timeline: [
      { id: 't1', status: 'pending', timestamp: '2024-01-08T10:00:00Z', note: 'Payout request submitted' },
      { id: 't2', status: 'processing', timestamp: '2024-01-09T09:00:00Z', note: 'Request approved by NBC' },
      { id: 't3', status: 'paid', timestamp: '2024-01-10T14:30:00Z', note: 'Funds transferred to bank account' },
    ],
  },
  {
    id: 'p2',
    payoutNumber: 'PAY-2024-002',
    grossAmount: 285000,
    fees: 8550,
    netAmount: 276450,
    status: 'paid',
    destination: mockPayoutDestinations[1],
    referenceNumber: 'NBC-REF-2024-002-ABC',
    requestedAt: '2024-01-01T11:00:00Z',
    processedAt: '2024-01-03T10:00:00Z',
    timeline: [
      { id: 't4', status: 'pending', timestamp: '2024-01-01T11:00:00Z', note: 'Payout request submitted' },
      { id: 't5', status: 'processing', timestamp: '2024-01-02T08:00:00Z', note: 'Request under review' },
      { id: 't6', status: 'paid', timestamp: '2024-01-03T10:00:00Z', note: 'Funds sent via M-Pesa' },
    ],
  },
  {
    id: 'p3',
    payoutNumber: 'PAY-2024-003',
    grossAmount: 180000,
    fees: 5400,
    netAmount: 174600,
    status: 'processing',
    destination: mockPayoutDestinations[0],
    referenceNumber: 'NBC-REF-2024-003-DEF',
    requestedAt: '2024-01-14T09:30:00Z',
    timeline: [
      { id: 't7', status: 'pending', timestamp: '2024-01-14T09:30:00Z', note: 'Payout request submitted' },
      { id: 't8', status: 'processing', timestamp: '2024-01-15T08:00:00Z', note: 'Request approved, processing transfer' },
    ],
  },
  {
    id: 'p4',
    payoutNumber: 'PAY-2024-004',
    grossAmount: 95000,
    fees: 2850,
    netAmount: 92150,
    status: 'pending',
    destination: mockPayoutDestinations[0],
    referenceNumber: 'NBC-REF-2024-004-GHI',
    requestedAt: '2024-01-15T11:00:00Z',
    timeline: [
      { id: 't9', status: 'pending', timestamp: '2024-01-15T11:00:00Z', note: 'Payout request submitted, awaiting review' },
    ],
  },
  {
    id: 'p5',
    payoutNumber: 'PAY-2023-089',
    grossAmount: 320000,
    fees: 9600,
    netAmount: 310400,
    status: 'failed',
    destination: mockPayoutDestinations[0],
    referenceNumber: 'NBC-REF-2023-089-JKL',
    requestedAt: '2023-12-20T10:00:00Z',
    timeline: [
      { id: 't10', status: 'pending', timestamp: '2023-12-20T10:00:00Z', note: 'Payout request submitted' },
      { id: 't11', status: 'processing', timestamp: '2023-12-21T09:00:00Z', note: 'Processing transfer' },
      { id: 't12', status: 'failed', timestamp: '2023-12-22T14:00:00Z', note: 'Transfer failed - bank account verification issue. Please contact support.' },
    ],
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  { id: 'tx1', date: '2024-01-15T11:00:00Z', description: 'Order NBC-2024-010 - Wireless Headphones', type: 'credit', amount: 47000, balanceAfter: 892000, orderId: '10' },
  { id: 'tx2', date: '2024-01-15T10:30:00Z', description: 'Order NBC-2024-001 - Multiple Items', type: 'credit', amount: 57000, balanceAfter: 845000, orderId: '1' },
  { id: 'tx3', date: '2024-01-15T09:15:00Z', description: 'Order NBC-2024-002 - USB Cables', type: 'credit', amount: 7000, balanceAfter: 788000, orderId: '2' },
  { id: 'tx4', date: '2024-01-15T08:00:00Z', description: 'Platform Commission (3%)', type: 'debit', amount: 2850, balanceAfter: 781000, orderId: '9' },
  { id: 'tx5', date: '2024-01-14T16:45:00Z', description: 'Order NBC-2024-003 - Laptop Stand & Mouse', type: 'credit', amount: 14500, balanceAfter: 783850, orderId: '3' },
  { id: 'tx6', date: '2024-01-14T09:30:00Z', description: 'Payout PAY-2024-003 - Bank Transfer', type: 'debit', amount: 174600, balanceAfter: 769350, payoutId: 'p3' },
  { id: 'tx7', date: '2024-01-13T11:20:00Z', description: 'Order NBC-2024-004 - Watch Band', type: 'credit', amount: 5600, balanceAfter: 943950, orderId: '4' },
  { id: 'tx8', date: '2024-01-12T09:00:00Z', description: 'Order NBC-2024-007 - Laptop Stands (Cancelled)', type: 'credit', amount: 0, balanceAfter: 938350, orderId: '7' },
  { id: 'tx9', date: '2024-01-11T14:00:00Z', description: 'Refund NBC-2024-008 - Defective Product', type: 'debit', amount: 6800, balanceAfter: 938350 },
  { id: 'tx10', date: '2024-01-10T14:30:00Z', description: 'Order NBC-2024-006 - Headphones & Cables', type: 'credit', amount: 48000, balanceAfter: 945150, orderId: '6' },
  { id: 'tx11', date: '2024-01-10T14:30:00Z', description: 'Payout PAY-2024-001 - Bank Transfer', type: 'debit', amount: 436500, balanceAfter: 897150, payoutId: 'p1' },
  { id: 'tx12', date: '2024-01-08T10:00:00Z', description: 'Order NBC-2024-008 - Watch Band & Mouse', type: 'credit', amount: 6800, balanceAfter: 1333650, orderId: '8' },
  { id: 'tx13', date: '2024-01-05T15:00:00Z', description: 'Monthly Platform Fee', type: 'debit', amount: 25000, balanceAfter: 1326850 },
  { id: 'tx14', date: '2024-01-03T10:00:00Z', description: 'Payout PAY-2024-002 - M-Pesa Transfer', type: 'debit', amount: 276450, balanceAfter: 1351850, payoutId: 'p2' },
  { id: 'tx15', date: '2024-01-01T12:00:00Z', description: 'Opening Balance - January 2024', type: 'credit', amount: 0, balanceAfter: 1628300 },
];

// Mock Recent Activity
export const mockRecentActivity: FinancialActivity[] = [
  { id: 'a1', title: 'Sale Completed', description: 'Order NBC-2024-010 - Wireless Headphones', amount: 47000, type: 'credit', date: '2024-01-15T11:00:00Z', category: 'sale' },
  { id: 'a2', title: 'Payout Requested', description: 'PAY-2024-004 pending review', amount: 92150, type: 'debit', date: '2024-01-15T11:00:00Z', category: 'payout' },
  { id: 'a3', title: 'Sale Completed', description: 'Order NBC-2024-001 - Multiple Items', amount: 57000, type: 'credit', date: '2024-01-15T10:30:00Z', category: 'sale' },
  { id: 'a4', title: 'Platform Fee', description: 'Commission on Order NBC-2024-009', amount: 2850, type: 'debit', date: '2024-01-15T08:00:00Z', category: 'fee' },
  { id: 'a5', title: 'Sale Completed', description: 'Order NBC-2024-002 - USB Cables', amount: 7000, type: 'credit', date: '2024-01-15T09:15:00Z', category: 'sale' },
  { id: 'a6', title: 'Refund Processed', description: 'Order NBC-2024-008 - Defective Product', amount: 6800, type: 'debit', date: '2024-01-11T14:00:00Z', category: 'refund' },
];

// Mock Fees Information
export const mockFeesInfo: FeesInfo = {
  commissionRate: 3,
  paymentProcessingFee: 1.5,
  minimumPayout: 50000,
  taxWithholdingRate: 5,
};

// Aggregated finance data
export const mockFinanceData: FinanceData = {
  earnings: {
    availableBalance: 892000,
    upcomingPayout: {
      amount: 174600,
      scheduledDate: '2024-01-17T10:00:00Z',
    },
    totalEarningsThisMonth: 1250000,
    platformFeesThisMonth: 37500,
  },
  payouts: mockPayouts,
  transactions: mockTransactions,
  fees: mockFeesInfo,
  recentActivity: mockRecentActivity,
};

// Helper functions
export const getPayoutById = (id: string): Payout | undefined => {
  return mockPayouts.find(p => p.id === id);
};

export const getPayoutsByStatus = (status: PayoutStatus): Payout[] => {
  return mockPayouts.filter(p => p.status === status);
};

export const formatTZS = (amount: number): string => {
  return `TZS ${amount.toLocaleString('en-TZ')}`;
};

export const getPayoutStatusColor = (status: PayoutStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

// Generate daily earnings for chart
export const generateEarningsStats = (days: number): { date: string; earnings: number; fees: number }[] => {
  const stats = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    stats.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      earnings: Math.floor(Math.random() * 80000) + 20000,
      fees: Math.floor(Math.random() * 3000) + 600,
    });
  }
  
  return stats;
};
