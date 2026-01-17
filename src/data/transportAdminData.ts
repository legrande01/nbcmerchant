// Transport Admin Mock Data

export interface AdminDelivery {
  id: string;
  orderId: string;
  merchant: string;
  driver: string | null;
  vehicle: string | null;
  status: 'assigned' | 'awaiting_pickup' | 'in_transit' | 'awaiting_confirmation' | 'delivered' | 'dispute';
  pickupLocation: string;
  dropOffLocation: string;
  assignedTime: string;
  customerName: string;
  customerPhone: string;
  merchantPhone: string;
  timeline: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
  proofImages?: {
    pickupGoods?: string[];
    driverSelfie?: string;
    driverId?: string;
    deliveryProof?: string[];
  };
  disputeDetails?: {
    reason: string;
    reportedBy: string;
    reportedAt: string;
    status: 'under_review' | 'resolved';
  };
}

export interface AdminDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  assignedVehicle: string | null;
  activeDeliveries: number;
  availability: 'online' | 'offline';
  documents: {
    idFront?: string;
    idBack?: string;
    selfie?: string;
    license?: string;
  };
  deliveryHistory: {
    id: string;
    date: string;
    status: string;
    earnings: number;
  }[];
  activityLog: {
    action: string;
    timestamp: string;
    details: string;
  }[];
  joinedDate: string;
  rating: number;
  totalDeliveries: number;
}

export interface AdminVehicle {
  id: string;
  plateNumber: string;
  type: 'bike' | 'car' | 'van' | 'truck';
  loadCapacity: string;
  status: 'active' | 'inactive';
  assignedDriver: string | null;
  assignedDriverId: string | null;
  operatingZone: string;
  activeDeliveries: number;
  lastMaintenance?: string;
  insuranceExpiry?: string;
}

export interface AdminNotification {
  id: string;
  type: 'delivery_assigned' | 'driver_issue' | 'dispute' | 'delivery_completed';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTo?: string;
  linkId?: string;
}

export interface AdminSupportTicket {
  id: string;
  subject: string;
  category: 'driver_issue' | 'delivery_dispute' | 'reassignment' | 'compliance' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'admin' | 'support';
    message: string;
    timestamp: string;
  }[];
}

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: 'driver' | 'delivery' | 'reassignment' | 'compliance';
}

export interface CompanyProfile {
  id: string;
  name: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  operatingZones: string[];
  fleetSize: number;
  activeDrivers: number;
  joinedDate: string;
}

// Mock Data

