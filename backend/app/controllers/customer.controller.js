import customerUseCases from "../use_cases/customer.usecases.js";


export default function customerController(customerRepository){

    const customer_use_cases = customerUseCases(customerRepository)  ;

    function getOne(req, res, next){
        customer_use_cases.getCustomer(req.params.id)
        .then((customer) =>{
            if(customer && customer.length == 0){
                const error = new Error('Not Found');
                error.status = 404;
                throw error;
            }
            res.send({data: customer});
        })
        .catch((error)=> next(error));
    }

    function getMultiple(req, res, next){
        const {page, size} = req.query;
        console.log('page and size ',{page, size})
        customer_use_cases.getMultipleCustomers(page, size)
        .then((customers)=>{
            if(customers && customers.length ==0){
                const error = new Error('Not Found');
                error.status = 404;
                throw error; 
            }
            res.send({data: customers});
        })
        .catch((error)=> next(error));
    }

    function create(req, res, next){
        // const created_by = 1; // read it with middleware
        const {account_no, name, phone} = req.body;
        customer_use_cases.createCustomer({ account_no, name, phone})
        .then((customer)=>{
            res.send({data: customer, message: "Customer added successfully"})
        })
        .catch((error)=> next(error));
    }

    function update(req, res, next){
        // const updated_by = 1;
        const customer_id = req.params.id;
        const {account_no, name, phone} = req.body;
        customer_use_cases.updateCustomer({ customer_id, account_no, name, phone})
        .then((customer)=>{
             res.send({data: customer, message: "Customer updated successfully"});
        })
        .catch((error)=> next(error));
    }

    function remove(req, res, next){
        const ac_id = req.params.id;
        customer_use_cases.removeCustomer(ac_id)
        .then(()=>{
            res.send({message:`Customer with ID ${ac_id} deleted successfully`})
        })
        .catch((error)=> next(error));
    }

    return {getOne, getMultiple, create, update, remove}
}