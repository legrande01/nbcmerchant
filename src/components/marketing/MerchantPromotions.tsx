import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit, Pause, Play, StopCircle } from 'lucide-react';
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
  Promotion,
  PromotionStatus,
  PromotionType,
  mockPromotions,
  formatCurrency,
  getPromotionStatusColor,
  getPromotionTypeLabel,
} from '@/data/marketingData';
import { CreatePromotionModal } from './CreatePromotionModal';
import { PromotionDetailsModal } from './PromotionDetailsModal';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function MerchantPromotions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(searchParams.get('action') === 'create');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: 'pause' | 'activate' | 'end'; promotion: Promotion } | null>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setIsCreateModalOpen(true);
    }
    const status = searchParams.get('status');
    if (status) {
      setStatusFilter(status);
    }
  }, [searchParams]);

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = promo.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
    const matchesType = typeFilter === 'all' || promo.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewPromotion = (promo: Promotion) => {
    setSelectedPromotion(promo);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (promotion: Promotion, newStatus: PromotionStatus) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === promotion.id ? { ...p, status: newStatus } : p))
    );
    toast({
      title: 'Promotion Updated',
      description: `"${promotion.name}" has been ${newStatus === 'paused' ? 'paused' : newStatus === 'active' ? 'activated' : 'ended'}.`,
    });
    setConfirmAction(null);
  };

  const handleCreatePromotion = (newPromotion: Promotion) => {
    setPromotions((prev) => [newPromotion, ...prev]);
    setIsCreateModalOpen(false);
    setSearchParams({});
    toast({
      title: 'Promotion Created',
      description: `"${newPromotion.name}" has been created successfully.`,
    });
  };

  const getDiscountDisplay = (promo: Promotion) => {
    switch (promo.type) {
      case 'percentage':
        return `${promo.discountValue}% off`;
      case 'fixed':
        return `${formatCurrency(promo.discountValue)} off`;
      case 'buy_x_get_y':
        return `Buy ${promo.buyQuantity} Get ${promo.getQuantity}`;
      default:
        return '-';
    }
  };

  const getDurationDisplay = (promo: Promotion) => {
    const start = format(new Date(promo.startDate), 'MMM d');
    const end = promo.endDate ? format(new Date(promo.endDate), 'MMM d, yyyy') : 'No end date';
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search promotions..."
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
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardContent className="p-0">
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {search || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'No promotions match your filters.'
                  : "You don't have any promotions yet — create your first promotion."}
              </p>
              {!search && statusFilter === 'all' && typeFilter === 'all' && (
                <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Promotion
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id} className="cursor-pointer" onClick={() => handleViewPromotion(promo)}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>{getPromotionTypeLabel(promo.type)}</TableCell>
                    <TableCell>{getDiscountDisplay(promo)}</TableCell>
                    <TableCell>{getDurationDisplay(promo)}</TableCell>
                    <TableCell>
                      <Badge className={getPromotionStatusColor(promo.status)}>
                        {promo.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => handleViewPromotion(promo)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {promo.status === 'active' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setConfirmAction({ type: 'pause', promotion: promo })}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {promo.status === 'paused' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setConfirmAction({ type: 'activate', promotion: promo })}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {(promo.status === 'active' || promo.status === 'paused') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setConfirmAction({ type: 'end', promotion: promo })}
                          >
                            <StopCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Promotion Modal */}
      <CreatePromotionModal
        open={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSearchParams({});
        }}
        onSubmit={handleCreatePromotion}
      />

      {/* Promotion Details Modal */}
      {selectedPromotion && (
        <PromotionDetailsModal
          promotion={selectedPromotion}
          open={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedPromotion(null);
          }}
        />
      )}

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction?.type === 'pause' && 'Pause Promotion'}
              {confirmAction?.type === 'activate' && 'Activate Promotion'}
              {confirmAction?.type === 'end' && 'End Promotion'}
            </DialogTitle>
            <DialogDescription>
              {confirmAction?.type === 'pause' &&
                `Are you sure you want to pause "${confirmAction.promotion.name}"? Customers won't be able to use this promotion until you reactivate it.`}
              {confirmAction?.type === 'activate' &&
                `Are you sure you want to activate "${confirmAction.promotion.name}"? Customers will be able to start using this promotion immediately.`}
              {confirmAction?.type === 'end' &&
                `Are you sure you want to end "${confirmAction.promotion.name}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>
              Cancel
            </Button>
            <Button
              variant={confirmAction?.type === 'end' ? 'destructive' : 'default'}
              onClick={() => {
                if (confirmAction) {
                  const newStatus: PromotionStatus =
                    confirmAction.type === 'pause'
                      ? 'paused'
                      : confirmAction.type === 'activate'
                      ? 'active'
                      : 'expired';
                  handleStatusChange(confirmAction.promotion, newStatus);
                }
              }}
            >
              {confirmAction?.type === 'pause' && 'Pause'}
              {confirmAction?.type === 'activate' && 'Activate'}
              {confirmAction?.type === 'end' && 'End Promotion'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
