import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({products,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

         <ul>List Product</ul>
            {products.map((operator) => (
            <li key={operator.id} className="flex gap-3">

                <p>{operator.id}</p>
                <p>{operator.date}</p>
                <p>{operator.shift}</p>
                <p>{operator.group}</p>
                <p>{operator.proses}</p>
                <p>{operator.user_id}</p>
                <p>{operator.user_product}</p>
                <p>{operator.spring_lot}</p>
                <p>{operator.product_lot}</p>
                <p>{operator.total_lot}</p>
                <p>{operator.qty}</p>
                <p>{operator.remarks}</p>
                <Link href={route('products.edit',operator.id)}>Edit</Link>
                <Link href={route('products.edit',operator.id)}>Delete</Link>
              </li>
        ))}
        </>
    )
}