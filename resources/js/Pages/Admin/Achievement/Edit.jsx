import React, { usedata, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

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
    const [shift, setShift] = useState({
        value: achievements.shift,
        label: achievements.shift,
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

    const optionShift = Array.isArray(achievements)
        ? achievements.map((achievement) => ({
              value: achievement.shift,
              label: achievement.shift,
          }))
        : [];
    const handleShiftChange = (selectedShift) => {
        setShift(selectedShift);
        setData((data) => ({
            ...data,
            shift: selectedShift.value,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
        });
        router.post(route("admin.achievement.update", achievements.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <>
            <Head title="Edit Achievement" />
            <Authenticated className="bg-white">
                <div className="py-5 bg-gray-100">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold pl-10">
                                <h1>Edit Achievement</h1>
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
                                            menuPlacement="auto"
                                            menuPosition="absolute"
                                        />

                                        <TextInput
                                            className="hidden"
                                            type="text"
                                            id="npk"
                                            name="npk"
                                            value={data.npk}
                                            readOnly
                                        />
                                        <InputLabel value="Name" />
                                        <TextInput
                                            className="mb-5 block bg-gray-100 w-full"
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={fullname}
                                            readOnly
                                            disabled={true}
                                        />

                                        <InputLabel value="Date" />
                                        <TextInput
                                            type="date"
                                            className="mb-5 block w-full"
                                            value={data.date}
                                            onChange={handleChange}
                                            disabled={true}
                                        />

                                        <div className="flex gap-4">
                                            <div className="mb-5 w-auto">
                                                <InputLabel value="Shift" />
                                                <Select
                                                    className="mb-5"
                                                    value={shift}
                                                    options={optionShift}
                                                    onChange={handleShiftChange}
                                                />
                                            </div>
                                            <div className="mb-5">
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
                                    </div>
                                    <div className="mx-10 my-2">
                                        <div className="flex gap-4">
                                            <div className="mb-5">
                                                <InputLabel value="Drawing Number" />
                                                <Select
                                                    options={optionDrwNo}
                                                    value={selectedDrwNo}
                                                    onChange={handleDrwNoChange}
                                                    className=""
                                                />
                                                <TextInput
                                                    className="hidden"
                                                    type="text"
                                                    id="drw_no"
                                                    name="drw_no"
                                                    value={data.drw_no}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="">
                                                <InputLabel value="Product Name" />
                                                <TextInput
                                                    className="mb-5 block w-full"
                                                    type="text"
                                                    name="product_id"
                                                    value={productName}
                                                    onChange={(e) =>
                                                        setProductName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="mb-5">
                                                <InputLabel value="Spring Lot No" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="spring_lot"
                                                    value={data.spring_lot}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-5">
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
                                        <div className="flex gap-4">
                                            <div className="mb-5">
                                                <InputLabel value="Total Lot" />
                                                <TextInput
                                                    className=""
                                                    type="text"
                                                    name="total_lot"
                                                    value={data.total_lot}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-5">
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
                                        <InputLabel value="Remarks" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            name="remarks"
                                            value={data.remarks}
                                            onChange={handleChange}
                                        />

                                        <div className="flex justify-end gap-4  pt-5">
                                            <ButtonGreen type="submit">
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
