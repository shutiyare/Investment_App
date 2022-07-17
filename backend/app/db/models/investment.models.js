export default function investmentModels(dbConn) {

    function getInvestment(investmentId) {
        const queryText = `; SELECT * FROM investment WHERE investment_id=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [investmentId]);
    }

    function getMultipleInvestments(page, investmentsPerPage) {
        const queryText = `;SELECT * FROM investment WHERE is_deleted='f' ORDER BY investment_id LIMIT $2 OFFSET (($1 -1)*$2);`;
        return dbConn.query(queryText, [page, investmentsPerPage]);
    }

    async function createInvestment({customer_id, amount, docs, memo }) {
        // create new user and return id
        const createQuery = `; WITH new_investment (investment_id) AS (
            INSERT INTO investment(customer_id, amount, docs, memo)
            VALUES ($1, $2, $3, $4) RETURNING investment_id)
            SELECT investment_id FROM new_investment
        ;`;
        const new_investment_id = (await dbConn.query(createQuery, [customer_id, amount, docs, memo]))[0].investment_id;
        // console.log({ new_investment_id });
        // send the view of the newly created investment back to the user
        const viewQueryText = `; SELECT * FROM investment WHERE investment_id=$1;`;
        return dbConn.query(viewQueryText, [new_investment_id]);
    }

    async function updateInvestment({ investment_id, customer_id, amount, docs, memo}) {
        // console.log('inside models ', updated_by, investment_id, modality_amount);
        const updateQuery = `; UPDATE investment SET 
            customer_id = updateIfChanged($2, customer_id),
            amount = updateIfChanged($3, amount),
            docs = updateIfChanged($4, docs),
            memo = updateIfChanged($5, memo)
            WHERE investment_id=$1
            ;`;
        await dbConn.query(updateQuery, [investment_id, customer_id, amount, docs, memo]);
        console.log('returing ', investment_id);
        // return the updated modality to client
        const viewQueryText = `; SELECT * FROM investment WHERE investment_id=$1;`;
        return dbConn.query(viewQueryText, [investment_id]);
    }

    function removeInvestment(investmentId) {
        const queryText = `; UPDATE investment SET is_deleted='t' WHERE investment_id=$1;`
        return dbConn.query(queryText, [investmentId]);
    }


    return { getInvestment, getMultipleInvestments, createInvestment, updateInvestment, removeInvestment }
}