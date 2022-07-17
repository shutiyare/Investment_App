import http from 'http';
import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger.js';
import db_conn from './db/db.conn.js';
import appConfig from './configs/app.config.js';
import routes from './routes/index.js';
import terminus from './utils/terminus.js';
import errorHandlingMiddlware from './middlewares/errorHandling.middlware.js';
import initDocsDir from './utils/init.docs.dir.js';
import busboyBodyParser from 'busboy-body-parser'
// import path from 'path';

// # initialize docs and profile image directories
initDocsDir();
// const __dirname = path.resolve();
// console.log('main dir: ', __dirname)
// global.__basedir = __dirname;
// global.__basedir = path.resolve();
// initialize app and databse connection
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboyBodyParser());
// app.use(errorHandlingMiddlware);
// db connection
const dbConn = db_conn();
// handle all routes
routes(app, Router, dbConn);
app.use(errorHandlingMiddlware);
// http server
const httpserver = http.createServer(app);
// handle all errors
// app.use(errorHandlingMiddlware);

// const server = function () {
//     app.listen(appConfig.PORT, () => {
//         logger.info(`server listening port ${appConfig.PORT}`);
//     });
// }
const server = function () { return terminus(httpserver, appConfig.PORT, logger) }

export default server