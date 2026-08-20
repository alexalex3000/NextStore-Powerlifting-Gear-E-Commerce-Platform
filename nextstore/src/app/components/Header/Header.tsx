import Link from "next/link";
import { ShoppingCart, Zap, Search, User } from "lucide-react";
import styles from "./Header.module.scss";
import SearchBlock from "@/app/components/Header/entities/SearchBlock";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/nextstore/public" className={styles.logo}>
                    <Zap />
                    <span className={styles.logoText}>NEXTGEAR</span>
                </Link>

                <SearchBlock/>

                <div className={styles.actions}>
                    <Link href="/shop/basket" className={styles.cartLink}>
                        <ShoppingCart />
                        <span className={styles.badge}>3</span>
                    </Link>

                    <button type="button" className={styles.userAvatar} aria-label="Profile">
                        <User />
                    </button>
                </div>
            </div>
        </header>
    );
}