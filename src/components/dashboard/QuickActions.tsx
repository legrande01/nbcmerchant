import { Link } from 'react-router-dom';
import { Plus, Eye, Store, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  variant?: 'default' | 'outline' | 'secondary';
}

const actions: QuickAction[] = [
  {
    title: 'Add New Product',
    description: 'List a new item for sale',
    icon: Plus,
    href: '/products/new',
    variant: 'default',
  },
  {
    title: 'View All Orders',
    description: 'See and manage orders',
    icon: Eye,
    href: '/orders',
    variant: 'outline',
  },
  {
    title: 'Edit Store Profile',
    description: 'Update store details',
    icon: Store,
    href: '/store?tab=profile',
    variant: 'outline',
  },
  {
    title: 'Manage Inventory',
    description: 'Update stock levels',
    icon: Package,
    href: '/products',
    variant: 'outline',
  },
];

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className={cn(
                'h-auto py-4 px-4 flex flex-col items-start gap-1 text-left',
                action.variant === 'default' && 'hover:shadow-md'
              )}
              asChild
            >
              <Link to={action.href}>
                <div className="flex items-center gap-2 mb-1">
                  <action.icon className="h-4 w-4" />
                  <span className="font-semibold text-sm">{action.title}</span>
                </div>
                <span
                  className={cn(
                    'text-xs font-normal',
                    action.variant === 'default'
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                  )}
                >
                  {action.description}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
