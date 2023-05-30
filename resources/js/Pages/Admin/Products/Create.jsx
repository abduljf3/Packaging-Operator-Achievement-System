import React from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { useState } from "react";
import { Link, Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        id: "",
        customer_id: "",
        customer_name: "",
        drw_no: "",
        product_name: "",
        target: "",
        product_type: "",
    });

    const optionProductType = [
        { value: "Joint Carburator", label: "Joint Carburator" },
        { value: "Oil Level Gauge", label: "Oil Level Gauge" },
        { value: "O-Ring", label: "O-Ring" },
        { value: "Oil Seals", label: "Oil Seals" },
        { value: "Rubber Part", label: "Rubber Part" },
    ];

    const OptionCustomerName = [
        { value: "Astra Honda Motor", label: "Astra Honda Motor" },
        {
            value: "Yamaha Indonesia Motor Manufacturing",
            label: "Yamaha Indonesia Motor Manufacturing",
        },
        {
            value: "Suzuki Indomobil Motor",
            label: "Suzuki Indomobil Motor",
        },
        {
            value: "Kawasaki Motor Indonesia",
            label: "Kawasaki Motor Indonesia",
        },
        {
            value: "TVS Motor Company Indonesia",
            label: "TVS Motor Company Indonesia",
        },
        {
            value: "Kymco Motor Indonesia",
            label: "Kymco Motor Indonesia",
        },
        {
            value: "Suzuki Indomobil Sales",
            label: "Suzuki Indomobil Sales",
        },
    ];
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
        setSubmitting(true);
        const url = route("admin.products.index");
        window.location.href = url;
        await post("/admin/products", {
            data,
            preserveScroll: true,
        });
        setSubmitting(false);
    };

    return (
        <>
            <Head title="Add Product" />
            <Authenticated className="bg-white">
                <div className="py-5 mx-20">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 mx-20 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Add Product</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
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
                                        <Select
                                            className="mb-5 block w-full absolute"
                                            options={OptionCustomerName}
                                            onChange={
                                                handleChangeOptionCustomerName
                                            }
                                            value={OptionCustomerName.find(
                                                (option) =>
                                                    option.value ===
                                                    data.customer_name
                                            )}
                                        />
                                        {/* <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="customer_name"
                                            value={data.customer_name}
                                            onChange={handleChange}
                                        /> */}
                                        <InputLabel value="Drawing Number" />
                                        <InputError message={errors.drw_no} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="drw_no"
                                            value={data.drw_no}
                                            onChange={handleChange}
                                        />
                                    </div>
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
                                        <Select
                                            className="mb-5 block w-full absolute"
                                            name="product_type"
                                            options={optionProductType}
                                            value={optionProductType.find(
                                                (option) =>
                                                    option.value ===
                                                    data.product_type
                                            )}
                                            onChange={handleChangeOption}
                                        />
                                        {/* <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="product_type"
                                            value={data.product_type}
                                            onChange={handleChange}
                                        />{" "} */}
                                        <InputLabel value="Target" />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="target"
                                            value={data.target}
                                            onChange={handleChange}
                                        />
                                        <div className="flex justify-center mt-6">
                                            <ButtonGreen
                                                type="submit"
                                                disabled={submitting}
                                                className=""
                                            >
                                                {submitting
                                                    ? "Adding..."
                                                    : "Add Product"}
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
