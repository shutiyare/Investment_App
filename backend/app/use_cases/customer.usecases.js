// validate inputs before you pass them to repos

export default function customerUseCases(customerRepository){

    function getCustomer(customer_id){
        if(!customer_id || isNaN(customer_id)){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return customerRepository.getCustomer(customer_id);
    }

    function getMultipleCustomers(page, size){
        console.log(!page , isNaN(page) , !size , isNaN(size) , Number(page) < 0 , Number(size) < 0)
        if(!page || isNaN(page) || !size || isNaN(size) || Number(page) < 0 || Number(size) < 0){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return customerRepository.getMultipleCustomers(page, size);
    }

    function createCustomer({ account_no, name, phone}){
        if(!account_no || isNaN(account_no) || !name || !phone ){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return customerRepository.createCustomer({ account_no, name, phone});
    }

    function updateCustomer({ customer_id, account_no, name, phone}){
        if(!customer_id || isNaN(customer_id) && (!account_no || isNaN(account_no)) ){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return customerRepository.updateCustomer({ customer_id, account_no, name, phone});
    }

    function removeCustomer(customer_id){
        if(!customer_id || isNaN(customer_id)){
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        return customerRepository.removeCustomer(customer_id);
    }

    return {getCustomer, getMultipleCustomers, createCustomer, updateCustomer, removeCustomer}
}