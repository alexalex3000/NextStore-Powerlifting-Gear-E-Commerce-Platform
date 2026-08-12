import Header from "@/app/components/Header";

interface Props{
    children: React.ReactNode;
}

export default function ShopLayout({children}: Props) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
        </>
    )
}