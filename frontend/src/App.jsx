import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpagina from "./pages/Loginpagina.jsx";
import Registrarpagina from "./pages/Registrarpagina.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import ProtectRoute from "./pages/ProtectRoute.jsx";
import InicioPage from "./pages/InicioPage.jsx";


function App(){
  return(
    
  <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/registrar" element={<Registrarpagina/>}/>
      <Route path="/login" element={<Loginpagina/>}/>
      
      <Route element={<ProtectRoute/>}>
      <Route path="/inicio" element={<InicioPage/>}/>
      <Route path="/perfil" element={<PerfilPage/> }/>      
      </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
    
  )
}

export default App