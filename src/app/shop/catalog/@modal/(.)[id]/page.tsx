import ModalWindow from "@/widgets/ModalWindow/ModalWindow";
import {getProducts} from "@/app/shop/catalog/page";
import NetworkError from "@/shared/ui/NetworkError/NetworkError";

export default async function InterseptorGearPage() {
    const productObj = await getProducts()

    if(!productObj || !productObj.success || !productObj?.data) {
        return (
            <>
                Error 404
                <NetworkError/>
            </>
        )
    }

    return (
        <ModalWindow product={productObj.data[0]}/>
    );
}