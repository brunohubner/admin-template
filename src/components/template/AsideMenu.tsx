import { useAuth } from "../../context/AuthContext"
import { BellIcon, CogIcon, HomeIcon, LogoutIcon, QuestionIcon } from "../icons"
import Logo from "./Logo"
import MenuItem from "./MenuItem"

export default function AsideMenu() {
    const { logout } = useAuth()

    return (
        <aside
            className={`
        flex flex-col
        bg-gray-200 text-gray-900
        dark:bg-gray-900
        `}
        >
            <div
                className={`
                    flex flex-col justify-center items-center bg-gradient-to-r
                    from-indigo-500 to-purple-800 h-20 w-20
                `}
            >
                <Logo></Logo>
            </div>
            <ul className={`flex-1`}>
                <MenuItem url="/" label="Home" icon={HomeIcon}></MenuItem>
                <MenuItem
                    url="/notifications"
                    label="Notificações"
                    icon={BellIcon}
                ></MenuItem>
                <MenuItem
                    url="/about"
                    label="Sobre"
                    icon={QuestionIcon}
                ></MenuItem>
                <MenuItem
                    url="/settings"
                    label="Ajustes"
                    icon={CogIcon}
                ></MenuItem>
            </ul>
            <ul>
                <MenuItem
                    onClick={logout}
                    label="Sair"
                    icon={LogoutIcon}
                    className={`
                    text-red-600 hover:bg-red-400 hover:text-white
                    dark:text-red-400 dark:hover:text-white
                    `}
                ></MenuItem>
            </ul>
        </aside>
    )
}
