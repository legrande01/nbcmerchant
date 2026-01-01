// Support Categories
export interface SupportCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  articleCount: number;
}

export const supportCategories: SupportCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: 'Rocket',
    description: 'Learn the basics of setting up your store',
    articleCount: 8,
  },
  {
    id: 'products-inventory',
    name: 'Products & Inventory',
    icon: 'Package',
    description: 'Manage your products and stock levels',
    articleCount: 12,
  },
  {
    id: 'orders-fulfillment',
    name: 'Orders & Fulfillment',
    icon: 'ShoppingCart',
    description: 'Process orders and manage deliveries',
    articleCount: 10,
  },
  {
    id: 'payments-payouts',
    name: 'Payments & Payouts',
    icon: 'CreditCard',
    description: 'Understand payments and withdraw funds',
    articleCount: 9,
  },
  {
    id: 'promotions-marketing',
    name: 'Promotions & Marketing',
    icon: 'Megaphone',
    description: 'Create campaigns and boost sales',
    articleCount: 7,
  },
  {
    id: 'account-security',
    name: 'Account & Security',
    icon: 'Shield',
    description: 'Protect your account and manage settings',
    articleCount: 6,
  },
];

// Knowledge Base Articles
export interface SupportArticle {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  content: string;
  relatedArticleIds: string[];
  helpful: { yes: number; no: number };
  lastUpdated: string;
}

