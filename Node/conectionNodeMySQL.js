const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tabla_prueba"  /**Cambiar base de datos */
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

let sqlQuery = `SELECT * FROM tabla_prueba.tabla_prueba WHERE idx >=3 AND idx <= 7;`;

connection.query(sqlQuery, function(err, result, fields){
    if (err) throw err;
    console.log(result);
});

connection.end;