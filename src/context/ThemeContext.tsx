import { createContext, ReactNode, useContext, useState } from "react"

export type Theme = "" | "dark"

interface IThemeContext {
    theme: Theme
    alterTheme: () => void
}

interface IThemeProvider {
    children?: ReactNode
}

const INITIAL_STATE: IThemeContext = {
    theme: "",
    alterTheme() {}
}

const ThemeContext = createContext<IThemeContext>(INITIAL_STATE)

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }: IThemeProvider) {
    const [theme, setTheme] = useState<Theme>(INITIAL_STATE.theme)

    function alterTheme() {
        setTheme(theme === "" ? "dark" : "")
    }

    return (
        <ThemeContext.Provider value={{ theme, alterTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
