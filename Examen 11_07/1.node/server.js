/** Importa el módulo express, que es el marco de aplicaciones web utilizado para crear la aplicación*/
const express = require('express');
/**Crea una instancia de la aplicación Express */
const app = express();
/**Importa el módulo body-parser, que se utiliza para analizar los datos del cuerpo de las solicitudes HTTP. */
const bodyParser = require('body-parser');
//  Configura el body-parser para analizar los datos enviados en el formato application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//  Configura el body-parser para analizar los datos enviados en formato JSON.
app.use(bodyParser.json());

const cors = require('cors') // Importa el módulo cors, que permite las solicitudes de recursos cruzados (Cross-Origin Resource Sharing, CORS) desde otros orígenes.
app.use(cors()); //  Aplica el middleware cors a la aplicación para permitir solicitudes de otros orígenes.

/**Define un array llamado posts que contiene un objeto de ejemplo con diferentes propiedades id, title y content */
const posts = [
  {id: 1, title: "Título", content: "Contenido 1"},
  {id: 2, title: "Título 2", content: "Contenido 2"},
  {id: 3, title: "Título 3", content: "Contenido 3"},
  {id: 4, title: "Título 4", content: "Contenido 4"},
]

/**Define una ruta GET para /posts. Cuando se accede a esta ruta, la función de controlador se ejecuta y envía una respuesta JSON con el array posts */
app.get("/posts", (request, response) => {
  response.json(posts)
})

/** Cuando se accede a esta ruta, la función de controlador se ejecuta. El cuerpo de la solicitud se guarda en la variable newPost, y luego se agrega al array posts. Finalmente, se envía una respuesta con el código de estado 201 y el nuevo objeto newPost como respuesta en formato JSON.*/
app.post("/posts", (request, response) => {
  let newPost = request.body // objeto
  posts.push(newPost)
  response.status(201).json(newPost)
})


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/posts")
})