const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tabla_prueba"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

let sqlQuery = "SELECT nombre FROM tabla_prueba.tabla_prueba;";

connection.query(sqlQuery, function(err, result, fields){
    if (err) throw err;
    console.log(result);
});

connection.end;