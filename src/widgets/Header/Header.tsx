import Logo from "@/shared/ui/Logo/Logo";
import styles from "./Header.module.scss";
import SearchFilter from "@/features/SearchFilter/SearchFilter";
import HeaderActions from "@/widgets/Header/ui/HeaderActions";
import Link from "next/link";
import {LogIn, User} from "lucide-react";
import {cookies} from "next/headers";

interface Props {
    isSearch: boolean;
}

export default async function Header({isSearch}: Props) {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    return (
        <header className={styles.header}>
            <Logo size="large"/>
            {isSearch && <SearchFilter/>}

            <div className={styles.actions}>
                {
                    token ? (
                        <div className={styles.actions}>
                            <HeaderActions />
                            <Link href="/shop/profile" className={styles.userAvatar} aria-label="Profile">
                                <User/>
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.actions}>
                            <Link href="/login" className={styles.userAvatar} aria-label="Profile">
                                <LogIn/>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}