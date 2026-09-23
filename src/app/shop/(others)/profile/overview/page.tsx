import getUserByCookies from "@/shared/lib/getUserByCookies";
import {cookies} from "next/headers";
import NetworkError from "@/shared/ui/NetworkError/NetworkError";
import ProfileInformationWrapper from "@/widgets/ProfileInformation/ProfileInformationWrapper";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Overview",
}

export default async function OverviewPage() {
    const cookiesClient = await cookies()
    const token = cookiesClient.get("session_token")?.value

    if(!token){
        return (
            <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
                <h1>ERROR 404</h1>
                <NetworkError/>
            </div>
        )
    }

    const userData = await getUserByCookies(token);

    if (!userData) {
        return (
            <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
                <h1>ERROR 501</h1>
                <NetworkError/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <ProfileInformationWrapper userData={userData} />
        </div>
    );
}