"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: string;
    enabledSystem?: boolean;
    disableTransitionOnChange?: boolean;
}

interface ThemeProviderState {
    theme: Theme;
    resolvedTheme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
    children,
    defaultTheme = "dark",
    storageKey = "theme",
}: ThemeProviderProps) {
    const [theme, setThemeState] = React.useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        }
        return defaultTheme;
    });
    const [ resolvedTheme, setResolvedTheme] = React.useState<Theme>(theme);

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            setResolvedTheme(systemTheme);
        }else {
            root.classList.add(theme);
            setResolvedTheme(theme);
        }
    }, [theme]);

    const setTheme = React.useCallback(
        (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
        [storageKey]
    );
    return (
        <ThemeProviderContext.Provider value={{theme, resolvedTheme, setTheme}}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = React.useContext(ThemeProviderContext);
    if (!context) {
        return {
            theme: "dark" as Theme,
            resolvedTheme: "dark" as Theme,
            setTheme: () => {},
        };
    }
    return context;
}