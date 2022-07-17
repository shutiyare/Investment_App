import authController from "../../controllers/auth.controller.js";
import authRepository from "../../repositories/auth.repository.js";
import authModels from "../../db/models/auth.models.js";

export default function authsRouter(Router, dbConn) {
  const auths_router = Router();
  // load the models and repo
  const auth_models = authModels(dbConn);
  const auth_repo = authRepository(auth_models);
  // load contauthrss with dependencies
  const auth_controller = authController(auth_repo);

  // GET Endpoints
  auths_router.route('/').post(auth_controller.login);
  // auths_router.route('/').put(auth_controller.refresh);

  return auths_router;
}