import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  Megaphone,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  tooltip?: string;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Store Management', href: '/store', icon: Store },
  { title: 'Products', href: '/products', icon: Package },
  { title: 'Orders', href: '/orders', icon: ShoppingCart },
  { title: 'Payments', href: '/finance', icon: CreditCard },
  { title: 'Marketing', href: '/marketing', icon: Megaphone, disabled: true, tooltip: 'Coming soon' },
  { title: 'Reports', href: '/reports', icon: BarChart3, disabled: true, tooltip: 'Coming soon' },
];

const bottomNavItems: NavItem[] = [
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Support', href: '/support', icon: HelpCircle },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({ collapsed, onToggle, isMobile, onMobileClose }: AppSidebarProps) {
  const location = useLocation();

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.href;
    
    const linkContent = (
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
          item.disabled && 'opacity-50 cursor-not-allowed',
          collapsed && !isMobile && 'justify-center px-2'
        )}
      >
        <item.icon className={cn('h-5 w-5 flex-shrink-0')} />
        {(!collapsed || isMobile) && (
          <span className="text-sm font-medium">{item.title}</span>
        )}
      </div>
    );

    if (item.disabled) {
      return (
        <Tooltip key={item.href} delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="cursor-not-allowed">{linkContent}</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-foreground text-background">
            {item.tooltip}
          </TooltipContent>
        </Tooltip>
      );
    }

    if (collapsed && !isMobile) {
      return (
        <Tooltip key={item.href} delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink
              to={item.href}
              onClick={onMobileClose}
            >
              {linkContent}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-foreground text-background">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <NavLink
        key={item.href}
        to={item.href}
        onClick={onMobileClose}
      >
        {linkContent}
      </NavLink>
    );
  };

  return (
    <aside
      className={cn(
        'bg-sidebar flex flex-col h-full transition-all duration-300',
        collapsed && !isMobile ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-sidebar-border',
        collapsed && !isMobile ? 'justify-center' : 'gap-3'
      )}>
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-accent-foreground font-bold text-sm">NBC</span>
        </div>
        {(!collapsed || isMobile) && (
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-semibold text-sm">NBC Sokoni</span>
            <span className="text-sidebar-muted text-xs">Merchant Portal</span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNavItems.map(renderNavItem)}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map(renderNavItem)}
      </div>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <div className="px-3 py-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              'w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
              collapsed ? 'justify-center' : 'justify-start gap-2'
            )}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span className="text-sm">Collapse</span>}
          </Button>
        </div>
      )}
    </aside>
  );
}
