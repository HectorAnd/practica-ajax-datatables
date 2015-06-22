<?php
header('content-type: application/json; charset=utf-8');
//en caso de json en vez de jsonp habría que habilitar CORS:
header("access-control-allow-origin: *"); 

/* Database connection information */
include("mysql.php" );



/*
 * Local functions
 */

function fatal_error($sErrorMessage = '') {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
    die($sErrorMessage);
}

/*
 * MySQL connection
 */
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
    fatal_error('Could not open connection to server');
}

if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
    fatal_error('Could not select database ');
}

mysql_query('SET names utf8');



/*
 * SQL queries
 * Get data to display
 */


$nombre = $_POST["nombre"];
$numcolegiado = $_POST["numcolegiado"];
$clinicas = $_POST["clinicas"];

/* Consulta UPDATE */
$query = "insert into doctores (nombre,numcolegiado) values( 
             '". $nombre . "', 
            '" . $numcolegiado . "')" ;

//mysql_query($query, $gaSql['link']) or fatal_error('MySQL Error: ' . mysql_errno());
/*En función del resultado correcto o no, mostraremos el mensaje que corresponda*/
$query_res = mysql_query($query);
if($query_res){
$sql = "SELECT id_doctor
        FROM doctores
        where numcolegiado='".$numcolegiado."'";
//echo "$sql <br>";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res, MYSQL_ASSOC))
{
$id=$row['id_doctor'];
}
}


for ($i=0;$i<count($clinicas);$i++)
{
  $queryCD = "INSERT INTO clinica_doctor (id_doctor,id_clinica) VALUES(
    ". $id . ",
    " . $clinicas[$i] . ")" ;
  $query_res = mysql_query($queryCD);
} 





// Comprobar el resultado
if (!$query_res) {
    $mensaje  = 'Error en la consulta: ' . mysql_error() . "\n";
    $estado = mysql_errno();
}
else
{
    $mensaje = "Actualización correcta";
    $estado = 0;
}
$resultado = array();
 $resultado[] = array(
      'mensaje' => $mensaje,
      'estado' => $estado
   );
echo json_encode($resultado);
?>
