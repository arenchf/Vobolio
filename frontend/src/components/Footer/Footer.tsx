import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <span>Copyright &copy; 2023 vobolio.com</span>
            <Link to={"/about"}>About</Link>
            <Link to={"/privacy"}>Privacy Policy</Link>
            <Link to={"/terms"}>Terms and Conditions</Link>
        </footer>
    );
}

export default Footer;
