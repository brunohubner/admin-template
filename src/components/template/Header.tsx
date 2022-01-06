import { useTheme } from "../../context/ThemeContext"
import AlterThemeButton from "./AlterThemeButton"
import Title from "./Title"

interface IProps {
    title: string
    subtitle: string
}

export default function Header(props: IProps) {
    const { alterTheme, theme } = useTheme()
    return (
        <header className={`flex`}>
            <Title {...props}></Title>
            <div className={`flex flex-1 justify-end`}>
                <AlterThemeButton theme={theme} alterTheme={alterTheme} />
            </div>
        </header>
    )
}
