"use client"

import styles from "./Input.module.scss";
import {Mail, Lock, Eye, EyeOff, Search} from "lucide-react";
import { InputHTMLAttributes, useId, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: "email" | "password" | "text" | "file" | "number";
    label: string;
    placeholder: string;
    name: string;
    error?: string;
    isSearch?: boolean;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({handleChange, type, label, placeholder,error, id, name, isSearch,  ...rest }: Props) {
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
                {isSearch && <Search color={isFocus ? "var(--accent)" : "#6b6b6b"} className={styles.icon} size={20} strokeWidth={1.5}/>}
                {type === "email" && <Mail color={isFocus ? "var(--accent)" : "#6b6b6b"} className={styles.icon} size={20} strokeWidth={1.5} />}
                {type === "password" && <Lock color={isFocus ? "var(--accent)" : "#6b6b6b"} className={styles.icon} size={20} strokeWidth={1.5} />}

                <input
                    onChange={handleChange}
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
            {
                error && <p className="text-red-700 text-sm">{error}</p>
            }
        </div>
    );
}