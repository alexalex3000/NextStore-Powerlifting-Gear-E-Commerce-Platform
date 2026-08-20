import Sidebar from "@/app/shop/catalog/components/Sidebar/Sidebar";
import GearBlock from "@/app/shop/catalog/components/GearBlock/GearBlock";

export default function CatalogPage(){
    return (
        <div className="flex flex-col min-[910px]:flex-row gap-6 min-[910px]:gap-10 pt-8">
            <Sidebar/>
            <GearBlock/>
        </div>
    )
}