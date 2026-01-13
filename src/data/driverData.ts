// Mock data for Driver role in NBC Sokoni Platform

export type DriverDeliveryStatus = 
  | 'awaiting_pickup' 
  | 'in_transit' 
  | 'awaiting_buyer_confirmation' 
  | 'delivered' 
  | 'dispute';

export type ProofStatus = 'pending' | 'approved' | 'rejected';

export interface DeliveryRoute {
  pickupAddress: string;
  pickupCoords: { lat: number; lng: number };
  dropoffAddress: string;
  dropoffCoords: { lat: number; lng: number };
  distance: string;
  estimatedTime: string;
}

export interface DeliveryProof {
  pickupCode?: string;
  goodsPhoto?: string;
  idPhoto?: string;
  selfie?: string;
  deliveryPhoto?: string;
  pickupVerified: boolean;
  deliveryVerified: boolean;
  proofStatus: ProofStatus;
  rejectionReason?: string;
}

export interface DriverDelivery {
  id: string;
  orderId: string;
  orderNumber: string;
  merchantName: string;
  merchantPhone: string;
  customerName: string;
  customerPhone: string;
  route: DeliveryRoute;
  status: DriverDeliveryStatus;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  estimatedPayout: number;
  proof: DeliveryProof;
  items: string[];
}

export interface DriverAlert {
  id: string;
  type: 'new_assignment' | 'buyer_confirmed' | 'proof_rejected' | 'dispute' | 'payout';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  deliveryId?: string;
}

export interface DriverStats {
  activeDeliveries: number;
  pendingPickups: number;
  awaitingConfirmation: number;
  todaysEarnings: number;
  totalDeliveries: number;
  rating: number;
}

export interface DriverProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehiclePlate: string;
  isOnline: boolean;
  currentLocation: { lat: number; lng: number };
}

// Mock Driver Profile
export const mockDriverProfile: DriverProfile = {
  id: 'driver-1',
  name: 'James Kioko',
  phone: '+255 712 345 678',
  email: 'james.kioko@email.com',
  vehicleType: 'Motorcycle',
  vehiclePlate: 'T 123 ABC',
  isOnline: true,
  currentLocation: { lat: -6.8, lng: 39.28 },
};

// Mock Driver Stats
export const mockDriverStats: DriverStats = {
  activeDeliveries: 3,
  pendingPickups: 2,
  awaitingConfirmation: 1,
  todaysEarnings: 45000,
  totalDeliveries: 156,
  rating: 4.8,
};

