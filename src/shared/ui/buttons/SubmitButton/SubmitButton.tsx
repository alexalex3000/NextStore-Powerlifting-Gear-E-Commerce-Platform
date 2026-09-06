import styles from "../buttons.module.scss"

interface Props {
    goal: "signin" | "signup" | "review";
    isPending: boolean;
    onClick?: () => void;
}

export default function SubmitButton({goal, onClick, isPending}: Props) {
    return (
        <button disabled={isPending} className={styles.button} onClick={onClick} type="submit">{
            isPending ? (
                    <>{goal === "signin" ? "SIGNING IN..." : goal == "review" ? "SUBMITING REVIEW..." : "SIGNING UP..."}</>
                )
                :
                (
                    <>{goal === "signin" ? "SIGN IN" : goal == "review" ? "SUBMIT REVIEW" : "SIGN UP"}</>
                )
        }</button>
    )
}