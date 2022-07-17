export default function customerRepository(customerModels){

    const getCustomer = (ac_id)=> {
        return customerModels.getCustomer(ac_id);
    }

    const getMultipleCustomers = (page, customersPerPage)=> {
        return customerModels.getMultipleCustomers(page, customersPerPage);
    }

    const createCustomer = ({ account_no, name, phone})=> {
        console.log("Here we go",{account_no, name, phone})
        return customerModels.createCustomer({ account_no, name, phone});
    }

    const updateCustomer = ({ customer_id, account_no, name, phone})=> {
        return customerModels.updateCustomer({ customer_id, account_no, name, phone});
    }

    const removeCustomer = (ac_id)=> {
        return customerModels.removeCustomer(ac_id);
    }

    return {getCustomer, getMultipleCustomers, createCustomer, updateCustomer, removeCustomer}
}