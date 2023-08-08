import React, { useState, useEffect, useContext } from "react";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthContext, { AuthContextProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import RegisterPage from "./pages/Register/RegisterPage";
import DictioanaryPage from "./pages/DictionaryPage/DictionaryPage";
import "./Styles.scss";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import SocialPage from "./pages/SocialPage/SocialPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy/PrivacyPolicy";
import About from "./pages/StaticPages/About/About";
import TermsOfUse from "./pages/StaticPages/TermsOfUse/TermsOfUse";
import LandingLayout from "./components/LandingLayout/LandingLayout";
import CookiePolicy from "./pages/StaticPages/CookiesPolicy/CookiePolicy";
function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route element={<LandingLayout></LandingLayout>}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfUse />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cookies" element={<CookiePolicy />} />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute accessBy="non-authenticated">
                                    <LoginPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute accessBy="non-authenticated">
                                    <RegisterPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route element={<Layout></Layout>}>
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dictionaries"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <DictioanaryPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/train"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <TrainingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/social"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <SocialPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    draggable
                    pauseOnHover
                    closeOnClick
                    pauseOnFocusLoss={false}
                />
            </AuthContextProvider>
        </Router>
    );
}

interface IProtectedRoute {
    children: React.ReactElement;
    accessBy: string;
}

const ProtectedRoute = ({ children, accessBy }: IProtectedRoute) => {
    const auth = useContext(AuthContext);

    if (accessBy === "non-authenticated") {
        if (auth && !auth.user) {
            return children;
        }
        return <Navigate to="/home"></Navigate>;
    } else if (accessBy === "authenticated") {
        if (auth && auth.user) {
            return children;
        }
        return <Navigate to="/login"></Navigate>;
    }

    return <Navigate to="/"></Navigate>;
};

export default App;
