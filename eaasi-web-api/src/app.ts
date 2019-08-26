import Cors from 'cors';
import express from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
// import passport from 'passport';

require('dotenv-flow').config();
require('./middleware/passport');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware

/** We made need this eventually depending on shibboleth flow
 * app.use(passport.initialize());
 */

app.use(logger('dev'));
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', require('./routes'))
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;