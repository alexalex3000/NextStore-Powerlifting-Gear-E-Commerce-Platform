import Link from "next/link";
import { ShoppingCart, Zap, Search, User } from "lucide-react";
import styles from "./Header.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Логотип */}
                <Link href="/" className={styles.logo}>
                    <Zap />
                    <span className={styles.logoText}>NEXTGEAR</span>
                </Link>

                {/* Поиск */}
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search equipment..."
                        className={styles.searchInput}
                    />
                </div>

                {/* Правый блок (Корзина + Профиль) */}
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