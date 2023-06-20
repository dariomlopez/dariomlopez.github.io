/** Importar los módulos necesarios
 */
const mysql = require("mysql");
const http = require("http");

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "examen" // <-- Coloca el nombre correcto de tu base de datos
});

// Consultas SQL
/** En este query seleccionamos todas las columnas de la tabla tblUsuarios con limite de 10 filas */
const selectAll = "SELECT * FROM tblUsuarios LIMIT 10;";
/**En este query seleccionamos todas las columnas de la tabla tblUsuarios para un cliente o usuario que coincida con el id deseado */
const selectOne = "SELECT * FROM tblUsuarios WHERE idx = ?;";
/** Creamos un usuario nuevo con las columnas indicadas */
const postQuery = "INSERT INTO tblUsuarios (idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

// Establecemos la conexión con la base de datos
connection.connect(function(err) {
  if (err) throw err;
  console.log("Conexión exitosa a la base de datos 'examen'");

  // Creamos un servidor HTTP con parametros request y response
  http.createServer(function(request, response) {
      // Obtenemos el ID del usuario a traves de la URL con el método split que devuelve un array de un string y elegimos el segundo valor del array que es el ID
      let id = request.url.split("/")[2];

      // Con un if controlamos si la url no tiene un id y es de metodo get. Si true ejecutamos el query guardado en la variable selectAll
      if (request.url.startsWith("/usuarios") && !id && request.method === "GET") {
        // Ejecutar el query selectAll para obtener todos los usuarios
        connection.query(selectAll, function(err, result) {
          if (err) throw err;
          console.log("Lista de datos");

          // Configurar la respuesta con el tipo de contenido y enviar los datos en formato JSON
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }
      /* Para manejar la solicitud GET para obtener un usuario específico por su ID. creamos un if: sí la url es "/usuarios/" y tiene un id y el metodo es GET mostramos todas las columnas de un usuario*/
      else if (request.url.startsWith("/usuarios/") && id && request.method === "GET") {
        // si true se ejecuta el query guardado en la variable selectOne
        connection.query(selectOne, [id], function(err, result) {
          if (err) throw err;
          console.log("Un dato");

          // Configurar la respuesta con el tipo de contenido y enviar el usuario encontrado en formato JSON
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }
      // Para manejar la solicitud POST para crear un nuevo usuario creamos un if
      else if (request.url.startsWith("/usuarios/") && id && request.method === "POST") {
        let jsonString = "";
        request.on("data", function(data) {
          // Leer los datos enviados por el cliente y almacenarlos en una variable
          jsonString = jsonString + data;
        });
        request.on("end", function() {
          // Convertir el JSON recibido a un objeto JavaScript
          const jsonData = JSON.parse(jsonString);

          // Extraer los valores del objeto JSON y asignarlos a variables individuales
          const { idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo } = jsonData;

          // Verificar si se proporcionaron todos los datos necesarios para crear un nuevo usuario
          if (!idx || !usuario || !nombre || !sexo || !nivel || !email || !telefono || !marca || !compañia || !saldo || !activo) {
            // Si falta algún dato, enviar una respuesta de "Bad Request" al cliente
            response.writeHead(400, { "Content-type": "text/plain" });
            response.end("Bad Request: Faltan campos obligatorios.");
          } else {
            // Ejecutar la consulta INSERT para insertar el nuevo usuario en la base de datos
            connection.query(
              postQuery,
              [idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo],
              function(err, result) {
                if (err) throw err;
                console.log(`Se ha creado ${result.affectedRows} dato con id ${result.insertId}`);

                // Configurar la respuesta con el código de estado 201 (Created)
                response.writeHead(201, { "Content-type": "application/json; charset=UTF-8;" });
                response.end();
              }
            );
          }
        });
      }
      // Manejar cualquier otra solicitud que no coincida con las anteriores
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
