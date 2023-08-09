import React, { useContext } from "react";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function RegisterPage() {
    const auth = useContext<IAuthContext | null>(AuthContext);

    const handleLogin = () => {
        toast.error("Not Implemented");
    };

    return (
        <div className="landing-page-content">
            <h2>To Be Implemented</h2>
            {/* <button onClick={handleLogin}>Register</button> */}
        </div>
    );
}

export default RegisterPage;
