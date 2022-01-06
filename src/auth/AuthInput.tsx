import styles from "../styles/AuthInput.module.css"
type InputType = "text" | "email" | "password"

interface IProps {
    label: string
    value: string
    type?: InputType
    required?: boolean
    placeholder?: string | undefined
    onChange: (newValue: string) => void
}

export default function AuthInput({
    label,
    value,
    type = "text",
    required = false,
    placeholder = undefined,
    onChange
}: IProps) {
    return (
        <div className={`flex flex-col mt-4 roun`}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                className={styles.input}
            />
        </div>
    )
}
