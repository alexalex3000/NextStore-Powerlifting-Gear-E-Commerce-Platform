import {ReactNode, Suspense} from "react";
import Header from "@/widgets/Header/Header";
import HeaderLoader from "@/shared/ui/loaders/HeaderLoader/HeaderLoader";

export default function OthersLayout({children}: {children: ReactNode}) {
    return (
        <div>
            <Suspense fallback={<HeaderLoader/>}>
                <Header isSearch={false}/>
            </Suspense>
            <main>
                {children}
            </main>
        </div>
    )
}