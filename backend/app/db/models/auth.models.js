export default function authModels(dbConn) {

    function getPassword(username) {
        const queryText = `; SELECT password FROM iam_account WHERE username=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [username]);
    }

    function getId(username) {
        const queryText = `; SELECT user_id FROM iam_account WHERE username=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [username]);
    }

    function getRole(user_id) {
        const queryText = `; WITH user_info AS (SELECT role_id FROM iam_account WHERE user_id=$1 AND is_deleted='f')
                        SELECT role FROM iam_role WHERE role_id=(select role_id FROM user_info);`;
        return dbConn.query(queryText, [user_id]);
    }

    function getUsernamePhoto(user_id){
        const queryText = `; SELECT username, photo FROM iam_account WHERE user_id=$1 AND is_deleted='f';`;
        return dbConn.query(queryText, [user_id]);      
    }
    return { getPassword, getId, getRole, getUsernamePhoto }
}