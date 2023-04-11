import Nav from '@/Components/Nav';
import { Inertia } from '@inertiajs/inertia';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Edit({ user, auth }) {
  const {data, setData, post} = useForm({
    id: user.id,
    fullname: user.fullname,
    npk: user.npk,
    group: user.group,
    status: user.status,
    roles: user.roles,
    password: "",
   
  });
 

  const handleChange = (e) => {
    setData(
      e.target.name,
      e.target.value
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('admin.employee.update', user.id),{
      _method: 'PUT',
      ...data
    })
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
            value={data.fullname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="npk">npk:</label>
          <input
            type="text"
            id="npk"
            name="npk"
            value={data.npk}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="group">Group:</label>
          <input
            type="text"
            id="group"
            name="group"
            value={data.group}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={data.status}
            onChange={handleChange}
          />
        </div>

    

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="roles">Spring Lot:</label>
          <input
            type="text"
            id="roles"
            name="roles"
            value={data.roles}
            onChange={handleChange}
          />
        </div>


        <button type="submit">submit</button>
      </form>
    </>
  );
}