import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Bienvenido</h1>
             <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                <Link to="/registrar" className="text-sky-500">Registrarme</Link>
                </button>
         
          
            <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">
            <Link to="/login" className="text-sky-500">Iniciar sesion</Link>
                </button>
        </div>
    );
}

export default HomePage;