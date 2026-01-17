import { Store, Truck, ChevronDown, Check } from 'lucide-react';
import { useRole, UserRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const roleConfig: Record<UserRole, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  merchant: {
    label: 'Merchant',
    icon: Store,
  },
  driver: {
    label: 'Driver',
    icon: Truck,
  },
};

export function RoleSwitcher() {
  const { currentRole, setCurrentRole, hasMultipleRoles, user } = useRole();
  const navigate = useNavigate();

  if (!hasMultipleRoles || !user) {
    return null;
  }

  const CurrentIcon = roleConfig[currentRole].icon;

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-secondary border-border hover:bg-secondary/80"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{roleConfig[currentRole].label}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {user.roles.map((role) => {
          const Icon = roleConfig[role].icon;
          const isActive = role === currentRole;
          return (
            <DropdownMenuItem
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                isActive && 'bg-accent'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{roleConfig[role].label}</span>
              {isActive && <Check className="h-4 w-4 ml-auto text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
