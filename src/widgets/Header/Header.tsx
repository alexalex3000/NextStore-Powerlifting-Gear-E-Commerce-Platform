import Logo from "@/shared/ui/Logo/Logo";
import styles from "./Header.module.scss";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import SearchFilter from "@/features/SearchFilter/SearchFilter";
import {cookies} from "next/headers";

interface Props {
    isSearch: boolean;
}

export default async function Header({ isSearch }: Props) {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    return (
        <header className={styles.header}>
            <Logo size="large" />
            {isSearch && <SearchFilter />}

            <div className={styles.actions}>
                <Link href="/shop/basket" className={styles.cartLink}>
                    <ShoppingCart />
                    <span className={styles.badge}>3</span>
                </Link>

                {
                    token ? (
                        <Link href="/shop/profile" className={styles.userAvatar} aria-label="Profile">
                            <User />
                        </Link>
                    ) : (
                        <div className={styles.userAvatar} aria-label="Profile">
                            <User />
                        </div>
                    )
                }
            </div>
        </header>
    );
}