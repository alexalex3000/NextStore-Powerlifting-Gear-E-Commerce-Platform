import {redirect} from "next/navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Profile",
}

export default function ProfilePage(){
    redirect("/shop/profile/overview");

    return (
        <div></div>
    )
}