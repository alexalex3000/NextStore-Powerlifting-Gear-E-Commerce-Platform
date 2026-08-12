"use client"

import styles from "./AddButton.module.scss";

export default function AddButton() {
    const handleAdd = () => {
        console.log("Товар добавлен в корзину");
    };

    return (
        <button className={styles.button} onClick={handleAdd}>
            <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="9" cy="21" r="1.5"></circle>
                <circle cx="20" cy="21" r="1.5"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            ADD
        </button>
    );
}