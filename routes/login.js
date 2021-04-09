let express = require('express');
let router = express.Router();

let loginModel = require("../controllers/login");

router.get('/', function (req, res, next) {
    res.render("login/login");
});
router.post('/login', function (req, res, next) {
   
    let { usuario, clave } = req.body;
    if (!usuario || !clave) {
        return res.status(500).send("No hay Usuario o Clave");
    }
    loginModel
        .buscarusuario(usuario, clave)
        .then(login => {
			if (login) {
			req.session.loggedin =true;
			req.session.usuario = usuario;
            res.redirect("/productos");
			}
			else {
				res.send('Usuario o Password Incorrecto');
			}
			})
        .catch(err => {
            return res.status(500).send("Error de credenciales");
        });		
});
module.exports = router;
