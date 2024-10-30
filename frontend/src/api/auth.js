//import axios from "./axios";
//import axios from "./axios";
import ax from "./axios.js";
//export const registroRequest = user => axios.post('http://localhost:4000/api/registrar', user);
export const registroRequest = (user) => ax.post('/registrar',user);
//export const loginRequest = user => axios.post('http://localhost:4000/api/iniciar', user);
export const loginRequest = (user) => ax.post('/iniciar',user);

export const verifyToken = () => ax.get('/verify')

export const salir = () => ax.get('/salir')