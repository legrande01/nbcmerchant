import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DateRange } from 'react-day-picker';
import { OrderFilters } from '@/components/orders/OrderFilters';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { mockOrders, OrderStatus, PaymentStatus } from '@/data/mockData';

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filters from URL params (for Dashboard integration)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [paymentFilter, setPaymentFilter] = useState(searchParams.get('payment') || 'all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isLoading] = useState(false);

  // Update URL when status filter changes
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    if (value === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', value);
    }
    setSearchParams(searchParams);
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      // Payment filter
      const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;

      // Date range filter
      let matchesDate = true;
      if (dateRange?.from) {
        const orderDate = new Date(order.createdAt);
        matchesDate = orderDate >= dateRange.from;
        if (dateRange.to) {
          matchesDate = matchesDate && orderDate <= dateRange.to;
        }
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [searchQuery, statusFilter, paymentFilter, dateRange]);

  // Count active filters
  const activeFiltersCount = [
    statusFilter !== 'all',
    paymentFilter !== 'all',
    dateRange?.from !== undefined,
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateRange(undefined);
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        paymentFilter={paymentFilter}
        onPaymentChange={setPaymentFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={handleClearFilters}
      />

      <OrdersTable orders={filteredOrders} isLoading={isLoading} />
    </div>
  );
}
