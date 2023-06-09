import React from "react";
import ButtonRed from "@/Components/ButtonRed";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import OperatorLayout from "@/Layouts/OperatorLayout";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function CreateAchievement({ users, products, massage, props }) {
    const [selectedNpk, setSelectedNpk] = useState();
    const [fullname, setFullname] = useState("");
    const [group, setGroup] = useState("");
    const [selectedDrwNo, setSelectedDrwNo] = useState("");
    const [productName, setProductName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, SetFormError] = useState(false);
    const [date, setDate] = useState();

    const { data, setData, post, errors } = useForm({
        shift: "",
        group: "",
        npk: "",
        date: new Date().toISOString().slice(0, 10),
        drw_no: "",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
        remarks: "",
    });

    const handleClick1 = () => {
        window.location.reload();
    };

    const handleClick = () => {
        Swal.fire({
            icon: "success",
            title: "Sukses!",
            text: "Achievement Berhasil Ditambahkan",
            showConfirmButton: false,
        });
    };
    const optionNpk = users.map((user) => ({
        value: user.npk,
        label: user.npk,
    }));
    const optionDrwNo = products.map((product) => ({
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
        setData((data) => ({
            ...data,
            drw_no: selectedDrwNo.value,
        }));
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            data.shift === "" ||
            data.group === "" ||
            data.npk === "" ||
            data.date === "" ||
            data.drw_no === "" ||
            data.spring_lot === "" ||
            data.product_lot === "" ||
            data.total_lot === "" ||
            data.qty === "" ||
            data.remarks === ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Isi semua form achievement terlebih dahulu",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            const url = route("achievementCreate");
            window.location.href = url;
            post(route("achievementStore"), data);
        }
    };

    return (
        <>
            <Head title="Achievement" />
            <Navbar roles="login" />
            <div className="py-5 bg-gray-100">
                <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="mb-6 font-extrabold">
                            <h1>Create Achievement</h1>
                        </div>
                        {formError && (
                            <div className="text-red-500 mb-2">
                                Isi semua form achievement terlebih dahulu
                            </div>
                        )}
                        {/* {flashMessage?.message && (
                                <FlashMessage message={flashMesage.message} />
                            )} */}

                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between">
                                <div className=" mx-10 my-2">
                                    <InputLabel value="NPK" />

                                    <Select
                                        id="npk"
                                        value={selectedNpk}
                                        onChange={handleNpkChange}
                                        options={optionNpk}
                                        className="mb-5"
                                    />
                                    <InputError message={errors.npk} />

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
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.npk}
                                                >
                                                    {user.npk}
                                                </option>
                                            ))}
                                        </select> */}
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
                                        className="mb-5 block w-full"
                                        type="text"
                                        id="fullname"
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                        name="fullname"
                                        value={fullname}
                                        readOnly
                                    />
                                    <InputError message={errors.fullname} />

                                    <InputLabel value="Date" />
                                    <TextInput
                                        type="date"
                                        className="mb-5 block w-full"
                                        value={data.date}
                                        onChange={handleChange}
                                        disabled={true}
                                    />
                                    <InputError message={errors.date} />

                                    <div className="flex gap-4">
                                        <div className="mb-5">
                                            <InputLabel value="Shift" />
                                            <TextInput
                                                className=""
                                                type="text"
                                                name="shift"
                                                value={data.shift}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message={errors.shift}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel value="Group" />
                                            <TextInput
                                                className=""
                                                type="text"
                                                name="group"
                                                value={group}
                                                onChange={(e) =>
                                                    setGroup(e.target.value)
                                                }
                                            />
                                            <InputError
                                                message={errors.group}
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

                                    {/* <select
                                            id="drw_no"
                                            name="drw_no"
                                            value={data.drw_no}
                                            onChange={handleChange}
                                            className="w-1/2 mb-5 block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option value="">-</option>
                                            {products.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.drw_no}
                                                >
                                                    {product.drw_no} |{" "}
                                                    {product.customer_id}
                                                </option>
                                            ))}
                                        </select> */}
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
                                    <InputError message={errors.product_name} />
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
                                            <InputError
                                                message={errors.spring_lot}
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
                                            <InputError
                                                message={errors.product_lot}
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
                                            <InputError
                                                message={errors.total_lot}
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
                                            <InputError message={errors.qty} />
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
                                    <InputError message={errors.remarks} />

                                    {/* <InputLabel value="Customer Id" />
                                        <TextInput
                                            className="mb-5 block"
                                            id="customer_id"
                                            name="customer_id"
                                            value={data.customer_id}
                                        />
                                        <InputLabel value="Proses" />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="proses"
                                            value={data.proses}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.proses} />

                                        <InputLabel value="Product Id" />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="product_id"
                                            value={data.product_id}
                                            onChange={handleChange}
                                        /> */}

                                    <div className="flex justify-end gap-4  pt-5">
                                        {/* <ButtonGreen
                                        // disabled={submitting}
                                        onclick="handleClick"
                                    >
                                        save
                                    </ButtonGreen> */}
                                        <ButtonRed
                                            onClick={handleClick1}
                                            disabled={submitting}
                                        >
                                            Reset
                                        </ButtonRed>
                                        <ButtonGreen onClick={handleClick}>
                                            save
                                        </ButtonGreen>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
