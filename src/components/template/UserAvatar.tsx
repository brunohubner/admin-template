/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useAuth } from "../../context/AuthContext"

interface IProps {
    className?: string
}

export default function UserAvatar({ className }: IProps) {
    const { user } = useAuth()
    return (
        <Link href="/profile" passHref>
            <img
                src={user?.avatarUrl || "/assets/user.svg"}
                alt="Avatar"
                className={`${className} h-10 w-10 rounded-full cursor-pointer `}
            />
        </Link>
    )
}
