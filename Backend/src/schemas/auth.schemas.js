import {z} from 'zod'

export const registerSchema = z.object({
    usuario: z.string({
        required_error: "Usuario requerido"
    }),
    email: z.string({
        required_error: "Correo requerido"
    }).email({
        message: "Correo invalido",
    }),
    password: z.string({
        required_error: "Contraseña requerida"
    }).min(6,{
        message: "Contraseña debe ser mayor a 6 caracteres"
    }),

})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Correo requerido"
    }).email({
        message: "Correo invalido",
    }),
    password: z.string({
        required_error: "Contraseña requerida"
    }).min(6,{
        message: "Contraseña debe ser mayor a 6 caracteres"
    }),
});