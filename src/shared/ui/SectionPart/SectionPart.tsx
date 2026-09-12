import styles from "./SectionPart.module.scss"

interface Props{
    children: React.ReactNode
}

export default function SectionPart({children}: Props){
    return (
        <div className={styles.sectionPart}>{children}</div>
    )
}