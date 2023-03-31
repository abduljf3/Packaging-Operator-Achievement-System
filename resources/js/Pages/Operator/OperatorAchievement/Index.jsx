import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from './Destroy';
import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import axios from 'axios';
import DangerButton from '@/Components/DangerButton';

export default function index({achievements, auth = {}}) {
  console.log(auth);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    setDeleting(true);
    await Inertia.delete(`/operator/operatorachievement/${id}`);
    setDeleting(false);
  };

 

  return(
    <>
      <div>
     
      </div>
      <Nav roles={auth.roles || []} />
      <ul>OPERATOR achievements INDEX</ul>
      <Link href={route('operatorachievement.create')}>Create New Product</Link>
    
      {achievements.map((achievement) => (
        <li key={achievement.id} className="flex gap-3">
          <p>{achievement.id}</p>
          <p>{achievement.date}</p>
          <p>{achievement.shift}</p>
          <p>{achievement.group}</p>
          <p>{achievement.proses}</p>
          <p>{achievement.user_id}</p>
          <p>{achievement.product_id}</p>
          <p>{achievement.spring_lot}</p>
          <p>{achievement.product_lot}</p>
          <p>{achievement.total_lot}</p>
          <p>{achievement.qty}</p>
          <p>{achievement.remarks}</p>
          <p>Achieved by {achievement.user.email}</p>
          <button disabled={deleting} onClick={() => handleDelete(achievement.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <Link href={route('operatorachievement.edit',achievement.id)}>Edit</Link>
        </li>
      ))}
    </>
  )
}

