import styles from "./Feedback.module.scss";
import Review from "@/entities/review/ui/Review";
import AddReview from "@/features/AddReview/AddReview";

interface Props{
    id: string;
}

export default function Feedback({id}: Props) {
    return (
        <div className={styles.reviews}>
            <header>
                <h1>Athlete Reviews <span>(234)</span></h1>
            </header>
            <div className={styles.reviewsGrid}>
                <AddReview id={id}/>
                <div className={styles.allReview}>
                    <Review/>
                    <Review/>
                </div>
            </div>
        </div>
    )
}