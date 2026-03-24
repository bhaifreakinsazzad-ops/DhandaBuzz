import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import WalletPage from './pages/WalletPage'
import OrdersPage from './pages/OrdersPage'
import SupportPage from './pages/SupportPage'
import ProfilePage from './pages/ProfilePage'
import ServicesPage from './pages/ServicesPage'
import CreativeEnginePage from './pages/CreativeEnginePage'
import WebLaunchLabPage from './pages/WebLaunchLabPage'
import AdScaleEnginePage from './pages/AdScaleEnginePage'
import OrderDetailPage from './pages/OrderDetailPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminRechargesPage from './pages/admin/AdminRechargesPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminCRMPage from './pages/admin/AdminCRMPage'

function AuthGate({ children }) {
  const { authLoading } = useAuth()
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }
  return children
}

function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth()
  if (authLoading) return null
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

function AdminProtectedRoute() {
  const { isAuthenticated, isAdmin, authLoading } = useAuth()
  if (authLoading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthGate>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/creative-engine" element={<CreativeEnginePage />} />
            <Route path="/services/web-launch-lab" element={<WebLaunchLabPage />} />
            <Route path="/services/adscale-engine" element={<AdScaleEnginePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/recharges" element={<AdminRechargesPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/crm" element={<AdminCRMPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthGate>
  )
}
