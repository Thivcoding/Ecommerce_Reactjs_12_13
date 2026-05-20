import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const HandleLogin = (user,token)=>{
        localStorage.setItem("user",JSON.stringify(user));
        setUser(user)
        
        localStorage.setItem("token",token);
        setToken(token);
    }

    const HandleLogout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token")
    }
    return (
        <AuthContext.Provider value={{
            user,
            token,
            HandleLogin,
            HandleLogout
            }}>

            {children}
        </AuthContext.Provider>
    )
}