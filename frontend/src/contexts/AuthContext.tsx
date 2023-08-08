import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
// import { Provider } from "react-redux";
import User from "../models/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IAuthContext {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        let accessToken = localStorage.getItem("access");
        if (accessToken) {
            return jwt_decode(accessToken);
        }
        return null;
    });

    const navigate = useNavigate();

    const login = (username: string, password: string) => {
        axiosInstance
            .post("api/v1/token/obtain/", {
                username: username,
                password: password,
            })
            .then((response) => {
                localStorage.setItem("access", response.data["access"]);
                localStorage.setItem("refresh", response.data["refresh"]);
                axiosInstance.defaults.headers["Authorization"] =
                    "Bearer " + response.data["access"];
                setUser(jwt_decode(response.data["access"]));
                navigate("/home");
                toast.success("Login successful");
            })
            .catch((error) => {
                toast.error("Error on logging in!");
            });
    };

    const logout = () => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        setUser(null);
        toast.success("Success");

        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1000);
    };
    const refresh = async () => {
        const response = await axiosInstance.post("api/v1/token/refresh/", {
            refresh: localStorage.getItem("refresh"),
        });
        localStorage.setItem("access", response.data["access"]);
        localStorage.setItem("refresh", response.data["refresh"]);
        axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data["access"];
        setUser(jwt_decode(response.data["access"]));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
