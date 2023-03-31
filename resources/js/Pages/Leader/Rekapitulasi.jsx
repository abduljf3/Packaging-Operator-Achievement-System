import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function index({summarys,auth}) {
    console.log(auth);
  
    return(
            
        <>
     
        
        <Nav roles={auth.roles}/>
   
        <ul>List summary</ul>
        {summarys.map((summary) => (
            <li key={summary.id} className="flex gap-3">
    
                <p>{summary.drw_no}</p>
                <p>{summary.lot}</p>
                <p>{summary.qty}</p>
                <p>{summary.type}</p>
         
                <p>{summary.remarks}</p>

       
                  </li>
                  
        ))}
        </>
    )
}
