import Header from "@/widgets/Header/Header";
import {Suspense} from "react";
import HeaderLoader from "@/shared/ui/loaders/HeaderLoader/HeaderLoader";

export default function CatalogLayout({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) {
    return (
        <div>
            <Suspense fallback={<HeaderLoader/>}>
                <Header isSearch={true}/>
            </Suspense>
            <main className="p-4">
                {modal}
                {children}
            </main>
        </div>
    )
}