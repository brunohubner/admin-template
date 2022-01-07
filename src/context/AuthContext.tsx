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
    googleLogin: async () => {},
    logout() {}
}

const AuthContext = createContext<IAuthContext>(INITIAL_STATE)

const cookieKey = "admin-template-auth"

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
        Cookie.set(cookieKey, "true", {
            expires: 7 //days
        })
        return
    }
    Cookie.remove(cookieKey)
}

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: IProps) {
    const [user, setUser] = useState<UserModel>(INITIAL_STATE.user)
    const [loading, setLoading] = useState(true)

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
        if (Cookie.get(cookieKey)) {
            const cancel = onIdTokenChanged(firebaseAuth, sessionSetup)
            return () => cancel()
        }
    }

    useEffect(autoLogin, [])

    return (
        <AuthContext.Provider value={{ user, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
