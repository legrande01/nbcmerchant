import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Copy, Trash2, Power, PowerOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Voucher,
  VoucherStatus,
  mockVouchers,
  formatCurrency,
  getVoucherStatusColor,
} from '@/data/marketingData';
import { CreateVoucherModal } from './CreateVoucherModal';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function VouchersManagement() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(searchParams.get('action') === 'create');
  const [confirmDelete, setConfirmDelete] = useState<Voucher | null>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setIsCreateModalOpen(true);
    }
  }, [searchParams]);

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch = voucher.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || voucher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code Copied',
      description: `"${code}" has been copied to clipboard.`,
    });
  };

  const handleToggleStatus = (voucher: Voucher) => {
    const newStatus: VoucherStatus = voucher.status === 'active' ? 'inactive' : 'active';
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucher.id ? { ...v, status: newStatus } : v))
    );
    toast({
      title: 'Voucher Updated',
      description: `"${voucher.code}" has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleDelete = (voucher: Voucher) => {
    setVouchers((prev) => prev.filter((v) => v.id !== voucher.id));
    setConfirmDelete(null);
    toast({
      title: 'Voucher Deleted',
      description: `"${voucher.code}" has been deleted.`,
    });
  };

  const handleCreateVoucher = (newVoucher: Voucher) => {
    setVouchers((prev) => [newVoucher, ...prev]);
    setIsCreateModalOpen(false);
    toast({
      title: 'Voucher Created',
      description: `"${newVoucher.code}" has been created successfully.`,
    });
  };

  const getDiscountDisplay = (voucher: Voucher) => {
    return voucher.type === 'percentage'
      ? `${voucher.discountValue}%`
      : formatCurrency(voucher.discountValue);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search voucher codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Voucher
        </Button>
      </div>

      {/* Vouchers Table */}
      <Card>
        <CardContent className="p-0">
          {filteredVouchers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {search || statusFilter !== 'all'
                  ? 'No vouchers match your filters.'
                  : "You don't have any vouchers yet — create your first voucher."}
              </p>
              {!search && statusFilter === 'all' && (
                <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Voucher
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Min. Spend</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {voucher.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleCopyCode(voucher.code)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{getDiscountDisplay(voucher)}</TableCell>
                    <TableCell>
                      {voucher.minimumSpend ? formatCurrency(voucher.minimumSpend) : '-'}
                    </TableCell>
                    <TableCell>
                      {voucher.expiryDate
                        ? format(new Date(voucher.expiryDate), 'MMM d, yyyy')
                        : 'No expiry'}
                    </TableCell>
                    <TableCell>
                      {voucher.currentUsage}
                      {voucher.usageLimit && ` / ${voucher.usageLimit}`}
                    </TableCell>
                    <TableCell>
                      <Badge className={getVoucherStatusColor(voucher.status)}>
                        {voucher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {voucher.status !== 'expired' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleStatus(voucher)}
                          >
                            {voucher.status === 'active' ? (
                              <PowerOff className="h-4 w-4" />
                            ) : (
                              <Power className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setConfirmDelete(voucher)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Voucher Modal */}
      <CreateVoucherModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateVoucher}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Voucher</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the voucher "{confirmDelete?.code}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
