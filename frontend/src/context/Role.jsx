import React, {useState, createContext} from "react";

export const RoleContext = createContext(null);

export const RoleProvider = (props) => {
    const [userRole, setUserRole] = useState("");
    return (
        <RoleContext.Provider value={{userRole, setUserRole}}>

            {props.children}
        </RoleContext.Provider>
    )
}