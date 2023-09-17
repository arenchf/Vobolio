import { createContext, useEffect, useState } from "react";

export interface IThemeContext {
    theme: string;
    changeTheme: (_theme: string) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

interface ThemeContextProps {
    children: React.ReactNode;
}
export const ThemeContextProvider = ({ children }: ThemeContextProps) => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem("theme") ??
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light") ??
            "light"
    );

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    const changeTheme = (_theme: string) => {
        localStorage.setItem("theme", _theme);
        setTheme(_theme);
        document.querySelector("[name='theme-color']")?.remove();
        var meta = document.createElement("meta");
        meta.setAttribute("name", "theme-color");
        meta.setAttribute("content", _theme === "dark" ? "#000" : "#fff");
        document.getElementsByTagName("head")[0].appendChild(meta);
        // document.body.dataset.theme = _theme;
    };

    return (
        <ThemeContext.Provider value={{ changeTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
