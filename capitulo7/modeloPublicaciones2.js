const mongoose = require('mongoose')


const PublicacionesSchema = new mongoose.Schema(
    {
        tittle:{
            type: String
        },
        description:{
            type:String
        },
        author:{
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false

    }
)

const Publicaciones = mongoose.model('publicaciones', PublicacionesSchema )


module.exports = { Publicaciones }