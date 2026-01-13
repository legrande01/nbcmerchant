import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
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
import DriverDashboard from "@/pages/driver/DriverDashboard";
import DriverDeliveries from "@/pages/driver/DriverDeliveries";
import DriverVerification from "@/pages/driver/DriverVerification";
import DriverProfile from "@/pages/driver/DriverProfile";
import { useRole } from "@/contexts/RoleContext";

const queryClient = new QueryClient();

function AppRoutes() {
  const { currentRole } = useRole();
  
  return (
    <Routes>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <AppRoutes />
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
