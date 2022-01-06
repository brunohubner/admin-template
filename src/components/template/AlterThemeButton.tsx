import { Theme } from "../../context/ThemeContext"
import { MoonIcon, SunIcon } from "../icons"

interface IProps {
    theme: Theme
    alterTheme: () => void
}

export default function AlterThemeButton({ theme, alterTheme }: IProps) {
    return theme === "dark" ? (
        <div
            className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14 lg:w-24 h-8 p-1 rounded-full
        `}
            onClick={alterTheme}
        >
            <div
                className={`
                flex items-center justify-center
                bg-white text-yellow-600
                w-6 h-6 rounded-full
            `}
            >
                {SunIcon(4)}
            </div>
            <div
                className={`
                hidden lg:flex items-center ml-2 text-white
            `}
            >
                <span className={`text-sm`}>Claro</span>
            </div>
        </div>
    ) : (
        <div
            className={`
            hidden sm:flex justify-end items-center cursor-pointer
            bg-gradient-to-r from-gray-500 to-gray-900
            w-14 lg:w-24 h-8 p-1 rounded-full
        `}
            onClick={alterTheme}
        >
            <div
                className={`
                hidden lg:flex items-center mr-2 text-gray-300
            `}
            >
                <span className={`text-sm`}>Escuro</span>
            </div>
            <div
                className={`
                flex items-center justify-center
                bg-black text-yellow-300
                w-6 h-6 rounded-full
            `}
            >
                {MoonIcon(4)}
            </div>
        </div>
    )
}
