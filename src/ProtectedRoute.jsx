import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('user') // or any auth flag

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
