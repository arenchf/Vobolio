import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <div className="beta-top">
            <div className="beta-banner">Beta</div>
        </div>
        <Provider store={store}>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </Provider>
    </>
);
