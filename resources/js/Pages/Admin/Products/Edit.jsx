import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({items,auth}) {
    console.log(items);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>Edit Product</ul>
      {items.product_name}
        </>
    )
}
