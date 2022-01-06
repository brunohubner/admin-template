import { ReactNode } from "react"

interface IProps {
    children?: ReactNode
}

export default function Content({ children }: IProps) {
    return (
        <section
            className={`
    flex flex-col mt-7 dark:text-gray-200
    `}
        >
            {children}
        </section>
    )
}
