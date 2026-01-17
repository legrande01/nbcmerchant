import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRole, UserRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Store, Truck, Building2 } from 'lucide-react';

// Demo account configuration with role mapping
const DEMO_ACCOUNTS = {
  merchant: {
    email: 'merchant@demo.com',
    password: 'demo123',
    name: 'Demo Merchant',
    role: 'merchant' as UserRole,
    redirectPath: '/',
  },
  driver: {
    email: 'driver@demo.com',
    password: 'demo123',
    name: 'Demo Driver',
    role: 'driver' as UserRole,
    redirectPath: '/',
  },
  transport_admin: {
    email: 'admin@demo.com',
    password: 'demo123',
    name: 'Demo Transport Admin',
    role: 'transport_admin' as UserRole,
    redirectPath: '/',
  },
};

export default function Auth() {
  const navigate = useNavigate();
  const { isAuthenticated, loginDemo, login, isLoading } = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { success, error } = await login(email, password);
    
    if (success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error('Login failed', { description: error });
    }
    
    setIsSubmitting(false);
  };

  const handleDemoLogin = async (demoType: 'merchant' | 'driver' | 'transport_admin') => {
    setIsSubmitting(true);
    const demoAccount = DEMO_ACCOUNTS[demoType];
    
    const { success, error } = await loginDemo(
      demoAccount.email,
      demoAccount.password,
      demoAccount.role,
      demoAccount.name
    );
    
    if (success) {
      toast.success(`Welcome, ${demoAccount.name}!`);
      navigate(demoAccount.redirectPath);
    } else {
      toast.error('Demo login failed', { description: error });
    }
    
    setIsSubmitting(false);
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
          <p className="text-muted-foreground">Merchant, Driver & Admin Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
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

            {/* Quick Demo Accounts */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Quick Demo Access
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => handleDemoLogin('merchant')}
                  disabled={isSubmitting}
                >
                  <Store className="h-4 w-4" />
                  Merchant Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => handleDemoLogin('driver')}
                  disabled={isSubmitting}
                >
                  <Truck className="h-4 w-4" />
                  Driver Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => handleDemoLogin('transport_admin')}
                  disabled={isSubmitting}
                >
                  <Building2 className="h-4 w-4" />
                  Transport Admin Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
