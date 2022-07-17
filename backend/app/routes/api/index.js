// routes/index.js - api route module

import account_router from './accounts.route.js';
import customer_router from './customers.route.js';
import investment_router from './invesmtents.route.js';
import auth_router from './auth.route.js';
import rsc_router from './rsc.route.js';

// api routes
export default function apiRoutes(Router, db) {
   const apiRouter = Router()
   apiRouter.use('/accounts', account_router(Router, db));
   apiRouter.use('/customers', customer_router(Router, db));
   apiRouter.use('/investments', investment_router(Router, db));
   apiRouter.use('/auth', auth_router(Router, db));
   apiRouter.use('/rsc', rsc_router(Router));
   return apiRouter;
}
