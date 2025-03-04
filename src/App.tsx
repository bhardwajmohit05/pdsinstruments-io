
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import DeviceManagement from "./pages/DeviceManagement";
import DeviceDetail from "./pages/DeviceDetail";
import DeviceConfig from "./pages/DeviceConfig";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <UserManagement />
          </ProtectedRoute>
        } 
      />
      <Route path="/devices" element={<DeviceManagement />} />
      <Route path="/devices/:deviceId" element={<DeviceDetail />} />
      <Route path="/devices/:deviceId/config" element={<DeviceConfig />} />
      <Route path="/analytics" element={<Dashboard />} />
      <Route path="/reports" element={<Dashboard />} />
      <Route path="/settings" element={<Dashboard />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
