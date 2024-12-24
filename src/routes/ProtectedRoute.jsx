import  {useContext} from "react";
import { Navigate, Outlet } from "react-router";
import {AuthContext, } from "@/context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext)

    // Show a loading state while checking authentication
    if (loading) {
        return <p>Loading...</p>;
    }

    // Redirect to login if the user is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;