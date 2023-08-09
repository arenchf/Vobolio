import React, { useContext } from "react";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function LoginPage() {
    const auth = useContext<IAuthContext | null>(AuthContext);

    const handleLogin = () => {
        toast.error("Not Implemented");
    };

    return (
        <div className="landing-page-content">
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
