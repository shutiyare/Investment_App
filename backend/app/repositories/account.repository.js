export default function accountRepository(accountModels){

    const getAccount = (ac_id)=> {
        return accountModels.getAccount(ac_id);
    }

    const getMultipleAccounts = (page, accountsPerPage)=> {
        return accountModels.getMultipleAccounts(page, accountsPerPage);
    }

    const createAccount = ({ employee_id, name, username, password, role_id})=> {
        console.log("Here we go",{employee_id, name, username, password, role_id})
        return accountModels.createAccount({ employee_id, name, username, password, role_id});
    }

    const updateAccount = ({ user_id, employee_id, name, username, password, photo, role_id, is_active})=> {
        return accountModels.updateAccount({ user_id, employee_id, name, username, password, photo, role_id, is_active});
    }

    const removeAccount = (ac_id)=> {
        return accountModels.removeAccount(ac_id);
    }

    return {getAccount, getMultipleAccounts, createAccount, updateAccount, removeAccount}
}