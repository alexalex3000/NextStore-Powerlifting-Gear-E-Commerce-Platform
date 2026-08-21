import styles from "./SubmitButton.module.scss";
import { ArrowRight } from "lucide-react";

interface Props {
    value: string;
    isActive: boolean;
}

export default function SubmitButton({ value, isActive }: Props) {
    return (
        <button
            type="submit"
            className={styles.button}
            disabled={!isActive}
        >
            <ArrowRight className={styles.icon} size={20} strokeWidth={2.5} />
            <span className={styles.text}>{value}</span>
        </button>
    );
}