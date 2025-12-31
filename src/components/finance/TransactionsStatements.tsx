import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTransactions, formatTZS } from '@/data/financeData';
import { Download, FileText, ArrowUpRight, ArrowDownRight, Receipt, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsStatements() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [month, setMonth] = useState<string>('all');

  const filteredTransactions = month === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(tx => {
        const txMonth = new Date(tx.date).getMonth();
        return txMonth === parseInt(month);
      });

  const handleExportCSV = () => {
    toast({
      title: 'Export Started',
      description: 'Your transactions are being exported to CSV. Download will begin shortly.',
    });
  };

  const handleGenerateStatement = () => {
    toast({
      title: 'Statement Generated',
      description: 'Your monthly statement has been generated and is ready for download.',
    });
  };

  const handleRetry = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
    }, 1000);
  };

  if (hasError) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div>
            <h3 className="font-semibold text-lg">Failed to load transactions</h3>
            <p className="text-muted-foreground">There was an error loading your transaction history.</p>
          </div>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="0">January</SelectItem>
                <SelectItem value="1">February</SelectItem>
                <SelectItem value="2">March</SelectItem>
                <SelectItem value="3">April</SelectItem>
                <SelectItem value="4">May</SelectItem>
                <SelectItem value="5">June</SelectItem>
                <SelectItem value="6">July</SelectItem>
                <SelectItem value="7">August</SelectItem>
                <SelectItem value="8">September</SelectItem>
                <SelectItem value="9">October</SelectItem>
                <SelectItem value="10">November</SelectItem>
                <SelectItem value="11">December</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handleGenerateStatement}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Statement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No transactions found</p>
              <p className="text-sm">
                {mockTransactions.length === 0 
                  ? "You don't have any transactions yet." 
                  : "No transactions match your current filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="min-w-[250px]">Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance After</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/50">
                      <TableCell className="whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'p-1.5 rounded-full',
                            tx.type === 'credit' 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-red-100 dark:bg-red-900/30'
                          )}>
                            {tx.type === 'credit' ? (
                              <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <span className="text-sm">{tx.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            tx.type === 'credit' 
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                          )}
                        >
                          {tx.type === 'credit' ? 'Credit' : 'Debit'}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn(
                        'text-right font-medium',
                        tx.type === 'credit' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      )}>
                        {tx.type === 'credit' ? '+' : '-'}{formatTZS(tx.amount)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatTZS(tx.balanceAfter)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
