import { useState } from 'react';
import { Calendar, Info, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  PlatformCampaign,
  CampaignStatus,
  mockCampaigns,
  formatCurrency,
  getCampaignStatusColor,
} from '@/data/marketingData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function PlatformCampaigns() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<PlatformCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<PlatformCampaign | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleApply = (campaign: PlatformCampaign) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaign.id
          ? { ...c, participationStatus: 'requested' as CampaignStatus, requestedAt: new Date() }
          : c
      )
    );
    setIsApplyOpen(false);
    setSelectedCampaign(null);
    toast({
      title: 'Application Submitted',
      description: `Your application for "${campaign.name}" has been submitted for review.`,
    });
  };

  const getStatusIcon = (status: CampaignStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'requested':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const canApply = (campaign: PlatformCampaign) => {
    return !campaign.participationStatus && new Date(campaign.startDate) > new Date();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          These campaigns are managed by NBC and may require approval. Participation terms are set by the platform.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {campaigns.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No platform campaigns available at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Campaign Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                      </div>
                      {campaign.participationStatus && (
                        <Badge className={getCampaignStatusColor(campaign.participationStatus)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(campaign.participationStatus)}
                            {campaign.participationStatus}
                          </span>
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Discount</span>
                        <p className="font-medium">
                          {campaign.discountType === 'percentage'
                            ? `${campaign.discountValue}% off`
                            : formatCurrency(campaign.discountValue)}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration</span>
                        <p className="font-medium">
                          {format(new Date(campaign.startDate), 'MMM d')} -{' '}
                          {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Categories</span>
                        <p className="font-medium">{campaign.eligibleCategories.join(', ')}</p>
                      </div>
                      {campaign.requestedAt && (
                        <div>
                          <span className="text-muted-foreground">Requested</span>
                          <p className="font-medium">
                            {format(new Date(campaign.requestedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 p-6 bg-muted/30 lg:justify-center lg:items-center lg:w-48">
                    <Button
                      variant="outline"
                      className="flex-1 lg:w-full"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setIsDetailsOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    {canApply(campaign) && (
                      <Button
                        className="flex-1 lg:w-full"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsApplyOpen(true);
                        }}
                      >
                        Apply to Join
                      </Button>
                    )}
                    {campaign.participationStatus === 'approved' && (
                      <Badge variant="outline" className="justify-center py-2">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Participating
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedCampaign?.name}</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedCampaign.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Discount</p>
                  <p className="text-xl font-bold">
                    {selectedCampaign.discountType === 'percentage'
                      ? `${selectedCampaign.discountValue}%`
                      : formatCurrency(selectedCampaign.discountValue)}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {format(new Date(selectedCampaign.startDate), 'MMM d')} -{' '}
                    {format(new Date(selectedCampaign.endDate), 'MMM d')}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Eligible Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.eligibleCategories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedCampaign.participationStatus && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(selectedCampaign.participationStatus)}
                    <span className="font-medium capitalize">
                      {selectedCampaign.participationStatus}
                    </span>
                  </div>
                  {selectedCampaign.requestedAt && (
                    <p className="text-sm text-muted-foreground">
                      Requested on {format(new Date(selectedCampaign.requestedAt), 'MMMM d, yyyy')}
                    </p>
                  )}
                  {selectedCampaign.approvedAt && (
                    <p className="text-sm text-muted-foreground">
                      Approved on {format(new Date(selectedCampaign.approvedAt), 'MMMM d, yyyy')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Confirmation Dialog */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to Campaign</DialogTitle>
            <DialogDescription>
              You are about to apply to participate in "{selectedCampaign?.name}". Your application
              will be reviewed by NBC administrators.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                By applying, you agree to the campaign terms and discount requirements set by NBC.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedCampaign && handleApply(selectedCampaign)}>
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
