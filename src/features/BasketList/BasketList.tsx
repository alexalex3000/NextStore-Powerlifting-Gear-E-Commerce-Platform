import Section from "@/shared/ui/Section/Section";
import BasketProduct from "@/entities/product/ui/BasketProduct/BasketProduct";
import NoProducts from "@/shared/ui/NoProducts/NoProducts";

export interface BasketItemProduct {
    id: string;
    type: string;
    title: string;
    currentPrice: number;
    oldPrice: number | null;
    count: number;
    assessment: number;
    numOfFeedbacks: number;
    imgUrl: string;
}

export interface BasketInfo {
    id: string;
    count: number;
    productId: string | null;
    basketId: string;
    sizes: "XS" | "S" | "M" | "L" | "XL" | "XXL" | null;
    product: BasketItemProduct | null;
}

interface Props {
    basketProduct: BasketInfo[];
}

export default function BasketList({basketProduct}: Props){
    return (
        <>
            {basketProduct.length > 0 ? (
                <Section>
                    {
                        basketProduct.map((basketInfo: BasketInfo) => (
                            <BasketProduct key={basketInfo.id} basketInfo={basketInfo} />
                        ))
                    }
                </Section>
            ) : (
                <Section fullHeight={true}>
                    <NoProducts />
                </Section>
            )}
        </>
    )
}