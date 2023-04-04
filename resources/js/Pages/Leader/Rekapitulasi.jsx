import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import React from 'react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ achievements, auth }) {
    console.log(auth);
  
    return (
        <>
            <Nav roles={auth.roles} />
            <ul>List achievement</ul>
            {achievements.map((achievement) => (
                <li key={achievement.id} className="flex gap-3">
                    <p>{achievement.drw_no}</p>
                    <p>{achievement.total_lot}</p>
                    <p>{achievement.qty}</p>
                    <p>{achievement.product ? achievement.product.product_type : ''}</p> 
                    
                  
                </li>
            ))}
        </>
    );
}