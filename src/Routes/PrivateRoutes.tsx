import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token = localStorage.getItem('Token')
    // const refreshToken = localStorage.getItem('RefreshToken')
    return token ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateRoutes;