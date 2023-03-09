export default function Navbar({props}) {
console.log(props);
    return (
        <div className={props ? 'flex container mx-auto h-32 bg-red-400' : 'flex container mx-auto h-32 bg-sky-400'}>
            {props.map((data) => (
                <div key={data.id}>
                    <p>{data.name}</p>
                    <p>{data.email}</p>
                </div>
            ))}
        </div>
    )
};
