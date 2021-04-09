let mysql = require("mysql");

let conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

conexion.connect((error)=>{
  if(error){
    console.log('La base de datos tuvo un inconveniente en ' + error);
    return;
  }
  else{
    console.log('Base de datos sifuentescelldash conectada');
  }
});
module.exports = conexion;