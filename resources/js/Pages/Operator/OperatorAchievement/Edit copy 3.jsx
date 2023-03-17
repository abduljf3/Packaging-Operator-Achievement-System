import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Nav from '@/Components/Nav';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
export default function Edit({ operator, auth }) {
  const [state, setState] = useState({
    id: operator.id,
    date: operator.date,
    shift: operator.shift,
    group: operator.group,
    proses: operator.proses,
    user_id: operator.user_id,
    user_product: operator.user_product,
    spring_lot: operator.spring_lot,
    product_lot: operator.product_lot,
    total_lot: operator.total_lot,
    qty: operator.qty,
    remarks: operator.remarks,
  });

  useEffect(() => {
    setState(operator);
  }, [operator]);

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
  <DatePicker
    id="date"
    name="date"
    selected={state.date ? new Date(state.date) : null}
    onChange={(date) =>
      setState({ ...state, date: format(date, 'yyyy-MM-dd') })
    }
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
          <label htmlFor="user_product">User Product:</label>
          <input
            type="text"
            id="user_product"
            name="user_product"
            value={state.user_product}
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