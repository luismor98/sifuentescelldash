// Requerimientos de Módulos 
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Configuración de Variables de Entorno
let dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

// Configuración de Sesiones
let session = require('express-session');

let indexRouter = require('./routes/index');
let productosRouter = require('./routes/productos');
let clientesRouter = require('./routes/clientes');
let proveedoresRouter = require('./routes/proveedores');
let loginRouter = require('./routes/login');
let registrarseRouter = require('./routes/registrarse');
let logoutRouter = require('./routes/logout');

let app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/login', loginRouter);
app.use('/registrarse', registrarseRouter);
app.use('/logout', logoutRouter);

// Manipulacion de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;