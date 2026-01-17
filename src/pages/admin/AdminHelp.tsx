import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function AdminHelp() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Transport Admin help and support module will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
