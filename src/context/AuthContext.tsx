import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    NextOrObserver,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth"
import UserModel from "../model/UserModel"
import Router from "next/router"
import firebaseAuth from "../firebase"
import { signInWithPopup, onIdTokenChanged } from "firebase/auth"
import Cookie from "js-cookie"
import { validEmail } from "../utils/regex"

interface IProps {
    children?: ReactNode
}

interface ILoginData {
    email: string
    password: string
}

interface ISignupData {
    email: string
    password: string
    passwordConfirmation: string
}

interface IAuthContext {
    user: UserModel
    loading: boolean
    errorMessage: string
    signup: (data: ISignupData) => void
    login: (data: ILoginData) => void
    googleLogin: () => Promise<void>
    logout: () => void
}

const INITIAL_STATE: IAuthContext = {
    user: {
        id: "",
        name: "",
        email: "",
        token: "",
        avatarUrl: null,
        provider: ""
    },
    errorMessage: "",
    loading: true,
    signup() {},
    login() {},
    async googleLogin() {},
    logout() {}
}

const AuthContext = createContext<IAuthContext>(INITIAL_STATE)

export const authCookieKey = "admin-template-auth"

async function normalizeUser(firebaseUser: User): Promise<UserModel> {
    const token = await firebaseUser.getIdToken()
    return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        provider: firebaseUser.providerData[0].providerId,
        avatarUrl: firebaseUser.photoURL,
        token
    }
}

function cookieMananger(logged: boolean) {
    if (logged) {
        Cookie.set(authCookieKey, "true", {
            expires: 7 //days
        })
        return
    }
    Cookie.remove(authCookieKey)
}

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: IProps) {
    const [user, setUser] = useState<UserModel>(INITIAL_STATE.user)
    const [loading, setLoading] = useState(INITIAL_STATE.loading)
    const [errorMessage, setErrorMessage] = useState(INITIAL_STATE.errorMessage)

    function showError(message: string, timeInSeconds = 5) {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(""), timeInSeconds * 1000)
    }

    async function sessionSetup(
        firebaseUser: User | null
    ): Promise<NextOrObserver<User>> {
        if (firebaseUser?.email) {
            const user = await normalizeUser(firebaseUser)
            setUser(user)
            cookieMananger(true)
            setLoading(false)
            return () => firebaseUser
        }
        setUser(INITIAL_STATE.user)
        cookieMananger(false)
        setLoading(false)
        return () => firebaseUser
    }

    async function signup({
        email,
        password,
        passwordConfirmation
    }: ISignupData) {
        try {
            if (!validEmail.test(email)) {
                showError("Email inválido")
                return
            }
            if (password.length < 8) {
                showError("A senha deve ter pelo menos 8 caracteres")
                return
            }
            if (password !== passwordConfirmation) {
                showError("As senhas não conferem")
                return
            }
            const resp = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            )

            await sessionSetup(resp.user)
            Router.push("/")
        } catch {
            showError("Dados inválidos")
        }
    }

    async function login({ email, password }: ILoginData) {
        try {
            const resp = await signInWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            )

            await sessionSetup(resp.user)
            Router.push("/")
        } catch {
            showError("Email ou senha inválidos")
        }
    }

    async function googleLogin() {
        try {
            const resp = await signInWithPopup(
                firebaseAuth,
                new GoogleAuthProvider()
            )

            await sessionSetup(resp.user)
            Router.push("/")
        } catch {
            showError("Não foi possível entrar com o Google")
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await signOut(firebaseAuth)
            await sessionSetup(null)
        } finally {
            setLoading(false)
        }
    }

    function autoLogin() {
        if (Cookie.get(authCookieKey)) {
            const cancel = onIdTokenChanged(firebaseAuth, sessionSetup)
            return () => cancel()
        }
        setLoading(false)
    }

    useEffect(autoLogin, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                errorMessage,
                login,
                signup,
                googleLogin,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
