"use client";

import ProfileInformation from "@/widgets/ProfileInformation/ProfileInformation";
import EditForm from "@/features/EditProfile/ui/EditForm/EditForm";
import InfoForm from "@/features/EditProfile/ui/InfoForm/InfoForm";
import { UserData } from "@/entities/user/model/types";
import {useActionState, useState} from "react";
import { editDrop } from "@/features/EditProfile/api/edit.action";

interface Props {
    userData: UserData;
}

interface ActionState {
    success?: boolean;
    error?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        phoneNumber?: string[];
        main?: string;
    };
}

export default function ProfileInformationWrapper({ userData }: Props) {
    const [isActive, setIsActive] = useState(false);


    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        async (previousState, formData) => {
            const firstName = formData.get("firstName") as string;
            const lastName = formData.get("secondName") as string;
            const email = formData.get("emailAddress") as string;
            const phoneNumber = formData.get("phoneNumber") as string;

            const result = await editDrop({
                firstName,
                lastName,
                phoneNumber,
                email,
            });

            if (result?.validationErrors) {
                return {
                    success: false,
                    error: {
                        firstName: result.validationErrors.firstName?._errors,
                        lastName: result.validationErrors.lastName?._errors,
                        phoneNumber: result.validationErrors.phoneNumber?._errors,
                        email: result.validationErrors.email?._errors,
                    },
                };
            }

            if (result?.serverError) {
                return {
                    success: false,
                    error: {
                        main: result.serverError,
                    },
                };
            }
            setIsActive(false);
            return {
                success: result?.data?.success ?? true,
            };
        },
        { success: false }
    );


    return (
        <form action={formAction}>
            <ProfileInformation
                edit={<EditForm userData={userData} />}
                info={<InfoForm userData={userData} />}
                isActive={isActive}
                setIsActive={setIsActive}
                isPending={isPending}
            />
        </form>
    );
}
