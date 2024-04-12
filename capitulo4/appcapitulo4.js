const mongoose = require('mongoose');
require('dotenv').config();
const { Usuarios } = require('../modeloUser');
const { Publicaciones } = require('../modeloPublicaciones');



mongoose.connect(
    `mongodb+srv://cursomongodb:${process.env.MONGO_DB_PASS}@mongodb-curso.ypdkxag.mongodb.net/mongodb-curso?retryWrites=true&w=majority&appName=mongodb-curso`
)
    .then(() => console.log('************ Conexión exítosa a la BBDD ***********'))  
    .catch((err) => console.log(err))




// CREACION DE DATOS / INSERTAR DATOS


const crearUsuario = () => {
    Usuarios.create(
        {
            name: 'Alberto',
            email: 'albeiro@demo.com',
            numberPhone: '12345678'
        }
    )
}

const createPublicaciones = () => {
    const listPost = [
        {
            tittle: 'Mi post',
            description: 'Hola como vas',
            author: new mongoose.Types.ObjectId('66184414f844d0495b9591f3'),
        },
        {
            tittle: 'Mi segundo post',
            description: 'Hola como vas',
            author: new mongoose.Types.ObjectId('66184414f844d0495b9591f3'),
        },
    ];

    Publicaciones.insertMany(listPost)
    .then(() => console.log('Publicaciones creadas exitosamente'))
    .catch(err => console.error('Error al crear publicaciones:', err));
}

const buscarPorId =  async () => {
    const user = await Usuarios.findById('66184414f844d0495b9591f3')
    console.log('El usuario es: ' ,user)
}



const buscarPorCoincidenciaUno = async () =>{
    const post = await Publicaciones.findOne({
        tittle: 'Mi post'
    })

    console.log('***** RESULTADO **** ', post)
}



// const buscarPorCoincidenciaTodos = async () =>{
//     const post = await Publicaciones.find({
//         tittle: 'Mi post'
//     })



    // otra forma de hacerlo
const buscarPorCoincidenciaTodos = async () =>{
    const post = await Publicaciones.find({
        tittle: {
            $eq: 'Mi post'
            }
        })    


    console.log('***** RESULTADO **** ', post)
}

buscarPorCoincidenciaTodos()


// buscarPorCoincidenciaUno()


// buscarPorId()



// crearUsuario()


// createPublicaciones()






// Usuarios.create(
//     {
//         name: 'Jesus',
//         email: 'jesus@demo.com',
//         numberPhone: '12345678'
//     }
// ).then(user => {
//     console.log('Usuario creado:', user);
// }).catch(error => {
//     console.error('Error al crear usuario:', error);
// });