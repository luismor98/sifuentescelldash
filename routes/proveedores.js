let express = require('express');
let router = express.Router();

let proveedoresModel = require("../controllers/proveedores");

router.get('/', function (req, res, next) {
   if(req.session.loggedin)	{
    proveedoresModel
        .obtener()
        .then(proveedores => {
            res.render("proveedores/ver", {
                proveedores: proveedores,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo proveedores");
        });
   }	
    else {
	  
	  res.render("login/login");
  }	
});
router.get('/agregar', function (req, res, next) {
    res.render("proveedores/agregar");
});
router.post('/insertar', function (req, res, next) {
   
    let { rif, nombre, telefono, direccion, contacto } = req.body;
    if (!rif || !nombre || !telefono || !direccion || !contacto) {
        return res.status(500).send("No hay rif, nombre, telefono, direccion o contacto");
    }
    proveedoresModel
        .insertar(rif, nombre, telefono, direccion, contacto)
        .then(() => {
            res.redirect("/proveedores");
        })
        .catch(err => {
            return res.status(500).send("Error insertando proveedores");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    proveedoresModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/proveedores");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando proveedores");
        });
});
router.get('/editar/:id', function (req, res, next) {
    proveedoresModel
        .obtenerPorId(req.params.id)
        .then(proveedor => {
            if (proveedor) {
                res.render("proveedores/editar", {
                    proveedor: proveedor,
                });
            } else {
                return res.status(500).send("No existe un proveedor con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo proveedor");
        });
});
router.post('/actualizar/', function (req, res, next) {
    let { id, nombre, telefono, direccion, contacto } = req.body;
    if (!nombre || !telefono || !direccion || !id || !contacto) {
        return res.status(500).send("No hay suficientes datos");
    }
    proveedoresModel
        .actualizar(id, nombre, telefono, direccion, contacto)
        .then(() => {
            res.redirect("/proveedores");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando proveedor");
        });
});
module.exports = router;