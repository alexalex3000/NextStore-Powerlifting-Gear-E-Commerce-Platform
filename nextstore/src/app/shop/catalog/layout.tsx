interface Props {
    modal: React.ReactNode;
    children: React.ReactNode;
}

export default function CatalogLayout({modal, children}: Props) {
    return (
        <>
            {modal}
            {children}
        </>
    )
}