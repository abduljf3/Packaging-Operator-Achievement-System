import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Nav from '@/Components/Nav';

export default function Edit({ achievements, auth }) {
  const [state, setState] = useState({
    id: achievements.id,
    date: achievements.date,
    shift: achievements.shift,
    group: achievements.group,
    proses: achievements.proses,
    user_id: achievements.user_id,
    product_id: achievements.product_id,
    spring_lot: achievements.spring_lot,
    product_lot: achievements.product_lot,
    total_lot: achievements.total_lot,
    qty: achievements.qty,
    remarks: achievements.remarks,
  });

  useEffect(() => {
    setState(achievements);
  }, [achievements]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/operator/operatorachievement/${state.id}`, state)
      .then(() => {
        // Redirect to the operator list
        Inertia.visit('/operator/operatorachievement');
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
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={state.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="shift">Shift:</label>
          <input
            type="text"
            id="shift"
            name="shift"
            value={state.shift}
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
          <label htmlFor="proses">Proses:</label>
          <input
            type="text"
            id="proses"
            name="proses"
            value={state.proses}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={state.user_id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="product_id">User Product:</label>
          <input
            type="text"
            id="product_id"
            name="product_id"
            value={state.product_id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="spring_lot">Spring Lot:</label>
          <input
            type="text"
            id="spring_lot"
            name="spring_lot"
            value={state.spring_lot}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="product_lot">Product Lot:</label>
          <input
            type="text"
            id="product_lot"
            name="product_lot"
            value={state.product_lot}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="total_lot">Total Lot:</label>
          <input
            type="text"
            id="total_lot"
            name="total_lot"
            value={state.total_lot}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="qty">Qty:</label>
          <input
            type="text"
            id="qty"
            name="qty"
            value={state.qty}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="remarks">Remarks:</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            value={state.remarks}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
}