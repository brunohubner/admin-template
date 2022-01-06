import { useTheme } from "../../context/ThemeContext"
import Title from "./Title"

interface IProps {
    title: string
    subtitle: string
}

export default function Header(props: IProps) {
    const { alterTheme } = useTheme()
    return (
        <header>
            <Title {...props}></Title>
            <button onClick={alterTheme}>Alterar Tema</button>
        </header>
    )
}
