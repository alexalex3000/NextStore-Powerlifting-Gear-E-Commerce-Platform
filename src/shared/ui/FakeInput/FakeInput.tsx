"use client"

import styles from "./FakeInput.module.scss";

interface Props {
    label: string;
    value: string;
}

export default function FakeInput({value, label}: Props) {
    return (
        <div className={styles.fieldContainer}>
            <label className={styles.label}>
                {label}
            </label>

            <div className={styles.wrapper}>
                <div className={styles.input}>{value}</div>
            </div>
        </div>
    );
}