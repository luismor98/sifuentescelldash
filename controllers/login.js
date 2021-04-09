let conexion = require("../conexion")
let bcryptjs = require ('bcryptjs');
module.exports = {
  
    buscarusuario(usuario, clave) {
        return new Promise((resolve, reject) => {
            let hashh = bcryptjs.hash(clave, 8);
            conexion.query(`select usuario, clave from usuarios where usuario = ? AND clave = ?`,[usuario, clave], async (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.length == 0 || !(await bcryptjs.compare(clave,resultados[0].clave)));
                });
        });
    }	
}  