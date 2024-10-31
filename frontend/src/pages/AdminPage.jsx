import React from 'react';
import { useAuth } from '../context/authContext';
import { Link } from "react-router-dom";

function AdminPage() {

    const { isAuthenticated, salir, user } = useAuth();
  console.log(isAuthenticated, user)
    return (
        <div>
            <h1>Inicio de admin correcto</h1>
            

            <button className="border border-red-500 text-red-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">
            <Link to="/login" onClick={() => salir()}>
                Logout
              </Link>
                </button>

        
        
        </div>
    );
}

export default AdminPage;