export const mockAdminDeliveries: AdminDelivery[] = [
  {
    id: 'DEL-001',
    orderId: 'ORD-2024-0891',
    merchant: 'TechGadgets Kenya',
    driver: 'John Kamau',
    vehicle: 'KDA 123B',
    status: 'in_transit',
    pickupLocation: 'Westlands, Nairobi',
    dropOffLocation: 'Kilimani, Nairobi',
    assignedTime: '2024-01-15T08:30:00Z',
    customerName: 'Mary Wanjiku',
    customerPhone: '+254 712 345 678',
    merchantPhone: '+254 720 111 222',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T08:00:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-15T08:30:00Z', note: 'John Kamau assigned' },
      { status: 'Pickup Confirmed', timestamp: '2024-01-15T09:15:00Z' },
      { status: 'In Transit', timestamp: '2024-01-15T09:20:00Z' },
    ],
    proofImages: {
      pickupGoods: ['/placeholder.svg'],
      driverSelfie: '/placeholder.svg',
      driverId: '/placeholder.svg',
    },
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-2024-0892',
    merchant: 'Fashion Hub',
    driver: 'Peter Mwangi',
    vehicle: 'KDB 456C',
    status: 'awaiting_pickup',
    pickupLocation: 'CBD, Nairobi',
    dropOffLocation: 'South B, Nairobi',
    assignedTime: '2024-01-15T09:00:00Z',
    customerName: 'James Ochieng',
    customerPhone: '+254 733 456 789',
    merchantPhone: '+254 720 333 444',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T08:45:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-15T09:00:00Z' },
    ],
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-2024-0893',
    merchant: 'Electronics Plus',
    driver: 'Samuel Otieno',
    vehicle: 'KDC 789D',
    status: 'dispute',
    pickupLocation: 'Parklands, Nairobi',
    dropOffLocation: 'Lavington, Nairobi',
    assignedTime: '2024-01-14T14:00:00Z',
    customerName: 'Grace Njeri',
    customerPhone: '+254 722 567 890',
    merchantPhone: '+254 720 555 666',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-14T13:30:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-14T14:00:00Z' },
      { status: 'Pickup Confirmed', timestamp: '2024-01-14T14:45:00Z' },
      { status: 'In Transit', timestamp: '2024-01-14T14:50:00Z' },
      { status: 'Dispute Raised', timestamp: '2024-01-14T16:00:00Z', note: 'Item reported damaged' },
    ],
    proofImages: {
      pickupGoods: ['/placeholder.svg', '/placeholder.svg'],
      driverSelfie: '/placeholder.svg',
      driverId: '/placeholder.svg',
      deliveryProof: ['/placeholder.svg'],
    },
    disputeDetails: {
      reason: 'Item arrived damaged - screen cracked',
      reportedBy: 'Customer',
      reportedAt: '2024-01-14T16:00:00Z',
      status: 'under_review',
    },
  },
  {
    id: 'DEL-004',
    orderId: 'ORD-2024-0894',
    merchant: 'Home Essentials',
    driver: 'David Kipchoge',
    vehicle: 'KDD 012E',
    status: 'delivered',
    pickupLocation: 'Industrial Area, Nairobi',
    dropOffLocation: 'Eastleigh, Nairobi',
    assignedTime: '2024-01-14T10:00:00Z',
    customerName: 'Fatima Hassan',
    customerPhone: '+254 711 678 901',
    merchantPhone: '+254 720 777 888',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-14T09:30:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-14T10:00:00Z' },
      { status: 'Pickup Confirmed', timestamp: '2024-01-14T10:45:00Z' },
      { status: 'In Transit', timestamp: '2024-01-14T10:50:00Z' },
      { status: 'Delivered', timestamp: '2024-01-14T11:30:00Z' },
    ],
    proofImages: {
      pickupGoods: ['/placeholder.svg'],
      driverSelfie: '/placeholder.svg',
      driverId: '/placeholder.svg',
      deliveryProof: ['/placeholder.svg', '/placeholder.svg'],
    },
  },
  {
    id: 'DEL-005',
    orderId: 'ORD-2024-0895',
    merchant: 'Book World',
    driver: null,
    vehicle: null,
    status: 'assigned',
    pickupLocation: 'Ngong Road, Nairobi',
    dropOffLocation: 'Karen, Nairobi',
    assignedTime: '2024-01-15T10:30:00Z',
    customerName: 'Alice Muthoni',
    customerPhone: '+254 700 789 012',
    merchantPhone: '+254 720 999 000',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T10:00:00Z' },
      { status: 'Awaiting Driver Assignment', timestamp: '2024-01-15T10:30:00Z' },
    ],
  },
];

