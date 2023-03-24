import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Nav from '@/Components/Nav';

export default function Edit({ products, auth }) {
  const [state, setState] = useState({
    id: products.id,
    drw_no: products.drw_no,
    product_name: products.product_name,
    product_type: products.product_type,
  
  });

  useEffect(() => {
    setState(products);
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/admin/products/${state.id}`, state)
      .then(() => {
        // Redirect to the operator list
        Inertia.visit('/admin/products');
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
          <label htmlFor="drw_no">drw_no:</label>
          <input
            type="text"
            id="drw_no"
            name="drw_no"
            value={state.drw_no}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="product_name">product_name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={state.product_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="product_type">product_type:</label>
          <input
            type="text"
            id="product_type"
            name="product_type"
            value={state.product_type}
            onChange={handleChange}
          />
        </div>


        <button type="submit">Update</button>
      </form>
    </>
  );
}