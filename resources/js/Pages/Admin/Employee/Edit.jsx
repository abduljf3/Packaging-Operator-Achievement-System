import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, Head, useForm } from "@inertiajs/react";

export default function Edit({ users, auth }) {
    const { data, setData, post } = useForm({
        id: users.id,
        fullname: users.fullname,
        npk: users.npk,
        group: users.group,
        status: users.status,
        roles: users.roles,
        password: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = route("admin.employee.index") ;
        window.location.href = url;
        router.post(route("admin.employee.update", users.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <>
            <Head title="Edit Operator" />
            <Authenticated className="bg-white">
                <div className="py-5 mx-20">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 mx-20 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Edit Operator</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
                                    <div className=" mx-10 my-2">
                                        <InputLabel value="NPK" />

                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="npk"
                                            value={data.npk}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Nama" />

                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="fullname"
                                            value={data.fullname}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Group" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="group"
                                            value={data.group}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mx-10 my-2">
                                        <InputLabel value="Status" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="status"
                                            value={data.status}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Password" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Roles" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="roles"
                                            value={data.roles}
                                            onChange={handleChange}
                                        />
                                        <div className="flex justify-center mt-6">
                                            <ButtonGreen
                                                type="submit"
                                                className=""
                                            >
                                                Update
                                            </ButtonGreen>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
        // <>
        //     <Nav roles={auth.roles} />

        //     <h1>Edit Product</h1>

        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="fullname">fullname:</label>
        //             <input
        //                 type="text"
        //                 id="fullname"
        //                 name="fullname"
        //                 value={data.fullname}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="npk">npk:</label>
        //             <input
        //                 type="text"
        //                 id="npk"
        //                 name="npk"
        //                 value={data.npk}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="group">Group:</label>
        //             <input
        //                 type="text"
        //                 id="group"
        //                 name="group"
        //                 value={data.group}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="status">status:</label>
        //             <input
        //                 type="text"
        //                 id="status"
        //                 name="status"
        //                 value={data.status}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="password">Password:</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 name="password"
        //                 value={data.password}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="roles">Spring Lot:</label>
        //             <input
        //                 type="text"
        //                 id="roles"
        //                 name="roles"
        //                 value={data.roles}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <button type="submit">submit</button>
        //     </form>
        // </>
    );
}