export const supportArticles: SupportArticle[] = [
  // Getting Started
  {
    id: 'gs-001',
    categoryId: 'getting-started',
    title: 'How to set up your store profile',
    description: 'Complete your store profile to start selling on NBC Sokoni',
    content: `
## Setting Up Your Store Profile

Welcome to NBC Sokoni! Getting your store profile set up correctly is the first step to successful selling.

### Step 1: Access Store Management
Navigate to **Store Management** from the sidebar menu. Here you'll find all your store settings.

### Step 2: Complete Business Details
Fill in your:
- Business Name
- Business Description
- Contact Information
- Business Address

### Step 3: Upload Your Logo
A professional logo helps build trust with customers. We recommend:
- Square format (400x400 pixels minimum)
- Clear, high-resolution image
- Your brand colors

### Step 4: Set Store Policies
Define your:
- Return Policy
- Shipping Policy
- Privacy Policy

### Need Help?
If you encounter any issues, our support team is here to help. Create a support ticket and we'll respond within 24 hours.
    `,
    relatedArticleIds: ['gs-002', 'gs-003', 'pi-001'],
    helpful: { yes: 145, no: 12 },
    lastUpdated: '2024-01-15',
  },
  {
    id: 'gs-002',
    categoryId: 'getting-started',
    title: 'Adding your first product',
    description: 'Learn how to list your first product on the marketplace',
    content: `
## Adding Your First Product

Listing products on NBC Sokoni is straightforward. Follow these steps to get started.

### Step 1: Navigate to Products
Click on **Products** in the sidebar, then click the **Add Product** button.

### Step 2: Enter Product Details
Fill in the required information:
- **Product Name**: Clear, descriptive title
- **Description**: Detailed information about the product
- **Price**: Set in TZS
- **Category**: Select the appropriate category

### Step 3: Add Product Images
High-quality images increase sales:
- Add at least 3 images
- Use good lighting
- Show different angles

### Step 4: Set Inventory
- Enter your available stock quantity
- Set low stock alerts

### Step 5: Publish
Review your listing and click **Publish** to make it live.

### Tips for Success
- Use keywords customers search for
- Keep prices competitive
- Respond quickly to customer inquiries
    `,
    relatedArticleIds: ['gs-001', 'pi-002', 'pi-003'],
    helpful: { yes: 234, no: 8 },
    lastUpdated: '2024-01-18',
  },
  {
    id: 'gs-003',
    categoryId: 'getting-started',
    title: 'Understanding your dashboard',
    description: 'Navigate your merchant dashboard effectively',
    content: `
## Understanding Your Dashboard

Your dashboard is your command center for managing your NBC Sokoni store.

### Overview Section
The main dashboard shows:
- **Total Revenue**: Your earnings for the selected period
- **Total Orders**: Number of orders received
- **Pending Orders**: Orders awaiting processing
- **Low Stock Items**: Products needing restocking

### Quick Actions
From the dashboard, you can quickly:
- View recent orders
- Check inventory alerts
- Access notifications

### Charts & Analytics
Visual representations of:
- Sales trends over time
- Order volume patterns
- Revenue by category

### Navigation
Use the sidebar to access:
- Store Management
- Products
- Orders
- Payments
- Marketing
- Reports
- Settings
    `,
    relatedArticleIds: ['gs-001', 'gs-002'],
    helpful: { yes: 89, no: 5 },
    lastUpdated: '2024-01-10',
  },
  // Products & Inventory
  {
    id: 'pi-001',
    categoryId: 'products-inventory',
    title: 'Managing product inventory',
    description: 'Keep track of stock levels and avoid overselling',
    content: `
## Managing Product Inventory

Effective inventory management prevents stockouts and keeps customers happy.

### Viewing Inventory
Go to **Products** and switch to the **Inventory** tab to see all stock levels.

### Updating Stock
1. Find the product
2. Click **Edit**
3. Update the stock quantity
4. Save changes

### Low Stock Alerts
Set up alerts to be notified when:
- Stock falls below your threshold
- Items are out of stock

### Bulk Updates
For multiple products:
1. Select products using checkboxes
2. Click **Bulk Actions**
3. Choose update action
4. Apply changes

### Best Practices
- Update stock after each sale
- Set realistic reorder points
- Regular inventory audits
    `,
    relatedArticleIds: ['pi-002', 'gs-002'],
    helpful: { yes: 178, no: 15 },
    lastUpdated: '2024-01-20',
  },
  {
    id: 'pi-002',
    categoryId: 'products-inventory',
    title: 'Editing product details',
    description: 'Update product information, prices, and images',
    content: `
## Editing Product Details

Keep your product listings accurate and up-to-date.

### How to Edit
1. Go to **Products**
2. Find the product to edit
3. Click the **Edit** button
4. Make your changes
5. Click **Save**

### What You Can Edit
- Product name and description
- Pricing
- Images
- Category
- Stock quantity
- Product status (active/inactive)

### Changing Prices
When updating prices:
- Consider market rates
- Update during low-traffic hours
- Notify repeat customers of deals

### Updating Images
- Replace low-quality images
- Add new angles
- Remove outdated photos
    `,
    relatedArticleIds: ['pi-001', 'pi-003'],
    helpful: { yes: 92, no: 7 },
    lastUpdated: '2024-01-12',
  },
  {
    id: 'pi-003',
    categoryId: 'products-inventory',
    title: 'Product categories explained',
    description: 'Choose the right category for better visibility',
    content: `
## Product Categories Explained

Proper categorization helps customers find your products.

### Available Categories
- Electronics
- Fashion & Clothing
- Home & Garden
- Health & Beauty
- Food & Beverages
- Sports & Outdoors
- And more...

### Choosing the Right Category
Ask yourself:
- What would customers search for?
- Where would they expect to find this?
- What category fits best?

### Sub-categories
Some categories have sub-categories for more specific placement.

### Category Guidelines
- One primary category per product
- Be accurate, not optimistic
- Review competitor placements
    `,
    relatedArticleIds: ['pi-002', 'gs-002'],
    helpful: { yes: 67, no: 4 },
    lastUpdated: '2024-01-08',
  },
  // Orders & Fulfillment
  {
    id: 'of-001',
    categoryId: 'orders-fulfillment',
    title: 'Processing new orders',
    description: 'How to handle and fulfill customer orders',
    content: `
## Processing New Orders

Quick order processing leads to happy customers and good reviews.

### When an Order Arrives
1. You'll receive a notification
2. Order appears in your **Orders** list
3. Status shows as "Pending"

### Processing Steps
1. Review order details
2. Confirm product availability
3. Click **Confirm Order**
4. Prepare the package
5. Arrange delivery
6. Mark as **Shipped**

### Order Information
Each order shows:
- Customer details
- Products ordered
- Delivery address
- Payment status
- Order notes

### Timeline
- Confirm within 24 hours
- Ship within your stated processing time
- Update status at each stage
    `,
    relatedArticleIds: ['of-002', 'of-003'],
    helpful: { yes: 256, no: 11 },
    lastUpdated: '2024-01-22',
  },
  {
    id: 'of-002',
    categoryId: 'orders-fulfillment',
    title: 'Handling order cancellations',
    description: 'Process cancellation requests properly',
    content: `
## Handling Order Cancellations

Sometimes orders need to be cancelled. Here's how to handle it properly.

### Cancellation Requests
Customers may request cancellation:
- Before shipping (easy to process)
- After shipping (may require return)

### How to Cancel
1. Go to the order
2. Click **Cancel Order**
3. Select reason
4. Confirm cancellation

### Refund Processing
- Refunds are automatic for cancelled orders
- Customer receives notification
- Funds return to original payment method

### Avoiding Cancellations
- Accurate product descriptions
- Realistic delivery estimates
- Good communication
    `,
    relatedArticleIds: ['of-001', 'of-003'],
    helpful: { yes: 134, no: 9 },
    lastUpdated: '2024-01-19',
  },
  {
    id: 'of-003',
    categoryId: 'orders-fulfillment',
    title: 'Delivery and shipping options',
    description: 'Set up shipping methods for your products',
    content: `
## Delivery and Shipping Options

Offering flexible delivery options improves customer satisfaction.

### Available Options
- Standard Delivery
- Express Delivery
- Same-Day (where available)
- Customer Pickup

### Setting Shipping Rates
Go to **Store Management > Shipping** to configure:
- Flat rates
- Weight-based rates
- Location-based rates
- Free shipping thresholds

### Delivery Partners
NBC Sokoni works with trusted delivery partners to ensure safe delivery.

### Tracking
- All shipments can be tracked
- Customers receive tracking updates
- You can view delivery status
    `,
    relatedArticleIds: ['of-001', 'of-002'],
    helpful: { yes: 189, no: 14 },
    lastUpdated: '2024-01-21',
  },
  // Payments & Payouts
  {
    id: 'pp-001',
    categoryId: 'payments-payouts',
    title: 'Understanding your earnings',
    description: 'How revenue and fees are calculated',
    content: `
## Understanding Your Earnings

Know exactly how your earnings are calculated.

### Revenue Breakdown
Your **Finance** section shows:
- Gross Revenue: Total sales before fees
- Platform Fees: NBC Sokoni commission
- Net Earnings: Your take-home amount

### Fee Structure
- Standard commission: 5% of sale value
- Payment processing: 2.5%
- See fee schedule for details

### Viewing Earnings
1. Go to **Finance**
2. View **Earnings Overview**
3. Filter by date range

### Pending vs Available
- **Pending**: Awaiting order completion
- **Available**: Ready for withdrawal
    `,
    relatedArticleIds: ['pp-002', 'pp-003'],
    helpful: { yes: 312, no: 18 },
    lastUpdated: '2024-01-23',
  },
  {
    id: 'pp-002',
    categoryId: 'payments-payouts',
    title: 'Requesting a payout',
    description: 'Withdraw your earnings to your bank account',
    content: `
## Requesting a Payout

Get your hard-earned money transferred to your bank.

### Prerequisites
- Verified bank account
- Minimum balance of TZS 10,000
- No pending compliance issues

### How to Request
1. Go to **Finance > Payouts**
2. Click **Request Payout**
3. Enter amount
4. Confirm bank details
5. Submit request

### Processing Time
- Standard: 2-3 business days
- Express: Same day (fees apply)

### Payout Status
Track your payout through:
- Pending: Being processed
- Processing: With bank
- Completed: In your account
- Failed: Contact support
    `,
    relatedArticleIds: ['pp-001', 'pp-003'],
    helpful: { yes: 287, no: 12 },
    lastUpdated: '2024-01-24',
  },
  {
    id: 'pp-003',
    categoryId: 'payments-payouts',
    title: 'Managing your bank account',
    description: 'Add or update your payout bank details',
    content: `
## Managing Your Bank Account

Keep your banking information up to date for smooth payouts.

### Adding a Bank Account
1. Go to **Settings > Payment Methods**
2. Click **Add Bank Account**
3. Enter account details
4. Verify with micro-deposit

### Required Information
- Bank name
- Account number
- Account holder name
- Branch code

### Verification
For security, we verify new accounts:
- Small test deposit
- Confirm amount received
- Account activated

### Changing Accounts
- Add new account first
- Set as primary
- Remove old account if needed
    `,
    relatedArticleIds: ['pp-001', 'pp-002'],
    helpful: { yes: 156, no: 8 },
    lastUpdated: '2024-01-16',
  },
  // Promotions & Marketing
  {
    id: 'pm-001',
    categoryId: 'promotions-marketing',
    title: 'Creating a promotion',
    description: 'Set up discounts and special offers',
    content: `
## Creating a Promotion

Boost sales with attractive promotions.

### Types of Promotions
- **Percentage Off**: 10%, 20%, etc.
- **Fixed Amount**: TZS 5,000 off
- **Buy One Get One**: BOGO deals
- **Free Shipping**: On qualifying orders

### Creating a Promotion
1. Go to **Marketing > Promotions**
2. Click **Create Promotion**
3. Choose promotion type
4. Set terms and conditions
5. Select applicable products
6. Set start and end dates
7. Publish

### Best Practices
- Clear promotion names
- Reasonable discount levels
- Limited time for urgency
    `,
    relatedArticleIds: ['pm-002', 'pm-003'],
    helpful: { yes: 198, no: 11 },
    lastUpdated: '2024-01-25',
  },
  {
    id: 'pm-002',
    categoryId: 'promotions-marketing',
    title: 'Managing voucher codes',
    description: 'Create and track discount vouchers',
    content: `
## Managing Voucher Codes

Vouchers drive customer loyalty and repeat purchases.

### Creating Vouchers
1. Go to **Marketing > Vouchers**
2. Click **Create Voucher**
3. Enter voucher code
4. Set discount value
5. Define usage limits
6. Activate

### Voucher Settings
- **Usage Limit**: Total redemptions
- **Per Customer**: Limit per buyer
- **Minimum Order**: Required spend
- **Valid Products**: All or specific

### Tracking Performance
Monitor in the Vouchers dashboard:
- Total redemptions
- Revenue generated
- Average order value
    `,
    relatedArticleIds: ['pm-001', 'pm-003'],
    helpful: { yes: 145, no: 7 },
    lastUpdated: '2024-01-17',
  },
  {
    id: 'pm-003',
    categoryId: 'promotions-marketing',
    title: 'Joining platform campaigns',
    description: 'Participate in NBC Sokoni marketing events',
    content: `
## Joining Platform Campaigns

Increase visibility by joining NBC Sokoni campaigns.

### Available Campaigns
NBC Sokoni runs regular campaigns:
- Seasonal sales
- Holiday promotions
- Flash sales
- Category spotlights

### How to Join
1. Go to **Marketing > Platform Campaigns**
2. Browse available campaigns
3. Click **Join Campaign**
4. Select participating products
5. Accept terms
6. Submit for approval

### Benefits
- Increased visibility
- Marketing support
- Higher traffic
- Promotional badges

### Requirements
- Good seller rating
- Sufficient stock
- Competitive pricing
    `,
    relatedArticleIds: ['pm-001', 'pm-002'],
    helpful: { yes: 123, no: 6 },
    lastUpdated: '2024-01-14',
  },
  // Account & Security
  {
    id: 'as-001',
    categoryId: 'account-security',
    title: 'Changing your password',
    description: 'Update your account password securely',
    content: `
## Changing Your Password

Keep your account secure with a strong password.

### How to Change
1. Go to **Settings > Security**
2. Click **Change Password**
3. Enter current password
4. Enter new password
5. Confirm new password
6. Save changes

### Password Requirements
- At least 8 characters
- Mix of letters and numbers
- Special characters recommended
- Not recently used

### Security Tips
- Don't share your password
- Use unique passwords
- Enable two-factor authentication
- Log out on shared devices
    `,
    relatedArticleIds: ['as-002', 'as-003'],
    helpful: { yes: 234, no: 9 },
    lastUpdated: '2024-01-26',
  },
  {
    id: 'as-002',
    categoryId: 'account-security',
    title: 'Managing active sessions',
    description: 'View and control where you are logged in',
    content: `
## Managing Active Sessions

Control which devices have access to your account.

### Viewing Sessions
Go to **Settings > Security** to see:
- Current session
- Other active sessions
- Device and browser info
- Last activity time

### Ending Sessions
If you see unfamiliar sessions:
1. Click **Log Out** next to the session
2. Or click **Log Out All Sessions**
3. Confirm the action

### Security Recommendations
- Regularly review sessions
- Log out unused devices
- Report suspicious activity
- Change password if concerned
    `,
    relatedArticleIds: ['as-001', 'as-003'],
    helpful: { yes: 178, no: 5 },
    lastUpdated: '2024-01-13',
  },
  {
    id: 'as-003',
    categoryId: 'account-security',
    title: 'Updating notification preferences',
    description: 'Control which notifications you receive',
    content: `
## Updating Notification Preferences

Customize how and when you receive updates.

### Notification Types
- **Order Updates**: New orders, status changes
- **Stock Alerts**: Low inventory warnings
- **Payout Notifications**: Withdrawal updates
- **Marketing**: Campaign approvals
- **System Announcements**: Platform updates

### How to Update
1. Go to **Settings > Notifications**
2. Toggle each notification type
3. Changes save automatically

### Delivery Channels
Notifications can arrive via:
- In-app notifications
- Email
- SMS (for critical alerts)

### Recommendations
- Keep order updates on
- Enable stock alerts
- Review marketing frequency
    `,
    relatedArticleIds: ['as-001', 'as-002'],
    helpful: { yes: 89, no: 3 },
    lastUpdated: '2024-01-11',
  },
];

