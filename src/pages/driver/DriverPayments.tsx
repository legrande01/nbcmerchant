import { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  driverPayments, 
  getDriverEarningsSummary, 
  formatCurrency,
  PaymentStatus 
} from '@/data/driverPaymentsData';

const statusConfig: Record<PaymentStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
  pending: { 
    label: 'Pending', 
    variant: 'secondary',
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  },
  confirmed: { 
    label: 'Confirmed', 
    variant: 'default',
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  },
  dispute: { 
    label: 'Dispute', 
    variant: 'destructive',
    className: 'bg-red-500/10 text-red-600 border-red-500/20'
  },
};

export default function DriverPayments() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const earnings = getDriverEarningsSummary();

  const filteredPayments = statusFilter === 'all' 
    ? driverPayments 
    : driverPayments.filter(p => p.status === statusFilter);

  const kpiCards = [
    {
      title: "Today's Earnings",
      value: formatCurrency(earnings.todayEarnings),
      icon: Calendar,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'This Week',
      value: formatCurrency(earnings.weekEarnings),
      icon: TrendingUp,
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'This Month',
      value: formatCurrency(earnings.monthEarnings),
      icon: Wallet,
      trend: '+15%',
      trendUp: true,
    },
    {
      title: 'Pending Earnings',
      value: formatCurrency(earnings.pendingEarnings),
      icon: Clock,
      subtitle: 'Awaiting confirmation',
    },
    {
      title: 'Confirmed Earnings',
      value: formatCurrency(earnings.confirmedEarnings),
      icon: CheckCircle,
      subtitle: 'Ready for payout',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground">Track your earnings and delivery payments</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className={index < 3 ? 'col-span-1' : 'col-span-1'}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">{kpi.title}</p>
                  <p className="text-lg font-bold text-foreground">{kpi.value}</p>
                  {kpi.trend && (
                    <div className={`flex items-center gap-1 text-xs ${kpi.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                      {kpi.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.trend} vs last period
                    </div>
                  )}
                  {kpi.subtitle && (
                    <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                  )}
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <kpi.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Ledger */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg">Delivery Ledger</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="dispute">Dispute</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden sm:table-cell">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    <span className="text-primary">{payment.orderId}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div>
                      <p className="font-medium text-sm">{payment.customerName}</p>
                      <p className="text-xs text-muted-foreground">{payment.deliveryAddress}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {format(new Date(payment.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusConfig[payment.status].className}
                    >
                      {payment.status === 'dispute' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {statusConfig[payment.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/driver/deliveries?order=${payment.orderId}`)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">How Earnings Work</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your earnings are confirmed immediately after the buyer confirms delivery. 
                Confirmed earnings are included in your next payout cycle. Disputed deliveries 
                are resolved within 24-48 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
