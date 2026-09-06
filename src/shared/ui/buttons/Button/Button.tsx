import styles from "../buttons.module.scss"

interface Props {
    isPending: boolean;
    onClick: () => void;
    value: string;
}

export default function Button({onClick, isPending, value}: Props) {
    return (
        <button onClick={onClick} disabled={isPending} className={styles.button}>{value}</button>
    )
}