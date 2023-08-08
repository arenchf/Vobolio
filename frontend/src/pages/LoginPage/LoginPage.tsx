import React, { useContext } from "react";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";

function LoginPage() {
    const auth = useContext<IAuthContext | null>(AuthContext);

    const handleLogin = () => {
        if (auth) {
            auth?.login("admin", "123123");
        } else {
        }
    };

    return (
        <div className="landing-page-content">
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
