let conexion = require("../conexion")
let bcryptjs = require ('bcryptjs');
module.exports = {
  
	async insertar(usuario, clave) {  // modulo usando async await
        let hashh = await bcryptjs.hash(clave, 8); 
        conexion.query(`insert into usuarios set ?`,{usuario:usuario,clave:hashh}, );
        return hashh;
    },
}