"use client"

import styles from "./Select.module.scss"
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props<T extends string> {
    active: T;
    setActive: (active: T) => void;
    options: readonly T[] | T[];
    placeholder?: string;
}

export default function Select<T extends string>({ active, setActive, options, placeholder }: Props<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClose = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClose);
        return () => window.removeEventListener('mousedown', handleClose);
    }, []);

    const handleSelect = (option: T) => {
        setActive(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.select} ref={selectRef}>
            <div
                className={`${styles.title} ${isOpen ? styles.open : ""}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{active.length > 0 ? active : placeholder}</span>
                <ChevronDown className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`} size={16} />
            </div>

            {isOpen && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${styles.option} ${option === active ? styles.activeOption : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}