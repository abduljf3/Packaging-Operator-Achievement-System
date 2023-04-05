import Nav from "@/Components/Nav";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({auth}) {
  const { data, setData, post, errors } = useForm({
 
    drw_no: "",
    product_name: "",
    product_type: "",
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
    await post("/admin/products", {
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
          <label htmlFor="drw_no">Drawing Number</label>
          <input
            type="text"
            name="drw_no"
            value={data.drw_no}
            onChange={handleChange}
            className={errors.drw_no ? "border-red-500" : ""}
          />
          {errors.drw_no && (
            <div className="text-red-500">{errors.drw_no}</div>
          )}
        </div>

        <div>
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={data.product_name}
            onChange={handleChange}
            className={errors.product_name ? "border-red-500" : ""}
          />
          {errors.product_name && (
            <div className="text-red-500">{errors.product_name}</div>
          )}
        </div>

        <div>
          <label htmlFor="product_type">ID Type</label>
          <input
            type="text"
            name="product_type"
            value={data.product_type}
            onChange={handleChange}
            className={errors.product_type ? "border-red-500" : ""}
          />
          {errors.product_type && (
            <div className="text-red-500">{errors.product_type}</div>
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
