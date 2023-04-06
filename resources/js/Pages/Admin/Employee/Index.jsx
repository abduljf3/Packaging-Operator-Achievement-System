import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';
//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';
 
export default function index({users,auth}) {
    console.log(auth);
    const [deleting, setDeleting] = useState(false);
  // handle delete action
  const handleDelete = async (id) => {
    setDeleting(true);
    await Inertia.delete(`/admin/employee/${id}`);
    setDeleting(false);
  };
    return(
        <>
        <Nav roles={auth.roles}/>

         <ul>ADMIN users INDEX</ul>
          <Link href={route('employee.create')}>Create New Product</Link>
    
         
            {users.map((user) => (
            <li key={user.id} className="flex gap-3">

                <p>{user.id}</p>
                <p>{user.date}</p>
                <p>{user.shift}</p>
                <p>{user.group}</p>
                <p>{user.proses}</p>
                <p>{user.user_id}</p>
                <p>{user.product_id}</p>
                <p>{user.spring_lot}</p>
                <p>{user.product_lot}</p>
                <p>{user.total_lot}</p>
                <p>{user.qty}</p>
                <p>{user.remarks}</p>
                

              <button disabled={deleting} onClick={() => handleDelete(user.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>                 
                <Link href={route('employee.edit',user.id)}>Edit</Link>
               
                
                </li>
        ))}
        </>
    )
}