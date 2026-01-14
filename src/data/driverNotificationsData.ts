// Driver Notifications Data Types and Mock Data

export type DriverNotificationType = 
  | 'new_delivery' 
  | 'pickup_approved' 
  | 'pickup_rejected' 
  | 'buyer_confirmed' 
  | 'dispute_raised' 
  | 'payment_confirmed'
  | 'offline_warning';

export interface DriverNotification {
  id: string;
  type: DriverNotificationType;
  title: string;
  message: string;
  deliveryId?: string;
  createdAt: string;
  read: boolean;
}

// Mock driver notifications
export const driverNotifications: DriverNotification[] = [
  {
    id: 'NOTIF-001',
    type: 'new_delivery',
    title: 'New Delivery Assigned',
    message: 'Order ORD-2024-012 has been assigned to you. Pickup from Kariakoo Market.',
    deliveryId: 'DEL-001',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    read: false,
  },
  {
    id: 'NOTIF-002',
    type: 'pickup_approved',
    title: 'Pickup Approved',
    message: 'Your pickup proof for Order ORD-2024-011 has been verified and approved.',
    deliveryId: 'DEL-002',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    read: false,
  },
  {
    id: 'NOTIF-003',
    type: 'buyer_confirmed',
    title: 'Delivery Confirmed',
    message: 'The buyer has confirmed receipt of Order ORD-2024-010. Earnings credited!',
    deliveryId: 'DEL-003',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 'NOTIF-004',
    type: 'payment_confirmed',
    title: 'Payment Confirmed',
    message: 'TZS 15,000 has been added to your confirmed earnings for Order ORD-2024-010.',
    deliveryId: 'DEL-003',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: true,
  },
  {
    id: 'NOTIF-005',
    type: 'dispute_raised',
    title: 'Dispute Raised',
    message: 'A dispute has been raised for Order ORD-2024-008. Please check the details.',
    deliveryId: 'DEL-004',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    read: true,
  },
  {
    id: 'NOTIF-006',
    type: 'pickup_rejected',
    title: 'Pickup Proof Rejected',
    message: 'Your pickup proof for Order ORD-2024-007 was rejected. Please resubmit.',
    deliveryId: 'DEL-005',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    read: true,
  },
  {
    id: 'NOTIF-007',
    type: 'offline_warning',
    title: 'Offline Reminder',
    message: 'You have 2 pending deliveries but you are offline. Go online to continue.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
  },
  {
    id: 'NOTIF-008',
    type: 'new_delivery',
    title: 'New Delivery Assigned',
    message: 'Order ORD-2024-006 has been assigned to you. Pickup from Msasani.',
    deliveryId: 'DEL-006',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
    read: true,
  },
];

export function getUnreadDriverNotifications(): DriverNotification[] {
  return driverNotifications.filter(n => !n.read);
}

export function getDriverNotificationIcon(type: DriverNotificationType): string {
  switch (type) {
    case 'new_delivery':
      return 'truck';
    case 'pickup_approved':
      return 'check-circle';
    case 'pickup_rejected':
      return 'x-circle';
    case 'buyer_confirmed':
      return 'user-check';
    case 'dispute_raised':
      return 'alert-triangle';
    case 'payment_confirmed':
      return 'wallet';
    case 'offline_warning':
      return 'wifi-off';
    default:
      return 'bell';
  }
}

export function getNotificationRoute(notification: DriverNotification): string {
  if (notification.deliveryId) {
    return `/driver/deliveries?delivery=${notification.deliveryId}`;
  }
  
  switch (notification.type) {
    case 'payment_confirmed':
      return '/driver/payments';
    case 'offline_warning':
      return '/driver/deliveries';
    default:
      return '/driver/deliveries';
  }
}
