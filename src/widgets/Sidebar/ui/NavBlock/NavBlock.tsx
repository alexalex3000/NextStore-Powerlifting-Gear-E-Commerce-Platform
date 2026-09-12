"use client"

import styles from "../../Sidebar.module.scss"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    Package,
    CreditCard,
    LogOut,
    ChevronRight,
} from "lucide-react";
import {logOutAction} from "@/entities/user/api/logOut.action";

export default function NavBlock() {
    const pathname = usePathname();

    const navItems = [
        { label: "OVERVIEW", href: "/shop/profile/overview", icon: User },
        { label: "ORDERS", href: "/shop/profile/orders", icon: Package },
        { label: "PAYMENT", href: "/shop/profile/payment", icon: CreditCard },
    ];

    const handleSignOut = async () => {
        logOutAction();
    };

    return (
        <nav className={styles.nav}>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    >
                        <div className={styles.linkContent}>
                            <Icon size={18} className={styles.icon} />
                            <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight size={16} className={styles.arrow} />}
                    </Link>
                );
            })}

            <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
                <div className={styles.linkContent}>
                    <LogOut size={18} className={styles.signOutIcon} />
                    <span>SIGN OUT</span>
                </div>
            </button>
        </nav>
    )
}