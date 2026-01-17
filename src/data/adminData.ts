// Transport Admin Mock Data for NBC Sokoni Platform

// ============= Types =============

export type AdminDeliveryStatus = 'assigned' | 'in_transit' | 'delivered' | 'dispute';
export type AdminDriverStatus = 'active' | 'suspended';
export type AdminVehicleStatus = 'active' | 'inactive';
export type AdminVehicleType = 'bike' | 'car' | 'van' | 'truck';
export type AdminTicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

// Tanzania Regions and Districts
export const tanzaniaRegions = [
  'Dar es Salaam',
  'Arusha',
  'Mwanza',
  'Dodoma',
  'Mbeya',
  'Morogoro',
  'Tanga',
  'Kilimanjaro',
  'Iringa',
  'Zanzibar',
] as const;

export const tanzaniaDistricts: Record<string, string[]> = {
  'Dar es Salaam': ['Kinondoni', 'Ilala', 'Temeke', 'Ubungo', 'Kigamboni'],
  'Arusha': ['Arusha City', 'Arusha DC', 'Karatu', 'Longido', 'Meru', 'Monduli', 'Ngorongoro'],
  'Mwanza': ['Ilemela', 'Nyamagana', 'Kwimba', 'Magu', 'Misungwi', 'Sengerema', 'Ukerewe'],
  'Dodoma': ['Dodoma City', 'Bahi', 'Chamwino', 'Chemba', 'Kondoa', 'Kongwa', 'Mpwapwa'],
  'Mbeya': ['Mbeya City', 'Mbeya DC', 'Chunya', 'Kyela', 'Mbozi', 'Rungwe'],
  'Morogoro': ['Morogoro Urban', 'Morogoro Rural', 'Kilombero', 'Kilosa', 'Mvomero', 'Ulanga'],
  'Tanga': ['Tanga City', 'Handeni', 'Kilindi', 'Korogwe', 'Lushoto', 'Muheza', 'Pangani'],
  'Kilimanjaro': ['Moshi Urban', 'Moshi Rural', 'Hai', 'Rombo', 'Same', 'Siha'],
  'Iringa': ['Iringa Urban', 'Iringa Rural', 'Kilolo', 'Mufindi'],
  'Zanzibar': ['Zanzibar City', 'Magharibi', 'Kaskazini', 'Kusini'],
};

export const tanzaniaWards: Record<string, string[]> = {
  'Kinondoni': ['Masaki', 'Mikocheni', 'Msasani', 'Kijitonyama', 'Mbezi', 'Sinza', 'Mwananyamala', 'Tandale', 'Kawe'],
  'Ilala': ['Kariakoo', 'Kivukoni', 'Upanga', 'Buguruni', 'Gerezani', 'Jangwani', 'Mchafukoge', 'Ukonga'],
  'Temeke': ['Temeke', 'Keko', 'Mbagala', 'Chang\'ombe', 'Kurasini', 'Tandika', 'Mtoni', 'Toangoma'],
  'Ubungo': ['Ubungo', 'Manzese', 'Makuburi', 'Mburahati', 'Sinza', 'Kimara', 'Mbezi Juu', 'Saranga'],
  'Kigamboni': ['Kigamboni', 'Kibada', 'Kisarawe II', 'Pemba Mnazi', 'Tuamoyo', 'Vijibweni'],
};

// ============= Interfaces =============

export interface AdminDeliveryTimeline {
  id: string;
  status: string;
  timestamp: string;
  note?: string;
  actor?: string;
}

export interface AdminDeliveryProof {
  pickupCode?: string;
  goodsPhoto: boolean;
  idPhoto: boolean;
  selfie: boolean;
  deliveryPhoto: boolean;
  pickupVerified: boolean;
  deliveryVerified: boolean;
}

export interface AdminDelivery {
  id: string;
  orderNumber: string;
  merchantName: string;
  customerName: string;
  customerPhone: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  vehiclePlate: string;
  status: AdminDeliveryStatus;
  pickupAddress: string;
  dropoffAddress: string;
  pickupCoords: { lat: number; lng: number };
  dropoffCoords: { lat: number; lng: number };
  distance: string;
  estimatedTime: string;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  disputeReason?: string;
  timeline: AdminDeliveryTimeline[];
  proof: AdminDeliveryProof;
  payoutAmount: number;
}

