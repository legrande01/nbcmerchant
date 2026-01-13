import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  XCircle,
  ArrowLeft,
  Package,
  User,
  CreditCard,
  Image,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { getDeliveryById, DriverDelivery } from '@/data/driverData';
import { toast } from '@/hooks/use-toast';

type VerificationType = 'pickup' | 'delivery';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'code' | 'photo';
  completed: boolean;
}

const getPickupSteps = (): VerificationStep[] => [
  {
    id: 'code',
    title: 'Enter Pickup Code',
    description: 'Enter the 4-digit code provided by the merchant',
    icon: <CreditCard className="h-5 w-5" />,
    type: 'code',
    completed: false,
  },
  {
    id: 'goods',
    title: 'Goods Photo',
    description: 'Take a clear photo of the packaged goods',
    icon: <Package className="h-5 w-5" />,
    type: 'photo',
    completed: false,
  },
  {
    id: 'id',
    title: 'ID Photo',
    description: 'Take a photo of your identification',
    icon: <CreditCard className="h-5 w-5" />,
    type: 'photo',
    completed: false,
  },
  {
    id: 'selfie',
    title: 'Selfie',
    description: 'Take a selfie for verification',
    icon: <User className="h-5 w-5" />,
    type: 'photo',
    completed: false,
  },
];

const getDeliverySteps = (): VerificationStep[] => [
  {
    id: 'delivery_photo',
    title: 'Delivery Photo',
    description: 'Take a photo as proof of delivery',
    icon: <Image className="h-5 w-5" />,
    type: 'photo',
    completed: false,
  },
];

const proofStatusConfig: Record<string, { label: string; variant: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending Review', variant: 'pending', icon: null },
  approved: { label: 'Approved', variant: 'success', icon: <CheckCircle2 className="h-4 w-4" /> },
  rejected: { label: 'Rejected', variant: 'destructive', icon: <XCircle className="h-4 w-4" /> },
};

export default function DriverVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const deliveryId = searchParams.get('delivery');
  const verificationType = (searchParams.get('type') || 'pickup') as VerificationType;
  
  const delivery = deliveryId ? getDeliveryById(deliveryId) : null;
  
  const [steps, setSteps] = useState<VerificationStep[]>(
    verificationType === 'pickup' ? getPickupSteps() : getDeliverySteps()
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [pickupCode, setPickupCode] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, boolean>>({});

  if (!delivery) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Delivery not found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/driver/deliveries')}
          >
            Back to Deliveries
          </Button>
        </Card>
      </div>
    );
  }

  const progress = (steps.filter(s => s.completed).length / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const allCompleted = steps.every(s => s.completed);

  const handleCodeSubmit = () => {
    if (pickupCode.length === 4) {
      const updatedSteps = [...steps];
      updatedSteps[currentStep].completed = true;
      setSteps(updatedSteps);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
      toast({
        title: 'Code Verified',
        description: 'Pickup code has been verified successfully.',
      });
    }
  };

  const handlePhotoUpload = (stepId: string) => {
    // Simulate photo upload
    setUploadedPhotos(prev => ({ ...prev, [stepId]: true }));
    
    const updatedSteps = [...steps];
    const stepIndex = steps.findIndex(s => s.id === stepId);
    if (stepIndex !== -1) {
      updatedSteps[stepIndex].completed = true;
      setSteps(updatedSteps);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
    
    toast({
      title: 'Photo Uploaded',
      description: 'Your photo has been uploaded successfully.',
    });
  };

  const handleComplete = () => {
    toast({
      title: verificationType === 'pickup' ? 'Pickup Confirmed' : 'Delivery Proof Submitted',
      description: verificationType === 'pickup' 
        ? 'You can now proceed to deliver the order.'
        : 'Waiting for buyer confirmation.',
    });
    navigate(`/driver/deliveries?selected=${delivery.id}`);
  };

  // Show read-only view for already verified or disputed deliveries
  if (delivery.status === 'dispute' || delivery.status === 'delivered') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/driver/deliveries?selected=${delivery.id}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Delivery
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>{delivery.orderNumber}</CardDescription>
              </div>
              <Badge variant={proofStatusConfig[delivery.proof.proofStatus].variant as any}>
                {proofStatusConfig[delivery.proof.proofStatus].icon}
                <span className="ml-1">{proofStatusConfig[delivery.proof.proofStatus].label}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {delivery.proof.proofStatus === 'rejected' && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive">Proof Rejected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {delivery.proof.rejectionReason || 'Your delivery proof was rejected.'}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-medium">Pickup Verification</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Pickup Code: {delivery.proof.pickupCode}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Goods Photo</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ID Photo</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Selfie</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Delivery Verification</h4>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                {delivery.proof.deliveryVerified ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm">Delivery Photo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(`/driver/deliveries?selected=${delivery.id}`)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Delivery
      </Button>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {verificationType === 'pickup' ? 'Pickup Verification' : 'Delivery Verification'}
              </CardTitle>
              <CardDescription>{delivery.orderNumber} • {delivery.merchantName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>

      {/* Steps Overview */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={currentStep === index ? 'default' : step.completed ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => !step.completed && setCurrentStep(index)}
            className={cn(
              'flex-shrink-0',
              step.completed && 'bg-green-100 text-green-700 hover:bg-green-200'
            )}
          >
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 mr-1" />
            ) : (
              <span className="w-5 h-5 rounded-full bg-muted text-xs flex items-center justify-center mr-1">
                {index + 1}
              </span>
            )}
            {step.title}
          </Button>
        ))}
      </div>

      {/* Current Step Card */}
      {!allCompleted && currentStepData && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                {currentStepData.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentStepData.type === 'code' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-code">4-Digit Pickup Code</Label>
                  <Input
                    id="pickup-code"
                    placeholder="0000"
                    value={pickupCode}
                    onChange={(e) => setPickupCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Ask the merchant for the pickup code displayed on their order
                  </p>
                </div>
                <Button 
                  onClick={handleCodeSubmit}
                  disabled={pickupCode.length !== 4}
                  className="w-full"
                >
                  Verify Code
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className={cn(
                    'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                    uploadedPhotos[currentStepData.id] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-muted-foreground/25 hover:border-primary'
                  )}
                  onClick={() => handlePhotoUpload(currentStepData.id)}
                >
                  {uploadedPhotos[currentStepData.id] ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
                      <p className="font-medium text-green-700">Photo Uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="font-medium">Tap to take photo</p>
                      <p className="text-sm text-muted-foreground">or upload from gallery</p>
                    </div>
                  )}
                </div>
                
                {!uploadedPhotos[currentStepData.id] && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handlePhotoUpload(currentStepData.id)}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handlePhotoUpload(currentStepData.id)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Completion Card */}
      {allCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {verificationType === 'pickup' ? 'Pickup Complete!' : 'Delivery Proof Submitted!'}
            </h3>
            <p className="text-green-700 mb-6">
              {verificationType === 'pickup' 
                ? 'All verification steps completed. You can now proceed to deliver the order.'
                : 'Your delivery proof has been submitted. Waiting for buyer confirmation.'}
            </p>
            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
