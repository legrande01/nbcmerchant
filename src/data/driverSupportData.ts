// Driver Help & Support Data Types and Mock Data

export interface DriverSupportCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  articleCount: number;
}

export interface DriverFAQ {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}

export type DriverTicketStatus = 'open' | 'in_review' | 'resolved';

export interface DriverSupportTicket {
  id: string;
  subject: string;
  category: string;
  status: DriverTicketStatus;
  deliveryId?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  responses: DriverTicketResponse[];
}

export interface DriverTicketResponse {
  id: string;
  message: string;
  isSupport: boolean;
  createdAt: string;
}

// Driver Support Categories
export const driverSupportCategories: DriverSupportCategory[] = [
  {
    id: 'delivery-issues',
    name: 'Delivery Issues',
    icon: 'truck',
    description: 'Problems during pickup or delivery',
    articleCount: 8,
  },
  {
    id: 'proof-verification',
    name: 'Proof & Verification',
    icon: 'clipboard-check',
    description: 'Pickup codes, photos, and verification',
    articleCount: 6,
  },
  {
    id: 'buyer-problems',
    name: 'Buyer Problems',
    icon: 'user-x',
    description: 'Customer communication issues',
    articleCount: 5,
  },
  {
    id: 'payments-earnings',
    name: 'Payments & Earnings',
    icon: 'wallet',
    description: 'Earnings, payouts, and disputes',
    articleCount: 7,
  },
  {
    id: 'account-profile',
    name: 'Account & Profile',
    icon: 'user',
    description: 'Profile settings and account management',
    articleCount: 4,
  },
];

// Driver FAQs
export const driverFAQs: DriverFAQ[] = [
  // Buyer Problems
  {
    id: 'faq-001',
    categoryId: 'buyer-problems',
    question: 'What should I do if the buyer is not responding?',
    answer: 'If the buyer is not responding to calls or messages, wait at the delivery location for at least 10 minutes. Try calling 3 times with 5-minute intervals. If there is still no response, mark the delivery as "Buyer Unresponsive" in the app and contact support. Do not leave the package unattended. You may be asked to return the package to the pickup location.',
  },
  {
    id: 'faq-002',
    categoryId: 'delivery-issues',
    question: 'What if the delivery address is wrong or incomplete?',
    answer: 'If you cannot find the delivery address or it appears incorrect, first try to contact the buyer using the phone number provided. If you cannot reach them, contact support immediately with the order ID. Do not leave the package at an uncertain location. Support will help coordinate with the buyer or provide alternative instructions.',
  },
  {
    id: 'faq-003',
    categoryId: 'proof-verification',
    question: 'What should I do if the pickup code is not working?',
    answer: 'If the pickup code does not work, first verify you are at the correct pickup location. Ask the merchant to re-check the code in their system. If the code still fails, take a photo of the error message and contact support. Do not proceed with pickup without proper verification as this protects both you and the merchant.',
  },
  {
    id: 'faq-004',
    categoryId: 'proof-verification',
    question: 'Why was my proof rejected?',
    answer: 'Proof can be rejected for several reasons: blurry or unclear photos, wrong items visible in the photo, missing ID verification, or incomplete information. Check the rejection reason in the app and resubmit with clear, well-lit photos that show all required items. Ensure your face is clearly visible in selfies and IDs are fully legible.',
  },
  {
    id: 'faq-005',
    categoryId: 'delivery-issues',
    question: 'How do disputes work?',
    answer: 'When a dispute is raised (by buyer, merchant, or driver), the delivery is paused for investigation. You cannot take further actions on disputed deliveries. A support agent will review all evidence including your proof photos, GPS data, and communication records. Most disputes are resolved within 24-48 hours. Your earnings will be credited once resolved in your favor.',
  },
  {
    id: 'faq-006',
    categoryId: 'payments-earnings',
    question: 'When are my earnings confirmed?',
    answer: 'Earnings are confirmed immediately after the buyer confirms delivery in the app. Once confirmed, the amount moves from "Pending" to "Confirmed" in your earnings summary. If the buyer does not confirm within 24 hours after delivery, the system automatically confirms it (unless a dispute is raised). Confirmed earnings are included in your next payout cycle.',
  },
  {
    id: 'faq-007',
    categoryId: 'payments-earnings',
    question: 'Why is my payment still pending?',
    answer: 'Payments remain pending until the buyer confirms delivery. If more than 24 hours have passed since delivery and payment is still pending, check if a dispute has been raised. If there is no dispute, contact support with the order ID. Auto-confirmation should occur within 24 hours of delivery proof submission.',
  },
  {
    id: 'faq-008',
    categoryId: 'buyer-problems',
    question: 'The buyer is asking me to deliver to a different address',
    answer: 'Do not deliver to a different address than what is shown in the app. If the buyer requests a different location, inform them that address changes must be made through the platform. Contact support to report the request. Delivering to an unauthorized address can result in disputes and affect your ratings.',
  },
  {
    id: 'faq-009',
    categoryId: 'account-profile',
    question: 'How do I update my vehicle information?',
    answer: 'Go to Profile > Vehicle Information to update your vehicle details. You will need to provide updated vehicle registration, insurance documents, and photos. Changes require verification and may take 24-48 hours to be approved. Keep your documents current to avoid service interruption.',
  },
  {
    id: 'faq-010',
    categoryId: 'proof-verification',
    question: 'What photos are required for pickup and delivery?',
    answer: 'For pickup: Photo of goods, your ID, and a selfie with the goods. For delivery: Photo of goods at delivery location and (if possible) photo with buyer. Ensure all photos are clear, well-lit, and show the complete items. These photos protect you in case of disputes.',
  },
];

// Mock Driver Support Tickets
export const driverSupportTickets: DriverSupportTicket[] = [
  {
    id: 'DTKT-001',
    subject: 'Pickup code rejected despite correct entry',
    category: 'proof-verification',
    status: 'in_review',
    deliveryId: 'DEL-005',
    message: 'I entered the correct pickup code three times but it kept showing as invalid. The merchant confirmed the code was correct. I had to skip this delivery.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        id: 'RESP-001',
        message: 'Thank you for reporting this issue. We are investigating the pickup code validation system. Can you please provide the merchant name and exact time of the incident?',
        isSupport: true,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 'DTKT-002',
    subject: 'Buyer dispute - I delivered the correct items',
    category: 'buyer-problems',
    status: 'open',
    deliveryId: 'DEL-004',
    message: 'The buyer raised a dispute saying items were missing. I have photos showing all items at pickup and delivery. Please review my proof.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    responses: [],
  },
  {
    id: 'DTKT-003',
    subject: 'Earnings not credited after delivery',
    category: 'payments-earnings',
    status: 'resolved',
    deliveryId: 'DEL-010',
    message: 'I completed delivery for order ORD-2024-003 two days ago. The buyer confirmed but earnings still show as pending.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        id: 'RESP-002',
        message: 'We found a sync issue in the payment processing system. Your earnings have now been credited to your confirmed balance. Thank you for your patience.',
        isSupport: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];

export function getDriverFAQsByCategory(categoryId: string): DriverFAQ[] {
  return driverFAQs.filter(faq => faq.categoryId === categoryId);
}

export function getDriverTicketsByStatus(status?: DriverTicketStatus): DriverSupportTicket[] {
  if (!status) return driverSupportTickets;
  return driverSupportTickets.filter(ticket => ticket.status === status);
}

export function getCategoryName(categoryId: string): string {
  const category = driverSupportCategories.find(c => c.id === categoryId);
  return category?.name || categoryId;
}
