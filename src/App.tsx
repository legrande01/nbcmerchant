import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { DeliveryProvider } from "@/contexts/DeliveryContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
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

const queryClient = new QueryClient();

function AppRoutes() {
  const { currentRole } = useRole();
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Role-based dashboard */}
          <Route path="/" element={currentRole === 'driver' ? <DriverDashboard /> : <Dashboard />} />
          
          {/* Merchant routes */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/store" element={<StoreManagement />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/payouts/:id" element={<PayoutDetails />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Driver routes */}
          <Route path="/driver/deliveries" element={<DriverDeliveries />} />
          <Route path="/driver/verification" element={<DriverVerification />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          
          {/* Shared routes */}
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <RoleProvider>
          <DeliveryProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </DeliveryProvider>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
