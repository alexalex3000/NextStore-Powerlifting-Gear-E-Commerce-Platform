import styles from "./Feedback.module.scss";
import Review from "@/entities/review/ui/Review";
import AddReview from "@/features/AddReview/AddReview";

export interface Feedback{
    date: Date
    id: string
    userId: string
    title: string | null
    productId: string
    user: {
        id: string
        role: "user" | "admin"
        email: string
        passwordHash: string
        firstName: string
        lastName: string
        phoneNumber: string | null
        logoUrl: string | null
    }
}

interface Props{
    id: string;
    feedbacks: Feedback[]
}

export default function Feedback({id, feedbacks}: Props) {
    return (
        <div className={styles.reviews}>
            <header>
                <h1>Athlete Reviews <span>({feedbacks.length})</span></h1>
            </header>
            <div className={styles.reviewsGrid}>
                <AddReview id={id}/>
                <div className={styles.allReview}>
                    {
                        feedbacks.map(feedback => (
                            <Review key={feedback.id} feedback={feedback}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}