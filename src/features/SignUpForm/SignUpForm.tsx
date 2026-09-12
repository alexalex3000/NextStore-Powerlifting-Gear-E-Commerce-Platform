"use client"

import Link from "next/link";
import Input from "@/shared/ui/Input/Input";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import styles from "../LoginForm/LoginForm.module.scss";
import { useActionState } from "react";
import { Errors } from "@/features/LoginForm/LoginForm";
import { registerDrop } from "@/entities/user/api/register.action";
import FormError from "@/shared/ui/FormError/FormError";
import {redirect} from "next/navigation";

interface RegErrors extends Errors {
    name?: string;
    surname?: string;
    password_confirmation?: string;
}

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState<{ success: boolean, error?: RegErrors }, FormData>(
        async (previousState, formData) => {
            const name = formData.get("name") as string;
            const surname = formData.get("surname") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const password_confirmation = formData.get("password_confirmation") as string;

            if (password !== password_confirmation) {
                return { success: false, error: { password_confirmation: "Passwords don't match" } };
            }

            const result = await registerDrop({ name, surname, email, password, password_confirmation });

            if (result.serverError) {
                return { success: false, error: { main: result.serverError || "Server Error" } };
            }

            if (result.validationErrors) {
                return {
                    success: false,
                    error: {
                        name: result.validationErrors.name?._errors?.[0],
                        surname: result.validationErrors.surname?._errors?.[0],
                        email: result.validationErrors.email?._errors?.[0],
                        password: result.validationErrors.password?._errors?.[0],
                        password_confirmation: result.validationErrors.password_confirmation?._errors?.[0],
                    }
                };
            }

            if (result.data && !result.data.success) {
                return {
                    success: false,
                    error: { main: result.data.message || "Check your details and try again" }
                };
            }

            return { success: result.data?.success ?? false };
        },
        { success: false }
    );

    if(state.success) {
        redirect("/shop/catalog")
    }

    return (
        <form action={formAction} className={styles.form}>
            <header>
                <p>new account</p>
                <h1>create account</h1>
                <p>Already have an account? <Link href="/login">Sign in</Link></p>
            </header>

            {state?.error?.main && <FormError error={state.error.main} />}

            <div className={styles.inputs}>
                <Input error={state?.error?.name} type="text" label="NAME" placeholder="John" name="name" />
                <Input error={state?.error?.surname} type="text" label="SURNAME" placeholder="Doe" name="surname" />
                <Input error={state?.error?.email} type="email" label="EMAIL" placeholder="placeholder@gmail.com" name="email" />
                <Input error={state?.error?.password} type="password" label="PASSWORD" placeholder="••••••••" name="password" />

                <Input
                    error={state?.error?.password_confirmation}
                    type="password"
                    label="CONFIRM PASSWORD"
                    placeholder="••••••••"
                    name="password_confirmation"
                />
            </div>

            <SubmitButton isPending={isPending} goal="signup" />
        </form>
    );
}