export interface AdminDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  idType: 'nida' | 'driving_license';
  idNumber: string;
  status: AdminDriverStatus;
  vehicleId?: string;
  vehiclePlate?: string;
  vehicleType?: AdminVehicleType;
  deliveryCount: number;
  rating: number;
  joinedAt: string;
  region: string;
  district: string;
  lastActive?: string;
}

export interface AdminVehicle {
  id: string;
  plateNumber: string;
  type: AdminVehicleType;
  capacityKg: number;
  region: string;
  district: string;
  ward?: string;
  status: AdminVehicleStatus;
  assignedDriverId?: string;
  assignedDriverName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSupportCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AdminFAQ {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}

export interface AdminTicketResponse {
  id: string;
  content: string;
  author: string;
  authorRole: 'admin' | 'support';
  createdAt: string;
}

export interface AdminSupportTicket {
  id: string;
  subject: string;
  category: string;
  status: AdminTicketStatus;
  priority: 'low' | 'normal' | 'high';
  message: string;
  relatedDriverId?: string;
  relatedVehicleId?: string;
  relatedDeliveryId?: string;
  createdAt: string;
  updatedAt: string;
  responses: AdminTicketResponse[];
}

// ============= Mock Data =============

export const mockAdminDrivers: AdminDriver[] = [
  {
    id: 'drv-001',
    name: 'James Kioko',
    phone: '+255 712 345 678',
    email: 'james.kioko@email.com',
    idType: 'driving_license',
    idNumber: 'DL-2024-001234',
    status: 'active',
    vehicleId: 'veh-001',
    vehiclePlate: 'T 123 ABC',
    vehicleType: 'bike',
    deliveryCount: 156,
    rating: 4.8,
    joinedAt: '2023-06-15T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Kinondoni',
    lastActive: '2024-01-15T11:30:00Z',
  },
  {
    id: 'drv-002',
    name: 'Mary Okonkwo',
    phone: '+255 713 456 789',
    email: 'mary.okonkwo@email.com',
    idType: 'nida',
    idNumber: '19850623-12345-00001-23',
    status: 'active',
    vehicleId: 'veh-002',
    vehiclePlate: 'T 456 DEF',
    vehicleType: 'car',
    deliveryCount: 234,
    rating: 4.9,
    joinedAt: '2023-03-10T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Ilala',
    lastActive: '2024-01-15T10:45:00Z',
  },
  {
    id: 'drv-003',
    name: 'Samuel Otieno',
    phone: '+255 714 567 890',
    email: 'samuel.otieno@email.com',
    idType: 'driving_license',
    idNumber: 'DL-2023-005678',
    status: 'active',
    vehicleId: 'veh-003',
    vehiclePlate: 'T 789 GHI',
    vehicleType: 'van',
    deliveryCount: 89,
    rating: 4.6,
    joinedAt: '2023-09-20T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Temeke',
    lastActive: '2024-01-15T09:20:00Z',
  },
  {
    id: 'drv-004',
    name: 'John Kamau',
    phone: '+255 715 678 901',
    email: 'john.kamau@email.com',
    idType: 'nida',
    idNumber: '19900415-23456-00002-34',
    status: 'suspended',
    deliveryCount: 45,
    rating: 3.8,
    joinedAt: '2023-11-05T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Ubungo',
    lastActive: '2024-01-10T14:00:00Z',
  },
  {
    id: 'drv-005',
    name: 'Grace Wanjiku',
    phone: '+255 716 789 012',
    email: 'grace.wanjiku@email.com',
    idType: 'driving_license',
    idNumber: 'DL-2024-009012',
    status: 'active',
    vehicleId: 'veh-005',
    vehiclePlate: 'T 234 JKL',
    vehicleType: 'bike',
    deliveryCount: 312,
    rating: 4.95,
    joinedAt: '2022-12-01T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Kinondoni',
    lastActive: '2024-01-15T11:55:00Z',
  },
  {
    id: 'drv-006',
    name: 'Peter Njoroge',
    phone: '+255 717 890 123',
    email: 'peter.njoroge@email.com',
    idType: 'nida',
    idNumber: '19880720-34567-00003-45',
    status: 'active',
    vehicleId: 'veh-006',
    vehiclePlate: 'T 567 MNO',
    vehicleType: 'truck',
    deliveryCount: 67,
    rating: 4.5,
    joinedAt: '2023-08-15T00:00:00Z',
    region: 'Dar es Salaam',
    district: 'Temeke',
    lastActive: '2024-01-15T08:30:00Z',
  },
];

export const mockAdminVehicles: AdminVehicle[] = [
  {
    id: 'veh-001',
    plateNumber: 'T 123 ABC',
    type: 'bike',
    capacityKg: 30,
    region: 'Dar es Salaam',
    district: 'Kinondoni',
    ward: 'Masaki',
    status: 'active',
    assignedDriverId: 'drv-001',
    assignedDriverName: 'James Kioko',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'veh-002',
    plateNumber: 'T 456 DEF',
    type: 'car',
    capacityKg: 200,
    region: 'Dar es Salaam',
    district: 'Ilala',
    ward: 'Kariakoo',
    status: 'active',
    assignedDriverId: 'drv-002',
    assignedDriverName: 'Mary Okonkwo',
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: 'veh-003',
    plateNumber: 'T 789 GHI',
    type: 'van',
    capacityKg: 500,
    region: 'Dar es Salaam',
    district: 'Temeke',
    ward: 'Temeke',
    status: 'active',
    assignedDriverId: 'drv-003',
    assignedDriverName: 'Samuel Otieno',
    createdAt: '2023-09-20T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'veh-004',
    plateNumber: 'T 012 PQR',
    type: 'bike',
    capacityKg: 25,
    region: 'Dar es Salaam',
    district: 'Ubungo',
    ward: 'Kimara',
    status: 'inactive',
    createdAt: '2023-11-05T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: 'veh-005',
    plateNumber: 'T 234 JKL',
    type: 'bike',
    capacityKg: 30,
    region: 'Dar es Salaam',
    district: 'Kinondoni',
    ward: 'Mikocheni',
    status: 'active',
    assignedDriverId: 'drv-005',
    assignedDriverName: 'Grace Wanjiku',
    createdAt: '2022-12-01T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
  {
    id: 'veh-006',
    plateNumber: 'T 567 MNO',
    type: 'truck',
    capacityKg: 2000,
    region: 'Dar es Salaam',
    district: 'Temeke',
    ward: 'Kurasini',
    status: 'active',
    assignedDriverId: 'drv-006',
    assignedDriverName: 'Peter Njoroge',
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
  {
    id: 'veh-007',
    plateNumber: 'T 890 STU',
    type: 'van',
    capacityKg: 450,
    region: 'Dar es Salaam',
    district: 'Ilala',
    ward: 'Upanga',
    status: 'inactive',
    createdAt: '2023-07-22T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const mockAdminDeliveries: AdminDelivery[] = [
  {
    id: 'adel-001',
    orderNumber: 'NBC-2024-001',
    merchantName: 'TechZone Electronics',
    customerName: 'John Mwangi',
    customerPhone: '+255 712 345 678',
    driverId: 'drv-001',
    driverName: 'James Kioko',
    vehicleId: 'veh-001',
    vehiclePlate: 'T 123 ABC',
    status: 'assigned',
    pickupAddress: 'Kariakoo Market, Stall 45, Dar es Salaam',
    dropoffAddress: 'Plot 45, Masaki Road, Kinondoni, Dar es Salaam',
    pickupCoords: { lat: -6.82, lng: 39.27 },
    dropoffCoords: { lat: -6.75, lng: 39.26 },
    distance: '8.5 km',
    estimatedTime: '25 mins',
    assignedAt: '2024-01-15T10:30:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-15T10:00:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-15T10:30:00Z', note: 'Assigned to James Kioko', actor: 'System' },
    ],
    proof: {
      goodsPhoto: false,
      idPhoto: false,
      selfie: false,
      deliveryPhoto: false,
      pickupVerified: false,
      deliveryVerified: false,
    },
    payoutAmount: 5000,
  },
  {
    id: 'adel-002',
    orderNumber: 'NBC-2024-003',
    merchantName: 'Office Supplies Hub',
    customerName: 'Peter Ochieng',
    customerPhone: '+255 714 567 890',
    driverId: 'drv-002',
    driverName: 'Mary Okonkwo',
    vehicleId: 'veh-002',
    vehiclePlate: 'T 456 DEF',
    status: 'in_transit',
    pickupAddress: 'Mlimani City Mall, Shop 12, Dar es Salaam',
    dropoffAddress: 'House 78, Oyster Bay, Dar es Salaam',
    pickupCoords: { lat: -6.78, lng: 39.23 },
    dropoffCoords: { lat: -6.73, lng: 39.28 },
    distance: '6.2 km',
    estimatedTime: '18 mins',
    assignedAt: '2024-01-15T08:00:00Z',
    pickedUpAt: '2024-01-15T08:30:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-15T07:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-15T08:00:00Z', note: 'Assigned to Mary Okonkwo', actor: 'System' },
      { id: 't3', status: 'Picked Up', timestamp: '2024-01-15T08:30:00Z', note: 'Goods collected from merchant', actor: 'Mary Okonkwo' },
      { id: 't4', status: 'In Transit', timestamp: '2024-01-15T08:35:00Z', note: 'En route to customer', actor: 'Mary Okonkwo' },
    ],
    proof: {
      pickupCode: '7834',
      goodsPhoto: true,
      idPhoto: true,
      selfie: true,
      deliveryPhoto: false,
      pickupVerified: true,
      deliveryVerified: false,
    },
    payoutAmount: 4500,
  },
  {
    id: 'adel-003',
    orderNumber: 'NBC-2024-004',
    merchantName: 'Fashion Forward',
    customerName: 'Amina Hassan',
    customerPhone: '+255 715 678 901',
    driverId: 'drv-005',
    driverName: 'Grace Wanjiku',
    vehicleId: 'veh-005',
    vehiclePlate: 'T 234 JKL',
    status: 'delivered',
    pickupAddress: 'Slipway Shopping Centre, Dar es Salaam',
    dropoffAddress: 'Sinza Mori, Plot 23, Dar es Salaam',
    pickupCoords: { lat: -6.74, lng: 39.27 },
    dropoffCoords: { lat: -6.79, lng: 39.24 },
    distance: '7.8 km',
    estimatedTime: '22 mins',
    assignedAt: '2024-01-13T09:00:00Z',
    pickedUpAt: '2024-01-13T09:30:00Z',
    deliveredAt: '2024-01-13T10:30:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-13T08:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-13T09:00:00Z', note: 'Assigned to Grace Wanjiku', actor: 'System' },
      { id: 't3', status: 'Picked Up', timestamp: '2024-01-13T09:30:00Z', note: 'Goods collected from merchant', actor: 'Grace Wanjiku' },
      { id: 't4', status: 'In Transit', timestamp: '2024-01-13T09:35:00Z', note: 'En route to customer', actor: 'Grace Wanjiku' },
      { id: 't5', status: 'Delivered', timestamp: '2024-01-13T10:30:00Z', note: 'Delivered to customer', actor: 'Grace Wanjiku' },
      { id: 't6', status: 'Confirmed', timestamp: '2024-01-13T10:45:00Z', note: 'Customer confirmed receipt', actor: 'Customer' },
    ],
    proof: {
      pickupCode: '9012',
      goodsPhoto: true,
      idPhoto: true,
      selfie: true,
      deliveryPhoto: true,
      pickupVerified: true,
      deliveryVerified: true,
    },
    payoutAmount: 4000,
  },
  {
    id: 'adel-004',
    orderNumber: 'NBC-2024-008',
    merchantName: 'TechZone Electronics',
    customerName: 'Elizabeth Mwakasege',
    customerPhone: '+255 719 012 345',
    driverId: 'drv-003',
    driverName: 'Samuel Otieno',
    vehicleId: 'veh-003',
    vehiclePlate: 'T 789 GHI',
    status: 'dispute',
    pickupAddress: 'Kariakoo Market, Stall 45, Dar es Salaam',
    dropoffAddress: 'Kariakoo, Street 45, Dar es Salaam',
    pickupCoords: { lat: -6.82, lng: 39.27 },
    dropoffCoords: { lat: -6.82, lng: 39.28 },
    distance: '1.2 km',
    estimatedTime: '5 mins',
    assignedAt: '2024-01-08T15:00:00Z',
    pickedUpAt: '2024-01-08T15:30:00Z',
    deliveredAt: '2024-01-09T12:00:00Z',
    disputeReason: 'Customer claims product was defective upon delivery',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-08T14:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-08T15:00:00Z', note: 'Assigned to Samuel Otieno', actor: 'System' },
      { id: 't3', status: 'Picked Up', timestamp: '2024-01-08T15:30:00Z', note: 'Goods collected from merchant', actor: 'Samuel Otieno' },
      { id: 't4', status: 'Delivered', timestamp: '2024-01-09T12:00:00Z', note: 'Delivered to customer', actor: 'Samuel Otieno' },
      { id: 't5', status: 'Dispute Opened', timestamp: '2024-01-10T10:00:00Z', note: 'Customer claims product was defective upon delivery', actor: 'Customer' },
    ],
    proof: {
      pickupCode: '5678',
      goodsPhoto: true,
      idPhoto: true,
      selfie: true,
      deliveryPhoto: true,
      pickupVerified: true,
      deliveryVerified: false,
    },
    payoutAmount: 2500,
  },
  {
    id: 'adel-005',
    orderNumber: 'NBC-2024-009',
    merchantName: 'PowerTech Store',
    customerName: 'Joseph Mushi',
    customerPhone: '+255 720 123 456',
    driverId: 'drv-006',
    driverName: 'Peter Njoroge',
    vehicleId: 'veh-006',
    vehiclePlate: 'T 567 MNO',
    status: 'in_transit',
    pickupAddress: 'Posta, Central Post Office Building, Dar es Salaam',
    dropoffAddress: 'Ilala, Buguruni, Street 12, Dar es Salaam',
    pickupCoords: { lat: -6.81, lng: 39.29 },
    dropoffCoords: { lat: -6.84, lng: 39.26 },
    distance: '4.1 km',
    estimatedTime: '12 mins',
    assignedAt: '2024-01-15T06:00:00Z',
    pickedUpAt: '2024-01-15T06:30:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-15T05:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-15T06:00:00Z', note: 'Assigned to Peter Njoroge', actor: 'System' },
      { id: 't3', status: 'Picked Up', timestamp: '2024-01-15T06:30:00Z', note: 'Goods collected from merchant', actor: 'Peter Njoroge' },
      { id: 't4', status: 'In Transit', timestamp: '2024-01-15T06:35:00Z', note: 'En route to customer', actor: 'Peter Njoroge' },
    ],
    proof: {
      pickupCode: '2156',
      goodsPhoto: true,
      idPhoto: true,
      selfie: true,
      deliveryPhoto: false,
      pickupVerified: true,
      deliveryVerified: false,
    },
    payoutAmount: 3500,
  },
  {
    id: 'adel-006',
    orderNumber: 'NBC-2024-010',
    merchantName: 'AudioWorld',
    customerName: 'Rose Nyerere',
    customerPhone: '+255 721 234 567',
    driverId: 'drv-001',
    driverName: 'James Kioko',
    vehicleId: 'veh-001',
    vehiclePlate: 'T 123 ABC',
    status: 'assigned',
    pickupAddress: 'Mikocheni B, Commercial Area, Dar es Salaam',
    dropoffAddress: 'Msasani Peninsula, Villa 8, Dar es Salaam',
    pickupCoords: { lat: -6.77, lng: 39.25 },
    dropoffCoords: { lat: -6.74, lng: 39.27 },
    distance: '4.5 km',
    estimatedTime: '15 mins',
    assignedAt: '2024-01-15T11:00:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-15T10:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-15T11:00:00Z', note: 'Assigned to James Kioko', actor: 'System' },
    ],
    proof: {
      goodsPhoto: false,
      idPhoto: false,
      selfie: false,
      deliveryPhoto: false,
      pickupVerified: false,
      deliveryVerified: false,
    },
    payoutAmount: 3500,
  },
  {
    id: 'adel-007',
    orderNumber: 'NBC-2024-011',
    merchantName: 'Home Essentials',
    customerName: 'Michael Banda',
    customerPhone: '+255 722 345 678',
    driverId: 'drv-002',
    driverName: 'Mary Okonkwo',
    vehicleId: 'veh-002',
    vehiclePlate: 'T 456 DEF',
    status: 'delivered',
    pickupAddress: 'Mlimani City Mall, Shop 8, Dar es Salaam',
    dropoffAddress: 'Mbezi Beach, Plot 156, Dar es Salaam',
    pickupCoords: { lat: -6.78, lng: 39.23 },
    dropoffCoords: { lat: -6.68, lng: 39.21 },
    distance: '12.3 km',
    estimatedTime: '35 mins',
    assignedAt: '2024-01-14T14:00:00Z',
    pickedUpAt: '2024-01-14T14:30:00Z',
    deliveredAt: '2024-01-14T15:30:00Z',
    timeline: [
      { id: 't1', status: 'Order Created', timestamp: '2024-01-14T13:30:00Z', note: 'Order placed by customer' },
      { id: 't2', status: 'Assigned', timestamp: '2024-01-14T14:00:00Z', note: 'Assigned to Mary Okonkwo', actor: 'System' },
      { id: 't3', status: 'Picked Up', timestamp: '2024-01-14T14:30:00Z', note: 'Goods collected from merchant', actor: 'Mary Okonkwo' },
      { id: 't4', status: 'In Transit', timestamp: '2024-01-14T14:35:00Z', note: 'En route to customer', actor: 'Mary Okonkwo' },
      { id: 't5', status: 'Delivered', timestamp: '2024-01-14T15:30:00Z', note: 'Delivered to customer', actor: 'Mary Okonkwo' },
      { id: 't6', status: 'Confirmed', timestamp: '2024-01-14T15:45:00Z', note: 'Customer confirmed receipt', actor: 'Customer' },
    ],
    proof: {
      pickupCode: '3421',
      goodsPhoto: true,
      idPhoto: true,
      selfie: true,
      deliveryPhoto: true,
      pickupVerified: true,
      deliveryVerified: true,
    },
    payoutAmount: 6500,
  },
];

