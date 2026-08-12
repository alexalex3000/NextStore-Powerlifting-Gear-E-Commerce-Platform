interface Props{
    params: Promise<{id: string}>
}

export default async function GearPage({params}: Props){
    const {id} = await params

    return (
        <div>{id}</div>
    )
}
