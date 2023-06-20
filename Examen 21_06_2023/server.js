const mysql = require("mysql");
const http = require("http");

// Importar los módulos necesarios

// Crear una conexión a la base de datos MySQL
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "examen" // <-- Coloca el nombre correcto de tu base de datos
});

// Consultas SQL
const selectAll = "SELECT * FROM tblUsuarios LIMIT 10;";
const selectOne = "SELECT * FROM tblUsuarios WHERE idx = ?;";
const postQuery =
  "INSERT INTO tblUsuarios (idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

// Establecer la conexión con la base de datos
con.connect(function(err) {
  if (err) throw err;
  console.log("Conexión exitosa a la base de datos 'examen'");

  // Crear un servidor HTTP
  http
    .createServer(function(req, res) {
      // Obtener el ID del usuario de la URL
      let id = req.url.split("/")[2];

      // Manejar la solicitud GET para obtener todos los usuarios de la tabla
      if (req.url.startsWith("/usuarios") && !id && req.method === "GET") {
        // Ejecutar la consulta SELECT para obtener todos los usuarios
        con.query(selectAll, function(err, result) {
          if (err) throw err;
          console.log("Lista de datos");

          // Configurar la respuesta con el tipo de contenido y enviar los datos en formato JSON
          res.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          res.end(JSON.stringify(result, null, 2));
        });
      }
      // Manejar la solicitud GET para obtener un usuario específico por su ID
      else if (req.url.startsWith("/usuarios/") && id && req.method === "GET") {
        // Ejecutar la consulta SELECT para obtener el usuario con el ID especificado
        con.query(selectOne, [id], function(err, result) {
          if (err) throw err;
          console.log("Un dato");

          // Configurar la respuesta con el tipo de contenido y enviar el usuario encontrado en formato JSON
          res.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          res.end(JSON.stringify(result, null, 2));
        });
      }
      // Manejar la solicitud POST para crear un nuevo usuario
      else if (req.url.startsWith("/usuarios/") && id && req.method === "POST") {
        let jsonString = "";
        req.on("data", function(data) {
          // Leer los datos enviados por el cliente y almacenarlos en una variable
          jsonString += data;
        });
        req.on("end", function() {
          // Convertir el JSON recibido a un objeto JavaScript
          const jsonData = JSON.parse(jsonString);

          // Extraer los valores del objeto JSON y asignarlos a variables individuales
          const { idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo } = jsonData;

          // Verificar si se proporcionaron todos los datos necesarios para crear un nuevo usuario
          if (!idx || !usuario || !nombre || !sexo || !nivel || !email || !telefono || !marca || !compañia || !saldo || !activo) {
            // Si falta algún dato, enviar una respuesta de "Bad Request" al cliente
            res.writeHead(400, { "Content-type": "text/plain" });
            res.end("Bad Request: Faltan campos obligatorios.");
          } else {
            // Ejecutar la consulta INSERT para insertar el nuevo usuario en la base de datos
            con.query(
              postQuery,
              [idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo],
              function(err, result) {
                if (err) throw err;
                console.log(`Se ha creado ${result.affectedRows} dato con id ${result.insertId}`);

                // Configurar la respuesta con el código de estado 201 (Created)
                res.writeHead(201, { "Content-type": "application/json; charset=UTF-8;" });
                res.end();
              }
            );
          }
        });
      }
      // Manejar cualquier otra solicitud que no coincida con las anteriores
      else {
        // Enviar una respuesta de "Not Found" al cliente
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("Not Found");
      }
    })
    .listen(8080, () => {
      console.log("Servidor escuchando en http://localhost:8080");
    });
});
