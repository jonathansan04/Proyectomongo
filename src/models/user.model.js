import mongoose from "mongoose";

const userSchemaa= new mongoose.Schema({
    usuario:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }

},{
    timestamps: true
})

export default mongoose.model('User', userSchemaa)