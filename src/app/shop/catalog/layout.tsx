import Header from "@/widgets/Header/Header";

export default function CatalogLayout({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) {
    return (
        <div>
            <Header isSearch={true}/>
            <main className="p-4">
                {modal}
                {children}
            </main>
        </div>
    )
}