import React, { useState } from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ customers }) {
    const { data, setData, post, errors } = useForm({
        id: "",
        customer_id: "",
        customer_name: "",
        drw_no: "",
        product_name: "",
        target: "",
        product_type: "",
    });

    const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const [customerCode, setCustomerCode] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const optionProductType = [
        { value: "Joint Carburator", label: "Joint Carburator" },
        { value: "Oil Level Gauge", label: "Oil Level Gauge" },
        { value: "O-Ring", label: "O-Ring" },
        { value: "Oil Seals", label: "Oil Seals" },
        { value: "Rubber Part", label: "Rubber Part" },
    ];

    const optionCustomerName = customers.map((customer) => ({
        value: customer.customer_name,
        label: customer.customer_name,
    }));

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
        setSelectedCustomerName(selectedOption);
        const customer = customers.find(
            (u) => u.customer_name === selectedOption.value
        );
        setCustomerCode(customer.customer_id);
        setData((data) => ({
            ...data,
            customer_name: selectedOption.value,
            customer_id: customer.customer_id,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                                    <div className="mx-10 my-2">
                                        <InputLabel value="Customer Name" />
                                        <InputError
                                            message={errors.customer_name}
                                        />
                                        <Select
                                            className="mb-5 block w-full absolute"
                                            options={optionCustomerName}
                                            onChange={
                                                handleChangeOptionCustomerName
                                            }
                                            value={selectedCustomerName}
                                        />
                                        <InputLabel value="Customer Code" />
                                        <InputError
                                            message={errors.customer_id}
                                        />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="customer_id"
                                            value={customerCode}
                                            onChange={(e) =>
                                                setCustomerCode(e.target.value)
                                            }
                                        />
                                        <InputLabel value="Drawing Number" />
                                        <InputError message={errors.drw_no} />
                                        <TextInput
                                            className="mb-5 block w-full"
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
                                            className="mb-5 block w-full"
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
                                        <InputLabel value="Target" />
                                        <TextInput
                                            className="mb-5 block w-full"
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
