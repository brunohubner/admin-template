/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import Layout from "../components/template/Layout"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
    const { user } = useAuth()
    return (
        <>
            <Head>
                <title>{user?.email}</title>
                <meta name="description" content="Perfil de usuário" />
            </Head>
            <div>
                <Layout
                    title="Perfil"
                    subtitle="Área de gerenciamento do perfil"
                >
                    <div
                        className={`
                        flex flex-col w-full items-center
                    `}
                    >
                        <div
                            className={`
                        flex flex-col w-full md:w-1/2 lg:w-1/3 p-10 items-center
                        border border-gray-600 dark:border-gray-200
                        `}
                        >
                            <img
                                src={user?.avatarUrl || "/assets/user.svg"}
                                alt="Avatar"
                                className={`h-36 w-36 rounded-full mb-4`}
                            />
                            {user?.name ? (
                                <div className={`mb-2`}>{user?.name}</div>
                            ) : (
                                false
                            )}
                            <div>{user?.email}</div>
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    )
}