export const adminSupportCategories: AdminSupportCategory[] = [
  {
    id: 'driver-issues',
    name: 'Driver Issues',
    description: 'Problems with driver performance, conduct, or availability',
    icon: 'Users',
  },
  {
    id: 'fleet-issues',
    name: 'Fleet Issues',
    description: 'Vehicle breakdowns, maintenance, or registration problems',
    icon: 'Car',
  },
  {
    id: 'delivery-disputes',
    name: 'Delivery Disputes',
    description: 'Customer complaints, damaged goods, or delivery failures',
    icon: 'AlertTriangle',
  },
  {
    id: 'payments',
    name: 'Payments & Payouts',
    description: 'Driver payment issues or reconciliation problems',
    icon: 'CreditCard',
  },
  {
    id: 'platform-issues',
    name: 'Platform Issues',
    description: 'App bugs, system errors, or technical problems',
    icon: 'Settings',
  },
];

export const adminFAQs: AdminFAQ[] = [
  // Driver Issues
  {
    id: 'faq-001',
    categoryId: 'driver-issues',
    question: 'How do I suspend a driver?',
    answer: 'Go to Drivers > click on the driver > click "Suspend Driver". The driver will be immediately marked as suspended and will not receive new assignments. You can reactivate them at any time by clicking "Activate Driver" on their profile.',
  },
  {
    id: 'faq-002',
    categoryId: 'driver-issues',
    question: 'What happens when a driver is suspended?',
    answer: 'A suspended driver cannot receive new delivery assignments. Any active deliveries they have will remain assigned until completed. The driver will be notified via SMS and app notification. Their account remains in the system and can be reactivated.',
  },
  {
    id: 'faq-003',
    categoryId: 'driver-issues',
    question: 'How do I assign a vehicle to a driver?',
    answer: 'Go to Fleet > select the vehicle > click "Reassign Vehicle" > select the driver from the dropdown. Only active drivers without a currently assigned vehicle will appear in the list. The previous driver (if any) will be notified of the change.',
  },
  // Fleet Issues
  {
    id: 'faq-004',
    categoryId: 'fleet-issues',
    question: 'How do I add a new vehicle to the fleet?',
    answer: 'Go to Fleet > click "Add Vehicle". Fill in the vehicle details including plate number, type, capacity, and operating area. You can optionally assign a driver immediately or leave it unassigned. The vehicle will be set to Active by default.',
  },
  {
    id: 'faq-005',
    categoryId: 'fleet-issues',
    question: 'What does deactivating a vehicle mean?',
    answer: 'A deactivated vehicle cannot be assigned to drivers or used for deliveries. This is useful for vehicles under maintenance, awaiting registration renewal, or temporarily out of service. The vehicle data is retained and can be reactivated when ready.',
  },
  {
    id: 'faq-006',
    categoryId: 'fleet-issues',
    question: 'How do I bulk import vehicles?',
    answer: 'Go to Fleet > click "Import Vehicles". Download the CSV template, fill in your vehicle data following the format, then upload the file. Preview the import to check for errors, then confirm. Successfully imported vehicles will be added as Active by default.',
  },
  // Delivery Disputes
  {
    id: 'faq-007',
    categoryId: 'delivery-disputes',
    question: 'What should I do when a delivery is disputed?',
    answer: 'Review the delivery details including proof photos, timeline, and driver notes. Contact both the customer and driver if needed. You can view all evidence in Delivery Management > click on the disputed delivery. Resolution options will be available in a future update.',
  },
  {
    id: 'faq-008',
    categoryId: 'delivery-disputes',
    question: 'How are delivery disputes resolved?',
    answer: 'Currently, delivery dispute resolution is handled by NBC Sokoni platform support. Your role is to review the evidence, gather information from your driver, and escalate to platform support via the Help & Support section if needed.',
  },
  // Payments
  {
    id: 'faq-009',
    categoryId: 'payments',
    question: 'How are driver payouts calculated?',
    answer: 'Driver payouts are calculated based on completed deliveries. The payout amount per delivery is set by the platform based on distance, package type, and delivery zone. You can view estimated payouts for each delivery in the Delivery Management section.',
  },
  {
    id: 'faq-010',
    categoryId: 'payments',
    question: 'When do drivers receive their payouts?',
    answer: 'Driver payouts are processed by NBC Sokoni platform on a weekly basis. Confirmed deliveries up to the payout cutoff time are included in the next payout cycle. Disputed deliveries are held until resolution.',
  },
  // Platform Issues
  {
    id: 'faq-011',
    categoryId: 'platform-issues',
    question: 'The app is showing errors, what should I do?',
    answer: 'First, try refreshing the page or logging out and back in. Clear your browser cache if the issue persists. If the problem continues, create a support ticket with details about the error, including any error messages and the steps that led to it.',
  },
  {
    id: 'faq-012',
    categoryId: 'platform-issues',
    question: 'How do I report a bug or request a feature?',
    answer: 'Go to Help & Support > Create Ticket > select "Platform Issues" category. Describe the bug with as much detail as possible, or clearly explain the feature you would like. Our team reviews all feedback and uses it to improve the platform.',
  },
];

