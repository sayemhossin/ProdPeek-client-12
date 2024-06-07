import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const ModeratorRoute = ({children}) => {
    const [role, isLoading] = useRole()
   
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'moderator') return children
    return <Navigate to='/'></Navigate>
};

export default ModeratorRoute;