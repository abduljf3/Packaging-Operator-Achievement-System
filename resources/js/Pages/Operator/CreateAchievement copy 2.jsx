import Nav from "@/Components/Nav";
import { Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function CreateAchievement({ users, products }) {

  const { data, setData, post, errors } = useForm({
    shift: "",
    group: "",
    proses: "",
    npk: "",
    product_id: "",
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
  
    if (key === "npk") {
      // Look up the corresponding fullname from the users array
      const user = users.find((user) => user.npk === value);
      const fullname = user ? user.fullname : "";
      setData((data) => ({ ...data, npk: value, fullname }));
    } else if (key === "drw_no") {

      // Look up the corresponding product name from the products array
      const product = products.find((product) => product.drw_no === value);
      const product_name = product ? product.product_name : "";
      const customer_id = product ? product.customer_id : "";
      setData((data) => ({ ...data, drw_no: value, product_name,customer_id }));

    } else {
      setData((data) => ({ ...data, [key]: value }));
    }
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await post("/achievement/create", {
      data,
      preserveScroll: true,
    });
    setSubmitting(false);
  };
    return (
        <>
        <div className="">Halaman Operator Create Achievement</div>
        <ul>
            {products.map((product) => (
                <li>{product.drw_no} {product.product_type}</li>
            ))}

            
              {users.map((user) => (
                <li>{user.fullname} {user.npk}</li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
      <div>
       <label htmlFor="date">Date</label>
       <input
         type="date"
         name="date"
         value={data.date}
         onChange={handleChange}
         className={errors.date ? "border-red-500" : ""}  
       />
       {errors.date && (
         <div className="text-red-500">{errors.date}</div>
       )}
     </div>

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
      <label htmlFor="npk">NPK:</label>
      <select id="npk" name="npk" value={data.npk} onChange={handleChange}>
        <option value="">Pilih Id NPK</option>
        {users.map((user) => (
          <option key={user.id} value={user.npk}>
            {user.npk}
          </option>
        ))
        
        }
      </select>
      <div>
      <label htmlFor="fullname">Full Name:</label>
      <input id="fullname" name="fullname" value={data.fullname} readOnly />
      {/* other form fields */}
    </div>
  
      {/* other form fields */}
    </div>
    ////////////////////////////////////
    <div>
      <label htmlFor="drw_no">drw_no:</label>
      <select id="drw_no" name="drw_no" value={data.drw_no} onChange={handleChange}>
        <option value="">Pilih Id drw_no</option>
        {products.map((product) => (
          <option key={product.id} value={product.drw_no}>
            {product.drw_no}
          </option>
        ))
        
        }
      </select>
      <div>
      <label htmlFor="product_name">Product Name:</label>
      <input id="product_name" name="product_name" value={data.product_name} readOnly />
      {/* other form fields */}
    </div>
    <div>
      <label htmlFor="customer_id">Customer ID:</label>
      <input id="customer_id" name="customer_id" value={data.customer_id} readOnly />
      {/* other form fields */}
    </div>
      {/* other form fields */}
    </div>

        <div>
          <label htmlFor="product_id">product_id</label>
          <input
            type="text"
            name="product_id"
            value={data.product_id}
            onChange={handleChange}
            className={errors.product_id ? "border-red-500" : ""}
            
          />
          {errors.product_id && (
            <div className="text-red-500">{errors.product_id}</div>
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
        
    )
}