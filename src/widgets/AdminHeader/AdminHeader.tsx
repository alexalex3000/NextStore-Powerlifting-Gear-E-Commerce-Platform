import Logo from "@/shared/ui/Logo/Logo";
import styles from "../Header/Header.module.scss";
import {ShoppingCart, User} from "lucide-react";
import Link from "next/link";
import SearchFilter from "@/features/SearchFilter/SearchFilter";

interface Props {
    isSearch: boolean;
}

const links = [
    {
        label: "Add Product",
        href: "/admin/addProduct",
    },
    {
        label: "Statistics",
        href: "/admin/statistics",
    }
]

export default function AdminHeader({isSearch}: Props) {
    return (
        <header className={styles.header}>
            <Logo size="large"/>
            {isSearch && <SearchFilter/>}

            <div className={styles.links}>
                {
                    links.map((link) => (
                        <Link key={link.href} href={link.href}>{link.label}</Link>
                    ))
                }
            </div>

            <div className={styles.actions}>
                <Link href="/shop/catalog" className={styles.cartLink}>
                    <ShoppingCart/>
                    <span className={styles.badge}>3</span>
                </Link>

                <Link href="/shop/profile" className={styles.userAvatar} aria-label="Profile">
                    <User/>
                </Link>
            </div>
        </header>
    );
}