import { Link } from 'react-router-dom';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomerReview, formatDate } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-3 w-3',
            star <= rating ? 'text-warning fill-warning' : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
}

export function CustomerReviews({ reviews, className }: CustomerReviewsProps) {
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  if (reviews.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No reviews yet. Reviews will appear here when customers leave feedback.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Customer Reviews
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="text-sm font-semibold">{averageRating}</span>
            <span className="text-xs text-muted-foreground">({reviews.length})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{review.customerName}</span>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                {review.comment}
              </p>
              <p className="text-xs text-muted-foreground/70">
                Re: {review.productName}
              </p>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-3 text-xs" asChild>
          <Link to="/reports?tab=customers">
            View All Reviews
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}