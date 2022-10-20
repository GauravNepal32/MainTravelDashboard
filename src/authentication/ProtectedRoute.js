import React from "react";
import {Navigate} from "react-router-dom"

import { useAuth } from "./auth";

export const ProtectedRoute=({ children })=>{
    const auth=useAuth()
    const userData=sessionStorage.getItem("access_token");
    if (userData === null){
        return <Navigate to='/admin/login' />;
    }
    return children;
}