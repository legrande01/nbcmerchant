// Transport Admin Mock Data - Tanzania Localized

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

export interface VehicleActivityLog {
  id: string;
  action: 'assigned' | 'unassigned' | 'activated' | 'deactivated' | 'created';
  timestamp: string;
  details: string;
  driverName?: string;
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
  activityHistory?: VehicleActivityLog[];
  recentDeliveries?: {
    id: string;
    orderId: string;
    status: string;
    date: string;
    dropOffLocation: string;
  }[];
  currentDelivery?: {
    id: string;
    orderId: string;
    status: string;
    dropOffLocation: string;
  } | null;
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

// Tanzania Location Data
export const tanzaniaRegions = [
  { name: 'Dar es Salaam', districts: ['Ilala', 'Kinondoni', 'Temeke', 'Ubungo', 'Kigamboni'] },
  { name: 'Mwanza', districts: ['Nyamagana', 'Ilemela', 'Sengerema', 'Kwimba', 'Magu'] },
  { name: 'Arusha', districts: ['Arusha City', 'Arusha DC', 'Meru', 'Karatu', 'Monduli'] },
  { name: 'Dodoma', districts: ['Dodoma Urban', 'Chamwino', 'Kondoa', 'Mpwapwa', 'Bahi'] },
  { name: 'Mbeya', districts: ['Mbeya City', 'Mbeya DC', 'Rungwe', 'Kyela', 'Chunya'] },
  { name: 'Morogoro', districts: ['Morogoro Urban', 'Morogoro DC', 'Kilombero', 'Ulanga', 'Mvomero'] },
  { name: 'Tanga', districts: ['Tanga City', 'Korogwe', 'Lushoto', 'Muheza', 'Pangani'] },
  { name: 'Kilimanjaro', districts: ['Moshi Urban', 'Moshi DC', 'Hai', 'Rombo', 'Same'] },
];

// Mock Data - Tanzania Localized

export const mockAdminDeliveries: AdminDelivery[] = [
  {
    id: 'DEL-001',
    orderId: 'ORD-2024-0891',
    merchant: 'TechGadgets Tanzania',
    driver: 'John Mwakasege',
    vehicle: 'T 123 ABC',
    status: 'in_transit',
    pickupLocation: 'Kariakoo, Dar es Salaam',
    dropOffLocation: 'Mikocheni, Dar es Salaam',
    assignedTime: '2024-01-15T08:30:00Z',
    customerName: 'Mary Kiondo',
    customerPhone: '+255 712 345 678',
    merchantPhone: '+255 720 111 222',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T08:00:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-15T08:30:00Z', note: 'John Mwakasege assigned' },
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
    merchant: 'Fashion Hub TZ',
    driver: 'Peter Mushi',
    vehicle: 'T 456 DEF',
    status: 'awaiting_pickup',
    pickupLocation: 'Posta, Dar es Salaam',
    dropOffLocation: 'Sinza, Dar es Salaam',
    assignedTime: '2024-01-15T09:00:00Z',
    customerName: 'James Oloo',
    customerPhone: '+255 733 456 789',
    merchantPhone: '+255 720 333 444',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T08:45:00Z' },
      { status: 'Assigned to Driver', timestamp: '2024-01-15T09:00:00Z' },
    ],
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-2024-0893',
    merchant: 'Electronics Plus TZ',
    driver: 'Samuel Kileo',
    vehicle: 'T 789 GHI',
    status: 'dispute',
    pickupLocation: 'Masaki, Dar es Salaam',
    dropOffLocation: 'Oyster Bay, Dar es Salaam',
    assignedTime: '2024-01-14T14:00:00Z',
    customerName: 'Grace Njau',
    customerPhone: '+255 722 567 890',
    merchantPhone: '+255 720 555 666',
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
    merchant: 'Home Essentials TZ',
    driver: 'David Mwita',
    vehicle: 'T 012 JKL',
    status: 'delivered',
    pickupLocation: 'Vingunguti, Dar es Salaam',
    dropOffLocation: 'Buguruni, Dar es Salaam',
    assignedTime: '2024-01-14T10:00:00Z',
    customerName: 'Fatima Hassan',
    customerPhone: '+255 711 678 901',
    merchantPhone: '+255 720 777 888',
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
    merchant: 'Book World TZ',
    driver: null,
    vehicle: null,
    status: 'assigned',
    pickupLocation: 'Upanga, Dar es Salaam',
    dropOffLocation: 'Mbezi Beach, Dar es Salaam',
    assignedTime: '2024-01-15T10:30:00Z',
    customerName: 'Alice Mwenda',
    customerPhone: '+255 700 789 012',
    merchantPhone: '+255 720 999 000',
    timeline: [
      { status: 'Order Created', timestamp: '2024-01-15T10:00:00Z' },
      { status: 'Awaiting Driver Assignment', timestamp: '2024-01-15T10:30:00Z' },
    ],
  },
];

