const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'SocialConnectDB',
  port: 3306
});

// Conectar a la base de datos
dbConn.connect(function(err) {
  if (err) throw err;
  console.log('Conexión a la base de datos establecida');
});

module.exports = dbConn;
