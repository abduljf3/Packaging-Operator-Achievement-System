import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { Link, Head, useForm } from "@inertiajs/react";
import { set } from "lodash";

export default function Edit({ products, auth }) {
    const [selectedProductType, setSelectedProductType] = useState({
        value: products.product_type,
        label: products.product_type,
    });
    const [selectedCustomerName, setSelectedCustomerName] = useState({
        value: products.customer_name,
        label: products.customer_name,
    });

    const [state, setState] = useState({
        id: products.id,
        customer_id: products.customer_id,
        customer_name: products.customer_name,
        drw_no: products.drw_no,
        product_name: products.product_name,
        product_type: products.product_type,
        target: products.target,
    });

    useEffect(() => {
        setState(products);
    }, [products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

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

    const handleChangeProductType = (selectedOption) => {
        setSelectedProductType(selectedOption);
        setState((prevState) => ({
            ...prevState,
            product_type: selectedOption.value,
        }));
    };

    const handleChangeCustomerName = (selectedOption) => {
        setSelectedCustomerName(selectedOption);
        setState((prevState) => ({
            ...prevState,
            customer_name: selectedOption.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = route("admin.products.index");
        window.location.href = url;
        Inertia.put(`/admin/products/${state.id}`, state);
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
                                        <InputLabel value="Customer Id" />

                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="customer_id"
                                            value={state.customer_id}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Customer Name" />

                                        <Select
                                            className="mb-5 block w-full "
                                            options={OptionCustomerName}
                                            value={selectedCustomerName}
                                            onChange={handleChangeCustomerName}
                                        />
                                        <InputLabel value="Drawing Number" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="drw_no"
                                            value={state.drw_no}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mx-10 my-2">
                                        <InputLabel value="Product Name" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="product_name"
                                            value={state.product_name}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Product Type" />
                                        <Select
                                            className="mb-5 block w-full "
                                            options={optionProductType}
                                            value={selectedProductType}
                                            onChange={handleChangeProductType}
                                        />
                                        {/* <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="product_type"
                                            value={state.product_type}
                                            onChange={handleChange}
                                        /> */}

                                        <InputLabel value="Target" />

                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="target"
                                            value={state.target}
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

            {/* <Nav roles={auth.roles} />

            <h1>Edit Product</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customer_id">customer_id:</label>
                    <input
                        type="text"
                        id="customer_id"
                        name="customer_id"
                        value={state.customer_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="customer_name">customer_name:</label>
                    <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        value={state.customer_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="drw_no">drw_no:</label>
                    <input
                        type="text"
                        id="drw_no"
                        name="drw_no"
                        value={state.drw_no}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_name">product_name:</label>
                    <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        value={state.product_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_type">product_type:</label>
                    <input
                        type="text"
                        id="product_type"
                        name="product_type"
                        value={state.product_type}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update</button>
            </form> */}
        </>
    );
}
