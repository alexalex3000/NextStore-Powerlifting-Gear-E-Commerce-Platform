import styles from "./Logo.module.scss";
import {Zap} from "lucide-react";
import Link from "next/link";

interface Props{
    size: "small" | "large";
}

export default function Logo({size}: Props){
    return (
        <>
            {
                size === "small" ? (
                    <Link href="/public" className={styles.logo}>
                        <Zap />
                        <span className={styles.logoText}>NEXTGEAR</span>
                    </Link>
                ) : (
                    <Link href="/shop/catalog" className={styles.bigLogo}>
                        <Zap />
                        <span className={styles.bigLogoText}>NEXTGEAR</span>
                    </Link>
                )
            }
        </>
    )
}