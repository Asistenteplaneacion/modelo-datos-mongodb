const mongoose = require('mongoose')


// ESQUEMAS

const UsuariosSchema = new mongoose.Schema (
    {
        name:{
            type: String,
            require: true
        },
        email:{
            type: String,
            unique: true
        },
        numberPhone:{
            type: Number,
            default: '123-456'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)



// MODELOS

const Usuarios = new mongoose.model('usuarios', UsuariosSchema )


module.exports = { Usuarios }