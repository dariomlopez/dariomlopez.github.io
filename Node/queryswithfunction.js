const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});




const queryUpdate = function(idx, campo, valor){
  return `UPDATE tabla_prueba.tabla_prueba SET ${campo} = '${valor}' WHERE tblusuarios.idx = '${idx}';`;
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Conexión exitosa a la base de datos");
});

// ====================================================
const readAll = "SELECT * FROM tabla_prueba.tabla_prueba;";
const readOne = function (id){
  return `SELECT * FROM pruebas.tblUsuarios WHERE idx = ${id};`;
}
con.query(readAll, function (err, result) {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 2));
  console.log("Query 1:")
  console.log(json[0]);
});

con.query(readOne(2), function (err, result) {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 2));
  console.log("Query 2:")
  console.log(json);
});
 
// Query para escribir los usuarios con ids del 3 al 7
const readBetween = function(from, to){
    return `SELECT * FROM tabla_prueba.tabla_prueba WHERE idx >= ${from} AND idx <= ${to};`;
}

con.query(readBetween(3, 7), function (err, result) {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 2));
  console.log("Query 3:")
  console.log(json);
});

// Query para escribir usuarios con móvil marca LG
const queryMarca = function(marca){
    return `SELECT * FROM tabla_prueba.tabla_prueba WHERE marca = '${marca}'`;
}

con.query(queryMarca("LG"), function (err, result) {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 2));
  console.log("Query 4:")
  console.log(json);
});
// Query para actualizar un campo de un usuario
con.query(queryUpdate(1, "nombre", "pepe"), function (err, result) {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 2));
  console.log("Query 5:")
  console.log(json);
});
con.end();