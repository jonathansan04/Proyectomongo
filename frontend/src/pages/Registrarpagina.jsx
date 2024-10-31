import { useForm } from "react-hook-form"
//import { registroRequest } from "../api/auth";
import {useAuth} from "../context/authContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Registrarpagina(){

    const {register, 
        handleSubmit,
         formState:{ errors},
       } = useForm();

    const {signup, errors: RegistroErrors, isRegister} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (isRegister) navigate("/login")
    }, [isRegister])

    


    const onSubmit = handleSubmit(async (values)=>{
              signup(values);
             // navigate('/login');
    });


    return(
        
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-slate-400 max-w-md w-full p-10 rounded-md shadow-lg">
            <h1 className="text-2xl font-bold"> Registro</h1>
        {
                RegistroErrors.map((error,i)=>(
                    <div className="bg-red-500 p-2 text-white mb-2" key={i}>
                        {error}
                        </div>
                ))
            }
            <form onSubmit={onSubmit}>

                <input type="text" {...register('usuario', {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Usuario"/>
                  {errors.usuario?.message && (
            <p className="text-red-500">{errors.usuario?.message}</p>
          )}
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
                    Registrar
                </button>
            </form>

            <p className="flex gap-x-2 justify-between">
      Ya tienes una cuenta <Link to="/login" className="text-sky-700 hover:underline">Iniciar sesion</Link>
            </p>
        </div>
        </div>
    )
}

export default Registrarpagina;