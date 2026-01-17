import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { DeliveryProvider } from "@/contexts/DeliveryContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

// Lazy import pages
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import Products from "@/pages/Products";
import NewProduct from "@/pages/NewProduct";
import ProductDetail from "@/pages/ProductDetail";
import EditProduct from "@/pages/EditProduct";
import StoreManagement from "@/pages/StoreManagement";
import Finance from "@/pages/Finance";
import PayoutDetails from "@/pages/PayoutDetails";
import Settings from "@/pages/Settings";
import Marketing from "@/pages/Marketing";
import Reports from "@/pages/Reports";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import DriverDashboard from "@/pages/driver/DriverDashboard";
import DriverDeliveries from "@/pages/driver/DriverDeliveries";
import DriverVerification from "@/pages/driver/DriverVerification";
import DriverProfile from "@/pages/driver/DriverProfile";
import DriverPayments from "@/pages/driver/DriverPayments";
import DriverHelp from "@/pages/driver/DriverHelp";
import AdminDeliveries from "@/pages/admin/AdminDeliveries";
import AdminDrivers from "@/pages/admin/AdminDrivers";
import AdminFleet from "@/pages/admin/AdminFleet";
import AdminHelp from "@/pages/admin/AdminHelp";
import AdminSettings from "@/pages/admin/AdminSettings";
const queryClient = new QueryClient();

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isRoleLoading } = useRole();

  if (isRoleLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

// Role-based dashboard selector
function RoleDashboard() {
  const { currentRole } = useRole();
  
  if (currentRole === 'driver') {
    return <DriverDashboard />;
  }
  
  if (currentRole === 'transport_admin') {
    return <Navigate to="/admin/deliveries" replace />;
  }
  
  return <Dashboard />;
}

// Main routes component - MUST be inside both AuthProvider and RoleProvider
function AppRoutes() {
  const { isLoading } = useAuth();
  const { isRoleLoading } = useRole();
  
  // Show loading screen while auth or role is being determined
  if (isLoading || isRoleLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthRoute />} />
      
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Role-based dashboard */}
        <Route index element={<RoleDashboard />} />
        
        {/* Merchant routes */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<NewProduct />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="store" element={<StoreManagement />} />
        <Route path="finance" element={<Finance />} />
        <Route path="finance/payouts/:id" element={<PayoutDetails />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="reports" element={<Reports />} />
        
        {/* Driver routes */}
        <Route path="driver/deliveries" element={<DriverDeliveries />} />
        <Route path="driver/verification" element={<DriverVerification />} />
        <Route path="driver/payments" element={<DriverPayments />} />
        <Route path="driver/profile" element={<DriverProfile />} />
        <Route path="driver/help" element={<DriverHelp />} />
        
        {/* Transport Admin routes */}
        <Route path="admin/deliveries" element={<AdminDeliveries />} />
        <Route path="admin/drivers" element={<AdminDrivers />} />
        <Route path="admin/fleet" element={<AdminFleet />} />
        <Route path="admin/help" element={<AdminHelp />} />
        <Route path="admin/settings" element={<AdminSettings />} />
        
        {/* Shared routes */}
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Auth route - redirect if already authenticated
function AuthRoute() {
  const { isAuthenticated, isRoleLoading, currentRole } = useRole();
  
  if (isRoleLoading) {
    return <LoadingScreen />;
  }
  
  if (isAuthenticated && currentRole) {
    return <Navigate to="/" replace />;
  }
  
  return <Auth />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <RoleProvider>
            <DeliveryProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </DeliveryProvider>
          </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