export const mockAdminTickets: AdminSupportTicket[] = [
  {
    id: 'TKT-ADM-001',
    subject: 'Driver not responding to assignments',
    category: 'driver-issues',
    status: 'open',
    priority: 'high',
    message: 'Driver James Kioko (drv-001) has not been responding to delivery assignments for the past 2 days. He shows as online but does not pick up or respond to calls.',
    relatedDriverId: 'drv-001',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    responses: [],
  },
  {
    id: 'TKT-ADM-002',
    subject: 'Vehicle registration expired',
    category: 'fleet-issues',
    status: 'in_progress',
    priority: 'high',
    message: 'Vehicle T 012 PQR (veh-004) registration has expired. Need guidance on how to deactivate until renewal is complete.',
    relatedVehicleId: 'veh-004',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    responses: [
      {
        id: 'resp-001',
        content: 'Thank you for reporting this. To deactivate the vehicle, go to Fleet > select the vehicle > click "Deactivate Vehicle". This will prevent it from being assigned to drivers until you reactivate it after registration renewal.',
        author: 'NBC Support',
        authorRole: 'support',
        createdAt: '2024-01-15T10:00:00Z',
      },
    ],
  },
  {
    id: 'TKT-ADM-003',
    subject: 'Customer claiming item not delivered',
    category: 'delivery-disputes',
    status: 'resolved',
    priority: 'normal',
    message: 'Order NBC-2024-008 is under dispute. Customer claims item was defective but driver says it was in good condition at pickup. Delivery photos show intact packaging.',
    relatedDeliveryId: 'adel-004',
    createdAt: '2024-01-11T11:00:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
    responses: [
      {
        id: 'resp-002',
        content: 'We have reviewed the delivery evidence including pickup photos and delivery confirmation. The case has been escalated to the merchant for product quality investigation.',
        author: 'NBC Support',
        authorRole: 'support',
        createdAt: '2024-01-12T09:00:00Z',
      },
      {
        id: 'resp-003',
        content: 'Update: The merchant has confirmed this was a manufacturing defect and will process a replacement. The delivery is considered successful and driver payout will be released.',
        author: 'NBC Support',
        authorRole: 'support',
        createdAt: '2024-01-13T16:00:00Z',
      },
    ],
  },
];

