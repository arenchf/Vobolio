import React, { useContext, useState } from "react";
import logo from "../../logoColoredCroppedCompressed.png";
import "./LandingLayout.scss";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

function LandingLayout() {
    const auth = useContext(AuthContext);

    const [consent, setConsent] = useState(
        localStorage.getItem("consent") === "given"
    );
    const [consentToggle, setConsentToggle] = useState(
        localStorage.getItem("consent") !== "given"
    );

    const handleConsentAccept = () => {
        setConsentToggle(false);
        setConsent(true);
        localStorage.setItem("consent", "given");
    };
    return (
        <div className="page-landing">
            <header className="header-landing">
                <Link className="logo-link" to={"/"}>
                    <div className="logo-wrapper">
                        <img src={logo} alt="Vobolio Logo" />
                    </div>
                </Link>
                {/* <div>
                    <ul className="landing-nav">
                        <li className="landing-nav-li"></li>
                        <li className="landing-nav-li"></li>
                        <li className="landing-nav-li"></li>
                        <li className="landing-nav-li"></li>
                        <li className="landing-nav-li"></li>
                    </ul>
                </div> */}
                <div className="landing-btn-group">
                    {!auth?.user ? (
                        <>
                            <div
                                onClick={() => {
                                    auth?.login("demo", "demo123123");
                                }}
                                className="landing-btn-header"
                            >
                                Demo
                            </div>
                            {/* <div className="landing-btn-header">
                                <Link to={"/login"}>Login</Link>
                            </div>
                            <div className="landing-btn-header">
                                <Link to={"/register"}>Register</Link>
                            </div> */}
                        </>
                    ) : (
                        <>
                            <div className="landing-btn-header">
                                <Link to={"/home"}>App</Link>
                            </div>
                            <div
                                onClick={() => {
                                    auth.logout();
                                }}
                                className="landing-btn-header"
                            >
                                Logout
                            </div>
                        </>
                    )}
                </div>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <ul>
                    {/* <li className="footer-li">Vobolio</li> */}
                    {/* <li className="footer-li">
                        <Link to={"/about"}>About</Link>
                    </li> */}
                    <li className="footer-li">
                        <Link to={"/privacy"}>Privacy Policy</Link>
                    </li>
                    <li className="footer-li">
                        <Link to={"/terms"}>Terms of Use</Link>
                    </li>
                    <li className="footer-li">
                        <Link to={"/cookies"}>Cookie Policy</Link>
                    </li>
                    <li className="footer-li">
                        <Link to={"/licences"}>Licenses</Link>
                    </li>
                </ul>
                <div>
                    <span>Contact: arenchf@gmail.com</span>
                    <span>Copyright &copy; 2023 Vobolio</span>
                </div>
            </footer>
            {consentToggle ? (
                <div className="consent-bar">
                    <div>
                        We use cookies to enhance your user experience. By using
                        our website, you agree to our use of cookies.{" "}
                        <Link to={"/cookies"}>Learn More</Link>
                    </div>
                    <button onClick={handleConsentAccept}>Accept</button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default LandingLayout;
