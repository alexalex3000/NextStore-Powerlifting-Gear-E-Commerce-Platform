"use client"

import Select from "@/shared/ui/Select/Select";
import { useActionState, useState } from "react";
import Input from "@/shared/ui/Input/Input";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import { productDrop } from "@/entities/product/api/uploadProductImg";
import FormError from "@/shared/ui/FormError/FormError";
import styles from "./AdminForm.module.scss"

export type Categories = "BELT" | "T-SHIRT" | "KNEESLEEVES";

const categories: Categories[] = ["BELT", "KNEESLEEVES", "T-SHIRT"];

interface FormErrors {
    type?: string;
    title?: string;
    currentPrice?: string;
    count?: string;
    file?: string;
    main?: string;
}

interface StateType {
    success: boolean;
    error?: FormErrors;
}

export default function AdminForm() {
    const [type, setType] = useState<Categories>(categories[0]);

    const [state, formAction, isPending] = useActionState<StateType, FormData>(
        async (previousState, formData) => {
            const title = formData.get("title") as string;
            const currentPrice = Number(formData.get("currentPrice"));
            const count = Number(formData.get("count"));
            const file = formData.get("file") as File;

            const result = await productDrop({
                type,
                title,
                currentPrice,
                count,
                file
            });

            if (result?.serverError) {
                return {
                    success: false,
                    error: { main: result.serverError }
                };
            }

            if (result?.validationErrors) {
                return {
                    success: false,
                    error: {
                        type: result.validationErrors.type?._errors?.join(", "),
                        title: result.validationErrors.title?._errors?.join(", "),
                        currentPrice: result.validationErrors.currentPrice?._errors?.join(", "),
                        count: result.validationErrors.count?._errors?.join(", "),
                        file: result.validationErrors.file?._errors?.join(", "),
                    }
                };
            }

            return { success: true };
        },
        { success: false }
    );

    return (
        <form action={formAction} className={styles.form}>
            {state?.error?.main && <FormError error={state?.error?.main}/>}
            <Select active={type} setActive={setType} options={categories}/>
            <Input error={state?.error?.title} type="text" label="Title" placeholder="IPF BELT 13mm" name="title"/>
            <Input error={state?.error?.currentPrice} type="number" label="Current Price" placeholder="100" name="currentPrice"/>
            <Input error={state?.error?.count} type="number" label="Count" placeholder="111" name="count"/>
            <Input error={state?.error?.file} type="file" label="Image" name="file"/>
            <SubmitButton goal="submit" isPending={isPending}/>
        </form>
    );
}