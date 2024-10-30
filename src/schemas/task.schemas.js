import {z} from 'zod'

export const createTasksSchema = z.object({
    title: z.string({
        required_error: "Titulo requerido"
    }),
    description: z.string({
        required_error: "Descripción debe ser string"
    }),
    date: z.string().datetime().optional
});