"use client"

import LogInput from "@/app/(auth)/entities/ui/LogInput/LogInput";
import SubmitButton from "@/app/(auth)/entities/ui/SubmitButton/SubmitButton";
import {useActionState} from "react";
import {StateType} from "@/app/(auth)/type/authType";
import {signInDrop} from "@/app/actions/signIn";
import {signUpDrop} from "@/app/actions/singUp";

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState<StateType, FormData>(async (previousState, formData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmedPassword = formData.get("confirmPassword") as string

        if(password !== confirmedPassword) {
            return {
                success: false,
                error: "Passwords do not match",
            }
        }

        const result = await signUpDrop({
            email,
            password,
        })
        console.log(result)
        if(result.validationErrors){
            return {success:false, error: "Fill all field correctly"};
        }
        if(result.serverError){
            return {success:false, error: "Server Error"};
        }
        return {success: true}

    }, {
        success: false
    });

    return (
        <form action={formAction}>
            <p>create account</p>
            <h1>SIGN UP</h1>
            <p>Already have an account?<span>Sign in</span></p>
            <LogInput name="email" type="email" label="EMAIL Addres" placeholder="strong@gmail.com"/>
            <LogInput name="password" type="password" label="PASSWORD" placeholder="••••••••"/>
            <LogInput name="confirmPassword" type="password" label="CONFIRM PASSWORD" placeholder="••••••••"/>
            <SubmitButton value="SIGN IN" isActive={true}/>
        </form>
    )
}