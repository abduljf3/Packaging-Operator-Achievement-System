import React from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Link, Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        id: "",
        customer_id: "",
        customer_name: "",
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
            <Head title="Achievement" />
            <Authenticated className="bg-white">
                <div className="flex container justify-start w-full px-10 mx-auto mb-5 bg-white py-3 font-bold">
                    <h1>Operator Create Achievement </h1>
                </div>
                <div className="py-5">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between">
                                    <div className=" mx-10 my-2">
                                        <InputLabel value="Customer Id" />
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
                                            message={errors.product_name}
                                        />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="customer_name"
                                            value={data.customer_name}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Drawing Number" />
                                        <InputError message={errors.drw_no} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="drw_no"
                                            value={data.drw_no}
                                            onChange={handleChange}
                                        />
                                        <div className="mx-10 my-2">
                                            <InputLabel value="Product Name" />
                                            <InputError
                                                message={errors.product_name}
                                            />
                                            <TextInput
                                                className="mb-5 block w-full "
                                                type="text"
                                                name="product_name"
                                                value={data.product_name}
                                                onChange={handleChange}
                                            />

                                            <InputLabel value="Product Type" />
                                            <InputError
                                                message={errors.product_type}
                                            />
                                            <TextInput
                                                className="mb-5 block w-full "
                                                type="text"
                                                name="product_type"
                                                value={data.product_type}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <ButtonGreen
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {submitting
                                                ? "Adding..."
                                                : "Add Product"}
                                        </ButtonGreen>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Authenticated>

            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customer_name">CUstomer Name</label>
                    <input
                        type="text"
                        name="customer_id"
                        value={data.customer_id}
                        onChange={handleChange}
                        className={errors.customer_id ? "border-red-500" : ""}
                    />
                    {errors.customer_id && (
                        <div className="text-red-500">{errors.customer_id}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="customer_name">CUstomer Name</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={data.customer_name}
                        onChange={handleChange}
                        className={errors.customer_name ? "border-red-500" : ""}
                    />
                    {errors.customer_name && (
                        <div className="text-red-500">
                            {errors.customer_name}
                        </div>
                    )}
                </div>
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
                        <div className="text-red-500">
                            {errors.product_name}
                        </div>
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
                        <div className="text-red-500">
                            {errors.product_type}
                        </div>
                    )}
                </div>

                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create"}
                    </button>
                </div>
            </form> */}
        </>
    );
}
