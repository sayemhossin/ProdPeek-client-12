
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner></LoadingSpinner>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}


export default PrivateRoute
