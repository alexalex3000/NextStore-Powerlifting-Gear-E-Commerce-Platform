import Logo from "@/shared/ui/Logo/Logo";
import styles from "@/widgets/Header/Header.module.scss";

export default function HeaderLoader() {
    return (
        <header className={styles.header}>
            <Logo size="large"/>
        </header>
    );
}