import React from 'react';
import { useAuth } from '../context/authContext';
import { Link } from "react-router-dom";

function InicioPage() {

    const { isAuthenticated, salir, user } = useAuth();
  console.log(isAuthenticated, user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Inicio de usuario correcto</h1>
            

            <button className="border border-red-500 text-red-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">
            <Link to="/login" onClick={() => salir()}>
                Logout
              </Link>
                </button>

        
        
        </div>
    );
}

export default InicioPage;