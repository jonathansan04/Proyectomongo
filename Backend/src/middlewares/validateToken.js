import jwt from "jsonwebtoken";
import { TOKENSECRET } from "../config.js";

export const authRequired = (req,res,next) =>{
   const {token} = req.cookies;

    if(!token)
        return res.status(401).json({message: "No token, autorización denegada"});
        jwt.verify(token, TOKENSECRET, (err, user)=>
        {
            req.user = user
        })
    next();
};