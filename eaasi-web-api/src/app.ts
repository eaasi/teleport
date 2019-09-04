import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import { clientErrorHandler, errorHandler, notFoundHandler } from './middleware/error-handler';
import { onError, normalizePort } from './utils/server';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

require('dotenv-flow').config();
require('./middleware/passport');

const port = normalizePort(process.env.EXPRESS_PORT || '8081');
const app = express();

app.use(function(req: Request, res: Response, next: NextFunction) {
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Origin', req.headers.origin as string);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	if(req.method === 'OPTIONS') {
		console.log('options!!!!');
		res.status(200).send();
	} else {
		console.log(req.method);
	}
});

app.use(function(req: Request, res: Response, next: NextFunction) {
	console.log('GOT HERE TOO!');
});


app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Middleware
 */
app.use(cors());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', require('./routes'));
app.use('/docs', express.static(path.join(__dirname, '../apidoc')));
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.listen(port);
server.on('error', (err) => onError(err, port));
server.on('listening', () => {
	console.log('Express is listening on: ' + port);
});
