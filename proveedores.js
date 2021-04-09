let conexion = require("../conexion")
module.exports = {
  
	async insertar(rif, nombre, telefono, direccion, contacto) {  // modulo usando async await
        let resultados = await conexion.query(`insert into proveedores
        (rif, nombre, telefono, direccion, contacto)
        values
        (?, ?, ?, ?, ?)`, [rif, nombre, telefono, direccion, contacto]);
        return resultados;
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, rif, nombre, telefono, direccion, contacto from proveedores`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, rif, nombre, telefono, direccion, contacto from proveedores where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    }, 
	async actualizar(id, nombre, telefono, direccion, contacto) {   // modulo usando async await
        let resultados = conexion.query(`update proveedores
		set nombre = ?,
		telefono = ?,
		direccion = ?,
		contacto = ?
        where id = ?`, [nombre, telefono, direccion, contacto, id]);
        return resultados;
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from proveedores
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
	
}