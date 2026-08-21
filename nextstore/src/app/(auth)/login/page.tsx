import LogInput from "@/app/(auth)/entities/ui/LogInput/LogInput";
import SubmitButton from "@/app/(auth)/entities/ui/SubmitButton/SubmitButton";
import styles1 from "@/app/components/Header/Header.module.scss";
import styles from "./loginStyles.module.scss"
import {Zap} from "lucide-react";
import Link from "next/link";
import SignInForm from "@/app/(auth)/entities/SignInForm";

export default function LoginPage(){
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href="/nextstore/public" className={styles1.logo}>
                    <Zap />
                    <span className={styles1.logoText}>NEXTGEAR</span>
                </Link>
                <footer>
                    <h1>
                        BUILD FOR <span>COMPETITORS.</span>
                    </h1>
                    <p>Access your orders, saved gear, and competition prep lists. Sign in to your NEXTGEAR account.</p>
                    <div className={styles.info}>
                        <div>
                            <h2>10K+</h2>
                            <p>Athletes</p>
                        </div>
                        <div>
                            <h2>50+</h2>
                            <p>Countries</p>
                        </div>
                        <div>
                            <h2>IPF</h2>
                            <p>Approved</p>
                        </div>
                    </div>
                </footer>
            </div>
            <SignInForm />
        </div>
    )
}