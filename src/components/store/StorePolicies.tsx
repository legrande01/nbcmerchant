import { FileText, Lock, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StoreInfo } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface StorePoliciesProps {
  store: StoreInfo;
}

export default function StorePolicies({ store }: StorePoliciesProps) {
  const navigate = useNavigate();
  const policies = [
    {
      title: 'Returns Policy',
      icon: FileText,
      content: store.policies.returns,
    },
    {
      title: 'Shipping Policy',
      icon: FileText,
      content: store.policies.shipping,
    },
    {
      title: 'Terms & Conditions',
      icon: FileText,
      content: store.policies.terms,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            These details are currently managed by the platform. Contact support to request a change.
          </span>
          <Button variant="outline" size="sm" onClick={() => navigate('/support')}>
            Contact Support
          </Button>
        </AlertDescription>
      </Alert>

      {policies.map((policy) => (
        <Card key={policy.title}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <policy.icon className="h-5 w-5" />
                {policy.title}
              </CardTitle>
              <Badge variant="secondary" className="gap-1">
                <Lock className="h-3 w-3" />
                Read Only
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {policy.content}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-dashed">
        <CardContent className="py-8">
          <div className="text-center space-y-3">
            <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-semibold">Need to Update Your Policies?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Platform policies help maintain trust with customers. To request changes, please contact our support team.
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/support')}>
              Request Policy Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
