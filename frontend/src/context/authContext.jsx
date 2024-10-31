import { createContext, useState, useContext, useEffect} from "react";
import { loginRequest, registroRequest, verifyToken } from "../api/auth.js";
import Cookies from "js-cookie"

const AuthContext = createContext()

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("UseAuth usada como provedor");
    }
    return context;
};

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [isRegister, setIsRegister] = useState(false);


    const signup = async (user) =>{
      try{
        const res =  await registroRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsRegister(true);
      } catch(error){
        setErrors(error.response.data)
        console.log(error.response.data);
      }

    };

    const iniciar = async (user) => {
      try {
       const res =  await loginRequest(user)
       const ntoken  = res.data.token;
       console.log(res)
       console.log(ntoken)
       setToken(ntoken);
       setUser(res.data);
       setIsAuthenticated(true);
      
      } catch (error){
        if (Array.isArray(error.response.data)){
          return setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
        //console.error("Error en el inicio de sesión:", error);
      }
    }

    const salir = () => {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    };


    useEffect(()=>{
      if (errors.length>0){
        const timer =setTimeout(()=>{
          setErrors([])
        },5000)
        return()=> clearTimeout(timer)
      }
    }, [errors])



    useEffect(() => {
      const checkLogin = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        //Si hay token
        try {
          //Verifica token real, por parte del backend
          const res = await verifyToken(cookies.token)
          console.log(res);
          if (!res.data) {//Si no hay dato
          setIsAuthenticated(false)
          setLoading(false);
          return;
          }
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false)

        }catch (error){
          console.log(error)
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }
      }
      checkLogin();
    },[])

   

    return(
        <AuthContext.Provider 
        value={{
            user,
            signup,
            iniciar,
            token,
            salir,
            isRegister,
            isAuthenticated,
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;