// Support Tickets
export interface TicketMessage {
  id: string;
  sender: 'merchant' | 'support';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'normal' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-2024-001',
    subject: 'Payout not received after 5 days',
    category: 'payments-payouts',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-22T14:15:00Z',
    messages: [
      {
        id: 'msg-001',
        sender: 'merchant',
        senderName: 'You',
        message: 'I requested a payout on January 15th but haven\'t received the funds yet. The status still shows "Processing". Can you help me understand what\'s happening?',
        timestamp: '2024-01-20T10:30:00Z',
      },
      {
        id: 'msg-002',
        sender: 'support',
        senderName: 'Sarah from Support',
        message: 'Thank you for reaching out. I can see your payout request (REF: PAY-2024-0115). There was a delay due to additional verification required by your bank. I\'ve escalated this to our finance team and they\'re working on it.',
        timestamp: '2024-01-20T15:45:00Z',
      },
      {
        id: 'msg-003',
        sender: 'merchant',
        senderName: 'You',
        message: 'Thank you for the update. How long should I expect to wait now?',
        timestamp: '2024-01-21T09:00:00Z',
      },
      {
        id: 'msg-004',
        sender: 'support',
        senderName: 'Sarah from Support',
        message: 'The finance team has confirmed that your payout will be processed within the next 24-48 hours. You\'ll receive a confirmation email once the transfer is complete. I apologize for the inconvenience.',
        timestamp: '2024-01-22T14:15:00Z',
      },
    ],
  },
  {
    id: 'TKT-2024-002',
    subject: 'How to bulk update product prices?',
    category: 'products-inventory',
    priority: 'normal',
    status: 'resolved',
    createdAt: '2024-01-18T08:20:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    messages: [
      {
        id: 'msg-005',
        sender: 'merchant',
        senderName: 'You',
        message: 'I have over 50 products and need to increase all prices by 10%. Is there a way to do this in bulk instead of editing each product individually?',
        timestamp: '2024-01-18T08:20:00Z',
      },
      {
        id: 'msg-006',
        sender: 'support',
        senderName: 'John from Support',
        message: 'Great question! Yes, you can use our bulk actions feature. Go to Products, select the products you want to update using the checkboxes, then click "Bulk Actions" and choose "Update Prices". You can apply a percentage increase or set new prices. Would you like me to walk you through it step by step?',
        timestamp: '2024-01-18T11:00:00Z',
      },
      {
        id: 'msg-007',
        sender: 'merchant',
        senderName: 'You',
        message: 'That\'s exactly what I needed! I found it and it worked perfectly. Thank you!',
        timestamp: '2024-01-18T16:30:00Z',
      },
    ],
  },
  {
    id: 'TKT-2024-003',
    subject: 'Customer claiming product not delivered',
    category: 'orders-fulfillment',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-24T14:00:00Z',
    updatedAt: '2024-01-24T14:00:00Z',
    messages: [
      {
        id: 'msg-008',
        sender: 'merchant',
        senderName: 'You',
        message: 'A customer is saying they didn\'t receive their order (ORD-2024-0189) but the tracking shows it was delivered. They\'re threatening to dispute the charge. What should I do?',
        timestamp: '2024-01-24T14:00:00Z',
      },
    ],
  },
  {
    id: 'TKT-2024-004',
    subject: 'Request to change business name',
    category: 'account-security',
    priority: 'low',
    status: 'closed',
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
    messages: [
      {
        id: 'msg-009',
        sender: 'merchant',
        senderName: 'You',
        message: 'We\'ve rebranded our business and need to update the business name displayed on our store. The new name is "TechGadgets Plus". How can I make this change?',
        timestamp: '2024-01-10T11:00:00Z',
      },
      {
        id: 'msg-010',
        sender: 'support',
        senderName: 'Mary from Support',
        message: 'Thank you for letting us know about your rebrand! Business name changes require verification. Please provide: 1) Updated business registration document, 2) TIN certificate with new name (if applicable). You can attach these to this ticket or email them to verify@nbcsokoni.co.tz',
        timestamp: '2024-01-10T14:30:00Z',
      },
      {
        id: 'msg-011',
        sender: 'merchant',
        senderName: 'You',
        message: 'I\'ve attached the updated registration documents.',
        timestamp: '2024-01-11T10:00:00Z',
        attachments: ['business_registration_2024.pdf'],
      },
      {
        id: 'msg-012',
        sender: 'support',
        senderName: 'Mary from Support',
        message: 'Your documents have been verified and your business name has been updated to "TechGadgets Plus". The change will reflect across the platform within 24 hours. Thank you for your patience!',
        timestamp: '2024-01-12T09:00:00Z',
      },
    ],
  },
];

