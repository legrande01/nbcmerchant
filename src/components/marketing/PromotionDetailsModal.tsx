import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Promotion,
  formatCurrency,
  getPromotionStatusColor,
  getPromotionTypeLabel,
} from '@/data/marketingData';
import { format } from 'date-fns';
import { Calendar, Tag, Users, Target, TrendingUp } from 'lucide-react';

interface PromotionDetailsModalProps {
  promotion: Promotion;
  open: boolean;
  onClose: () => void;
}

export function PromotionDetailsModal({ promotion, open, onClose }: PromotionDetailsModalProps) {
  const getDiscountDisplay = () => {
    switch (promotion.type) {
      case 'percentage':
        return `${promotion.discountValue}% off`;
      case 'fixed':
        return `${formatCurrency(promotion.discountValue)} off`;
      case 'buy_x_get_y':
        return `Buy ${promotion.buyQuantity} Get ${promotion.getQuantity} Free`;
      default:
        return '-';
    }
  };

  const getApplyToDisplay = () => {
    switch (promotion.applyTo) {
      case 'entire_store':
        return 'All Products';
      case 'selected_categories':
        return promotion.appliedCategories.length > 0
          ? promotion.appliedCategories.join(', ')
          : 'Selected Categories';
      case 'selected_products':
        return `${promotion.appliedProducts.length} Products`;
      default:
        return '-';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{promotion.name}</DialogTitle>
            <Badge className={getPromotionStatusColor(promotion.status)}>
              {promotion.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Discount Info */}
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
            <Tag className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-primary">{getDiscountDisplay()}</p>
              <p className="text-sm text-muted-foreground">{getPromotionTypeLabel(promotion.type)}</p>
            </div>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm">Applies To</span>
              </div>
              <p className="font-medium">{getApplyToDisplay()}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-medium">
                {format(new Date(promotion.startDate), 'MMM d, yyyy')}
                {promotion.endDate && (
                  <> - {format(new Date(promotion.endDate), 'MMM d, yyyy')}</>
                )}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Usage</span>
              </div>
              <p className="font-medium">
                {promotion.currentRedemptions}
                {promotion.totalRedemptionLimit && ` / ${promotion.totalRedemptionLimit}`}
                {' redemptions'}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Revenue Impact</span>
              </div>
              <p className="font-medium">{formatCurrency(promotion.revenue)}</p>
            </div>
          </div>

          <Separator />

          {/* Limits */}
          <div className="space-y-2">
            <h4 className="font-medium">Limits</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Per Customer:</span>{' '}
                {promotion.usagePerCustomer || 'Unlimited'}
              </div>
              <div>
                <span className="text-muted-foreground">Total:</span>{' '}
                {promotion.totalRedemptionLimit || 'Unlimited'}
              </div>
            </div>
          </div>

          {/* Created Date */}
          <p className="text-sm text-muted-foreground">
            Created on {format(new Date(promotion.createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
