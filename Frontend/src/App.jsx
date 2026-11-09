import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuth from './hooks/useAuth'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expense from './pages/Expense'
import { LoaderCircle } from 'lucide-react'

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-2 text-primary-blue" role="status">
      <div className="animate-spin">
        <LoaderCircle size={20} />
      </div>
      <p className="font-medium">Loading...</p>
    </div>
  )
}

//  Only signed-in users may see these routes.
function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  return user ? children : <Navigate to="/login" replace />
}

// Login and Register are for signed-out users; signed-in users go straight to the dashboard.
function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  return user ? <Navigate to="/dashboard" replace /> : children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
        <Route element={<Protected><Layout /></Protected>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600' } }}
      />
    </>
  )
}

export default App
