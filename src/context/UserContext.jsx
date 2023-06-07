import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = window.localStorage.getItem('user');
        setUser(userData);
    });

    return (<UserContext.Provider
        value={{ user, setUser }}>
        {children}
    </UserContext.Provider>)
} 