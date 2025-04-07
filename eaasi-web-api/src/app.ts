import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { logger } from './logging/appLogger';
import { clientErrorHandler, errorHandler, notFoundHandler } from './middleware/error-handler';
import { normalizePort, onError } from './utils/server';

require('dotenv-flow').config();
require('./middleware/passport');

const multer = require('multer');
const upload = multer();
const port = normalizePort(process.env.EXPRESS_PORT || '8081');
const app = express();

console.log('Initializing EaaSI Web-API (' + process.env.NODE_ENV + ')...');

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Middleware
 */
app.use(cors());
app.use(passport.initialize());
app.use(morgan('tiny', { stream: logger.stream }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array('files[]'));
app.use(express.static(path.join(__dirname, '../public')));

// Eaasi path serves all the client view model data
app.use('/eaasi_app', require('./routes/eaasi'));

// API path is for RESTful data
app.use('/resource_metadata', require('./routes/rest-api'));

// API docs
app.use('/docs', express.static('./apidoc'));

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(notFoundHandler);

console.log('Starting HTTP server...')
const server = http.createServer(app);
server.on('error', (err) => onError(err, port));
server.on('listening', () => {
	console.log('Server is listening on port ' + port);
});

server.listen(port);
