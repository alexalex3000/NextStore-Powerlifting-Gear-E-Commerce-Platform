import Sidebar from "@/app/shop/catalog/components/Sidebar/Sidebar";
import GearBlock from "@/app/shop/catalog/components/GearBlock/GearBlock";

export default function CatalogPage(){
    return (
        <div className="flex gap-10 pt-8">
            <Sidebar/>
            <GearBlock/>
        </div>
    )
}