// Mock Driver Deliveries
export const mockDriverDeliveries: DriverDelivery[] = [
  {
    id: 'del-1',
    orderId: '1',
    orderNumber: 'NBC-2024-001',
    merchantName: 'TechZone Electronics',
    merchantPhone: '+255 713 111 222',
    customerName: 'John Mwangi',
    customerPhone: '+255 712 345 678',
    route: {
      pickupAddress: 'Kariakoo Market, Stall 45, Dar es Salaam',
      pickupCoords: { lat: -6.82, lng: 39.27 },
      dropoffAddress: 'Plot 45, Masaki Road, Kinondoni, Dar es Salaam',
      dropoffCoords: { lat: -6.75, lng: 39.26 },
      distance: '8.5 km',
      estimatedTime: '25 mins',
    },
    status: 'awaiting_pickup',
    assignedAt: '2024-01-15T10:30:00Z',
    estimatedPayout: 5000,
    proof: {
      pickupVerified: false,
      deliveryVerified: false,
      proofStatus: 'pending',
    },
    items: ['Wireless Bluetooth Headphones', 'Phone Case - Samsung A54 x2'],
  },
  {
    id: 'del-2',
    orderId: '3',
    orderNumber: 'NBC-2024-003',
    merchantName: 'Office Supplies Hub',
    merchantPhone: '+255 714 222 333',
    customerName: 'Peter Ochieng',
    customerPhone: '+255 714 567 890',
    route: {
      pickupAddress: 'Mlimani City Mall, Shop 12, Dar es Salaam',
      pickupCoords: { lat: -6.78, lng: 39.23 },
      dropoffAddress: 'House 78, Oyster Bay, Dar es Salaam',
      dropoffCoords: { lat: -6.73, lng: 39.28 },
      distance: '6.2 km',
      estimatedTime: '18 mins',
    },
    status: 'in_transit',
    assignedAt: '2024-01-15T08:00:00Z',
    pickedUpAt: '2024-01-15T08:30:00Z',
    estimatedPayout: 4500,
    proof: {
      pickupCode: '7834',
      goodsPhoto: 'verified',
      idPhoto: 'verified',
      selfie: 'verified',
      pickupVerified: true,
      deliveryVerified: false,
      proofStatus: 'pending',
    },
    items: ['Laptop Stand Adjustable', 'Wireless Mouse'],
  },
  {
    id: 'del-3',
    orderId: '9',
    orderNumber: 'NBC-2024-009',
    merchantName: 'PowerTech Store',
    merchantPhone: '+255 715 333 444',
    customerName: 'Joseph Mushi',
    customerPhone: '+255 720 123 456',
    route: {
      pickupAddress: 'Posta, Central Post Office Building, Dar es Salaam',
      pickupCoords: { lat: -6.81, lng: 39.29 },
      dropoffAddress: 'Ilala, Buguruni, Street 12, Dar es Salaam',
      dropoffCoords: { lat: -6.84, lng: 39.26 },
      distance: '4.1 km',
      estimatedTime: '12 mins',
    },
    status: 'awaiting_buyer_confirmation',
    assignedAt: '2024-01-15T06:00:00Z',
    pickedUpAt: '2024-01-15T06:30:00Z',
    deliveredAt: '2024-01-15T07:00:00Z',
    estimatedPayout: 3500,
    proof: {
      pickupCode: '2156',
      goodsPhoto: 'verified',
      idPhoto: 'verified',
      selfie: 'verified',
      deliveryPhoto: 'uploaded',
      pickupVerified: true,
      deliveryVerified: false,
      proofStatus: 'pending',
    },
    items: ['Portable Power Bank 20000mAh x2', 'USB-C Charging Cable 2m x4'],
  },
  {
    id: 'del-4',
    orderId: '4',
    orderNumber: 'NBC-2024-004',
    merchantName: 'Fashion Forward',
    merchantPhone: '+255 716 444 555',
    customerName: 'Amina Hassan',
    customerPhone: '+255 715 678 901',
    route: {
      pickupAddress: 'Slipway Shopping Centre, Dar es Salaam',
      pickupCoords: { lat: -6.74, lng: 39.27 },
      dropoffAddress: 'Sinza Mori, Plot 23, Dar es Salaam',
      dropoffCoords: { lat: -6.79, lng: 39.24 },
      distance: '7.8 km',
      estimatedTime: '22 mins',
    },
    status: 'delivered',
    assignedAt: '2024-01-13T09:00:00Z',
    pickedUpAt: '2024-01-13T09:30:00Z',
    deliveredAt: '2024-01-13T10:30:00Z',
    estimatedPayout: 4000,
    proof: {
      pickupCode: '9012',
      goodsPhoto: 'verified',
      idPhoto: 'verified',
      selfie: 'verified',
      deliveryPhoto: 'uploaded',
      pickupVerified: true,
      deliveryVerified: true,
      proofStatus: 'approved',
    },
    items: ['Smart Watch Band x2'],
  },
  {
    id: 'del-5',
    orderId: '8',
    orderNumber: 'NBC-2024-008',
    merchantName: 'TechZone Electronics',
    merchantPhone: '+255 713 111 222',
    customerName: 'Elizabeth Mwakasege',
    customerPhone: '+255 719 012 345',
    route: {
      pickupAddress: 'Kariakoo Market, Stall 45, Dar es Salaam',
      pickupCoords: { lat: -6.82, lng: 39.27 },
      dropoffAddress: 'Kariakoo, Street 45, Dar es Salaam',
      dropoffCoords: { lat: -6.82, lng: 39.28 },
      distance: '1.2 km',
      estimatedTime: '5 mins',
    },
    status: 'dispute',
    assignedAt: '2024-01-08T15:00:00Z',
    pickedUpAt: '2024-01-08T15:30:00Z',
    deliveredAt: '2024-01-09T12:00:00Z',
    estimatedPayout: 2500,
    proof: {
      pickupCode: '5678',
      goodsPhoto: 'verified',
      idPhoto: 'verified',
      selfie: 'verified',
      deliveryPhoto: 'uploaded',
      pickupVerified: true,
      deliveryVerified: false,
      proofStatus: 'rejected',
      rejectionReason: 'Customer claims product was defective upon delivery',
    },
    items: ['Smart Watch Band', 'Wireless Mouse'],
  },
  {
    id: 'del-6',
    orderId: '10',
    orderNumber: 'NBC-2024-010',
    merchantName: 'AudioWorld',
    merchantPhone: '+255 717 555 666',
    customerName: 'Rose Nyerere',
    customerPhone: '+255 721 234 567',
    route: {
      pickupAddress: 'Mikocheni B, Commercial Area, Dar es Salaam',
      pickupCoords: { lat: -6.77, lng: 39.25 },
      dropoffAddress: 'Msasani Peninsula, Villa 8, Dar es Salaam',
      dropoffCoords: { lat: -6.74, lng: 39.27 },
      distance: '4.5 km',
      estimatedTime: '15 mins',
    },
    status: 'awaiting_pickup',
    assignedAt: '2024-01-15T11:00:00Z',
    estimatedPayout: 3500,
    proof: {
      pickupVerified: false,
      deliveryVerified: false,
      proofStatus: 'pending',
    },
    items: ['Wireless Bluetooth Headphones (Blue)'],
  },
];

