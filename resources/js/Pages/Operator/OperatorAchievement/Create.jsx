import Nav from "@/Components/Nav";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({auth}) {
  const { data, setData, post, errors } = useForm({
 
   
    shift: "",
    group: "",
    proses: "",
    user_id: "",
    user_product: "",
    spring_lot: "",
    product_lot: "",
    total_lot: "",
    qty: "",
    remarks: "",

   
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await post("/operator/operatorachievement", {
      data,
      preserveScroll: true,
    });
    setSubmitting(false);
  };

  return (
    <>
      <Nav roles={auth.roles} />

      <form onSubmit={handleSubmit}>
     
     <div>
       <label htmlFor="shift">Shift</label>
       <input
         type="text"
         name="shift"
         value={data.shift}
         onChange={handleChange}
         className={errors.shift ? "border-red-500" : ""}
       />
       {errors.shift && (
         <div className="text-red-500">{errors.shift}</div>
       )}
     </div>
     
     
     <div>
          <label htmlFor="group">Group</label>
          <input
            type="text"
            name="group"
            value={data.group}
            onChange={handleChange}
            className={errors.group ? "border-red-500" : ""}
          />
          {errors.group && (
            <div className="text-red-500">{errors.group}</div>
          )}
        </div>

        <div>
          <label htmlFor="proses">Proses</label>
          <input
            type="text"
            name="proses"
            value={data.proses}
            onChange={handleChange}
            className={errors.proses ? "border-red-500" : ""}
          />
          {errors.proses && (
            <div className="text-red-500">{errors.proses}</div>
          )}
        </div>
       
        <div>
          <label htmlFor="user_id">User Id</label>
          <input
            type="text"
            name="user_id"
            value={data.user_id}
            onChange={handleChange}
            className={errors.user_id ? "border-red-500" : ""}
          />
          {errors.user_id && (
            <div className="text-red-500">{errors.user_id}</div>
          )}
        </div>

        <div>
          <label htmlFor="user_product">User_Product</label>
          <input
            type="text"
            name="user_product"
            value={data.user_product}
            onChange={handleChange}
            className={errors.user_product ? "border-red-500" : ""}
          />
          {errors.user_product && (
            <div className="text-red-500">{errors.user_product}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="spring_lot">Spring Lot</label>
          <input
            type="text"
            name="spring_lot"
            value={data.spring_lot}
            onChange={handleChange}
            className={errors.spring_lot ? "border-red-500" : ""}
          />
          {errors.spring_lot && (
            <div className="text-red-500">{errors.spring_lot}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="product_lot">Product Lot</label>
          <input
            type="text"
            name="product_lot"
            value={data.product_lot}
            onChange={handleChange}
            className={errors.product_lot ? "border-red-500" : ""}
          />
          {errors.product_lot && (
            <div className="text-red-500">{errors.product_lot}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="total_lot">Total Lot</label>
          <input
            type="text"
            name="total_lot"
            value={data.total_lot}
            onChange={handleChange}
            className={errors.total_lot ? "border-red-500" : ""}
          />
          {errors.total_lot && (
            <div className="text-red-500">{errors.total_lot}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="qty">QTY</label>
          <input
            type="text"
            name="qty"
            value={data.qty}
            onChange={handleChange}
            className={errors.qty ? "border-red-500" : ""}
          />
          {errors.qty && (
            <div className="text-red-500">{errors.qty}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="remarks">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={data.remarks}
            onChange={handleChange}
            className={errors.remarks ? "border-red-500" : ""}
          />
          {errors.remarks && (
            <div className="text-red-500">{errors.remarks}</div>
          )}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}
