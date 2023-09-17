import React, { useContext } from "react";
import "./App.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthContext, { AuthContextProvider } from "./contexts/AuthContext";
import LandingLayout from "./components/LandingLayout/LandingLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPagePage/LoginPage";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy/PrivacyPolicy";
import About from "./pages/StaticPages/About/About";
import TermsOfUse from "./pages/StaticPages/TermsOfUse/TermsOfUse";
import CookiePolicy from "./pages/StaticPages/CookiesPolicy/CookiePolicy";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TrainingSetupPage from "./pages/TrainingSetupPage/TrainingSetupPage";
import SocialPage from "./pages/SocialPage/SocialPage";
import ProfilePage from "./pages/ProfilePage/ProfilePagePage";
import DictionaryList from "./pages/DictionaryListPage/DictionaryListPage";
import NewDictionaryPage from "./pages/NewDictionaryPage/NewDictionaryPage";
import EditDictionaryPage from "./pages/EditDictionaryPage/EditDictionaryPage";
import DictionaryDetailPage from "./pages/DictionaryDetailPage/DictionaryDetailPage";
import NewWordPage from "./pages/NewWordPage/NewWordPage";
import EditWordPage from "./pages/EditWordPage/EditWordPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";

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
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/user?/:username?">
                            <Route
                                path="dictionaries"
                                element={<DictionaryList />}
                            />
                            {/* <Route path="" element={<DictionaryList />} /> */}
                        </Route>
                        <Route
                            path="/dictionaries/:dictionaryId/"
                            element={
                                <DictionaryDetailPage></DictionaryDetailPage>
                            }
                        ></Route>
                        <Route
                            path="/dictionaries/add"
                            element={<NewDictionaryPage></NewDictionaryPage>}
                        ></Route>
                        <Route
                            path="/dictionaries/:dictionaryId/edit"
                            element={<EditDictionaryPage></EditDictionaryPage>}
                        ></Route>
                        <Route
                            path="/dictionaries/:dictionaryId/words/add"
                            element={<NewWordPage></NewWordPage>}
                        ></Route>
                        <Route
                            path="/words/:wordId"
                            element={<EditWordPage></EditWordPage>}
                        ></Route>
                        {/* <Route
                            path="/dictionaries"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <DictioanaryPage />
                                </ProtectedRoute>
                            }
                        /> */}
                        <Route
                            path="/training"
                            element={
                                <ProtectedRoute accessBy="authenticated">
                                    <TrainingSetupPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/training/:dictionaryId/:modeName"
                            element={<TrainingPage></TrainingPage>}
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
                    // autoClose={false}
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