// Mock Driver Alerts
export const mockDriverAlerts: DriverAlert[] = [
  {
    id: 'alert-1',
    type: 'new_assignment',
    title: 'New Delivery Assigned',
    message: 'You have been assigned order NBC-2024-010. Pickup from Mikocheni B.',
    createdAt: '2024-01-15T11:00:00Z',
    read: false,
    deliveryId: 'del-6',
  },
  {
    id: 'alert-2',
    type: 'buyer_confirmed',
    title: 'Delivery Confirmed',
    message: 'Customer confirmed delivery for order NBC-2024-004. Payment processing.',
    createdAt: '2024-01-13T11:00:00Z',
    read: true,
    deliveryId: 'del-4',
  },
  {
    id: 'alert-3',
    type: 'proof_rejected',
    title: 'Proof Rejected',
    message: 'Delivery proof for NBC-2024-008 was rejected. Order under dispute.',
    createdAt: '2024-01-11T14:00:00Z',
    read: true,
    deliveryId: 'del-5',
  },
  {
    id: 'alert-4',
    type: 'payout',
    title: 'Payout Received',
    message: 'TZS 15,500 has been credited to your account for yesterday\'s deliveries.',
    createdAt: '2024-01-14T08:00:00Z',
    read: true,
  },
  {
    id: 'alert-5',
    type: 'dispute',
    title: 'Dispute Opened',
    message: 'A dispute has been opened for order NBC-2024-008. Resolution in progress.',
    createdAt: '2024-01-10T10:00:00Z',
    read: true,
    deliveryId: 'del-5',
  },
];

// Helper functions
export function getDriverStats(): DriverStats {
  const deliveries = mockDriverDeliveries;
  return {
    activeDeliveries: deliveries.filter(d => 
      ['awaiting_pickup', 'in_transit', 'awaiting_buyer_confirmation'].includes(d.status)
    ).length,
    pendingPickups: deliveries.filter(d => d.status === 'awaiting_pickup').length,
    awaitingConfirmation: deliveries.filter(d => d.status === 'awaiting_buyer_confirmation').length,
    todaysEarnings: mockDriverStats.todaysEarnings,
    totalDeliveries: mockDriverStats.totalDeliveries,
    rating: mockDriverStats.rating,
  };
}

export function getDeliveriesByStatus(status?: DriverDeliveryStatus): DriverDelivery[] {
  if (!status) return mockDriverDeliveries;
  return mockDriverDeliveries.filter(d => d.status === status);
}

export function getDeliveryById(id: string): DriverDelivery | undefined {
  return mockDriverDeliveries.find(d => d.id === id);
}

export function getUnreadAlerts(): DriverAlert[] {
  return mockDriverAlerts.filter(a => !a.read);
}

export const formatCurrency = (amount: number): string => {
  return `TZS ${amount.toLocaleString()}`;
};
