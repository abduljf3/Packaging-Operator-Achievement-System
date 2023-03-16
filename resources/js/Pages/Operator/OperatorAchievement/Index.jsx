import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';
//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function index({operators,auth}) {
    console.log(auth);
    const [deleting, setDeleting] = useState(false);
  // handle delete action
  const handleDelete = async (id) => {
    setDeleting(true);
    await Inertia.delete(`/operator/operatorachievement/${id}`);
    setDeleting(false);
  };
    return(
        <>
        
        <Nav roles={auth.roles}/>

         <ul>OPERATOR operators INDEX</ul>
         
            {operators.map((operator) => (
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
            

    <Link href={route('operatorachievement.create')}>Create New Product</Link>
                <button disabled={deleting} onClick={() => handleDelete(operator.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>                 
                <Link href={route('operatorachievement.edit',operator.id)}>Edit</Link>
               
                
                </li>
        ))}
        </>
    )
}