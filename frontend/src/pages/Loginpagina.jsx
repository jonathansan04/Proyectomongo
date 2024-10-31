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
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                {
                iniciarErrors.map((error,i)=>(
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                        </div>
                ))
            }
    <h1 className="text-2xl font-bold"> Login</h1>
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

<button type="submit">
    Iniciar sesion 
</button>
</form >
<p className="flex gap-x-2 justify-between">
    No tienes una cuenta <Link to="/registrar" className="text-sky-500">Registrarme</Link>
</p>
</div>
        </div>
    )
}

export default Loginpagina