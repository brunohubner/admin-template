import Title from "./Title"

interface IProps {
    title: string
    subtitle: string
}

export default function Header(props: IProps) {
    return (
        <header>
            <Title {...props}></Title>
        </header>
    )
}
