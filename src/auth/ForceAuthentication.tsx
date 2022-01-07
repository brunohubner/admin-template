import Image from "next/image"
import Router from "next/router"
import { ReactNode } from "react"
import loadingGif from "../../public/assets/loading.gif"
import { useAuth } from "../context/AuthContext"

interface IProps {
    children?: ReactNode
}

export default function ForceAuthentication({ children }: IProps) {
    const { user, loading } = useAuth()

    function renderContent() {
        return <>{children}</>
    }

    function renderLoadingPage() {
        return (
            <div
                className={`
            flex justify-center items-center h-screen bg-gray-300
            `}
            >
                <Image alt="Loading" src={loadingGif}></Image>
            </div>
        )
    }

    if (!loading && user?.email) return renderContent()
    if (loading) return renderLoadingPage()

    Router.push("/auth")
    return null
}
