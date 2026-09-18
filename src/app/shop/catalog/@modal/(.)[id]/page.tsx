import ModalWindow from "@/widgets/ModalWindow/ModalWindow";
import {getProducts} from "@/app/shop/catalog/page";
import NetworkError from "@/shared/ui/NetworkError/NetworkError";

interface Props {
    params: Promise<{id: string}>;
}

export default async function InterseptorGearPage({params}: Props) {
    const {id} = await params;

    const productObj = await getProducts()
    const product = productObj?.data?.find((prod) => prod.id === id)

    if(!productObj || !productObj.success || !productObj?.data || !product) {
        return (
            <>
                Error 404
                <NetworkError/>
            </>
        )
    }

    return (
        <ModalWindow product={product}/>
    );
}