/** Importar los módulos necesarios
 */
const mysql = require("mysql");
const http = require("http");

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tabla_pruebas" // <-- Coloca el nombre de la base de datos que vayas a usar
});

// Consultas SQL (modifica el nombre de la tabla después de FROM de ser necesario)
/** En este query seleccionamos todas las columnas de la tabla tablausuarios con limite de 10 filas */
const selectAll = "SELECT * FROM tablausuarios LIMIT 10;";
/**En este query seleccionamos todas las columnas de la tabla tablausuarios para un cliente o usuario que coincida con el id deseado */
const selectOne = "SELECT * FROM tablausuarios WHERE idx = ?;";
/** Creamos un usuario nuevo con las columnas necesarias */
const postQuery = "INSERT INTO tablausuarios (idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

// Establecemos la conexión con la base de datos
connection.connect(function(err) {
  if (err) throw err;
  console.log(`Conexión exitosa a la base de datos ${connection.config.database}`);

  // Creamos un servidor HTTP con parametros request y response
  http.createServer(function(request, response) {
      // Obtenemos el ID del usuario a traves de la URL con el método split que devuelve un array y elegimos el segundo indice del array que será el ID del usuario que queremos mostrar
      let id = request.url.split("/")[2];

      // Con un if controlamos si la url no tiene id y es de metodo get. Si true ejecutamos el query guardado en la variable selectAll
      if (request.url.startsWith("/usuarios") && !id && request.method === "GET") {
        // Ejecutamos el query guardado en la variable selectAll para obtener todos los usuarios
        connection.query(selectAll, function(err, result) {
          if (err) throw err;
          console.log("Lista de datos");

          // Configuramos la respuesta con el tipo de contenido que recibe el cliente y enviamos los datos en formato JSON
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }
      /* Para manejar la solicitud GET para obtener un usuario específico por su ID. creamos un else if: sí la url es "/usuarios/" y tiene un id (Ejemplo: "/usuarios/8") y el metodo es GET mostramos todas las columnas del usuario con esa ID*/
      else if (request.url.startsWith("/usuarios/") && id && request.method === "GET") {
        // si true se ejecuta el query guardado en la variable selectOne
        connection.query(selectOne, [id], function(err, result) {
          if (err) throw err;
          console.log("Un dato");

          // Configuramos la respuesta con el tipo de contenido y enviamos como respuesta el usuario encontrado en formato JSON
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }
      // Para manejar la solicitud POST y crear un nuevo usuario creamos un else if, la url no debe tener id y el método es POST
      else if (request.url.startsWith("/usuarios") && !id && request.method === "POST") {
        let jsonString = "";
        request.on("data", function(data) {
          // Leemos los datos enviados por el cliente y losalmacenamos en una variable
          jsonString = jsonString + data;
        });
        request.on("end", function() {
          // Convertimos el JSON recibido a un objeto JavaScript
          const jsonData = JSON.parse(jsonString);

          // Extraemos los valores del objeto JSON y los asignamos a variables individuales
          const { idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo } = jsonData;

          // Verificamos si se proporcionaron todos los datos necesarios para crear un nuevo usuario
          if (!idx || !usuario || !nombre || !sexo || !nivel || !email || !telefono || !marca || !compañia || !saldo || !activo) {
            // Si falta algún dato, enviamos una respuesta de "Bad Request" al cliente
            response.writeHead(400, { "Content-type": "text/plain" });
            response.end("Bad Request: Faltan campos obligatorios.");
          } else {
            // Ejecutamos el query guardado en la variable postQuery para insertar el nuevo usuario en la base de datos y pasamos en un array las columnas necesarias
            connection.query(
              postQuery,
              [idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo],
              function(err, result) {
                if (err) throw err;
                /** Mostramos en consola el id de usuario que s eha creado */
                console.log(`Se ha creado ${result.affectedRows} dato con id ${result.insertId}`);

                // Configuramos la respuesta con el código de estado 201 (Created)
                response.writeHead(201, { "Content-type": "application/json; charset=UTF-8;" });
                response.end();
              }
            );
          }
        });
      }
      // Con este último else manejamos cualquier otra solicitud que no coincida con las anteriores
      else {
        // Enviar una respuesta de "Not Found" al cliente
        response.writeHead(404, { "Content-type": "text/plain" });
        response.end("Not Found");
      }
    })
    .listen(8080, () => {
      console.log("Servidor escuchando en http://localhost:8080");
    });
});
