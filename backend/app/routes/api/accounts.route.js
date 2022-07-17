// accounts.js - Handle accounts router
import accountController from "../../controllers/account.controller.js";
import accountRepository from "../../repositories/account.repository.js";
import accountModels from "../../db/models/account.models.js";

export default function accountsRouter(Router, dbConn) {
  const accounts_router = Router();
  // load the models and repo
  const account_models = accountModels(dbConn);
  const account_repo = accountRepository(account_models);
  // load controlerss with dependencies
  const account_controller = accountController(account_repo);

  // GET Endpoints
  accounts_router.route('/:id').get(account_controller.getOne);
  accounts_router.route('/').get(account_controller.getMultiple);

  // POST Endpoints
  accounts_router.route('/').post(account_controller.create);

  // PUT Endpoints
  accounts_router.route('/:id').put(account_controller.update);

  // DELETE Endpoints
  accounts_router.route('/:id').delete(account_controller.remove);

  return accounts_router;
}