import getUserByCookies from "@/shared/lib/getUserByCookies";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function AdminPage(){
    const cookiesConfig = await cookies()

    const token = cookiesConfig.get("session_token")?.value;

    if(!token){
        redirect("/shop/catalog")
    }

    const data = await getUserByCookies(token)
    const user = data?.user;

    if(!data || !user || user.role === "user"){
        redirect("/shop/catalog")
    }

    redirect("/admin/addProduct");
}