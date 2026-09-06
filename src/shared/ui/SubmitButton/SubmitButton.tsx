import styles from "./SubmitButton.module.scss"

interface Props {
    goal: "signin" | "signup";
    isPending: boolean;
    onClick?: () => void;
}

export default function SubmitButton({goal, onClick, isPending}: Props) {
    return (
        <button disabled={isPending} className={styles.button} onClick={onClick} type="submit">{
            isPending ? (
                    <>{goal === "signin" ? "SIGNING IN..." : "SIGNING UP..."}</>
                )
                :
                (
                    <>{goal === "signin" ? "SIGN IN" : "SIGN UP"}</>
                )
        }</button>
    )
}