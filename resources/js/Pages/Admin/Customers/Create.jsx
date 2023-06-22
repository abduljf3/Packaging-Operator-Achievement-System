import React from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import Swal from "sweetalert2";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        id: "",
        customer_id: "",
        customer_name: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleChangeOption = (selectedOption) => {
        setData((data) => ({
            ...data,
            product_type: selectedOption.value,
        }));
    };

    const handleChangeOptionCustomerName = (selectedOption) => {
        setData((data) => ({
            ...data,
            customer_name: selectedOption.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.customer_id == "" || data.customer_name == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Isi semua kolom terlebih dahulu!",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            setSubmitting(true);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Data berhasil ditambahkan!",
                showConfirmButton: false,
            });
            const url = route("admin.customers.index");
            window.location.href = url;
            await post("/admin/customers", {
                data,
                preserveScroll: true,
            });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Add Customer" />
            <Authenticated className="bg-white">
                <div className="py-28 mx-20">
                    <div className=" mx-20">
                        <div className="p-4 mx-60 bg-white shadow sm:rounded-lg">
                            <div className="p-4 ml-16 font-extrabold ">
                                <h1>Add Customer</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
                                    <div className="mx-20 my-2 w-full">
                                        <InputLabel value="Customer Code" />
                                        <InputError
                                            message={errors.customer_id}
                                        />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="customer_id"
                                            value={data.customer_id}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Customer Name" />
                                        <InputError
                                            message={errors.customer_name}
                                        />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="customer_name"
                                            value={data.customer_name}
                                            onChange={handleChange}
                                        />
                                         
                                         <div className="flex justify-center mt-6 gap-3 ml-9">
                                            <Link
                                                href={route(
                                                    "admin.employee.index"
                                                )}
                                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
                                            >
                                                Cancel
                                            </Link>
                                            <ButtonGreen
                                                type="submit"
                                                disabled={submitting}
                                                className="px-3"
                                            >
                                                {submitting
                                                    ? "Adding..."
                                                    : "Add Operator"}
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
