import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({products,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN LEADER INDEX</ul>
        {products.map((product) => (
            <li key={product.id} className="flex gap-3">
                <p>{product.drw_no}</p>
                <p>{product.product_name}</p>
                <Link href={route('products.edit',product.id)}>Edit</Link>
            </li>
        ))}
        </>
    )
}