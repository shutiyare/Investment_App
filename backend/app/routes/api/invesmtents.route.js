// investments.js - Handle investments router
import investmentController from "../../controllers/investment.controller.js";
import investmentRepository from "../../repositories/investment.repository.js";
import investmentModels from "../../db/models/investment.models.js";

export default function investmentsRouter(Router, dbConn) {
  const investments_router = Router();
  // load the models and repo
  const investment_models = investmentModels(dbConn);
  const investment_repo = investmentRepository(investment_models);
  // load continvestmentrss with dependencies
  const investment_controller = investmentController(investment_repo);

  // GET Endpoints
  investments_router.route('/:id').get(investment_controller.getOne)
  investments_router.route('/').get(investment_controller.getMultiple);

  // POST Endpoints
  investments_router.route('/').post(investment_controller.create);

  // PUT Endpoints
  investments_router.route('/:id').put(investment_controller.update);

  // DELETE Endpoints
  investments_router.route('/:id').delete(investment_controller.remove);

  return investments_router;
}