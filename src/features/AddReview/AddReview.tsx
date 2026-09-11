"use client"

import styles from "./AddReview.module.scss";
import Stars from "@/shared/ui/Stars/Stars";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import { useActionState } from "react";
import { reviewDrop } from "@/entities/review/api/post.action";

interface Props {
    id: string;
}

type ActionState = {
    success: boolean;
    error?: {
        title?: string;
        main?: string;
    };
};

export default function AddReview({ id }: Props) {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        async (previousState, formData) => {
            const title = formData.get("review") as string;

            const result = await reviewDrop({
                productId: id,
                title,
            });

            if (result?.serverError) {
                return {
                    success: false,
                    error: { main: result.serverError }
                };
            }

            if (result?.validationErrors) {
                const titleError = result.validationErrors?.title?._errors?.[0]
                    || "Invalid input";

                return {
                    success: false,
                    error: { title: titleError },
                };
            }

            if (result?.data?.success) {
                return { success: true };
            }

            return {
                success: false,
                error: { main: "Something went wrong" }
            };
        },
        { success: false }
    );

    return (
        <form action={formAction} className={styles.form}>
            <h2>LEAVE A REVIEW</h2>

            {state.error?.main && (
                <p className={styles.errorMessage}>{state.error.main}</p>
            )}

            <div className={styles.forLabels}>
                <p>YOUR RATING</p>
                <Stars count={3}/>
            </div>

            <div className={styles.forLabels}>
                <label htmlFor="review">YOUR REVIEW</label>
                <textarea name="review" id="review" cols={30} rows={10}></textarea>
                {state.error?.title && (
                    <span className={styles.fieldError}>{state.error.title}</span>
                )}
            </div>

            <SubmitButton goal={"review"} isPending={isPending}/>
        </form>
    );
}