import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

//import React
import React from 'react';

import { useState } from 'react';
//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function index({details,auth}) {
    console.log(auth);
  
    return(
            
        <>
     
        
        <Nav roles={auth.roles}/>
   
        <ul>List detail</ul>
        {details.map((detail) => (
            <li key={detail.id} className="flex gap-3">
                <p>{detail.date}</p>
                <p>{detail.shift}</p>
                <p>{detail.group}</p>
                <p>{detail.drw_no}</p>
                <p>{detail.type}</p>
                <p>{detail.operator_name}</p>
                <p>{detail.lot}</p>
                <p>{detail.qty}</p>
                <p>{detail.remarks}</p>

       
                  </li>
                  
        ))}
        </>
    )
}
