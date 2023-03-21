export default function Nav({roles}) {
    return (
        <>
        {roles === 'admin' ? (
            <h1>Hay Admin</h1>
        ):(
            <h1>Hay yang lain</h1>
        )}
        </>
    )
}