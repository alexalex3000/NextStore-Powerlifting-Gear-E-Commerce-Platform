"use client"

import LogInput from "@/app/(auth)/entities/ui/LogInput/LogInput";
import SubmitButton from "@/app/(auth)/entities/ui/SubmitButton/SubmitButton";
import {useActionState} from "react";
import {StateType} from "@/app/(auth)/type/authType";
import {signInDrop} from "@/app/actions/signIn";

export default function SignInForm() {
    const [state, formAction, isPending] = useActionState<StateType, FormData>(async (previousState, formData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const result = await signInDrop({
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
            <p>welcome back</p>
            <h1>SIGN IN</h1>
            <p>Dont have an account?<span>Create one</span></p>
            <LogInput name="email" type="email" label="EMAIL Addres" placeholder="strong@gmail.com"/>
            <LogInput name="password" type="password" label="PASSWORD" placeholder="••••••••"/>
            <SubmitButton value="SIGN IN" isActive={true}/>
        </form>
    )
}