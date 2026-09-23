import Image from "next/image";
import styles from "../auth.module.scss"
import Logo from "@/shared/ui/Logo/Logo";
import LoginForm from "@/features/LoginForm/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login",
}

export default function LoginPage() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Image src="https://www.delommelsegazet.be/content/images/size/w2000/2025/11/IMG-20251031-WA0021-topaz-face-upscale-2x-1.jpg"
                           alt="123"
                           fill
                           className={styles.bgImage}/>
                    <Logo size={"small"}/>
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
                <LoginForm/>
            </div>
        </div>
    )
}