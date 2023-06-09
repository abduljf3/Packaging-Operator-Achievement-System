import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import Swal from "sweetalert2";
import { Link, Head, useForm } from "@inertiajs/react";
import { set } from "lodash";

export default function Edit({ customers, auth }) {
    const [state, setState] = useState({
        id: customers.id,
        customer_id: customers.customer_id,
        customer_name: customers.customer_name,
    });

    useEffect(() => {
        setState(customers);
    }, [customers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
        });
        const url = route("admin.customers.index");
        window.location.href = url;
        Inertia.put(`/admin/customers/${state.id}`, state);
    };

    return (
        <>
            <Head title="Edit Product" />
            <Authenticated className="bg-white">
                <div className="flex container justify-start w-full px-10 mx-auto mb-5 bg-white py-3 font-bold">
                    <h1>Edit Product</h1>
                </div>
                <div className="py-5 mx-20">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 mx-20 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
                                    <div className=" mx-10 my-2">
                                        <InputLabel value="Customer Code" />

                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="customer_id"
                                            value={state.customer_id}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mx-10 my-2">
                                        <InputLabel value="Customer Name" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="customer_name"
                                            value={state.customer_name}
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
    );
}
