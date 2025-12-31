import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  getPayoutById, 
  formatTZS, 
  getPayoutStatusColor,
  payoutStatusLabels 
} from '@/data/financeData';
import { 
  ArrowLeft, 
  Building2, 
  Smartphone, 
  Copy, 
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function PayoutDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const payout = getPayoutById(id || '');

  if (!payout) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Payout not found</h2>
        <p className="text-muted-foreground mb-4">The payout you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/finance')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Finance
        </Button>
      </div>
    );
  }

  const copyReference = () => {
    navigator.clipboard.writeText(payout.referenceNumber);
    toast({
      title: 'Copied',
      description: 'Reference number copied to clipboard',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/finance')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{payout.payoutNumber}</h1>
            <Badge className={cn('font-medium', getPayoutStatusColor(payout.status))}>
              {payoutStatusLabels[payout.status]}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Requested on {new Date(payout.requestedAt).toLocaleDateString()} at{' '}
            {new Date(payout.requestedAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Amount Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Gross Amount</span>
                <span className="font-medium">{formatTZS(payout.grossAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Processing Fees</span>
                <span className="font-medium text-destructive">-{formatTZS(payout.fees)}</span>
              </div>
              <div className="flex justify-between py-3 bg-muted/50 rounded-lg px-3">
                <span className="font-semibold">Net Payout</span>
                <span className="text-xl font-bold text-primary">{formatTZS(payout.netAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payout.timeline.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        entry.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30' :
                        entry.status === 'failed' ? 'bg-red-100 dark:bg-red-900/30' :
                        entry.status === 'processing' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-yellow-100 dark:bg-yellow-900/30'
                      )}>
                        {getStatusIcon(entry.status)}
                      </div>
                      {index < payout.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{payoutStatusLabels[entry.status]}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Reference Number */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reference Number</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="flex-1 text-sm font-mono break-all">{payout.referenceNumber}</code>
                <Button variant="ghost" size="icon" onClick={copyReference}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payout Destination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {payout.destination.type === 'bank' ? (
                  <Building2 className="h-5 w-5" />
                ) : (
                  <Smartphone className="h-5 w-5" />
                )}
                Payout Destination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {payout.destination.type === 'bank' ? (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Name</p>
                    <p className="font-medium">{payout.destination.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Holder</p>
                    <p className="font-medium">{payout.destination.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <p className="font-medium font-mono">{payout.destination.accountNumber}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile Provider</p>
                    <p className="font-medium">{payout.destination.mobileProvider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Holder</p>
                    <p className="font-medium">{payout.destination.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile Number</p>
                    <p className="font-medium font-mono">{payout.destination.mobileNumber}</p>
                  </div>
                </>
              )}
              
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  These payout details were provided during onboarding or account setup.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Processed Date (if paid) */}
          {payout.processedAt && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {new Date(payout.processedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  at {new Date(payout.processedAt).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
