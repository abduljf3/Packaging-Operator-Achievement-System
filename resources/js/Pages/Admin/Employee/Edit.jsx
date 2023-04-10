import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Nav from '@/Components/Nav';

export default function Edit({ users, auth }) {
  const [state, setState] = useState({
    id: users.id,
    fullname: users.fullname,
    npk: users.npk,
    group: users.group,
    status: users.status,
    roles: users.roles,
    password: users.password,
   
  });

  useEffect(() => {
    setState(users);
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/admin/employee/${state.id}`, state)
      .then(() => {
        // Redirect to the admin list
        Inertia.visit('/admin/employee');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Nav roles={auth.roles} />

      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">fullname:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={state.fullname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="npk">npk:</label>
          <input
            type="text"
            id="npk"
            name="npk"
            value={state.npk}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="group">Group:</label>
          <input
            type="text"
            id="group"
            name="group"
            value={state.group}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={state.status}
            onChange={handleChange}
          />
        </div>

    

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="roles">Spring Lot:</label>
          <input
            type="text"
            id="roles"
            name="roles"
            value={state.roles}
            onChange={handleChange}
          />
        </div>


        <button type="submit">submit</button>
      </form>
    </>
  );
}