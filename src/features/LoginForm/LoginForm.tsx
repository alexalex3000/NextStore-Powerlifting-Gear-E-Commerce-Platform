import Link from "next/link";
import Input from "@/shared/ui/Input/Input";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import styles from "./LoginForm.module.scss";

export default function LoginForm(){
    return (
        <form className={styles.form}>
            <header>
                <p>welcome back</p>
                <h1>sign in</h1>
                <p>Dont have an account? <Link href="/register">Create one</Link></p>
            </header>

            <div className={styles.inputs}>
                <Input type="email" label="EMAIL" placeholder="placeholder@gmail.com" name="email"/>
                <Input type="text" label="PASSWORD" placeholder="••••••••" name="password"/>
            </div>

            <SubmitButton goal="signin"/>
        </form>
    )
}