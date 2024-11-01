import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKENSECRET } from "../config.js";

export const registrar = async (req,res) =>{
    const {email, password, usuario}=  req.body

    try {

        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(["El email registrado ya existe"]);
        //Libreria bcrypt para hash
       const contrahash = await bcrypt.hash(password,10) 

        const newUser = new User({
            usuario,
            email,
            password: contrahash
        });

       const userSaved = await newUser.save();
        //Libreria jwt para token
       // const token = await createAccessToken({id: userSaved._id});
       // res.cookie("token",token);
        //Parametros enviados en el Json
        res.json({
            id: userSaved._id,
            usuario: userSaved.usuario,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        })
       // console.log(email,password,usuario);
        //res.send("Registrado");
        
    }catch (error){
        console.log(error);
        res.status(500).json({message: error.message})
    }
    
   
};

export const iniciar = async (req,res) =>{
    const {email, password}=  req.body;

    try {

      const  userFound = await User.findOne({email});

      if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
        //Libreria bcrypt para hash
       const correcto = await bcrypt.compare(password,userFound.password);

       if (!correcto) return res.status(400).json({message: "Contraseña incorrecta"});
        
       const token = await createAccessToken({id:userFound._id,  role: userFound.email === 'admin@gmail.com' ? 'admin' : 'user' });
     
        res.cookie("token",token);
        //Parametros enviados en el Json
        res.json({
            token: token,
            id: userFound._id,
            usuario: userFound.usuario,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt


        })
       // console.log(email,password,usuario);
        //res.send("Registrado");
        
    }catch (error){
        console.log(error);
        res.status(500).json({message: error.message})
    }
};

export const salir = (req,res) =>{
    res.cookie('token', "",{
        httpOnly: true,
       secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    return res.json({
        id: userFound._id,
        usuario: userFound.usuario,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })

}

export const verifyToken = async (req,res) =>{
    const {token} = req.cookies;

    if (!token) return res.status(401).json({message: "No autorizado"});
    jwt.verify(token, TOKENSECRET, async (err, user) => {
      if (err) return res.status(401).json({message: "No autorizado"});
   
      const userFound = await User.findById(user.id);
      if(!userFound) return res.status(401).json({message: "No autorizado"});

      return res.json({
        id: userFound._id,
        username: userFound.usuario,
        email: userFound.email,
      });
    });
};