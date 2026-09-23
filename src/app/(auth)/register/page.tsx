import Image from "next/image";
import styles from "../auth.module.scss"
import Logo from "@/shared/ui/Logo/Logo";
import LoginForm from "@/features/LoginForm/LoginForm";
import SignUpForm from "@/features/SignUpForm/SignUpForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Registration",
}

export default function RegisterPage() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Image src="https://blainesumner.com/wp-content/gallery/media-page/Copy-of-RCO_6272.jpg"
                           alt="123"
                           fill
                           className={styles.bgImage}/>
                    <Logo size={"small"}/>
                    <footer>
                        <h1>
                            JOIN THE <span>PLATFORM.</span>
                        </h1>
                        <p>Create your account to track orders, save gear, and get access to exclusive athlete discounts and competition prep bundles.</p>
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
                <SignUpForm />
            </div>
        </div>
    )
}