// ============= Helper Functions =============

export function getAdminDeliveryById(id: string): AdminDelivery | undefined {
  return mockAdminDeliveries.find(d => d.id === id);
}

export function getAdminDeliveriesByStatus(status?: AdminDeliveryStatus): AdminDelivery[] {
  if (!status) return mockAdminDeliveries;
  return mockAdminDeliveries.filter(d => d.status === status);
}

export function getAdminDriverById(id: string): AdminDriver | undefined {
  return mockAdminDrivers.find(d => d.id === id);
}

export function getAdminDriversByStatus(status?: AdminDriverStatus): AdminDriver[] {
  if (!status) return mockAdminDrivers;
  return mockAdminDrivers.filter(d => d.status === status);
}

export function getAdminVehicleById(id: string): AdminVehicle | undefined {
  return mockAdminVehicles.find(v => v.id === id);
}

export function getAdminVehiclesByStatus(status?: AdminVehicleStatus): AdminVehicle[] {
  if (!status) return mockAdminVehicles;
  return mockAdminVehicles.filter(v => v.status === status);
}

export function getAvailableDriversForVehicle(): AdminDriver[] {
  return mockAdminDrivers.filter(d => d.status === 'active' && !d.vehicleId);
}

export function getAdminTicketById(id: string): AdminSupportTicket | undefined {
  return mockAdminTickets.find(t => t.id === id);
}

