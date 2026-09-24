import styles from "./GridLoader.module.scss"
import {CardLoader} from "@/shared/ui/loaders/CardLoader/CardLoader";

export default function GridLoader() {
    return (
        <div className={styles.grid}>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
        </div>
    )
}