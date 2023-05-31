import { useState,createContext,useContext } from "react";

export const userContext = createContext();


export const AppWrapper = ({children}) =>{


    const [userData , setUserData] = useState({id:222555});

    return (
        <div>
            <userContext.Provider value={{userData , setUserData}} > {children} </userContext.Provider>
        </div>
    );
}


export const UseUserContext = () => useContext(userContext);