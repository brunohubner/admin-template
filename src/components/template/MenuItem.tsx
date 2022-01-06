import Link from "next/link"
import { MouseEvent } from "react"

interface IProps {
    url?: string
    label: string
    icon: JSX.Element
    className?: string
    onClick?: (event: MouseEvent) => void
}

export default function MenuItem({
    url,
    label,
    icon,
    className,
    onClick
}: IProps) {
    function renderLink() {
        return (
            <a
                className={`
                    ${className} flex flex-col justify-center items-center
                    h-20 w-20 text-gray-600 dark:text-gray-200
                `}
            >
                {icon}
                <span
                    className={`
                        text-xs font-ligh
                    `}
                >
                    {label}
                </span>
            </a>
        )
    }

    return (
        <li
            onClick={onClick}
            className={`
            hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer
        `}
        >
            {url ? <Link href={url}>{renderLink()}</Link> : renderLink()}
        </li>
    )
}
