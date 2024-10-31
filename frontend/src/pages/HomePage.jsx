import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold mb-8 text-center font-serif">Bienvenido</h1>
        
        <div className="space-y-4"> {/* Espaciado entre botones */}
            <Link to="/registrar">
                <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300 w-full max-w-xs">
                    Registrarme
                </button>
            </Link>
            
            <Link to="/login">
                <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300 w-full max-w-xs">
                    Iniciar sesión
                </button>
            </Link>
        </div>
    </div>
    );
}

export default HomePage;