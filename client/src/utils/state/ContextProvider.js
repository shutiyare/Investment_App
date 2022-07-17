import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({ children }) {
    const [auth, SetAuth] = useState({});

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
            SetAuth(authData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    // login function
    function login(auth_value) {
        SetAuth(auth_value);
        console.log("looged in");
    }
    // logout function
    function logout() {
        SetAuth({});
        console.log("logged out");
    }
    return (
        <Context.Provider value={{ auth, login, logout }}>
            {children}
        </Context.Provider>
    )
}

export default { ContextProvider, Context }