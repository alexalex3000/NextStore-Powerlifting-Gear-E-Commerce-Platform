import Section from "@/shared/ui/Section/Section";
import BasketProduct from "@/entities/product/ui/BasketProduct/BasketProduct";

export default function BasketList(){
    return (
        <Section>
            <BasketProduct/>
            <BasketProduct/>
            <BasketProduct/>
        </Section>
    )
}