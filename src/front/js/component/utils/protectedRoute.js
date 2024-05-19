import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRole }) => {
    const access_token = JSON.parse(localStorage.getItem("token"))
    if (!access_token) {
        return <Navigate to="/login" replace />;
    }
    const access_key = access_token.access_token
    const decodedToken = jwtDecode(access_key);
    const userRol = decodedToken.rol;

    if (userRol === allowedRole) {
        return <Outlet />;
    }   
    return <Navigate to={`/login`} replace />;
    
}

export default ProtectedRoute