export const mockAdminDrivers: AdminDriver[] = [
  {
    id: 'DRV-001',
    name: 'John Kamau',
    phone: '+254 712 111 111',
    email: 'john.kamau@email.com',
    status: 'active',
    assignedVehicle: 'KDA 123B',
    activeDeliveries: 1,
    availability: 'online',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
      license: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-001', date: '2024-01-15', status: 'in_transit', earnings: 500 },
      { id: 'DEL-010', date: '2024-01-14', status: 'delivered', earnings: 350 },
      { id: 'DEL-015', date: '2024-01-13', status: 'delivered', earnings: 420 },
    ],
    activityLog: [
      { action: 'Went Online', timestamp: '2024-01-15T07:00:00Z', details: 'Started shift' },
      { action: 'Delivery Accepted', timestamp: '2024-01-15T08:30:00Z', details: 'DEL-001 accepted' },
      { action: 'Pickup Confirmed', timestamp: '2024-01-15T09:15:00Z', details: 'DEL-001 picked up' },
    ],
    joinedDate: '2023-06-15',
    rating: 4.8,
    totalDeliveries: 342,
  },
  {
    id: 'DRV-002',
    name: 'Peter Mwangi',
    phone: '+254 712 222 222',
    email: 'peter.mwangi@email.com',
    status: 'active',
    assignedVehicle: 'KDB 456C',
    activeDeliveries: 1,
    availability: 'online',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
      license: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-002', date: '2024-01-15', status: 'awaiting_pickup', earnings: 0 },
      { id: 'DEL-012', date: '2024-01-14', status: 'delivered', earnings: 280 },
    ],
    activityLog: [
      { action: 'Went Online', timestamp: '2024-01-15T08:00:00Z', details: 'Started shift' },
      { action: 'Delivery Accepted', timestamp: '2024-01-15T09:00:00Z', details: 'DEL-002 accepted' },
    ],
    joinedDate: '2023-09-20',
    rating: 4.6,
    totalDeliveries: 189,
  },
  {
    id: 'DRV-003',
    name: 'Samuel Otieno',
    phone: '+254 712 333 333',
    email: 'samuel.otieno@email.com',
    status: 'suspended',
    assignedVehicle: 'KDC 789D',
    activeDeliveries: 0,
    availability: 'offline',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-003', date: '2024-01-14', status: 'dispute', earnings: 0 },
      { id: 'DEL-020', date: '2024-01-13', status: 'delivered', earnings: 400 },
    ],
    activityLog: [
      { action: 'Account Suspended', timestamp: '2024-01-14T18:00:00Z', details: 'Dispute investigation pending' },
      { action: 'Dispute Reported', timestamp: '2024-01-14T16:00:00Z', details: 'DEL-003 disputed' },
    ],
    joinedDate: '2023-04-10',
    rating: 4.2,
    totalDeliveries: 456,
  },
  {
    id: 'DRV-004',
    name: 'David Kipchoge',
    phone: '+254 712 444 444',
    email: 'david.kipchoge@email.com',
    status: 'active',
    assignedVehicle: 'KDD 012E',
    activeDeliveries: 0,
    availability: 'offline',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
      license: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-004', date: '2024-01-14', status: 'delivered', earnings: 380 },
      { id: 'DEL-025', date: '2024-01-13', status: 'delivered', earnings: 290 },
    ],
    activityLog: [
      { action: 'Went Offline', timestamp: '2024-01-14T18:00:00Z', details: 'Ended shift' },
      { action: 'Delivery Completed', timestamp: '2024-01-14T11:30:00Z', details: 'DEL-004 delivered' },
    ],
    joinedDate: '2023-08-05',
    rating: 4.9,
    totalDeliveries: 278,
  },
  {
    id: 'DRV-005',
    name: 'Grace Akinyi',
    phone: '+254 712 555 555',
    email: 'grace.akinyi@email.com',
    status: 'pending',
    assignedVehicle: null,
    activeDeliveries: 0,
    availability: 'offline',
    documents: {
      idFront: '/placeholder.svg',
      selfie: '/placeholder.svg',
    },
    deliveryHistory: [],
    activityLog: [
      { action: 'Application Submitted', timestamp: '2024-01-14T12:00:00Z', details: 'New driver application' },
    ],
    joinedDate: '2024-01-14',
    rating: 0,
    totalDeliveries: 0,
  },
];

export const mockAdminVehicles: AdminVehicle[] = [
  {
    id: 'VEH-001',
    plateNumber: 'KDA 123B',
    type: 'bike',
    loadCapacity: '20 kg',
    status: 'active',
    assignedDriver: 'John Kamau',
    assignedDriverId: 'DRV-001',
    operatingZone: 'Nairobi CBD, Westlands, Kilimani',
    activeDeliveries: 1,
    lastMaintenance: '2024-01-01',
    insuranceExpiry: '2024-12-31',
  },
  {
    id: 'VEH-002',
    plateNumber: 'KDB 456C',
    type: 'bike',
    loadCapacity: '20 kg',
    status: 'active',
    assignedDriver: 'Peter Mwangi',
    assignedDriverId: 'DRV-002',
    operatingZone: 'Nairobi CBD, South B, South C',
    activeDeliveries: 1,
    lastMaintenance: '2023-12-15',
    insuranceExpiry: '2024-11-30',
  },
  {
    id: 'VEH-003',
    plateNumber: 'KDC 789D',
    type: 'car',
    loadCapacity: '100 kg',
    status: 'active',
    assignedDriver: 'Samuel Otieno',
    assignedDriverId: 'DRV-003',
    operatingZone: 'Parklands, Lavington, Karen',
    activeDeliveries: 0,
    lastMaintenance: '2023-11-20',
    insuranceExpiry: '2024-10-15',
  },
  {
    id: 'VEH-004',
    plateNumber: 'KDD 012E',
    type: 'van',
    loadCapacity: '500 kg',
    status: 'active',
    assignedDriver: 'David Kipchoge',
    assignedDriverId: 'DRV-004',
    operatingZone: 'Industrial Area, Eastleigh, Ngara',
    activeDeliveries: 0,
    lastMaintenance: '2024-01-10',
    insuranceExpiry: '2024-12-01',
  },
  {
    id: 'VEH-005',
    plateNumber: 'KDE 345F',
    type: 'truck',
    loadCapacity: '2000 kg',
    status: 'inactive',
    assignedDriver: null,
    assignedDriverId: null,
    operatingZone: 'Nairobi Metropolitan',
    activeDeliveries: 0,
    lastMaintenance: '2023-10-05',
    insuranceExpiry: '2024-09-30',
  },
];

