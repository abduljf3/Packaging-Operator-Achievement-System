import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';

export default function index({products,auth,posts,session}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

         <ul>OPERATOR PRODUCTS INDEX</ul>
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
                <Link href={route('operatorachievement.edit',operator.id)}>Edit</Link>
                <Link href={route('operatorachievement.destroy',operator.id)}>Edit</Link>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Destroy className="max-w-xl" />
                    </div>
                </li>
        ))}
        </>
    )
}