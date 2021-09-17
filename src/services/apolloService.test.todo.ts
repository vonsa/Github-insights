/*
    @TODO:

    CASE 1: Test if authorization header is added to all queries

    1. set token$
    2. Execute an Apollo query
    3. Expect:
        - Apollo query to have authorization header: Bearer ${token}

    CASE 2: When non authorized request is made, logout & prompt a login request

    1. Set an incorrect token
    2. Execute an Apollo query
    3. Expect:
        - query to error with status code 401
        - logout to be called
        - promptLogin$ to emit true
*/

export default {}
