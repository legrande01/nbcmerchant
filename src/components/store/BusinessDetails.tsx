import { Building2, Lock, FileCheck, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { StoreInfo, formatDate } from '@/data/mockData';

interface BusinessDetailsProps {
  store: StoreInfo;
}

export default function BusinessDetails({ store }: BusinessDetailsProps) {
  const details = store.businessDetails;
  
  const detailItems = [
    {
      label: 'Registered Business Name',
      value: details.registeredName,
      icon: Building2,
    },
    {
      label: 'Tax Identification Number (TIN)',
      value: details.tin,
      icon: FileCheck,
    },
    {
      label: 'Business Registration Number',
      value: details.registrationNumber,
      icon: FileCheck,
    },
    {
      label: 'Registered Address',
      value: details.registeredAddress,
      icon: MapPin,
    },
    {
      label: 'Registration Date',
      value: formatDate(details.registrationDate),
      icon: Calendar,
    },
    {
      label: 'Business Type',
      value: details.businessType,
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          This information is pulled from TRA/BRELA and cannot be edited here. If you notice any errors, please contact the relevant authorities.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Registered Business Information
              </CardTitle>
              <CardDescription className="mt-1">
                Official business registration details from TRA/BRELA
              </CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Lock className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {detailItems.map((item, index) => (
            <div key={item.label}>
              {index > 0 && <Separator className="my-4" />}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium mt-0.5">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-dashed bg-muted/30">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Verification Status</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your business has been verified with Tanzania Revenue Authority (TRA) and 
                Business Registrations and Licensing Agency (BRELA). This verification helps 
                build trust with your customers.
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant="success">TRA Verified</Badge>
                <Badge variant="success">BRELA Registered</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
