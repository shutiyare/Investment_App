
import globalRouter from './root.js';
import apiRouter from './api/index.js';


// handle global and api route groups
export default function routes(app, Router, db) {
    app.use('/api/', apiRouter(Router, db));
    app.use('/', globalRouter(Router));
}
