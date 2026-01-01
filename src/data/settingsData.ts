export interface ProfileData {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  businessName: string;
  tin: string;
  registeredAddress: string;
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActivity: string;
  isCurrent: boolean;
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  lowStockAlerts: boolean;
  payoutNotifications: boolean;
  marketingApprovals: boolean;
  systemAnnouncements: boolean;
}

export interface StorePreferencesData {
  defaultProcessingTime: string;
  currency: string;
  timezone: string;
  dateFormat: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdate: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const profileData: ProfileData = {
  avatar: '',
  fullName: 'James Mwangi',
  email: 'james@techhub.co.ke',
  phone: '+255 712 345 678',
  role: 'Merchant',
  businessName: 'TechHub Electronics Ltd',
  tin: 'TZ-123456789',
  registeredAddress: 'Plot 45, Samora Avenue, Dar es Salaam, Tanzania'
};

export const securitySessions: Session[] = [
  {
    id: 'sess-1',
    device: 'Windows PC',
    browser: 'Chrome 120',
    location: 'Dar es Salaam, TZ',
    lastActivity: '2024-01-15T10:30:00',
    isCurrent: true
  },
  {
    id: 'sess-2',
    device: 'iPhone 14',
    browser: 'Safari Mobile',
    location: 'Arusha, TZ',
    lastActivity: '2024-01-14T18:45:00',
    isCurrent: false
  },
  {
    id: 'sess-3',
    device: 'MacBook Pro',
    browser: 'Firefox 121',
    location: 'Mwanza, TZ',
    lastActivity: '2024-01-12T09:15:00',
    isCurrent: false
  }
];

export const notificationPreferences: NotificationPreferences = {
  orderUpdates: true,
  lowStockAlerts: true,
  payoutNotifications: true,
  marketingApprovals: false,
  systemAnnouncements: true
};

export const storePreferences: StorePreferencesData = {
  defaultProcessingTime: '24',
  currency: 'TZS',
  timezone: 'Africa/Dar_es_Salaam',
  dateFormat: 'DD/MM/YYYY'
};

export const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Issue with payout processing',
    status: 'Resolved',
    createdAt: '2024-01-10T09:00:00',
    lastUpdate: '2024-01-12T14:30:00'
  },
  {
    id: 'TKT-002',
    subject: 'Product listing not appearing',
    status: 'In Progress',
    createdAt: '2024-01-14T11:20:00',
    lastUpdate: '2024-01-15T08:45:00'
  },
  {
    id: 'TKT-003',
    subject: 'Request for bulk upload feature',
    status: 'Open',
    createdAt: '2024-01-15T10:00:00',
    lastUpdate: '2024-01-15T10:00:00'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I add new products to my store?',
    answer: 'Navigate to Products > Add New Product. Fill in the product details including name, description, price, and images. Click Save to publish your product to the marketplace.'
  },
  {
    id: 'faq-2',
    question: 'When will I receive my payouts?',
    answer: 'Payouts are processed based on your selected payout interval (Weekly, Monthly, or Quarterly). Once processed, funds typically arrive within 2-3 business days depending on your bank.'
  },
  {
    id: 'faq-3',
    question: 'How do I create a promotion or discount?',
    answer: 'Go to Marketing > Merchant Promotions and click "Create Promotion". Choose your discount type, select applicable products, set duration and limits, then activate your promotion.'
  },
  {
    id: 'faq-4',
    question: 'What fees does NBC Sokoni charge?',
    answer: 'NBC Sokoni charges a commission rate on each sale. You can view your current fee structure in Finance > Fees & Compliance. Platform fees are deducted automatically from payouts.'
  },
  {
    id: 'faq-5',
    question: 'How can I update my business details?',
    answer: 'Verified business details like Business Name, TIN, and Registered Address cannot be edited directly. Please contact support with official documentation to request changes.'
  },
  {
    id: 'faq-6',
    question: 'How do I handle order refunds?',
    answer: 'Refunds are managed by NBC Sokoni platform administrators. If a customer requests a refund, it will appear in your Orders section. You will be notified of the outcome.'
  }
];

export const processingTimeOptions = [
  { value: '12', label: '12 hours' },
  { value: '24', label: '24 hours (1 day)' },
  { value: '48', label: '48 hours (2 days)' },
  { value: '72', label: '72 hours (3 days)' },
  { value: '120', label: '5 days' }
];

export const timezoneOptions = [
  { value: 'Africa/Dar_es_Salaam', label: 'East Africa Time (EAT)' },
  { value: 'Africa/Nairobi', label: 'Nairobi (EAT)' },
  { value: 'Africa/Kampala', label: 'Kampala (EAT)' },
  { value: 'UTC', label: 'UTC' }
];

export const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (15/01/2024)' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (01/15/2024)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-01-15)' }
];
