import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Nav from '@/Components/Nav';

export default function Edit({ users, auth }) {
  const [state, setState] = useState({
    id: users.id,
    name: users.name,
    email: users.email,
    password: users.password,
    roles: users.roles,
  
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
    Inertia.put(`/admin/leader/${state.id}`, state)
      .then(() => {
        // Redirect to the operator list
        Inertia.visit('/admin/leader');
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
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="roles">roles:</label>
          <input
            type="text"
            id="roles"
            name="roles"
            value={state.roles}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
}