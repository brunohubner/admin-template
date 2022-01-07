import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"
import {
    GoogleAuthProvider,
    NextOrObserver,
    signOut,
    User
} from "firebase/auth"
import UserModel from "../model/UserModel"
import Router from "next/router"
import firebaseAuth from "../firebase"
import { signInWithPopup, onIdTokenChanged } from "firebase/auth"
import Cookie from "js-cookie"

interface IProps {
    children?: ReactNode
}

interface IAuthContext {
    user: UserModel
    loading: boolean
    googleLogin?: () => Promise<void>
    logout?: () => void
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
    loading: true
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

    async function sessionSetup(
        firebaseUser: User | null
    ): Promise<NextOrObserver<User>> {
        try {
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
        } catch {
            console.log("Não foi possível se autenticar com o Google")
            return () => firebaseUser
        } finally {
            setLoading(false)
        }
    }

    async function googleLogin() {
        try {
            const resp = await signInWithPopup(
                firebaseAuth,
                new GoogleAuthProvider()
            )

            sessionSetup(resp.user)
            Router.push("/")
        } catch {
            console.log("Não foi possível entrar com o Google")
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await signOut(firebaseAuth)
            await sessionSetup(null)
        } catch {
            console.log("Ocorreu um problema ao sair")
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
        <AuthContext.Provider value={{ user, loading, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
