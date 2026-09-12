import styles from "./Section.module.scss";

interface Props{
    children?:React.ReactNode,
}

export default function Section({children}: Props) {
    return (
        <section className={styles.section}>
            {children}
        </section>
    )
}