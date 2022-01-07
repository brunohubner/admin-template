import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"
import { GoogleAuthProvider, NextOrObserver, User } from "firebase/auth"
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
    googleLogin: async () => {}
}

const AuthContext = createContext<IAuthContext>(INITIAL_STATE)

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
        Cookie.set("admin-template-auth", "true", {
            expires: 7 //days
        })
        return
    }
    Cookie.remove("admin-template-auth")
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

    async function googleLogin() {
        const resp = await signInWithPopup(
            firebaseAuth,
            new GoogleAuthProvider()
        )

        sessionSetup(resp.user)
        Router.push("/")
    }

    useEffect(() => {
        const cancel = onIdTokenChanged(firebaseAuth, sessionSetup)
        return () => cancel()
    }, [])

    return (
        <AuthContext.Provider value={{ user, googleLogin }}>
            {children}
        </AuthContext.Provider>
    )
}
