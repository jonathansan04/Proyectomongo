import React from 'react';
import { useAuth } from '../context/authContext';
import { Link } from "react-router-dom";

function AdminPage() {

    const { isAuthenticated, salir, user } = useAuth();
  console.log(isAuthenticated, user)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Inicio de admin correcto</h1>
        
        <Link to="/login" onClick={salir}>
            <button className="border border-red-500 text-red-500 font-semibold py-2 px-6 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                Logout
            </button>
        </Link>
    </div>
    );
}

export default AdminPage;