// Announcements
export interface Announcement {
  id: string;
  type: 'maintenance' | 'feature' | 'policy' | 'general';
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  isRead: boolean;
}

export const announcements: Announcement[] = [
  {
    id: 'ann-001',
    type: 'maintenance',
    title: 'Scheduled Maintenance - January 28th',
    summary: 'Brief system maintenance scheduled for improved performance.',
    content: `
## Scheduled Maintenance Notice

We will be performing scheduled maintenance on **Sunday, January 28th, 2024** from **2:00 AM to 4:00 AM EAT**.

### What to Expect
- The platform will be temporarily unavailable
- Orders placed during this time will be queued
- No data will be lost

### What You Should Do
- Complete any urgent tasks before 2:00 AM
- Inform customers of potential delays
- Resume normal operations after 4:00 AM

### Why This Maintenance?
We're upgrading our servers to provide:
- Faster page loading
- Improved reliability
- Better mobile experience

Thank you for your patience and understanding.
    `,
    publishedAt: '2024-01-25T10:00:00Z',
    isRead: false,
  },
  {
    id: 'ann-002',
    type: 'feature',
    title: 'New Feature: Bulk Product Import',
    summary: 'You can now import multiple products using CSV files.',
    content: `
## Introducing Bulk Product Import

We're excited to announce a new feature that will save you time: **Bulk Product Import**!

### How It Works
1. Download our CSV template
2. Fill in your product details
3. Upload the file
4. Review and confirm

### Supported Fields
- Product name and description
- Pricing
- Categories
- Stock quantities
- Images (via URL)

### Getting Started
Navigate to **Products > Import** to try it out.

### Need Help?
Check our knowledge base article "Bulk importing products" or contact support.
    `,
    publishedAt: '2024-01-20T09:00:00Z',
    isRead: true,
  },
  {
    id: 'ann-003',
    type: 'policy',
    title: 'Updated Seller Fee Structure - Effective February 1st',
    summary: 'Important changes to platform fees starting next month.',
    content: `
## Updated Fee Structure

Effective **February 1st, 2024**, we're updating our fee structure to better support merchants.

### Changes
| Fee Type | Current | New |
|----------|---------|-----|
| Platform Commission | 5.5% | 5.0% |
| Payment Processing | 2.5% | 2.5% |
| Payout Fee | TZS 500 | TZS 0 (Free!) |

### What This Means for You
- **Lower commission**: You keep more of each sale
- **Free payouts**: No more fees for withdrawing your earnings
- **Same great service**: All features remain available

### Questions?
Contact support or check our FAQ for more details.
    `,
    publishedAt: '2024-01-15T14:00:00Z',
    isRead: true,
  },
  {
    id: 'ann-004',
    type: 'general',
    title: 'Holiday Season Tips for Merchants',
    summary: 'Prepare your store for the upcoming holiday rush.',
    content: `
## Holiday Season Preparation Guide

The holiday season is approaching! Here's how to make the most of it.

### Stock Up
- Review last year's bestsellers
- Increase inventory for popular items
- Plan for potential supply delays

### Optimize Listings
- Update product photos
- Refresh descriptions
- Highlight gift-worthy items

### Promotions
- Create holiday-themed vouchers
- Join platform campaigns
- Offer bundle deals

### Customer Service
- Set realistic delivery expectations
- Prepare for higher inquiry volumes
- Consider extended support hours

Good luck with your holiday sales!
    `,
    publishedAt: '2024-01-05T08:00:00Z',
    isRead: true,
  },
];

// Helper function to get articles by category
export const getArticlesByCategory = (categoryId: string): SupportArticle[] => {
  return supportArticles.filter(article => article.categoryId === categoryId);
};

// Helper function to search articles
export const searchArticles = (query: string): SupportArticle[] => {
  const lowerQuery = query.toLowerCase();
  return supportArticles.filter(
    article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to get related articles
export const getRelatedArticles = (articleId: string): SupportArticle[] => {
  const article = supportArticles.find(a => a.id === articleId);
  if (!article) return [];
  return supportArticles.filter(a => article.relatedArticleIds.includes(a.id));
};
