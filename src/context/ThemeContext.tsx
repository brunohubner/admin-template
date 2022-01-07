import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"

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
        const newTheme = theme === "" ? "dark" : ""
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    function getLocalTheme() {
        const localTheme = localStorage.getItem("theme") as Theme
        setTheme(localTheme)
    }

    useEffect(getLocalTheme, [])

    return (
        <ThemeContext.Provider value={{ theme, alterTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
