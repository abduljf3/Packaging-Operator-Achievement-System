import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({items,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>List Product</ul>
        {items.map((item) => (
            <li key={item.id} className="flex gap-3">
                <p>{item.drw_no}</p>
                <p>{item.product_name}</p>
                <p>{item.id_type}</p>
                <Link href={route('Edit.edit',item.id)}>Edit</Link>
                  </li>
                  
        ))}
        </>
    )
}
