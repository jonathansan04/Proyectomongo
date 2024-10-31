import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
//import jwt from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
function Loginpagina(){

    const {register, 
        handleSubmit, 
        formState: {errors},
        } = useForm();

    const {iniciar, errors: iniciarErrors, isAuthenticated, token} = useAuth();
        const navigate = useNavigate();
    const onSubmit = handleSubmit((data)=>{
        iniciar(data);
    });

    useEffect (()=>{
      /*  if (isAuthenticated) navigate("/inicio")
    },[isAuthenticated])*/
      if (isAuthenticated && token) {
        console.log(token)
        const decodedToken = jwtDecode(token); // Decodificamos el token
        console.log(decodedToken)
        if (decodedToken.role === 'admin') {
            navigate('/admin'); // Redirigir a la página específica
        } else {
            navigate('/inicio'); // Redirigir a la página de usuarios
        }
    }
}, [isAuthenticated, token, navigate]);
     

     


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-slate-400 max-w-md w-full p-10 rounded-md shadow-lg">
            <h1 className="text-2xl font-bold"> Inicio de sesión</h1>
                {
                iniciarErrors.map((error,i)=>(
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                        </div>
                ))
            }
   
    <form onSubmit={onSubmit}>

    <input type="email" {...register('email', {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Email"/>
                  {errors.email?.message && (
                <p className="text-red-500">{errors.email?.message}</p>
                )}

    <input type="password"  {...register('password', {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="contraseña"/>
                  {errors.password?.message && (
                <p className="text-red-500">{errors.password?.message}</p>
                )}

<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
    Iniciar sesion 
</button>
</form >
<p className="flex gap-x-2 justify-between">
    No tienes una cuenta <Link to="/registrar" className="text-sky-700 hover:underline">Registrarme</Link>
</p>
</div>
        </div>
    )
}

export default Loginpagina