export function getAdminFAQsByCategory(categoryId: string): AdminFAQ[] {
  return adminFAQs.filter(f => f.categoryId === categoryId);
}

export function formatCurrency(amount: number): string {
  return `TZS ${amount.toLocaleString()}`;
}

export function getDeliveryStatusColor(status: AdminDeliveryStatus): string {
  const colors: Record<AdminDeliveryStatus, string> = {
    assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    in_transit: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    dispute: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[status];
}

export function getDriverStatusColor(status: AdminDriverStatus): string {
  const colors: Record<AdminDriverStatus, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[status];
}

export function getVehicleStatusColor(status: AdminVehicleStatus): string {
  const colors: Record<AdminVehicleStatus, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };
  return colors[status];
}

export function getVehicleTypeLabel(type: AdminVehicleType): string {
  const labels: Record<AdminVehicleType, string> = {
    bike: 'Motorcycle',
    car: 'Car',
    van: 'Van',
    truck: 'Truck',
  };
  return labels[type];
}

export function generateCSVTemplate(): string {
  const headers = ['plate_number', 'type', 'capacity_kg', 'region', 'district', 'ward', 'status'];
  const exampleRow = ['T 000 XXX', 'bike', '30', 'Dar es Salaam', 'Kinondoni', 'Masaki', 'active'];
  return [headers.join(','), exampleRow.join(',')].join('\n');
}

export function validateVehicleCSV(row: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const [plateNumber, type, capacityKg, region, district, ward, status] = row;

  if (!plateNumber || plateNumber.trim() === '') {
    errors.push('Plate number is required');
  }

  const validTypes = ['bike', 'car', 'van', 'truck'];
  if (!validTypes.includes(type?.toLowerCase())) {
    errors.push(`Type must be one of: ${validTypes.join(', ')}`);
  }

  const capacity = parseInt(capacityKg);
  if (isNaN(capacity) || capacity <= 0) {
    errors.push('Capacity must be a positive number');
  }

  if (!tanzaniaRegions.includes(region as any)) {
    errors.push(`Invalid region. Must be one of: ${tanzaniaRegions.join(', ')}`);
  }

  if (region && tanzaniaDistricts[region] && !tanzaniaDistricts[region].includes(district)) {
    errors.push(`Invalid district for ${region}`);
  }

  const validStatuses = ['active', 'inactive'];
  if (status && !validStatuses.includes(status?.toLowerCase())) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  return { valid: errors.length === 0, errors };
}
