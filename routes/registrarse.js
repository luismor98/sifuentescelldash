let express = require('express');
let router = express.Router();

let registrarseModel = require("../controllers/registrarse");
router.get('/', function (req, res, next) {
    res.render("registrarse/agregar");
}); 
router.post('/insertar', function (req, res, next) {
   
    let { usuario, clave } = req.body;
    if (!usuario || !clave ) {
        return res.status(500).send("No hay usuario o clave");
    }
    registrarseModel
        .insertar(usuario, clave)
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {
            return res.status(500).send("Error registrando usuario");
        });
});
module.exports = router;