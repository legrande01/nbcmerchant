import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Store, Truck } from 'lucide-react';

export default function Auth() {
  const { isAuthenticated, login } = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { success, error } = await login(email, password);
    
    if (success) {
      toast.success('Welcome back!');
    } else {
      toast.error('Login failed', { description: error });
    }
    
    setIsSubmitting(false);
  };

  const fillDemoCredentials = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Store className="h-8 w-8 text-primary" />
              <Truck className="h-6 w-6 text-primary/70" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">NBC Sokoni</h1>
          <p className="text-muted-foreground">Merchant & Driver Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in with demo credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">Demo Accounts</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => fillDemoCredentials('merchant@demo.com')}
                >
                  <Store className="h-4 w-4" />
                  Merchant: merchant@demo.com
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => fillDemoCredentials('driver@demo.com')}
                >
                  <Truck className="h-4 w-4" />
                  Driver: driver@demo.com
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => fillDemoCredentials('admin@demo.com')}
                >
                  <Store className="h-4 w-4" />
                  <Truck className="h-4 w-4 -ml-2" />
                  Both Roles: admin@demo.com
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Password for all: <code className="bg-muted px-1 rounded">demo123</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
