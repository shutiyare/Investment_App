// validate inputs before you pass them to repos

export default function accountUseCases(accountRepository){

    function getAccount(user_id){
        if(!user_id || isNaN(user_id)){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return accountRepository.getAccount(user_id);
    }

    function getMultipleAccounts(page, size){
        console.log(!page , isNaN(page) , !size , isNaN(size) , Number(page) < 0 , Number(size) < 0)
        if(!page || isNaN(page) || !size || isNaN(size) || Number(page) < 0 || Number(size) < 0){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return accountRepository.getMultipleAccounts(page, size);
    }

    function createAccount({ employee_id, name, username, password, role_id}){
        console.log({employee_id, name, username, password, role_id})
        console.log(!employee_id , isNaN(employee_id) , !name , !username , !password , !role_id , isNaN(role_id))
        if(!employee_id || isNaN(employee_id) || !name || !username || !password || !role_id || isNaN(role_id)){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return accountRepository.createAccount({ employee_id, name, username, password, role_id});
    }

    function updateAccount({ user_id, employee_id, name, username, password, photo, role_id, is_active}){
        if(!user_id || isNaN(user_id) && (!employee_id || isNaN(employee_id)) && (!role_id || isNaN(role_id))){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return accountRepository.updateAccount({ user_id, employee_id, name, username, password, photo, role_id, is_active});
    }

    function removeAccount(user_id){
        if(!user_id || isNaN(user_id)){
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        return accountRepository.removeAccount(user_id);
    }

    return {getAccount, getMultipleAccounts, createAccount, updateAccount, removeAccount}
}