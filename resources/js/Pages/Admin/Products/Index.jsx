import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';
//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function index({items,auth}) {
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

        <ul>List Product</ul>
        {items.map((item) => (
            <li key={item.id} className="flex gap-3">
                <p>{item.drw_no}</p>
                <p>{item.product_name}</p>
                <p>{item.id_type}</p>
                <Link href={route('products.edit',item.id)}>Edit</Link>
              
                <button disabled={deleting} onClick={() => handleDelete(item.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>   
                  </li>
                  
        ))}
        </>
    )
}
