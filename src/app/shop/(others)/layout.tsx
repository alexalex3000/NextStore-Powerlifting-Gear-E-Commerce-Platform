import {ReactNode} from "react";
import Header from "@/widgets/Header/Header";

export default function OthersLayout({children}: {children: ReactNode}) {
    return (
        <div>
            <Header isSearch={false}/>
            <main className="p-4">
                {children}
            </main>
        </div>
    )
}