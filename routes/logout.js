let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
	req.session.loggedin =false;
    res.render("login/login");
});
module.exports = router;