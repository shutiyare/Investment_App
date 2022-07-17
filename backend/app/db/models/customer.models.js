export default function customerModels(dbConn) {

    function getCustomer(customerId) {
        const queryText = `; SELECT * FROM customer WHERE customer_id=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [customerId]);
    }

    function getMultipleCustomers(page, customersPerPage) {
        const queryText = `;SELECT * FROM customer WHERE is_deleted='f' ORDER BY customer_id LIMIT $2 OFFSET (($1 -1)*$2);`;
        return dbConn.query(queryText, [page, customersPerPage]);
    }

    async function createCustomer({ account_no, name, phone }) {
        // create new user and return id
        const createQuery = `; WITH new_customer (customer_id) AS (
            INSERT INTO customer(account_no, name, phone)
            VALUES ($1, $2, $3) RETURNING customer_id)
            SELECT customer_id FROM new_customer
        ;`;
        const new_customer_id = (await dbConn.query(createQuery, [account_no, name, phone]))[0].customer_id;
        console.log({ new_customer_id });
        // send the view of the newly created customer back to the user
        const viewQueryText = `; SELECT * FROM customer WHERE customer_id=$1;`;
        return dbConn.query(viewQueryText, [new_customer_id]);
    }

    async function updateCustomer({ customer_id, account_no, name, phone}) {
        // console.log('inside models ', updated_by, customer_id, modality_name);
        const updateQuery = `; UPDATE customer SET 
            account_no = updateIfChanged($2, account_no),
            name = updateIfChanged($3, name),
            phone = updateIfChanged($4, phone)
            WHERE customer_id=$1
            ;`;
        await dbConn.query(updateQuery, [customer_id, account_no, name, phone]);
        console.log('returing ', customer_id);
        // return the updated modality to client
        const viewQueryText = `; SELECT * FROM customer WHERE customer_id=$1;`;
        return dbConn.query(viewQueryText, [customer_id]);
    }

    function removeCustomer(customerId) {
        const queryText = `; UPDATE customer SET is_deleted='t' WHERE customer_id=$1;`
        return dbConn.query(queryText, [customerId]);
    }


    return { getCustomer, getMultipleCustomers, createCustomer, updateCustomer, removeCustomer }
}