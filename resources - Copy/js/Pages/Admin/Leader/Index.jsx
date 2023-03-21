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
      await Inertia.delete(`/admin/leader/${id}`);
      setDeleting(false);
    };
    return(
        <>
     
        
        <Nav roles={auth.roles}/>
        <Link href={route('leader.create')}>Create New user</Link>
 
        <ul>List user</ul>
        {users.map((user) => (
            <li key={user.id} className="flex gap-3">
                <p>{user.drw_no}</p>
                <p>{user.user_name}</p>
                <p>{user.id_type}</p>
                <Link href={route('leader.edit',user.id)}>Edit</Link>
              
                <button disabled={deleting} onClick={() => handleDelete(user.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>  
       
                  </li>
                  
        ))}
        </>
    )
}
