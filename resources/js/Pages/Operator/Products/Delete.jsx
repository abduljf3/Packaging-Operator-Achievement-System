import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({products,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN PRODUCT DELETE</ul>
        {products.map((operator) => (
            <li key={operator.id} className="flex gap-3">

<p>{operator.id}</p>
                <p>{operator.date}</p>
               
                <p>{operator.shift}</p>
                <Link href={route('products.edit',operator.id)}>Edit</Link>
            </li>
        ))}
        </>
    )
}