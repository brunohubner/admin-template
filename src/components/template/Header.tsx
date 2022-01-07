import { useTheme } from "../../context/ThemeContext"
import AlterThemeButton from "./AlterThemeButton"
import Title from "./Title"
import UserAvatar from "./UserAvatar"

interface IProps {
    title: string
    subtitle: string
}

export default function Header(props: IProps) {
    const { alterTheme, theme } = useTheme()
    return (
        <header className={`flex`}>
            <Title {...props}></Title>
            <div className={`flex flex-1 justify-end items-center`}>
                <AlterThemeButton theme={theme} alterTheme={alterTheme} />
                <UserAvatar className="ml-3"></UserAvatar>
            </div>
        </header>
    )
}
