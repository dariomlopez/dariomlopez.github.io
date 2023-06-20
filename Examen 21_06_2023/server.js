const mysql = require("mysql");
const http = require("http");

// Se importan los módulos 'mysql' y 'http' que nos permiten conectarnos a la base de datos y crear un servidor HTTP.

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "examen" // <--- Aquí debes reemplazar "examen" con el nombre de tu base de datos.
});

// Establecemos la conexión con la base de datos MySQL utilizando los detalles de conexión proporcionados (host, usuario, contraseña y nombre de la base de datos).

connection.connect(function(err) {
  if (err) throw err;
  console.log("Conexión exitosa a la base de datos " + "examen");

  // Creamos un servidor HTTP que escucha en el puerto 8080.

  http
    .createServer(function(request, response) {
      let id = request.url.split("/")[2];

      // Manejamos la solicitud GET para obtener todos los usuarios de la tabla.

      if (request.url.startsWith("/usuarios") && !id && request.method === "GET") {
        // Realizamos una consulta SQL para obtener todos los usuarios de la tabla y los almacenamos en la variable "result".
        connection.query("SELECT * FROM tblUsuarios LIMIT 10;", function(err, result) {
          if (err) throw err;
          console.log("Lista de datos");
          // Enviamos la respuesta al cliente con los datos obtenidos en formato JSON.
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }

      // Manejamos la solicitud GET para obtener un usuario específico por su ID.

      else if (request.url.startsWith("/usuarios/") && id && request.method === "GET") {
        // Realizamos una consulta SQL para obtener un usuario por su ID y lo almacenamos en la variable "result".
        connection.query("SELECT * FROM tblUsuarios WHERE idx = ?;", [id], function(err, result) {
          if (err) throw err;
          console.log("Un dato");
          // Enviamos la respuesta al cliente con el usuario encontrado en formato JSON.
          response.writeHead(200, { "Content-type": "application/json; charset=UTF-8;" });
          response.end(JSON.stringify(result, null, 2));
        });
      }

      // Manejamos la solicitud POST para crear un nuevo usuario.

      else if (request.url.startsWith("/usuarios/") && id && request.method === "POST") {
        // Leemos los datos enviados por el cliente y los almacenamos en la variable "jsonString".
        let jsonString = "";
        request.on("data", function(data) {
          jsonString = jsonString + data;
        });

        request.on("end", function() {
          // Convertimos el JSON recibido a un objeto JavaScript y almacenamos los valores en variables separadas.
          let json = JSON.parse(jsonString);
          let idx = json.idx;
          let usuario = json.usuario;
          let nombre = json.nombre;
          let sexo = json.sexo;
          let nivel = json.nivel;
          let email = json.email;
          let telefono = json.telefono;
          let marca = json.marca;
          let compañia = json.compañia;
          let saldo = json.saldo;
          let activo = json.activo;

          // Verificamos si se proporcionan todos los datos necesarios para crear un nuevo usuario.
          if (
            !idx ||
            !usuario ||
            !nombre ||
            !sexo ||
            !nivel ||
            !email ||
            !telefono ||
            !marca ||
            !compañia ||
            !saldo ||
            !activo
          ) {
            // Si falta algún dato, enviamos una respuesta de "Bad Request" al cliente.
            response.writeHead(400);
            response.end("Bad Request");
          } else {
            // Si todos los datos están presentes, ejecutamos una consulta SQL para insertar el nuevo usuario en la base de datos.
            connection.query(
              "INSERT INTO tblUsuarios (idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
              [idx, usuario, nombre, sexo, nivel, email, telefono, marca, compañia, saldo, activo],
              function(err, result) {
                if (err) throw err;
                console.log("Se ha creado " + result.affectedRows + " dato con id " + result.insertId);
                // Enviamos una respuesta con el código de estado 201 (Created) al cliente para indicar que el usuario se creó exitosamente.
                response.writeHead(201, { "Content-type": "application/json; charset=UTF-8;" });
                response.end();
              }
            );
          }
        });
      }

      // Manejamos cualquier otra solicitud que no coincida con las anteriores.

      else {
        // Enviamos una respuesta de "Bad Request" al cliente para indicar que la solicitud no es válida.
        response.writeHead(400);
        response.end("Bad Request");
      }
    })
    .listen(8080, () => {
      console.log("http://localhost:8080");
    });
});
