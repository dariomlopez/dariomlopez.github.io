-- Active: 1686390798528@@127.0.0.1@3306@tabla_pruebas
#######MODIFICAR EL NOMBRE DE LA TABLA DESPUÉS DE FROM. En mis pruebas he usado una tabla llamada "tablausuarios"###########
-- bloque 1: 2, 4, 6, 12
-- 2. Calcular el saldo máximo de los usuarios de sexo “Mujer”
## Con la función MAX() encontramos el valor máximo en la columna saldo donde la columna sexo es igual a "M. La consulta devuelve el valor máximo"
SELECT MAX(saldo) FROM tablausuarios WHERE sexo = "M";
## Se puede hacer también ordenando la columna saldo de mayor a menor. La fila que saldrá primero es la que tiene mayor saldo y el sexo es "M"
SELECT nombre, saldo, sexo FROM tablausuarios WHERE sexo = 'M' ORDER BY saldo DESC;
-- 4. Contar los usuarios sin saldo o inactivos
-- Con la función COUNT(*) contamos el número de filas en la tabla "tablausuarios" donde el valor de la columna "saldo" es igual a 0 o el valor de la columna "activo" es FALSE. La consulta devuelve el número de filas que cumplen esta condición.
SELECT COUNT(*) FROM tablausuarios WHERE saldo = 0 OR activo = FALSE;
SELECT idx, nombre, saldo, activo
FROM tablausuarios
WHERE saldo = 0 OR activo = FALSE;

-- 6. Listar los números de teléfono con saldo menor o igual a 300
#Con SELECT mostramos los nombres y los teléfonos donde el valor de la columna saldo es menor o igual que 300
SELECT nombre, telefono
FROM tablausuarios WHERE saldo <= 300;

-- 12. Listar nombre y teléfono de los usuarios con teléfono LG, SAMSUNG o MOTOROLA
## Mostramos las columnas nombre y teléfono de las marcas deseadas con el operador IN que compara si hay valores que coinciden en la columna marca con la lista que hay dentro del parentesis 
SELECT nombre, telefono
FROM tablausuarios WHERE marca IN ("LG", "SAMSUNG", "MOTOROLA");

-- bloque 2: 4(16), 6(18), 7(19), 9(21), 11(23)
-- 4(16). Calcular el saldo promedio de los usuarios que tienen teléfono marca NOKIA
## Con la función AVG() sumamos todos los valores de la columna especificada y luego dividiendo esa suma por el número de filas que cumplen con la condición marca = "NOKIA" retornamos la media de saldos de los usuarios que tienen la marca "NOKIA" 
SELECT AVG(saldo)
FROM tablausuarios
WHERE marca = "NOKIA";

-- 6(18). Mostrar el email de los usuarios que no usan yahoo
## Mostramos los valores de la columna "email" de los registros de la tabla "tablausuarios" donde el valor de la columna "email" no contiene la cadena "@yahoo." utilizando la cláusula NOT LIKE que valida los caracteres dentro del patrón "%%", si @yahoo no aparece nos devuelve el valor
SELECT email
FROM tablausuarios
WHERE email NOT LIKE "%@yahoo%";

-- 7(19). Listar el login y teléfono de los usuarios con compañia telefónica que no sea TELCEL o IUSACELL
## Mostramos los valores de las columnas "email", "telefono" y "compañia" de los registros de la tabla "tablausuarios" donde el valor de la columna "compañia" no es igual a "TELCEL" o "IUSACELL" de nuevo usando el operador IN.  
SELECT email, telefono, compañia
FROM tablausuarios
WHERE compañia NOT IN ("TELCEL", "IUSACELL");

-- 9(21). Listar las diferentes marcas de celular en orden alfabético descendente
## En este caso concreto se puede hacer de dos maneras: agrupando la columna marca y ordenandola de modo descendente o usando DISTINCT. Ambos agrupan los valores de la columna marca eliminando duplicados y con ORDER BY se ordena de manera descendente
SELECT marca
FROM tablausuarios
GROUP BY marca
ORDER BY marca DESC;

SELECT DISTINCT marca
FROM tablausuarios
ORDER BY marca DESC;

-- 11(23). Listar el login de los usuarios con nivel 0 o 2.
## Mostramos el nombre y el mail donde los usuarios tienen un nivel 0 o 2. In puede sustituir a un OR. Ejemplo: WHERE nivel = 0 OR nivel = 2 daría el mismo resultado
SELECT nombre, email 
FROM tablausuarios
WHERE nivel IN (0,2);

-- Bloque 3: 4(28)
-- 4. Listar el login de los usuarios con nivel 0
## Mostramos las columnas nombre y el mail donde los usuarios tienen un nivel 0.
SELECT nombre, email
FROM tablausuarios WHERE nivel = 0;

--bloque 4: 2(38), 3(39), 4(40), 6(42), 7(43)
-- 2(38). Listar nombre y teléfono de los usuarios con teléfono que no sea de la marca LG
## Mostramos las columnas "nombre", "telefono" y "marca" donde el valor de la columna "marca" es distinta de "LG".
SELECT nombre, telefono, marca
FROM tablausuarios
WHERE marca != "LG";

-- 3(39). Listar las diferentes compañias en orden alfabético ascendente
## Mostramos los valores únicos sin duplicados usando DISTINCT de la columna "compañia" de la tabla "tablausuarios" ordenados alfabéticamente en orden ascendente. Como previamente hicimos podríamos eliminar DISTINCT y añadir un GROUP BY despues de FROM
SELECT DISTINCT compañia
FROM tablausuarios
ORDER BY compañia ASC;

-- 4(40). Calcular la suma de los saldos de los usuarios de la compañia telefónica UNEFON
## Usamos la función SUM() para sumar los valores de la columna saldo donde la compañia sea "UNEFON"
SELECT SUM(saldo) FROM tablausuarios
WHERE compañia = "UNEFON";

-- 6(42). Listar los nombres de los usuarios sin saldo o inactivos
## Mostramos los valores de la columna "nombre" de los registros de la tabla "tablausuarios" donde el valor de la columna "saldo" es igual a 0 o el valor de la columna "activo" es 0.
SELECT nombre
FROM tablausuarios
WHERE saldo = 0
  OR activo = 0;

-- 7(43). Listar el login y teléfono de los usuarios con compañia telefónica IUSACELL o TELCEL
## Mostramos los valores de las columnas "nombre", "email" y "telefono" de los registros de la tabla "tablausuarios" donde el valor de la columna "compañia" es igual a "IUSACELL" o "TELCEL".
SELECT nombre, email, telefono FROM tablausuarios
WHERE compañia IN ("IUSACELL", "TELCEL");