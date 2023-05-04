import { Head, useForm } from "@inertiajs/react";
import ButtonRed from "@/Components/ButtonRed";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function index({ users, auth }) {
    console.log(auth);
    const [deleting, setDeleting] = useState(false);
    // handle delete action
    const handleDelete = async (id) => {
        setDeleting(true);

        await Inertia.delete(`/admin/employee/${id}`);
        setDeleting(false);
    };

    const columns = [
        {
            name: "No",
            selector: (_, index) => index + 1,
            sortable: true,
        },

        {
            name: "NPK",
            selector: (row) => row.npk,
        },
        {
            name: "Operator Name",
            selector: (row) => row.fullname,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
        },
        {
            name: "Group",
            selector: (row) => row.group,
        },
        {
            name: "Level",
            selector: (row) => row.roles,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <a
                        href={route("admin.employee.edit", row.id)}
                        class="text-green-500 hover:text-green-900 duration-500 mr-5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </a>

                    <Link
                        disabled={deleting}
                        onClick={() => handleDelete(row.id)}
                        className="w-6 h-6 text-red-500 hover:text-red-900 duration-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </Link>
                </>
            ),
        },
    ];

    return (
        <>
            <Head title="Operator" />

            <Authenticated>
                {/* content */}
                <div className="w-screen">
                    <div className="flex justify-end px-10 pt-3 ">
                        <div className="flex mr-0">
                            <div className="flex items-center gap-3">
                                <Link href={route("admin.employee.create")}>
                                    <ButtonRed>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add Employee
                                    </ButtonRed>
                                    {/* <Link href={route("employee.leader")}>
                                        leader
                                    </Link> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 pb-10 px-10  ">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <DataTable
                                title="Operator"
                                columns={columns}
                                data={users}
                                // customStyles={customStyles}
                                pagination
                                dense
                                highlightOnHover
                                actions={
                                    // <Link href={route("admin.products.create")}>
                                    //     <ButtonRed className=" mr-5 my-5">
                                    //         <svg
                                    //             xmlns="http://www.w3.org/2000/svg"
                                    //             viewBox="0 0 24 24"
                                    //             fill="currentColor"
                                    //             className="w-6 h-6 flex"
                                    //         >
                                    //             <path
                                    //                 fillRule="evenodd"
                                    //                 d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                    //                 clipRule="evenodd"
                                    //             />
                                    //         </svg>
                                    //         Add Product
                                    //     </ButtonRed>
                                    // </Link>
                                    <label className="w-100 h-100 mx-3 my-5 relative text-gray-400 focus-within:text-gray-600 block duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="w-5 h-5 posistion absolute pointer-events-none ml-3 mt-3"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>

                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            onChange={handleFilter}
                                            value={filterText}
                                            className="  bg-white placeholder-gray-400 text-black border-2 border-gray-300 duration-500 appearance-none w-full block pl-10 focus:outline-none rounded-lg "
                                        ></input>
                                    </label>
                                }
                                className=""
                            />
                        </div>
                    </div>
                </div>
                {/* content END */}
            </Authenticated>
            {/* <Nav roles={auth.roles}/>

         <ul>ADMIN users INDEX</ul>
          <Link href={route('employee.create')}>Create New Product</Link>
    
         
            {users.map((user) => (
            <li key={user.id} className="flex gap-3">

                <p>{user.id}</p>
                <p>{user.date}</p>
                <p>{user.shift}</p>
                <p>{user.group}</p>
                <p>{user.proses}</p>
                <p>{user.user_id}</p>
                <p>{user.product_id}</p>
                <p>{user.spring_lot}</p>
                <p>{user.product_lot}</p>
                <p>{user.total_lot}</p>
                <p>{user.qty}</p>
                <p>{user.remarks}</p>
                

              <button disabled={deleting} onClick={() => handleDelete(user.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>                 
                <Link href={route('employee.edit',user.id)}>Edit</Link>
               
                
                </li>
        ))} */}
        </>
    );
}
