let express = require('express');
let router = express.Router();

let productosModel = require("../controllers/productos");

router.get('/', function (req, res, next) {
   if(req.session.loggedin)	{ 
	 productosModel
        .obtener()
        .then(productos => {
            res.render("productos/ver", {
                productos: productos,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });
   }
   else {
	  
	  res.render("login/login");
  }	
});
router.get('/agregar', function (req, res, next) {
    res.render("productos/agregar");
});
router.post('/insertar', function (req, res, next) {
    let { nombre, marca, especificaciones, precio } = req.body;
    if (!nombre || !marca || !especificaciones || !precio) {
        return res.status(500).send("No hay nombre, marca, especificaciones o precio");
    }
    productosModel
        .insertar(nombre, marca, especificaciones, precio)
        .then(idProductoInsertado => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error insertando producto");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    productosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    productosModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                res.render("productos/editar", {
                    producto: producto,
                });
            } else {
                return res.status(500).send("No existe un producto con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
router.post('/actualizar/', function (req, res, next) {
    let { id, nombre, marca, especificaciones, precio } = req.body;
    if (!nombre || !marca || !especificaciones || !precio || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    productosModel
        .actualizar(id, nombre, marca, especificaciones, precio)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});
module.exports = router;