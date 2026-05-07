import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPreviewPage from './pages/DashboardPreviewPage'
import NotFoundPage from './pages/NotFoundPage'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const WalletPage = lazy(() => import('./pages/WalletPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const SupportPage = lazy(() => import('./pages/SupportPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const CreativeEnginePage = lazy(() => import('./pages/CreativeEnginePage'))
const WebLaunchLabPage = lazy(() => import('./pages/WebLaunchLabPage'))
const AdScaleEnginePage = lazy(() => import('./pages/AdScaleEnginePage'))
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'))
const AdminRechargesPage = lazy(() => import('./pages/admin/AdminRechargesPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminCRMPage = lazy(() => import('./pages/admin/AdminCRMPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
      </div>
    </div>
  )
}

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
    <ErrorBoundary>
    <AuthGate>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/preview" element={<DashboardPreviewPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
            <Route path="/wallet" element={<Suspense fallback={<PageLoader />}><WalletPage /></Suspense>} />
            <Route path="/orders" element={<Suspense fallback={<PageLoader />}><OrdersPage /></Suspense>} />
            <Route path="/orders/:orderId" element={<Suspense fallback={<PageLoader />}><OrderDetailPage /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/services/creative-engine" element={<Suspense fallback={<PageLoader />}><CreativeEnginePage /></Suspense>} />
            <Route path="/services/web-launch-lab" element={<Suspense fallback={<PageLoader />}><WebLaunchLabPage /></Suspense>} />
            <Route path="/services/adscale-engine" element={<Suspense fallback={<PageLoader />}><AdScaleEnginePage /></Suspense>} />
            <Route path="/support" element={<Suspense fallback={<PageLoader />}><SupportPage /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>} />
          </Route>
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense>} />
            <Route path="/admin/orders" element={<Suspense fallback={<PageLoader />}><AdminOrdersPage /></Suspense>} />
            <Route path="/admin/recharges" element={<Suspense fallback={<PageLoader />}><AdminRechargesPage /></Suspense>} />
            <Route path="/admin/users" element={<Suspense fallback={<PageLoader />}><AdminUsersPage /></Suspense>} />
            <Route path="/admin/crm" element={<Suspense fallback={<PageLoader />}><AdminCRMPage /></Suspense>} />
          </Route>
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthGate>
    </ErrorBoundary>
  )
}
