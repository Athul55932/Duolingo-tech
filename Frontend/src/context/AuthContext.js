import { createContext, useState } from "react";
import { login } from "../api/authApi"; // make sure login calls http://localhost:8080/auth/login

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (data) => {
        try {
            const res = await login(data);

            setUser(res.data);
            return res.data;
        } catch (err) {
            console.error("Login failed:", err.response?.status);
            alert("Invalid username or password");
            return null;
        }
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
