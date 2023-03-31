import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({products,auth}) {
    console.log(auth);
    return(
            
        <>
        
        <Nav roles={auth.roles}/>
        <Link href={route('products.create')}>Create New Product</Link>
 
        <ul>List Product</ul>
        {products.map((product) => (
            <li key={product.id} className="flex gap-3">
                  <p>{product.customer_id}</p>
                  <p>{product.customer_name}</p>
                <p>{product.drw_no}</p>
                <p>{product.product_name}</p>
                <p>{product.product_type}</p>
                <Link href={route('products.edit',product.id)}>Edit</Link>
              
                <button disabled={deleting} onClick={() => handleDelete(product.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>  
       
                  </li>
                  
        ))}
        </>
    )
}
