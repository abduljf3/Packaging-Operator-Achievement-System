import React from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import moment from "moment";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useState, useEffect } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function CreateAchievement({ users, products, massage, props }) {
    const [selectedNpk, setSelectedNpk] = useState();
    const [fullname, setFullname] = useState("");
    const [group, setGroup] = useState("");
    const [selectedDrwNo, setSelectedDrwNo] = useState("");
    const [productName, setProductName] = useState("");
    const [currentHour, setCurrentHour] = useState(moment().hour());
    const [selectedShift, setSelectedShift] = useState("");
    const [formError, SetFormError] = useState(false);

    const { data, setData, post, errors } = useForm({
        shift: "",
        group: "",
        npk: "",
        date: moment().format("YYYY-MM-DDTHH:mm"),
        drw_no: "",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
        remarks: "",
    });

    const optionShift = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
    ];

    useEffect(() => {
        const currentHour = moment().hour();
        if (currentHour >= 6 && currentHour < 14) {
            setSelectedShift({ value: "1", label: "1" });
        } else if (currentHour >= 14 && currentHour < 22) {
            setSelectedShift({ value: "2", label: "2" });
        } else {
            setSelectedShift({ value: "3", label: "3" });
        }
    }, []);

    const handleReset = () => {
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

    const handleOptionChange = (e) => {
        setData((data) => ({ ...data, shift: e.value }));
        setSelectedShift(e);
    };
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
            data.qty === ""
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
                        <div className="mb-6 font-extrabold pl-10">
                            <h1>Create Achievement</h1>
                        </div>
                        {formError && (
                            <div className="text-red-500 mb-2">
                                Isi semua form achievement terlebih dahulu
                            </div>
                        )}
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
                                        menuPlacement="auto"
                                        menuPosition="absolute"
                                    />
                                    <InputError message={errors.npk} />
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
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                        name="fullname"
                                        value={fullname}
                                        readOnly
                                        disabled={true}
                                    />
                                    <InputError message={errors.fullname} />
                                    <InputLabel value="Date & Time" />
                                    <TextInput
                                        type="text"
                                        className="mb-5 block w-full bg-gray-100"
                                        value={moment(data.date).format(
                                            "YYYY-MM-DD HH:mm"
                                        )}
                                        onChange={handleChange}
                                        disabled={true}
                                    />
                                    <InputError message={errors.date} />
                                    <div className="flex gap-4">
                                        <div className="mb-5 w-auto">
                                            <InputLabel value="Shift" />
                                            <Select
                                                className="mb-5 block w-full"
                                                options={optionShift}
                                                value={
                                                    (optionShift.find(
                                                        (option) =>
                                                            option.value ===
                                                            data.shift
                                                    ),
                                                    selectedShift)
                                                }
                                                onChange={handleOptionChange}
                                                menuPlacement="auto"
                                                menuPosition="absolute"
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
                                                className="block w-full bg-gray-100"
                                                type="text"
                                                name="product_id"
                                                value={productName}
                                                onChange={(e) =>
                                                    setProductName(
                                                        e.target.value
                                                    )
                                                }
                                                readOnly
                                            />
                                            <InputError
                                                message={errors.product_name}
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
                                    <div className="flex justify-end gap-4  pt-5">
                                    {/* <Link href={route('operator')} 
                                        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-800"
                                        >Cancel</Link> */}
                                          <Link
                                                href={route(
                                                    "achievementCreate"
                                                )}
                                                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
                                                >
                                                Cancel 
                                            </Link>
                                        <ButtonGreen onClick={handleClick}>
                                            Save
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
