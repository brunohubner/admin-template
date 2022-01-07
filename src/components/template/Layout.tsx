import { ReactNode } from "react"
import ForceAuthentication from "../../auth/ForceAuthentication"
import { useTheme } from "../../context/ThemeContext"
import AsideMenu from "./AsideMenu"
import Content from "./Content"
import Header from "./Header"

interface IProps {
    title: string
    subtitle: string
    children?: ReactNode
}

export default function Layout({ title, subtitle, children }: IProps) {
    const { theme } = useTheme()

    return (
        <ForceAuthentication>
            <div className={`${theme || ""} flex h-screen w-screen`}>
                <AsideMenu></AsideMenu>
                <div
                    className={`
            flex flex-col w-full p-7
            bg-gray-300
            dark:bg-gray-800
            `}
                >
                    <Header title={title} subtitle={subtitle}></Header>
                    <Content>{children}</Content>
                </div>
            </div>
        </ForceAuthentication>
    )
}
