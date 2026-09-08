import styles from "../buttons.module.scss"

interface Props {
    goal: "signin" | "signup" | "review" | "submit";
    isPending: boolean;
    onClick?: () => void;
}

export default function SubmitButton({goal, onClick, isPending}: Props) {
    return (
        <button disabled={isPending} className={styles.button} onClick={onClick} type="submit">{
            isPending ? (
                    <>{goal === "signin" ? "SIGNING IN..." : goal == "review" ? "SUBMITING REVIEW..." : goal === "signup" ? "SIGNING UP..." : "SUBMITTING..."}</>
                )
                :
                (
                    <>{goal === "signin" ? "SIGN IN" : goal == "review" ? "SUBMIT REVIEW" : goal === "signup" ? "SIGN UP" : "SUBMIT"}</>
                )
        }</button>
    )
}