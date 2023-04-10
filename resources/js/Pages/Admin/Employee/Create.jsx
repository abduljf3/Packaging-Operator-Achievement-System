import Nav from "@/Components/Nav";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({auth}) {
  const { data, setData, post, errors } = useForm({
 
   
    fullname: "",
    npk: "",
    group: "",
    status: "",
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
    await post("/admin/employee", {
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
       <label htmlFor="fullname">fullname</label>
       <input
         type="text"
         name="fullname"
         value={data.fullname}
         onChange={handleChange}
         className={errors.fullname ? "border-red-500" : ""}  
       />
       {errors.fullname && (
         <div className="text-red-500">{errors.fullname}</div>
       )}
     </div>

     <div>
       <label htmlFor="npk">npk</label>
       <input
         type="text"
         name="npk"
         value={data.npk}
         onChange={handleChange}
         className={errors.npk ? "border-red-500" : ""}
       />
       {errors.npk && (
         <div className="text-red-500">{errors.npk}</div>
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
          <label htmlFor="status">status</label>
          <input
            type="text"
            name="status"
            value={data.status}
            onChange={handleChange}
            className={errors.status ? "border-red-500" : ""}
          />
          {errors.status && (
            <div className="text-red-500">{errors.status}</div>
          )}
        </div>
       
        <div>
          <label htmlFor="password">User Id</label>
          <input
            type="password"
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
          <label htmlFor="roles">roles</label>
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
