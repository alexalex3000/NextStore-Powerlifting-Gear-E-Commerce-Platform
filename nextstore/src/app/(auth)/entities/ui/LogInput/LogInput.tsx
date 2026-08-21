"use client"

import styles from "./LogInput.module.scss";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useId, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: "email" | "password" | "text";
    label: string;
    placeholder: string;
    name: string;
}

export default function LogInput({ type, label, placeholder, id, name, ...rest }: Props) {
    const defaultId = useId();
    const inputId = id || defaultId;

    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setFocus] = useState(false);

    const currentType = type === "password" ? (isOpen ? "text" : "password") : type;

    return (
        <div className={styles.fieldContainer}>
            <label htmlFor={inputId} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrapper}>
                {type === "email" && <Mail color={isFocus ? "var(--accent)" : "#6b6b6b"} className={styles.icon} size={20} strokeWidth={1.5} />}
                {type === "password" && <Lock color={isFocus ? "var(--accent)" : "#6b6b6b"} className={styles.icon} size={20} strokeWidth={1.5} />}

                <input
                    id={inputId}
                    className={styles.input}
                    type={currentType}
                    name={name}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    {...rest}
                />

                {type === "password" && (
                    <button
                        type="button"
                        className={styles.helper}
                        onClick={() => setIsOpen((prev) => !prev)}
                        tabIndex={-1}
                    >
                        {isOpen ? (
                            <Eye color={isFocus ? "var(--accent)" : "#6b6b6b"} size={18} strokeWidth={1.5} />
                        ) : (
                            <EyeOff color={isFocus ? "var(--accent)" : "#6b6b6b"} size={18} strokeWidth={1.5} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}