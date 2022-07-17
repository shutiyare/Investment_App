// customers.js - Handle customers router
import customerController from "../../controllers/customer.controller.js";
import customerRepository from "../../repositories/customer.repository.js";
import customerModels from "../../db/models/customer.models.js";

export default function customersRouter(Router, dbConn) {
  const customers_router = Router();
  // load the models and repo
  const customer_models = customerModels(dbConn);
  const customer_repo = customerRepository(customer_models);
  // load contcustomerrss with dependencies
  const customer_controller = customerController(customer_repo);

  // GET Endpoints
  customers_router.route('/:id').get(customer_controller.getOne)
  customers_router.route('/').get(customer_controller.getMultiple);

  // POST Endpoints
  customers_router.route('/').post(customer_controller.create);

  // PUT Endpoints
  customers_router.route('/:id').put(customer_controller.update);

  // DELETE Endpoints
  customers_router.route('/:id').delete(customer_controller.remove);

  return customers_router;
}