export const mockAdminNotifications: AdminNotification[] = [
  {
    id: 'NOTIF-001',
    type: 'delivery_assigned',
    title: 'New Delivery Assigned',
    message: 'DEL-001 has been assigned to John Kamau',
    timestamp: '2024-01-15T08:30:00Z',
    read: false,
    linkTo: 'delivery',
    linkId: 'DEL-001',
  },
  {
    id: 'NOTIF-002',
    type: 'dispute',
    title: 'Dispute Raised',
    message: 'Customer reported damaged item for DEL-003',
    timestamp: '2024-01-14T16:00:00Z',
    read: false,
    linkTo: 'delivery',
    linkId: 'DEL-003',
  },
  {
    id: 'NOTIF-003',
    type: 'driver_issue',
    title: 'Driver Suspended',
    message: 'Samuel Otieno has been suspended pending investigation',
    timestamp: '2024-01-14T18:00:00Z',
    read: true,
    linkTo: 'driver',
    linkId: 'DRV-003',
  },
  {
    id: 'NOTIF-004',
    type: 'delivery_completed',
    title: 'Delivery Completed',
    message: 'DEL-004 was successfully delivered',
    timestamp: '2024-01-14T11:30:00Z',
    read: true,
    linkTo: 'delivery',
    linkId: 'DEL-004',
  },
];

export const mockAdminSupportTickets: AdminSupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Driver reassignment request',
    category: 'reassignment',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T07:00:00Z',
    updatedAt: '2024-01-15T07:00:00Z',
    messages: [
      {
        id: 'MSG-001',
        sender: 'admin',
        message: 'Need to reassign delivery DEL-005 to a different driver. Current assigned driver is unavailable.',
        timestamp: '2024-01-15T07:00:00Z',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Dispute resolution for DEL-003',
    category: 'delivery_dispute',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-14T16:30:00Z',
    updatedAt: '2024-01-14T18:00:00Z',
    messages: [
      {
        id: 'MSG-002',
        sender: 'admin',
        message: 'Customer claims item was damaged during delivery. Driver denies responsibility.',
        timestamp: '2024-01-14T16:30:00Z',
      },
      {
        id: 'MSG-003',
        sender: 'support',
        message: 'We are reviewing the delivery proof images. Will update shortly.',
        timestamp: '2024-01-14T18:00:00Z',
      },
    ],
  },
];

export const mockAdminFAQs: AdminFAQ[] = [
  {
    id: 'FAQ-001',
    question: 'How do I reassign a delivery to a different driver?',
    answer: 'You can reassign a delivery only before pickup has been confirmed. Go to Delivery Management, select the delivery, and click "Reassign Driver" in the delivery details view.',
    category: 'reassignment',
  },
  {
    id: 'FAQ-002',
    question: 'What happens when a dispute is raised?',
    answer: 'When a dispute is raised, the delivery is marked with a "Dispute" badge and marked as "Under NBC Review". The NBC team will investigate and resolve the dispute. You can view dispute details in the delivery detail view.',
    category: 'delivery',
  },
  {
    id: 'FAQ-003',
    question: 'How do I suspend a driver?',
    answer: 'Go to the Drivers module, select the driver, and click "Suspend Driver" in their profile. You will need to provide a reason for the suspension.',
    category: 'driver',
  },
  {
    id: 'FAQ-004',
    question: 'How do I add a new vehicle to the fleet?',
    answer: 'Go to the Fleet module and click "Add Vehicle". Fill in the vehicle details including plate number, type, load capacity, and operating zone.',
    category: 'compliance',
  },
  {
    id: 'FAQ-005',
    question: 'Can I approve or reject delivery proofs?',
    answer: 'No, Transport Company Admins cannot approve or reject delivery proofs. This is handled by NBC and the merchant/customer directly.',
    category: 'delivery',
  },
];

export const mockCompanyProfile: CompanyProfile = {
  id: 'COMP-001',
  name: 'Swift Logistics Kenya',
  registrationNumber: 'KE-2023-SLK-001',
  address: '123 Industrial Area, Nairobi, Kenya',
  phone: '+254 20 123 4567',
  email: 'info@swiftlogistics.co.ke',
  contactPerson: 'Michael Omondi',
  operatingZones: ['Nairobi Metropolitan', 'Kiambu County', 'Machakos County'],
  fleetSize: 5,
  activeDrivers: 4,
  joinedDate: '2023-01-15',
};
