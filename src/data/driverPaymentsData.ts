// Driver Payments Data Types and Mock Data

export type PaymentStatus = 'pending' | 'confirmed' | 'dispute';

export interface DeliveryPayment {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  customerName: string;
  deliveryAddress: string;
}

export interface EarningsSummary {
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  pendingEarnings: number;
  confirmedEarnings: number;
}

// Mock delivery payments
export const driverPayments: DeliveryPayment[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-2024-001',
    date: '2024-01-15T14:30:00Z',
    amount: 15000,
    status: 'confirmed',
    customerName: 'John Mwamba',
    deliveryAddress: 'Masaki, Dar es Salaam',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-2024-002',
    date: '2024-01-15T11:00:00Z',
    amount: 8500,
    status: 'confirmed',
    customerName: 'Grace Kimaro',
    deliveryAddress: 'Mikocheni, Dar es Salaam',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-2024-003',
    date: '2024-01-15T09:15:00Z',
    amount: 22000,
    status: 'pending',
    customerName: 'Peter Ngowi',
    deliveryAddress: 'Sinza, Dar es Salaam',
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-2024-004',
    date: '2024-01-14T16:45:00Z',
    amount: 12000,
    status: 'confirmed',
    customerName: 'Amina Hassan',
    deliveryAddress: 'Kinondoni, Dar es Salaam',
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-2024-005',
    date: '2024-01-14T13:20:00Z',
    amount: 5500,
    status: 'dispute',
    customerName: 'David Mushi',
    deliveryAddress: 'Mbezi Beach, Dar es Salaam',
  },
  {
    id: 'PAY-006',
    orderId: 'ORD-2024-006',
    date: '2024-01-14T10:00:00Z',
    amount: 18000,
    status: 'confirmed',
    customerName: 'Sarah Mwangi',
    deliveryAddress: 'Upanga, Dar es Salaam',
  },
  {
    id: 'PAY-007',
    orderId: 'ORD-2024-007',
    date: '2024-01-13T15:30:00Z',
    amount: 9500,
    status: 'confirmed',
    customerName: 'Michael Temba',
    deliveryAddress: 'Kariakoo, Dar es Salaam',
  },
  {
    id: 'PAY-008',
    orderId: 'ORD-2024-008',
    date: '2024-01-13T12:00:00Z',
    amount: 28000,
    status: 'pending',
    customerName: 'Joyce Lukamba',
    deliveryAddress: 'Oyster Bay, Dar es Salaam',
  },
  {
    id: 'PAY-009',
    orderId: 'ORD-2024-009',
    date: '2024-01-12T14:45:00Z',
    amount: 7000,
    status: 'confirmed',
    customerName: 'Robert Msangi',
    deliveryAddress: 'Kijitonyama, Dar es Salaam',
  },
  {
    id: 'PAY-010',
    orderId: 'ORD-2024-010',
    date: '2024-01-12T09:30:00Z',
    amount: 16500,
    status: 'confirmed',
    customerName: 'Fatima Omar',
    deliveryAddress: 'Msasani, Dar es Salaam',
  },
];

// Calculate earnings summary from payments
export function getDriverEarningsSummary(): EarningsSummary {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let todayEarnings = 0;
  let weekEarnings = 0;
  let monthEarnings = 0;
  let pendingEarnings = 0;
  let confirmedEarnings = 0;

  driverPayments.forEach(payment => {
    const paymentDate = new Date(payment.date);
    
    if (payment.status === 'confirmed') {
      confirmedEarnings += payment.amount;
      
      if (paymentDate >= startOfToday) {
        todayEarnings += payment.amount;
      }
      if (paymentDate >= startOfWeek) {
        weekEarnings += payment.amount;
      }
      if (paymentDate >= startOfMonth) {
        monthEarnings += payment.amount;
      }
    } else if (payment.status === 'pending') {
      pendingEarnings += payment.amount;
    }
  });

  return {
    todayEarnings,
    weekEarnings,
    monthEarnings,
    pendingEarnings,
    confirmedEarnings,
  };
}

export function formatCurrency(amount: number): string {
  return `TZS ${amount.toLocaleString()}`;
}
