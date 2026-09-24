import {ReactNode, Suspense} from "react";
import Sidebar from "@/widgets/Sidebar/Sidebar";

export default function ShopLayout({ children }: { children: ReactNode }) {
    return (
        <div className="p-0 md:p-8 flex flex-col md:flex-row w-full gap-6 md:gap-8 max-w-[1200px] mx-auto">
            <div className="w-full pt-4 md:pt-0 md:w-[280px] shrink-0">
                <Suspense fallback={null}>
                    <Sidebar />
                </Suspense>
            </div>
            <div className="flex-1 w-full min-w-0">
                {children}
            </div>
        </div>
    );
}