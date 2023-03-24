import React from "react";
import ButtonRed from "@/Components/ButtonRed";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import OperatorLayout from "@/Layouts/OperatorLayout";
import Modal from "@/Components/Modal";
import { useState } from "react";

import { Link, Head, useForm } from "@inertiajs/react";

export default function Create(props) {
    const { data, setData, post, errors } = useForm({
        shift: "",
        group: "",
        proses: "",
        user_id: "",
        product_id: "",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
        remarks: "",
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
        await post("/operator/operatorachievement", {
            data,
            preserveScroll: true,
        });
        setSubmitting(false);
    };

    return (
        <>
            <Head title="Achievement" />
            <OperatorLayout>
                <div className="py-5">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form
                                className="flex justify-between"
                                onSubmit={handleSubmit}
                            >
                                <div className=" mx-10 my-2">
                                    <InputLabel value="NPK" />
                                    <TextInput className="mb-5 block w-full " />
                                    <InputLabel value="Nama" />
                                    <TextInput
                                        className="mb-5 block w-full"
                                        type="text"
                                        name="user_id"
                                        value={data.user_id}
                                        onChange={handleChange}
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
                                                value={data.group}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <InputLabel value="Drawing Number" />
                                    <TextInput className="mb-5 block w-full" />
                                </div>
                                <div className="mx-10 my-2">
                                    <InputLabel value="Product Name" />
                                    <TextInput
                                        className="mb-5 block w-full"
                                        type="text"
                                        name="product_id"
                                        value={data.product_id}
                                        onChange={handleChange}
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
                                                name="spring_lot"
                                                value={data.spring_lot}
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
                                    <InputLabel value="Customer Id" />
                                    <TextInput className="mb-5 block" />
                                </div>
                            </form>
                            <div className="flex justify-end gap-4 mx-10 my-2">
                                <ButtonRed>Cancel</ButtonRed>
                                <ButtonGreen>Save</ButtonGreen>
                            </div>
                        </div>
                    </div>
                </div>
            </OperatorLayout>
        </>
    );
}

// import Nav from "@/Components/Nav";
// import { Link, useForm } from "@inertiajs/react";
// import { useState } from "react";

// export default function Create({ auth }) {
//     const { data, setData, post, errors } = useForm({
//         shift: "",
//         group: "",
//         proses: "",
//         user_id: "",
//         product_id: "",
//         spring_lot: "",
//         product_lot: "",
//         total_lot: "",
//         qty: "",
//         remarks: "",
//     });

//     const [submitting, setSubmitting] = useState(false);

//     const handleChange = (e) => {
//         const key = e.target.name;
//         const value = e.target.value;
//         setData((data) => ({ ...data, [key]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);
//         await post("/operator/operatorachievement", {
//             data,
//             preserveScroll: true,
//         });
//         setSubmitting(false);
//     };

//     return (
//         <>
//             <Nav roles={auth.roles} />

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="date">Date</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={data.date}
//                         onChange={handleChange}
//                         className={errors.date ? "border-red-500" : ""}
//                     />
//                     {errors.date && (
//                         <div className="text-red-500">{errors.date}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="shift">Shift</label>
//                     <input
//                         type="text"
//                         name="shift"
//                         value={data.shift}
//                         onChange={handleChange}
//                         className={errors.shift ? "border-red-500" : ""}
//                     />
//                     {errors.shift && (
//                         <div className="text-red-500">{errors.shift}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="group">Group</label>
//                     <input
//                         type="text"
//                         name="group"
//                         value={data.group}
//                         onChange={handleChange}
//                         className={errors.group ? "border-red-500" : ""}
//                     />
//                     {errors.group && (
//                         <div className="text-red-500">{errors.group}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="proses">Proses</label>
//                     <input
//                         type="text"
//                         name="proses"
//                         value={data.proses}
//                         onChange={handleChange}
//                         className={errors.proses ? "border-red-500" : ""}
//                     />
//                     {errors.proses && (
//                         <div className="text-red-500">{errors.proses}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="user_id">User Id</label>
//                     <input
//                         type="text"
//                         name="user_id"
//                         value={data.user_id}
//                         onChange={handleChange}
//                         className={errors.user_id ? "border-red-500" : ""}
//                     />
//                     {errors.user_id && (
//                         <div className="text-red-500">{errors.user_id}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="product_id">product_id</label>
//                     <input
//                         type="text"
//                         name="product_id"
//                         value={data.product_id}
//                         onChange={handleChange}
//                         className={errors.product_id ? "border-red-500" : ""}
//                     />
//                     {errors.product_id && (
//                         <div className="text-red-500">{errors.product_id}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="spring_lot">Spring Lot</label>
//                     <input
//                         type="text"
//                         name="spring_lot"
//                         value={data.spring_lot}
//                         onChange={handleChange}
//                         className={errors.spring_lot ? "border-red-500" : ""}
//                     />
//                     {errors.spring_lot && (
//                         <div className="text-red-500">{errors.spring_lot}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="product_lot">Product Lot</label>
//                     <input
//                         type="text"
//                         name="product_lot"
//                         value={data.product_lot}
//                         onChange={handleChange}
//                         className={errors.product_lot ? "border-red-500" : ""}
//                     />
//                     {errors.product_lot && (
//                         <div className="text-red-500">{errors.product_lot}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="total_lot">Total Lot</label>
//                     <input
//                         type="text"
//                         name="total_lot"
//                         value={data.total_lot}
//                         onChange={handleChange}
//                         className={errors.total_lot ? "border-red-500" : ""}
//                     />
//                     {errors.total_lot && (
//                         <div className="text-red-500">{errors.total_lot}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="qty">QTY</label>
//                     <input
//                         type="text"
//                         name="qty"
//                         value={data.qty}
//                         onChange={handleChange}
//                         className={errors.qty ? "border-red-500" : ""}
//                     />
//                     {errors.qty && (
//                         <div className="text-red-500">{errors.qty}</div>
//                     )}
//                 </div>

//                 <div>
//                     <label htmlFor="remarks">Remarks</label>
//                     <input
//                         type="text"
//                         name="remarks"
//                         value={data.remarks}
//                         onChange={handleChange}
//                         className={errors.remarks ? "border-red-500" : ""}
//                     />
//                     {errors.remarks && (
//                         <div className="text-red-500">{errors.remarks}</div>
//                     )}
//                 </div>
//                 <div>
//                     <button type="submit" disabled={submitting}>
//                         {submitting ? "Creating..." : "Create"}
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// }
