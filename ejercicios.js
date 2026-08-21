import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
res.send(`Aprendicez ficha 3407186 jijij`);
});


// 1. Parámetro simple único
app.get("/saludo/:nombre", (req, res) => {
    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({
            error: "El nombre debe tener al menos 3 letras."
        });
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});

// 2. Parámetro simple único
app.get("/productos/:nombre", (req, res) => {
    const { nombre } = req.params;

    const producto = {
        id: 1,
        nombre: nombre,
        stock: 50,
        precioUnitario: 25.99,
        categoria: "Tecnología"
    };

    res.json(producto);
});

// 3. Múltiples parámetros en la ruta
app.get("/productos/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;

    res.json({
        servidor: "Servidor Express",
        categoria: categoria,
        producto: id
    });
});

//4. Parámetros combinados con Query Params
app.get("/usuarios/:id/posts", (req, res)=> {
    let id = req.params.id
    let orden = req.query.order || `Sin orden`

    const publicacionesPorUsuario = {
        1: [
            { id: 1, titulo: "Post 1", fecha: "2024-01-15", likes: 10 },
            { id: 2, titulo: "Post 2", fecha: "2024-01-10", likes: 25 },
            { id: 3, titulo: "Post 3", fecha: "2024-01-20", likes: 5 }
            ],
        2: [
            { id: 4, titulo: "Post A", fecha: "2024-02-01", likes: 30 },
            { id: 5, titulo: "Post B", fecha: "2024-01-25", likes: 15 }
            ]
        };

    const publicaciones = publicacionesPorUsuario[id];

    if (!publicaciones){
        return res.status(404).json({error: `Usuario no encontrado`});
    }

    let resultado = [...publicaciones];

    if(orden == "asc"){
        resultado.sort((a, b) =>  new Date(a.fecha) - new Date(b.fecha));
    }

    if(orden == "desc"){
        resultado.sort((a, b) =>  new Date(b.fecha) - new Date(a.fecha));
    }
    
    res.json(resultado);
});

app.get("/usuarios/:id/:post_id/comentarios", (req, res)=> {
    const userId = req.params.id
    const postId = req.params.post_id
    const orden = req.query.order

    const datos = {
        1: {
            1: [
            { 
                id: 1, 
                autor: "María García", 
                texto: "¡Excelente artículo! Me ayudó mucho a entender el tema de las promesas en JavaScript", 
                fecha: "2024-01-15T10:30:00", 
                likes: 15 
            },
            { 
                id: 2, 
                autor: "Carlos López", 
                texto: "Tengo una duda, ¿cómo manejarías el error si la promesa falla?", 
                fecha: "2024-01-15T14:20:00", 
                likes: 8 
            },
            { 
                id: 3, 
                autor: "Ana Martínez", 
                texto: "Llevo semanas buscando una explicación así de clara. ¡Gracias!", 
                fecha: "2024-01-15T09:15:00", 
                likes: 22 
            },
            { 
                id: 4, 
                autor: "Pedro Sánchez", 
                texto: "¿Podrías hacer un artículo sobre async/await también?", 
                fecha: "2024-01-15T18:45:00", 
                likes: 12 
            }
            ],
            2: [
            { 
                id: 5, 
                autor: "Laura Rodríguez", 
                texto: "Los ejemplos con Express son muy prácticos, los voy a usar en mi proyecto", 
                fecha: "2024-01-16T11:00:00", 
                likes: 18 
            },
            { 
                id: 6, 
                autor: "Diego Fernández", 
                texto: "Una sugerencia: sería bueno agregar validación de datos en los endpoints", 
                fecha: "2024-01-16T16:30:00", 
                likes: 9 
            }
            ],
            3: [
            { 
                id: 7, 
                autor: "Sofía Torres", 
                texto: "¿Cuál es la diferencia entre var, let y const? A veces me confundo", 
                fecha: "2024-01-17T13:20:00", 
                likes: 25 
            }
            ]
        },
        2: {
            1: [
            { 
                id: 8, 
                autor: "Roberto Díaz", 
                texto: "Increíble tutorial, ya puedo conectar mi base de datos MongoDB con Express", 
                fecha: "2024-01-17T10:00:00", 
                likes: 30 
            },
            { 
                id: 9, 
                autor: "Elena Ruiz", 
                texto: "¿Funciona igual con PostgreSQL? Voy a probarlo", 
                fecha: "2024-01-17T15:45:00", 
                likes: 7 
            }
            ],
            2: [
            { 
                id: 10, 
                autor: "Miguel Ángel", 
                texto: "Me salvaste el semestre con esta explicación de middlewares", 
                fecha: "2024-01-18T09:30:00", 
                likes: 42 
            },
            { 
                id: 11, 
                autor: "Patricia Vega", 
                texto: "¿Los middlewares se ejecutan en orden? Tengo un problema con el orden de ejecución", 
                fecha: "2024-01-18T12:15:00", 
                likes: 14 
            },
            { 
                id: 12, 
                autor: "Javier Morales", 
                texto: "Sí, se ejecutan en el orden que los definas con app.use()", 
                fecha: "2024-01-18T14:00:00", 
                likes: 19 
            }
            ]
        },
        3: {
            1: [
            { 
                id: 13, 
                autor: "Carmen Silva", 
                texto: "Por fin entendí el concepto de callbacks, llevaba días atorado", 
                fecha: "2024-01-19T11:20:00", 
                likes: 28 
            }
            ]
        }
    };

    const comentarios = datos[userId]?.[postId];

    if(!comentarios){
        return res.status(404).json({error: `Usuario no encontrado o Post no encontrado`});
    }

    let resultado = [...comentarios];

    if(orden == "asc"){
        resultado.sort((a, b) =>  new Date(a.fecha) - new Date(b.fecha));
    }

    if(orden == "desc"){
        resultado.sort((a, b) =>  new Date(b.fecha) - new Date(a.fecha));
    }
    

    res.json(resultado);
});


const libros = [
  {
    isbn: "978-84-376-0492-3",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    anio: 1605
  },
  {
    isbn: "978-84-204-1214-6",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967
  },
  {
    isbn: "978-84-339-6834-2",
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    anio: 2001
  }
];

app.get('/libros/:isbn', (req, res) => {
  const isbnBuscado = req.params.isbn;
  
  // Buscar el libro con ese ISBN
  const libro = libros.find(l => l.isbn === isbnBuscado);
  
  if (libro) {
    // Si existe, devolverlo
    res.json(libro);
  } else {
    // Si no existe, 404
    res.status(404).json({ error: "Libro no encontrado" });
  }
});



app.listen(port, () => {
console.log( `SERVIDOR: http://localhost:${port}`);
});

