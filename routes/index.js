let express = require('express');
let router = express.Router();

/* Obtiene el home de la aplicacion. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SifuentesCell C.A' });
});

module.exports = router;
