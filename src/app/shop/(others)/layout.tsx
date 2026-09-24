import {ReactNode, Suspense} from "react";
import Header from "@/widgets/Header/Header";

export default function OthersLayout({children}: {children: ReactNode}) {
    return (
        <div>
            <Suspense fallback={null}>
                <Header isSearch={false}/>
            </Suspense>
            <main>
                {children}
            </main>
        </div>
    )
}