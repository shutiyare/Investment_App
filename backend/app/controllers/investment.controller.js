import investmentUseCases from "../use_cases/investment.usecases.js";
import fileUpload from "../services/file.upload.js";
export default function investmentController(investmentRepository) {

    const investment_use_cases = investmentUseCases(investmentRepository);

    function getOne(req, res, next) {
        investment_use_cases.getInvestment(req.params.id)
            .then((investment) => {
                if (investment && investment.length == 0) {
                    const error = new Error('Not Found');
                    error.status = 404;
                    throw error;
                }
                res.send({ data: investment });
            })
            .catch((error) => next(error));
    }

    function getMultiple(req, res, next) {
        const { page, size } = req.query;
        console.log('page and size ', { page, size })
        investment_use_cases.getMultipleInvestments(page, size)
            .then((investments) => {
                if (investments && investments.length == 0) {
                    const error = new Error('Not Found');
                    error.status = 404;
                    throw error;
                }
                res.send({ data: investments });
            })
            .catch((error) => next(error));
    }

    function create(req, res, next) {
        // const created_by = 1; // read it with middleware
        const { customer_id, amount, memo } = req.body;
        
        const {investment_dir, docs, inv_file} = preprocessFile(req.files.inv_file.data, customer_id);
        investment_use_cases.createInvestment({ customer_id, amount, docs, memo })
            .then((investment) => {
                // console.log(investment_dir)
                fileUpload(investment_dir, docs, inv_file);
                res.send({ data: investment, message: "Investment added successfully" })
            })
            .catch((error) => next(error));
    }

    function update(req, res, next) {
        // const updated_by = 1;
        const investment_id = req.params.id;
        const { customer_id, amount, memo } = req.body;
        const {investment_dir, docs, inv_file} = preprocessFile(req.files.inv_file.data, investment_id);
        investment_use_cases.updateInvestment({ investment_id, customer_id, amount, docs, memo })
            .then((investment) => {
                fileUpload(investment_dir, docs, inv_file);
                res.send({ data: investment, message: "Investment updated successfully" });
            })
            .catch((error) => next(error));
    }

    function remove(req, res, next) {
        const ac_id = req.params.id;
        investment_use_cases.removeInvestment(ac_id)
            .then(() => {
                res.send({ message: `Investment with ID ${ac_id} deleted successfully` })
            })
            .catch((error) => next(error));
    }

    function preprocessFile(data, customer_id){
        const inv_file = data;
        // # randomly generate a five digit number to prevent filename conflict
        const salt = Math.floor(Math.random() * 90000) + 10000;
        const docs = `${Date.now()}_${customer_id}_${salt}.pdf`;
        const investment_dir = global.__investmentdir;
        return {inv_file, docs, investment_dir}
    }
    return { getOne, getMultiple, create, update, remove }
}