export const mockAdminDrivers: AdminDriver[] = [
  {
    id: 'DRV-001',
    name: 'John Mwakasege',
    phone: '+255 712 111 111',
    email: 'john.mwakasege@email.com',
    status: 'active',
    assignedVehicle: 'T 123 ABC',
    activeDeliveries: 1,
    availability: 'online',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
      license: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-001', date: '2024-01-15', status: 'in_transit', earnings: 5000 },
      { id: 'DEL-010', date: '2024-01-14', status: 'delivered', earnings: 3500 },
      { id: 'DEL-015', date: '2024-01-13', status: 'delivered', earnings: 4200 },
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
    name: 'Peter Mushi',
    phone: '+255 712 222 222',
    email: 'peter.mushi@email.com',
    status: 'active',
    assignedVehicle: 'T 456 DEF',
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
      { id: 'DEL-012', date: '2024-01-14', status: 'delivered', earnings: 2800 },
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
    name: 'Samuel Kileo',
    phone: '+255 712 333 333',
    email: 'samuel.kileo@email.com',
    status: 'suspended',
    assignedVehicle: 'T 789 GHI',
    activeDeliveries: 0,
    availability: 'offline',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-003', date: '2024-01-14', status: 'dispute', earnings: 0 },
      { id: 'DEL-020', date: '2024-01-13', status: 'delivered', earnings: 4000 },
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
    name: 'David Mwita',
    phone: '+255 712 444 444',
    email: 'david.mwita@email.com',
    status: 'active',
    assignedVehicle: 'T 012 JKL',
    activeDeliveries: 0,
    availability: 'offline',
    documents: {
      idFront: '/placeholder.svg',
      idBack: '/placeholder.svg',
      selfie: '/placeholder.svg',
      license: '/placeholder.svg',
    },
    deliveryHistory: [
      { id: 'DEL-004', date: '2024-01-14', status: 'delivered', earnings: 3800 },
      { id: 'DEL-025', date: '2024-01-13', status: 'delivered', earnings: 2900 },
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
    phone: '+255 712 555 555',
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
    plateNumber: 'T 123 ABC',
    type: 'bike',
    loadCapacity: '20 kg',
    status: 'active',
    assignedDriver: 'John Mwakasege',
    assignedDriverId: 'DRV-001',
    operatingZone: 'Dar es Salaam - Ilala, Kinondoni',
    activeDeliveries: 1,
    lastMaintenance: '2024-01-01',
    insuranceExpiry: '2024-12-31',
    activityHistory: [
      { id: 'ACT-001', action: 'assigned', timestamp: '2024-01-10T10:00:00Z', details: 'Driver assigned', driverName: 'John Mwakasege' },
      { id: 'ACT-002', action: 'activated', timestamp: '2024-01-05T09:00:00Z', details: 'Vehicle activated' },
      { id: 'ACT-003', action: 'created', timestamp: '2024-01-01T08:00:00Z', details: 'Vehicle registered' },
    ],
    recentDeliveries: [
      { id: 'DEL-010', orderId: 'ORD-2024-0880', status: 'delivered', date: '2024-01-14', dropOffLocation: 'Mikocheni' },
      { id: 'DEL-015', orderId: 'ORD-2024-0875', status: 'delivered', date: '2024-01-13', dropOffLocation: 'Masaki' },
    ],
    currentDelivery: {
      id: 'DEL-001',
      orderId: 'ORD-2024-0891',
      status: 'in_transit',
      dropOffLocation: 'Mikocheni, Dar es Salaam',
    },
  },
  {
    id: 'VEH-002',
    plateNumber: 'T 456 DEF',
    type: 'bike',
    loadCapacity: '20 kg',
    status: 'active',
    assignedDriver: 'Peter Mushi',
    assignedDriverId: 'DRV-002',
    operatingZone: 'Dar es Salaam - Ilala, Temeke',
    activeDeliveries: 1,
    lastMaintenance: '2023-12-15',
    insuranceExpiry: '2024-11-30',
    activityHistory: [
      { id: 'ACT-004', action: 'assigned', timestamp: '2024-01-08T10:00:00Z', details: 'Driver assigned', driverName: 'Peter Mushi' },
      { id: 'ACT-005', action: 'activated', timestamp: '2024-01-02T09:00:00Z', details: 'Vehicle activated' },
      { id: 'ACT-006', action: 'created', timestamp: '2023-12-20T08:00:00Z', details: 'Vehicle registered' },
    ],
    recentDeliveries: [
      { id: 'DEL-012', orderId: 'ORD-2024-0878', status: 'delivered', date: '2024-01-14', dropOffLocation: 'Sinza' },
    ],
    currentDelivery: {
      id: 'DEL-002',
      orderId: 'ORD-2024-0892',
      status: 'awaiting_pickup',
      dropOffLocation: 'Sinza, Dar es Salaam',
    },
  },
  {
    id: 'VEH-003',
    plateNumber: 'T 789 GHI',
    type: 'car',
    loadCapacity: '100 kg',
    status: 'active',
    assignedDriver: 'Samuel Kileo',
    assignedDriverId: 'DRV-003',
    operatingZone: 'Dar es Salaam - Kinondoni, Ubungo',
    activeDeliveries: 0,
    lastMaintenance: '2023-11-20',
    insuranceExpiry: '2024-10-15',
    activityHistory: [
      { id: 'ACT-007', action: 'assigned', timestamp: '2024-01-05T10:00:00Z', details: 'Driver assigned', driverName: 'Samuel Kileo' },
      { id: 'ACT-008', action: 'activated', timestamp: '2023-11-25T09:00:00Z', details: 'Vehicle activated' },
      { id: 'ACT-009', action: 'created', timestamp: '2023-11-15T08:00:00Z', details: 'Vehicle registered' },
    ],
    recentDeliveries: [
      { id: 'DEL-003', orderId: 'ORD-2024-0893', status: 'dispute', date: '2024-01-14', dropOffLocation: 'Oyster Bay' },
      { id: 'DEL-020', orderId: 'ORD-2024-0870', status: 'delivered', date: '2024-01-13', dropOffLocation: 'Masaki' },
    ],
    currentDelivery: null,
  },
  {
    id: 'VEH-004',
    plateNumber: 'T 012 JKL',
    type: 'van',
    loadCapacity: '500 kg',
    status: 'active',
    assignedDriver: 'David Mwita',
    assignedDriverId: 'DRV-004',
    operatingZone: 'Dar es Salaam - Temeke, Kigamboni',
    activeDeliveries: 0,
    lastMaintenance: '2024-01-10',
    insuranceExpiry: '2024-12-01',
    activityHistory: [
      { id: 'ACT-010', action: 'assigned', timestamp: '2024-01-03T10:00:00Z', details: 'Driver assigned', driverName: 'David Mwita' },
      { id: 'ACT-011', action: 'activated', timestamp: '2023-12-28T09:00:00Z', details: 'Vehicle activated' },
      { id: 'ACT-012', action: 'created', timestamp: '2023-12-20T08:00:00Z', details: 'Vehicle registered' },
    ],
    recentDeliveries: [
      { id: 'DEL-004', orderId: 'ORD-2024-0894', status: 'delivered', date: '2024-01-14', dropOffLocation: 'Buguruni' },
      { id: 'DEL-025', orderId: 'ORD-2024-0865', status: 'delivered', date: '2024-01-13', dropOffLocation: 'Vingunguti' },
    ],
    currentDelivery: null,
  },
  {
    id: 'VEH-005',
    plateNumber: 'T 345 MNO',
    type: 'truck',
    loadCapacity: '2000 kg',
    status: 'inactive',
    assignedDriver: null,
    assignedDriverId: null,
    operatingZone: 'Dar es Salaam Metropolitan',
    activeDeliveries: 0,
    lastMaintenance: '2023-10-05',
    insuranceExpiry: '2024-09-30',
    activityHistory: [
      { id: 'ACT-013', action: 'deactivated', timestamp: '2024-01-02T10:00:00Z', details: 'Vehicle deactivated for maintenance' },
      { id: 'ACT-014', action: 'unassigned', timestamp: '2024-01-02T09:00:00Z', details: 'Driver unassigned', driverName: 'James Mwamba' },
      { id: 'ACT-015', action: 'created', timestamp: '2023-10-01T08:00:00Z', details: 'Vehicle registered' },
    ],
    recentDeliveries: [
      { id: 'DEL-030', orderId: 'ORD-2024-0850', status: 'delivered', date: '2024-01-01', dropOffLocation: 'Ubungo' },
    ],
    currentDelivery: null,
  },
];

export const mockAdminNotifications: AdminNotification[] = [
  {
    id: 'NOTIF-001',
    type: 'delivery_assigned',
    title: 'New Delivery Assigned',
    message: 'DEL-001 has been assigned to John Mwakasege',
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
    message: 'Samuel Kileo has been suspended pending investigation',
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
  name: 'Swift Logistics Tanzania',
  registrationNumber: 'TZ-2023-SLT-001',
  address: '123 Ali Hassan Mwinyi Road, Dar es Salaam, Tanzania',
  phone: '+255 22 123 4567',
  email: 'info@swiftlogistics.co.tz',
  contactPerson: 'Michael Omondi',
  operatingZones: ['Dar es Salaam Metropolitan', 'Mwanza Region', 'Arusha Region'],
  fleetSize: 5,
  activeDrivers: 4,
  joinedDate: '2023-01-15',
};
