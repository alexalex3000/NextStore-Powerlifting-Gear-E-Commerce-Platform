import styles from "./SubmitButton.module.scss"

interface Props{
    goal: "signin" | "signup";
    onClick?: () => void;
}

export default function SubmitButton({goal, onClick}: Props){
    return (
        <button className={styles.button} onClick={onClick} type="submit">{goal === "signin" ? "SIGN IN" : "SIGN UP"}</button>
    )
}