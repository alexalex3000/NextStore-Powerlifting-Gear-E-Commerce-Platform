import styles from "./Review.module.scss";
import Stars from "@/shared/ui/Stars/Stars";
import {Feedback} from "@/widgets/Feedback/Feedback";
import Image from "next/image";
import {getCurrentDate} from "@/shared/utils/getCurrentDate";
import NoLogo from "@/entities/user/ui/NoLogo/NoLogo";
import {getFirstLetters} from "@/shared/utils/getFirstLetters";

interface Props {
    feedback: Feedback;
}

export default function Review({feedback}: Props) {
    const date = getCurrentDate(new Date(feedback.date));

    return (
        <div className={styles.review}>
            <header className={styles.header}>
                <div className={styles.reviewAuthor}>
                    <NoLogo title={getFirstLetters(`${feedback.user.firstName} ${feedback.user.lastName}`)}
                            size="small"/>
                    <h2>{feedback.user.firstName ?? "New"} {feedback.user.lastName ?? "User"}</h2>
                </div>
                <div className={styles.assetment}>
                    <Stars count={feedback.rating ?? 1}/>
                    <p>{date}</p>
                </div>
            </header>
            <div className={styles.content}>
                <p className={styles.text}>{feedback.title}</p>
            </div>
        </div>
    )
}