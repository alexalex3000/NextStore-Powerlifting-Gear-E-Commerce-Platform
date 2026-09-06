"use client"

import Link from "next/link";
import Input from "@/shared/ui/Input/Input";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import styles from "./LoginForm.module.scss";
import { useActionState } from "react";
import { loginDrop } from "@/entities/user/api/login.action";
import FormError from "@/shared/ui/FormError/FormError";

export interface Errors {
    email?: string;
    password?: string;
    main?: string;
}

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState<{ success: boolean, error?: Errors }, FormData>(
        async (previousState, formData) => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const result = await loginDrop({ email, password });

            if (result.serverError) {
                return { success: false, error: { main: result.serverError || "Server Error" } };
            }

            if (result.validationErrors) {
                return {
                    success: false,
                    error: {
                        email: result.validationErrors.email?._errors?.[0],
                        password: result.validationErrors.password?._errors?.[0],
                    }
                };
            }

            if (result.data && !result.data.success) {
                return {
                    success: false,
                    error: { main: result.data.message || "Check your email or password" }
                };
            }

            return { success: result.data?.success ?? false };
        },
        { success: false }
    );

    return (
        <form action={formAction} className={styles.form}>
            <header>
                <p>welcome back</p>
                <h1>sign in</h1>
                <p>Dont have an account? <Link href="/register">Create one</Link></p>
            </header>

            {state?.error?.main && <FormError error={state.error.main} />}

            <div className={styles.inputs}>
                <Input error={state?.error?.email} type="email" label="EMAIL" placeholder="placeholder@gmail.com" name="email" />
                <Input error={state?.error?.password} type="password" label="PASSWORD" placeholder="••••••••" name="password" />
            </div>

            <SubmitButton isPending={isPending} goal="signin" />
        </form>
    );
}