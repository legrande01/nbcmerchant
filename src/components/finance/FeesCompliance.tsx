import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  Percent, 
  CreditCard, 
  Wallet, 
  FileText,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { mockFeesInfo, formatTZS } from '@/data/financeData';

export function FeesCompliance() {
  return (
    <div className="space-y-6">
      {/* Read-only Notice */}
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>Platform-Controlled Settings</AlertTitle>
        <AlertDescription>
          These values are controlled by the platform and cannot be changed. Contact support if you have questions about fees.
        </AlertDescription>
      </Alert>

      {/* Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commission Rate</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockFeesInfo.commissionRate}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">Per sale</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Percent className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Processing</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockFeesInfo.paymentProcessingFee}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">Per payout</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Minimum Payout</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {formatTZS(mockFeesInfo.minimumPayout).replace('TZS ', '')}
                </p>
                <p className="text-xs text-muted-foreground mt-2">TZS minimum</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tax Withholding</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockFeesInfo.taxWithholdingRate}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">WHT rate</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Fee Examples
          </CardTitle>
          <CardDescription>
            Here's how fees work on different transaction amounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sale Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Commission (3%)</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">You Receive</th>
                </tr>
              </thead>
              <tbody>
                {[50000, 100000, 250000, 500000, 1000000].map((amount) => {
                  const commission = amount * (mockFeesInfo.commissionRate / 100);
                  const net = amount - commission;
                  return (
                    <tr key={amount} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{formatTZS(amount)}</td>
                      <td className="py-3 px-4 text-destructive">-{formatTZS(commission)}</td>
                      <td className="py-3 px-4 font-semibold text-primary">{formatTZS(net)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tax & Compliance Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Tax & Compliance Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Withholding Tax (WHT)</h4>
            <p className="text-sm text-muted-foreground">
              A {mockFeesInfo.taxWithholdingRate}% withholding tax is applied to all payouts as required by 
              Tanzania Revenue Authority (TRA) regulations. This is deducted at source and remitted 
              on your behalf.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">VAT Treatment</h4>
            <p className="text-sm text-muted-foreground">
              Platform commission fees are subject to 18% VAT. All displayed commission rates are 
              inclusive of VAT. You will receive a tax invoice for all fees charged.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Annual Tax Statements</h4>
            <p className="text-sm text-muted-foreground">
              At the end of each financial year, you will receive a comprehensive tax statement 
              summarizing all earnings, fees, and withholdings for your records and tax filing purposes.
            </p>
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              <strong>Refunds Policy:</strong> Refunds are handled by platform administrators. 
              If a customer requests a refund, it will be reviewed by NBC support and processed 
              according to platform policies.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
