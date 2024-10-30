import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';


function ProtectRoute() {
    const {loading, isAuthenticated} = useAuth()
        console.log(loading)
        
    if(loading) return <h1>Loading....</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace/>

    return <Outlet/>;
}

export default ProtectRoute;