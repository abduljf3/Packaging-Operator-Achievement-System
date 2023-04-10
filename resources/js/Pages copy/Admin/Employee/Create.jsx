import Nav from "@/Components/Nav";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({auth}) {
  const { data, setData, post, errors } = useForm({
    id: "",
    name: "",
    email: "",
    password: "",
    roles: "",
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
          <label htmlFor="name"> name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password">ID Type</label>
          <input
            type="text"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="roles">ID Type</label>
          <input
            type="text"
            name="roles"
            value={data.roles}
            onChange={handleChange}
            className={errors.roles ? "border-red-500" : ""}
          />
          {errors.roles && (
            <div className="text-red-500">{errors.roles}</div>
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
