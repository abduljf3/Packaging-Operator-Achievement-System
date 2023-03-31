import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';
//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function index({products,auth}) {
    console.log(auth);
    const [deleting, setDeleting] = useState(false);
    // handle delete action
    const handleDelete = async (id) => {
      setDeleting(true);
      await Inertia.delete(`/admin/products/${id}`);
      setDeleting(false);
    };
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
