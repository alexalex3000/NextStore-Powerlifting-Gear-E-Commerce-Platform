import Link from "next/link";
import Input from "@/shared/ui/Input/Input";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import styles from "../LoginForm/LoginForm.module.scss";

export default function SignUpForm(){
    return (
        <form className={styles.form}>
            <header>
                <p>new account</p>
                <h1>create account</h1>
                <p>Already have an account? <Link href="/login">Sign in</Link></p>
            </header>

            <div className={styles.inputs}>
                <Input type="text" label="NAME" placeholder="Jonh" name="name"/>
                <Input type="text" label="SURNAME" placeholder="Due" name="surname"/>
                <Input type="email" label="EMAIL" placeholder="placeholder@gmail.com" name="email"/>
                <Input type="text" label="PASSWORD" placeholder="••••••••" name="password"/>
                <Input type="text" label="CONFIRM PASSWORD" placeholder="••••••••" name="conf_password"/>
            </div>

            <SubmitButton goal="signup"/>
        </form>
    )
}