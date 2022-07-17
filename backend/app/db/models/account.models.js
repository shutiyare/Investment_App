export default function accountModels(dbConn) {

    function getAccount(accountId) {
        const queryText = `; SELECT * FROM iam_account WHERE user_id=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [accountId]);
    }

    function getMultipleAccounts(page, accountsPerPage) {
        const queryText = `;SELECT * FROM iam_account WHERE is_deleted='f' ORDER BY user_id LIMIT $2 OFFSET (($1 -1)*$2);`;
        return dbConn.query(queryText, [page, accountsPerPage]);
    }

    async function createAccount({ employee_id, name, username, password, role_id }) {
        // create new user and return id
        const createQuery = `; WITH new_account (user_id) AS (
            INSERT INTO iam_account(employee_id, name, username, password, role_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING user_id)
            SELECT user_id FROM new_account
        ;`;
        const new_user_id = (await dbConn.query(createQuery, 
            [employee_id, name, username, password, role_id]))[0].user_id;
        console.log({ new_user_id });
        // send the view of the newly created account back to the user
        const viewQueryText = `; SELECT * FROM iam_account WHERE user_id=$1;`;
        return dbConn.query(viewQueryText, [new_user_id]);
    }

    async function updateAccount({ user_id, employee_id, name, username, password, photo, role_id, is_active}) {
        // console.log('inside models ', updated_by, user_id, modality_name);
        const updateQuery = `; UPDATE iam_account SET 
            employee_id = updateIfChanged($2, employee_id),
            name = updateIfChanged($3, name),
            username = updateIfChanged($4, username),
            password = updateIfChanged($5, password),
            photo = updateIfChanged($6, photo),
            role_id = updateIfChanged($7, role_id),
            is_active = updateIfChanged($8, is_active)
            WHERE user_id=$1
            ;`;
        await dbConn.query(updateQuery, [user_id, employee_id, name, username, password, photo, role_id, is_active]);
        console.log('returing ', user_id);
        // return the updated modality to client
        const viewQueryText = `; SELECT * FROM iam_account WHERE user_id=$1;`;
        return dbConn.query(viewQueryText, [user_id]);
    }

    function removeAccount(accountId) {
        const queryText = `; UPDATE iam_account SET is_deleted='t' WHERE user_id=$1;`
        return dbConn.query(queryText, [accountId]);
    }


    return { getAccount, getMultipleAccounts, createAccount, updateAccount, removeAccount }
}