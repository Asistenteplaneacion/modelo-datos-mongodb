const mongoose = require('mongoose');
require('dotenv').config();
const { Usuarios } = require('./modeloUser');
const { Publicaciones } = require('./modeloPublicaciones');
const { Categories } = require('./modelCategories');



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



    // otra forma de hacerlo diferente al codigo de arriba
const buscarPorCoincidenciaTodos = async () =>{
    const post = await Publicaciones.find({
        tittle: {
            $eq: 'Mi post'
            }
        })    


    console.log('***** RESULTADO **** ', post)
}


const buscarOCrear = async () => {
    const post = await Publicaciones.findOneAndUpdate(
        {
            tittle: '50 cosas sobre mi',
        },
        {
            description: 'Hola aqui me genere automanticamente',
            author: new mongoose.Types.ObjectId('66184414f844d0495b9591f3'),
        },
        {
            new: true,
            upsert: true,
        }
    )

    console.log('***** BUSCAR O CREAR *******', post);

}


const editarPubliacion = async () => {
    const resultado = await Publicaciones.updateOne(
        {
            tittle: '50 cosas sobre mi'
        },
        {
            tittle: 'EDITADO (50 COSAS)',
            description: ' EDITADO nueva descripción'
        }
    )

    console.log('******** RESULTADO EDITADO*****',  resultado)
}


const editarPubliacionDiferente = async () => {
    const resultado2 = await Publicaciones.updateMany(
        {
            tittle:{
                $ne:'50 cosas sobre mi'   // $ne cuando busca y edita 
            }
        },
        {
            tittle: 'EDITADO (Hola COSAS)',
            description: ' EDITADO nueva descripción'
        }
    )

    console.log('******** RESULTADO EDITADO EXITOSAMENTE *****',  resultado2)
}


const borrasPost = async () => {
    const resultado3 = await Publicaciones.deleteOne(   //tambien se puede usat deleteMany
        {
            _id: new mongoose.Types.ObjectId('66184414f844d0495b9591f3')
        }
    )

    console.log('*****RESULTADO ELIMINADO****', borrasPost)
}

//  1 - Publicaciones ------>
const publicacionConUsuario = async () => {
    const resultado4 = await Publicaciones.aggregate(
        [
            {
                $lookup:
                {
                    from: 'usuarios', // 2 de donde se toma
                    localField: 'author', // 1 (Publicaciones) de donde se toma
                    foreignField: '_id',   // 2
                    as: 'usuarioAuthor'   // El alias que le asigno
                }
            },
            { $unwind: '$usuarioAuthor' },   // para devolver un objeto: la informacion organizada entre la publicacion y el autor
            { $match: { tittle: 'EDITADO (Hola COSAS)' }}    // filtros basados en condiciones
            
        ]
    )

    console.log('******** RESULTADOS *******', resultado4)
}


// const crearCategoria = () =>{
//     Categories.create[(
//         { name: 'Salud'},
//         { name: 'Tech' }
//     )]
//     .then(() => console.log('Categorías creadas exitosamente'))
//     .catch(err => console.error('Error al crear categorías:', err));
// }


const crearCategoria = async () => {
    try {
        await Categories.create(
            { name: 'Salud' },
            { name: 'Tech' }
        );
        console.log('Categorías creadas exitosamente');
    } catch (err) {
        console.error('Error al crear categorías:', err);
    }
}

const crearUsuarios = () => {
    Usuarios.create(
        {
            name: 'Luis (edition)',
            email: 'luis3@demo.com',
            numberPhone: '12234578'
        }
    )
}


const createPublicaciones2 = () => {
    const listPost = [
        {
            categories: 'Tech',
            tittle: 'Relaciones publicas',
            description: 'Hola como vas',
            author: new mongoose.Types.ObjectId('66196184d20e015076e4cde7'),
        },
        {
            categories: 'Salud',
            tittle: 'Noticia IMPORT Covid(Tech)',
            description: 'Hola como vas',
            author: new mongoose.Types.ObjectId('66196184d20e015076e4cde7'),
        },
    ];

    Publicaciones.insertMany(listPost)
    .then(() => console.log('Publicaciones creadas exitosamente'))
    .catch(err => console.error('Error al crear publicaciones:', err));
}


// const listaCategoriesConPublicaciones = async () =>{
//     const resultado4 = await Categories.aggregate(   // (1) Padre ----categories
//         [
//             {
//                 $lookup:
//                 {
//                     from: 'publicaciones', // (2)  Hijo----publicaciones
//                     let:{
//                         aliasNombreCategoria: '$name' // (1) Nombre de la categoria [Tech, Salud]
//                     },
//                     pipeline: [
//                     {                   // (2) publicaciones 2da jerarquia
//                         $match:{
//                             $expr: {
//                                 $in: [ '$$aliasNombreCategoria' , '$categories' ]
//                             }
//                         }
//                     }
//                     ],
//                     as:'listaDePublicacionesEncontradas'
//                 }
//             }
//         ]
//     )

//     console.log('******** RESULTADOS *******', resultado4)
// }



const listaCategoriesConPublicaciones = async () => {
    const resultado = await Categories.aggregate(  // (1) Padre --- (Categories)
        [
            {
                $lookup:
                {
                    from: "publicaciones", // (2) Hijo -- (Publicaciones)
                    let:{
                        aliasNombreCateg: "$name" // (1) Nombre de la categoria [ Tech, Salud]   
                    },
                    pipeline: [ // (2)  publicaciones
                        {
                            $match:{
                                $expr:{
                                    $in: [ "$$aliasNombreCateg", "$categories",]
                                }
                            }
                        }
                    ],
                    as: 'listaDepublicacionesEncontradas'
                }
            }
        ]
    )
    console.log('******** RESULTADOS ******', JSON.stringify(resultado));
}


const listaCategoriesConPublicaciones1 = async () => {
    try {
        const resultado4 = await Categories.aggregate([
            {
                $lookup: {
                    from: 'publicaciones',
                    let: { aliasNombreCategoria: '$name' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$categories', { $split: ['$$aliasNombreCategoria', ','] }] // Convertir a array usando $split
                                }
                            }
                        }
                    ],
                    as: 'listaDePublicacionesEncontradas'
                }
            }
        ]);

        console.log('******** RESULTADOS *******', JSON.stringify(resultado4));
    } catch (error) {
        console.error('Error al realizar la agregación:', error);
    }
}

const listaCategoriesConPublicaciones2 = async () => {
    try {
        const resultado6 = await Publicaciones.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    let: { aliasNombreCategoria: '$categories' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [ '$name','$$aliasNombreCategoria'] // Convertir a array usando $split
                                }
                            }
                        }
                    ],
                    as: 'listaDeCategoriasEncontradas'
                }
            }
        ]);

        console.log('******** RESULTADOS *******', JSON.stringify(resultado6));
    } catch (error) {
        console.error('Error al realizar la agregación:', error);
    }
}



listaCategoriesConPublicaciones();

// listaCategoriesConPublicaciones2()

// listaCategoriesConPublicaciones1();


// createPublicaciones2()
// crearCategoria()
// crearUsuarios()
// publicacionConUsuario()
// borrasPost()
// editarPubliacionDiferente()
// editarPubliacion()
// buscarOCrear()
// buscarPorCoincidenciaTodos()
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