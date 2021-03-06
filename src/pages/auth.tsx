/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import { useState } from "react"
import AuthInput from "../auth/AuthInput"
import { ExclamationIcon, GoogleIcon } from "../components/icons"
import { useAuth } from "../context/AuthContext"

export default function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const { errorMessage, signup, login, googleLogin } = useAuth()

    function submit() {
        if (isLogin) {
            login({ email, password })
            return
        }
        signup({ email, password, passwordConfirmation })
        return
    }

    return (
        <>
            <Head>
                <title>Bruno Hubner - Autenticação</title>
                <meta
                    name="description"
                    content="Bruno Hubner - Autenticação"
                />
            </Head>
            <div className={`flex justify-center items-center h-screen`}>
                <div className={`hidden md:block md:w-1/2 lg:w-4/5`}>
                    <img
                        src="https://source.unsplash.com/random"
                        alt="Imagem de Boas vindas"
                        className={`h-screen w-full object-cover`}
                    />
                </div>
                <div className={`w-full md:w-1/2 lg:1/5 mx-10`}>
                    <h1
                        className={`
                text-3xl font-bold mb-5
            `}
                    >
                        {isLogin
                            ? "Entre com sua conta"
                            : "Cadastre-se na Plataforma"}
                    </h1>
                    {errorMessage ? (
                        <div
                            className={`
                    flex items-center bg-red-400 text-white py-3 px-5
                    my-2 border border-red-700 rounded-lg
                `}
                        >
                            {ExclamationIcon()}
                            <span className={`ml-3`}>{errorMessage}</span>
                        </div>
                    ) : (
                        false
                    )}

                    <AuthInput
                        label="Email"
                        value={email}
                        type="email"
                        onChange={setEmail}
                        required
                    ></AuthInput>
                    <AuthInput
                        label="Senha"
                        value={password}
                        type="password"
                        onChange={setPassword}
                        required
                    ></AuthInput>
                    {isLogin ? (
                        false
                    ) : (
                        <AuthInput
                            label="Confirme a senha"
                            value={passwordConfirmation}
                            type="password"
                            onChange={setPasswordConfirmation}
                            required
                        ></AuthInput>
                    )}
                    <button
                        className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg py-3 mt-6
            `}
                        onClick={submit}
                    >
                        {isLogin ? "Entrar" : "Registrar"}
                    </button>
                    {isLogin ? (
                        <button
                            className={`
                flex items-center justify-center mt-2
                w-full bg-withe hover:bg-gray-100
                text-gray-900 font-bold rounded-lg py-3 border border-gray-300
            `}
                            onClick={googleLogin}
                        >
                            <span>{GoogleIcon()}</span>
                            <span className={`ml-2`}>Entrar com o Google</span>
                        </button>
                    ) : (
                        false
                    )}
                    {isLogin ? (
                        <p className={`mt-8`}>
                            Novo por aqui?&nbsp;
                            <a
                                className={`
                            text-blue-500 hover:text-blue-800 cursor-pointer
                            `}
                                onClick={() => setIsLogin(false)}
                            >
                                Cadastre-se gratuitamente!
                            </a>
                        </p>
                    ) : (
                        <p className={`mt-8`}>
                            Já é cadastrado?&nbsp;
                            <a
                                className={`
                            text-blue-500 hover:text-blue-800 cursor-pointer
                            `}
                                onClick={() => setIsLogin(true)}
                            >
                                Faça Login agora!
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
