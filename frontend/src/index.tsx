import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeContextProvider } from "./contexts/ThemeContext";

// document
//     .getElementsByTagName("body")[0]
//     .style.removeProperty("background-color");
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <>
        <Provider store={store}>
            <ThemeContextProvider>
                {/* <React.StrictMode> */}
                <App />
                {/* </React.StrictMode> */}
            </ThemeContextProvider>
        </Provider>
    </>
);
document.getElementById("loader")?.remove();
