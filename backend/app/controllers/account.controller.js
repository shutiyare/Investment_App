import accountUseCases from "../use_cases/account.usecases.js";
import fileUpload from "../services/file.upload.js";
import authServiceImpl from '../services/auth.service.js';
import authServiceInterface from '../interfaces/auth.interface.js';


export default function accountController(accountRepository) {

    const account_use_cases = accountUseCases(accountRepository);
    const authService = authServiceInterface(authServiceImpl());

    function getOne(req, res, next) {
        account_use_cases.getAccount(req.params.id)
            .then((account) => {
                if (account && account.length == 0) {
                    const error = new Error('Not Found');
                    error.status = 404;
                    throw error;
                }
                res.send({ data: account });
            })
            .catch((error) => next(error));
    }

    function getMultiple(req, res, next) {
        const { page, size } = req.query;
        // console.log('page and size ',{page, size})
        account_use_cases.getMultipleAccounts(page, size)
            .then((accounts) => {
                if (accounts && accounts.length == 0) {
                    const error = new Error('Not Found');
                    error.status = 404;
                    throw error;
                }
                res.send({ data: accounts });
            })
            .catch((error) => next(error));
    }

    function create(req, res, next) {
        // const created_by = 1; // read it with middleware
        let { employee_id, name, username, password, role_id } = req.body;
        if (password) {
            password = authService.encryptPassword(password)
        }
        account_use_cases.createAccount({ employee_id, name, username, password, role_id })
            .then((account) => {
                res.send({ data: account, message: "Account added successfully" })
            })
            .catch((error) => next(error));
    }

    function update(req, res, next) {
        // const updated_by = 1;
        const user_id = req.params.id;
        const { employee_id, name, username, password, role_id, is_active } = req.body;
        const photo = null
        if (req.files.photo) {
            const photo = req.files.photo.name;
            const { photo_dir, fname, photo_data } = preprocessFile(req.files.photo.data, photo, user_id);
        }
        
        // console.log("photo: ", req.files.photo)
        account_use_cases.updateAccount({ user_id, employee_id, name, username, password, photo, role_id, is_active })
            .then((account) => {
                if (photo) {
                    fileUpload(photo_dir, fname, photo_data);
                }
                res.send({ data: account, message: "Account updated successfully" });
            })
            .catch((error) => next(error));
    }

    function remove(req, res, next) {
        const ac_id = req.params.id;
        account_use_cases.removeAccount(ac_id)
            .then(() => {
                res.send({ message: `Account with ID ${ac_id} deleted successfully` })
            })
            .catch((error) => next(error));
    }

    function preprocessFile(data, name, customer_id) {
        const photo_data = data;
        // # randomly generate a five digit number to prevent filename conflict
        const salt = Math.floor(Math.random() * 90000) + 10000;
        const fname = `${Date.now()}_${customer_id}_${salt}_${name}`;
        const photo_dir = global.__profiledir;
        return { photo_data, fname, photo_dir }
    }

    return { getOne, getMultiple, create, update, remove }
}