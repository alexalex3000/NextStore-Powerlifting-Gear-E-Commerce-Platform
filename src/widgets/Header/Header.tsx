import Logo from "@/shared/ui/Logo/Logo";
import styles from "./Header.module.scss";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import SearchFilter from "@/features/SearchFilter/SearchFilter";

interface Props {
    isSearch: boolean;
}

export default function Header({ isSearch }: Props) {
    return (
        <header className={styles.header}>
            <Logo size="large" />
            {isSearch && <SearchFilter />}

            <div className={styles.actions}>
                <Link href="/shop/basket" className={styles.cartLink}>
                    <ShoppingCart />
                    <span className={styles.badge}>3</span>
                </Link>

                <Link href="/shop/profile" className={styles.userAvatar} aria-label="Profile">
                    <User />
                </Link>
            </div>
        </header>
    );
}