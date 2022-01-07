import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "../context/ThemeContext"
import { AuthProvider } from "../context/AuthContext"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    )
}
