import React, { usedata, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ users, achievements, products, auth }) {
    console.log(products);
    const [selectedNpk, setSelectedNpk] = useState({
        value: achievements.user.npk,
        label: achievements.user.npk,
    });
    const [fullname, setFullname] = useState(achievements.user.fullname);
    const [group, setGroup] = useState(achievements.user.group);
    const [selectedDrwNo, setSelectedDrwNo] = useState({
        value: achievements.drw_no,
        label: achievements.drw_no + "  |  " + achievements.product.customer_id,
    });

    const [productName, setProductName] = useState(
        achievements.product.product_name
    );

    const { data, setData, post } = useForm({
        id: achievements.id,
        date: achievements.date,
        shift: achievements.shift,
        group: achievements.group,
        proses: achievements.proses,
        user_id: achievements.user_id,
        npk: achievements.npk,
        fullname: achievements.user.fullname,
        customer_id: achievements.customer_id,
        drw_no: achievements.drw_no,
        product_id: achievements.product_id,
        spring_lot: achievements.spring_lot,
        product_lot: achievements.product_lot,
        total_lot: achievements.total_lot,
        qty: achievements.qty,
        remarks: achievements.remarks,
    });

    ///////////////////////////
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const response = await fetch(`/api/users/${achievements.npk}`);
    //         const data = await response.json();
    //         setUser(data);
    //     };

    //     fetchUser();
    // }, [achievements.npk]);

    // ///////////////////////
    // useEffect(() => {
    //     setData(achievements);
    // }, [achievements]);

    const optionNpk = users.map((user) => ({
        value: user.npk,
        label: user.npk,
    }));
    const optionDrwNo = products?.map((product) => ({
        value: product.drw_no,
        label: product.drw_no + "  |  " + product.customer_id,
    }));

    const handleNpkChange = (selectedNpkOption) => {
        setSelectedNpk(selectedNpkOption);
        const user = users.find((u) => u.npk === selectedNpkOption.value);
        setFullname(user.fullname);
        setGroup(user.group);
        setData((data) => ({
            ...data,
            npk: selectedNpkOption.value,
            group: user.group,
        }));
    };

    // const handleNpkChange = (selectedNpkOption) => {
    //     setSelectedNpk(selectedNpkOption);
    //     const user = users.find((u) => u.npk === selectedNpkOption.value);
    //     setFullname(user.fullname);
    //     setGroup(user.group);
    //     setData((data) => ({
    //         ...data,
    //         npk: selectedNpkOption.value,
    //         group: user.group,
    //     }));
    // };

    const handleDrwNoChange = (selectedDrwNo) => {
        setSelectedDrwNo(selectedDrwNo);
        const product = products.find((p) => p.drw_no === selectedDrwNo.value);
        setProductName(product.product_name);
        setGroup(product.product_name);
        setData((data) => ({
            ...data,
            drw_no: selectedDrwNo.value,
            product_name: product.product_name,
        }));
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);

        if (key === "npk") {
            // Look up the corresponding fullname from the users array
            const user = users.find((user) => user.npk === value);
            const fullname = user ? user.fullname : "";
            const shift = user ? user.shift : "";
            const group = user ? user.group : "";
            setData((data) => ({
                ...data,
                npk: value,
                fullname,
                shift,
                group,
            }));
        } else if (key === "drw_no") {
            // Look up the corresponding product name from the products array
            const product = products.find(
                (product) => product.drw_no === value
            );
            const product_name = product ? product.product_name : "";
            const customer_id = product ? product.customer_id : "";
            setData((data) => ({
                ...data,
                drw_no: value,
                product_name,
                customer_id,
            }));
        } else {
            setData((data) => ({ ...data, [key]: value }));
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setdata({ ...data, [name]: value });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.achievement.update", achievements.id), {
            _method: "PUT",
            ...data,
        });
    };
    console.log(handleSubmit);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     Inertia.put(route("admin.achievement.update", achievements.id), data);
    // };

    return (
        <>
            <Head title="Edit Achievement" />
            <Authenticated className="bg-white">
                {/* <div className="flex container justify-start w-full px-10 mx-auto mb-5 bg-white py-3 font-bold">
                    <h1>Edit Achievement </h1>
                </div> */}
                <div className="py-5">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Edit Achievement </h1>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between">
                                    <div className=" mx-10 my-2">
                                        <InputLabel value="NPK" />

                                        <Select
                                            id="npk"
                                            onChange={handleNpkChange}
                                            option={optionNpk}
                                            value={selectedNpk}
                                            className="mb-5"
                                        />
                                        <TextInput
                                            className="hidden"
                                            type="text"
                                            id="npk"
                                            name="npk"
                                            value={data.npk}
                                            readOnly
                                        />

                                        {/* <select
                                            id="npk"
                                            name="npk"
                                            value={data.npk}
                                            onChange={handleChange}
                                            className="w-full mb-5 block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option className="" value="">
                                                -
                                            </option>
                                            {users?.map((user) => (
                                                <option
                                                    key={user.data.id}
                                                    value={user.data.npk}
                                                >
                                                    {user.data.npk}
                                                </option>
                                            ))}
                                        </select> */}
                                        {/* <select
                                            id="npk"
                                            name="npk"
                                            value={data.npk}
                                            onChange={handleChange}
                                            className="w-full mb-5 block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option
                                                className=""
                                                value={data.npk}
                                            ></option>
                                        </select> */}

                                        <InputLabel value="Name" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={fullname}
                                            readOnly
                                        />

                                        <InputLabel value="Date" />
                                        <TextInput
                                            type="date"
                                            className="mb-5 block w-full"
                                            value={data.date}
                                            onChange={handleChange}
                                        />

                                        <div class="flex gap-4">
                                            <div class="mb-5">
                                                <InputLabel value="Shift" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="shift"
                                                    value={data.shift}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div class="mb-5">
                                                <InputLabel value="Group" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="group"
                                                    value={group}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <InputLabel value="Drawing Number" />
                                        <Select
                                            options={optionDrwNo}
                                            value={selectedDrwNo}
                                            onChange={handleDrwNoChange}
                                            className="mb-5"
                                        />

                                        <TextInput
                                            className="hidden"
                                            type="text"
                                            id="drw_no"
                                            name="drw_no"
                                            value={data.drw_no}
                                            readOnly
                                        />
                                        {/* <TextInput className="mb-5 block w-full" /> */}
                                    </div>

                                    <div className="mx-10 my-2">
                                        <InputLabel value="Product Name" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            name="product_id"
                                            value={productName}
                                            onChange={(e) =>
                                                setProductName(e.target.value)
                                            }
                                        />

                                        <div class="flex gap-4">
                                            <div class="mb-5">
                                                <InputLabel value="Spring Lot No" />

                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="spring_lot"
                                                    value={data.spring_lot}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div class="mb-5">
                                                <InputLabel value="Product Lot No" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="product_lot"
                                                    value={data.product_lot}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div class="flex gap-4">
                                            <div class="mb-5">
                                                <InputLabel value="Total Lot" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="total_lot"
                                                    value={data.total_lot}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div class="mb-5">
                                                <InputLabel value="Qty(pcs)" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="qty"
                                                    value={data.qty}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <InputLabel value="Remaks" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            name="remarks"
                                            value={data.remarks}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mx-10 my-2">
                                    <ButtonGreen type="submit">
                                        Update
                                    </ButtonGreen>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Authenticated>

            {/* 
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="shift">Shift:</label>
                    <input
                        type="text"
                        id="shift"
                        name="shift"
                        value={data.shift}
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
                    <label htmlFor="proses">Proses:</label>
                    <input
                        type="text"
                        id="proses"
                        name="proses"
                        value={data.proses}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="user_id">User ID:</label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={data.user_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_id">User Product:</label>
                    <input
                        type="text"
                        id="product_id"
                        name="product_id"
                        value={data.product_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="spring_lot">Spring Lot:</label>
                    <input
                        type="text"
                        id="spring_lot"
                        name="spring_lot"
                        value={data.spring_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_lot">Product Lot:</label>
                    <input
                        type="text"
                        id="product_lot"
                        name="product_lot"
                        value={data.product_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="total_lot">Total Lot:</label>
                    <input
                        type="text"
                        id="total_lot"
                        name="total_lot"
                        value={data.total_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="qty">Qty:</label>
                    <input
                        type="text"
                        id="qty"
                        name="qty"
                        value={data.qty}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="remarks">Remarks:</label>
                    <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        value={data.remarks}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update</button>
            </form> */}
        </>
    );
}
