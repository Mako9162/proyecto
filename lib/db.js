//Conexión a la base de datos

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'smvs',
  password: ''
});

connection.connect(error =>{
  if (error) throw error;
  console.log('Conexión establecida con Base de Datos!!');
});

module.exports = connection;