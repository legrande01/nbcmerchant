import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function AdminDrivers() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Drivers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Transport Admin drivers management module will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
