import AdminHeader from "@/widgets/AdminHeader/AdminHeader";

interface Props{
    children: React.ReactNode,
}

export default function AdminLayout({children}:Props){
    return (
        <>
            <AdminHeader isSearch={false}/>
            {children}
        </>
    )
}