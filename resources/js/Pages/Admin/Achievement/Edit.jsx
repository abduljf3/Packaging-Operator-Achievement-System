import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

export default function Edit({ achievements, auth }) {
    const [state, setState] = useState({
        id: achievements.id,
        date: achievements.date,
        shift: achievements.shift,
        group: achievements.group,
        proses: achievements.proses,
        user_id: achievements.user_id,
        npk: achievements.npk,
        product_id: achievements.product_id,
        spring_lot: achievements.spring_lot,
        product_lot: achievements.product_lot,
        total_lot: achievements.total_lot,
        qty: achievements.qty,
        remarks: achievements.remarks,
    });

    useEffect(() => {
        setState(achievements);
    }, [achievements]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/operator/operatorachievement/${state.id}`, state)
            .then(() => {
                // Redirect to the operator list
                Inertia.visit("/operator/operatorachievement");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <h1>Edit Product\</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={state.date}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="shift">Shift:</label>
                    <input
                        type="text"
                        id="shift"
                        name="shift"
                        value={state.shift}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="group">Group:</label>
                    <input
                        type="text"
                        id="group"
                        name="group"
                        value={state.group}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="proses">Proses:</label>
                    <input
                        type="text"
                        id="proses"
                        name="proses"
                        value={state.proses}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="user_id">User ID:</label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={state.user_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_id">User Product:</label>
                    <input
                        type="text"
                        id="product_id"
                        name="product_id"
                        value={state.product_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="spring_lot">Spring Lot:</label>
                    <input
                        type="text"
                        id="spring_lot"
                        name="spring_lot"
                        value={state.spring_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="product_lot">Product Lot:</label>
                    <input
                        type="text"
                        id="product_lot"
                        name="product_lot"
                        value={state.product_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="total_lot">Total Lot:</label>
                    <input
                        type="text"
                        id="total_lot"
                        name="total_lot"
                        value={state.total_lot}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="qty">Qty:</label>
                    <input
                        type="text"
                        id="qty"
                        name="qty"
                        value={state.qty}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="remarks">Remarks:</label>
                    <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        value={state.remarks}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update</button>
            </form>
        </>
        // <>
        //     <Authenticated className="bg-white">
        //         <div className="flex container justify-start w-full px-10 mx-auto mb-5 bg-white py-3 font-bold">
        //             <h1>Edit Operator Achievement </h1>
        //         </div>
        //         <div className="py-5">
        //             <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
        //                 <div className="p-4 sm:p-8 bg-gray-100 shadow sm:rounded-lg">
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="flex justify-between">
        //                             <div className=" mx-10 my-2">
        //                                 <InputLabel value="NPK" />
        //                                 <select
        //                                     id="npk"
        //                                     name="npk"
        //                                     value={state.npk}
        //                                     onChange={handleChange}
        //                                     className="w-full mb-5 block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        //                                 >
        //                                     <option className="" value="">
        //                                         -
        //                                     </option>
        //                                     {users.map((user) => (
        //                                         <option
        //                                             key={user.id}
        //                                             value={user.npk}
        //                                         >
        //                                             {user.npk}
        //                                         </option>
        //                                     ))}
        //                                 </select>

        //                                 <InputLabel value="Name" />
        //                                 <TextInput
        //                                     className="mb-5 block w-full"
        //                                     type="text"
        //                                     id="fullname"
        //                                     name="fullname"
        //                                     value={state.fullname}
        //                                     readOnly
        //                                 />
        //                                 <InputError message={errors.fullname} />

        //                                 <InputLabel value="Date" />
        //                                 <TextInput
        //                                     type="date"
        //                                     className="mb-5 block w-full"
        //                                     value={state.date}
        //                                     onChange={handleChange}
        //                                     disabled="true"
        //                                 />
        //                                 <InputError message={errors.date} />

        //                                 <div class="flex gap-4">
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Shift" />
        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="shift"
        //                                             value={state.shift}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.shift}
        //                                         />
        //                                     </div>
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Group" />
        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="group"
        //                                             value={state.group}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.group}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <InputLabel value="Drawing Number" />
        //                                 <select
        //                                     id="drw_no"
        //                                     name="drw_no"
        //                                     value={state.drw_no}
        //                                     onChange={handleChange}
        //                                     className="w-1/2 mb-5 block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        //                                 >
        //                                     <option value="">-</option>
        //                                     {products.map((product) => (
        //                                         <option
        //                                             key={product.id}
        //                                             value={product.drw_no}
        //                                         >
        //                                             {product.drw_no}
        //                                         </option>
        //                                     ))}
        //                                 </select>
        //                                 {/* <TextInput className="mb-5 block w-full" /> */}
        //                             </div>

        //                             <div className="mx-10 my-2">
        //                                 <InputLabel value="Product Name" />
        //                                 <TextInput
        //                                     className="mb-5 block w-full"
        //                                     type="text"
        //                                     name="product_id"
        //                                     value={state.product_name}
        //                                 />
        //                                 <InputError
        //                                     message={errors.product_name}
        //                                 />
        //                                 <div class="flex gap-4">
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Spring Lot No" />

        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="spring_lot"
        //                                             value={state.spring_lot}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.spring_lot}
        //                                         />
        //                                     </div>
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Product Lot No" />
        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="product_lot"
        //                                             value={state.product_lot}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.product_lot}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div class="flex gap-4">
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Total Lot" />
        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="total_lot"
        //                                             value={state.total_lot}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.total_lot}
        //                                         />
        //                                     </div>
        //                                     <div class="mb-5">
        //                                         <InputLabel value="Qty(pcs)" />
        //                                         <TextInput
        //                                             className=""
        //                                             type="text"
        //                                             name="qty"
        //                                             value={state.qty}
        //                                             onChange={handleChange}
        //                                         />
        //                                         <InputError
        //                                             message={errors.qty}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <InputLabel value="Remaks" />
        //                                 <TextInput
        //                                     className="mb-5 block w-full"
        //                                     type="text"
        //                                     name="remarks"
        //                                     value={state.remarks}
        //                                     onChange={handleChange}
        //                                 />
        //                                 <InputError message={errors.remarks} />

        //                                 <InputLabel value="Customer Id" />
        //                                 <TextInput
        //                                     className="mb-5 block"
        //                                     id="customer_id"
        //                                     name="customer_id"
        //                                     value={state.customer_id}
        //                                 />
        //                                 <InputLabel value="Proses" />
        //                                 <TextInput
        //                                     className="mb-5 w-full block"
        //                                     type="text"
        //                                     name="proses"
        //                                     value={state.proses}
        //                                     onChange={handleChange}
        //                                 />
        //                                 <InputError message={errors.proses} />

        //                                 <InputLabel value="Product Id" />
        //                                 <TextInput
        //                                     className="mb-5 w-full block"
        //                                     type="text"
        //                                     name="product_id"
        //                                     value={state.product_id}
        //                                     onChange={handleChange}
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className="flex justify-end gap-4 mx-10 my-2">
        //                             <ButtonGreen type="submit">
        //                                 Updade
        //                             </ButtonGreen>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </Authenticated>
        // </>
    );
}
