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

export default function CreateAchievement({ users, products }) {
    const { data, setData, post, errors } = useForm({
        shift: "",
        group: "",
        proses: "",
        npk: "",
        date: new Date().toISOString().slice(0, 10),
        product_id: "",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
        remarks: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [date, setDate] = useState();
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

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
        post(route("achievementStore"), data);
    };

    return (
        <>
            <Head title="Achievement" />
            <OperatorLayout>
                <div className="flex container justify-start w-full px-10 mx-auto mb-5 bg-white py-3 font-bold">
                    <h1>Halaman Operator Create Achievement </h1>
                </div>
                <div className="py-5">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between">
                                    <div className=" mx-10 my-2">
                                        <InputLabel value="NPK" />
                                        <select
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
                                        </select>

                                        {/* <Dropdown>
                                        <Dropdown.Trigger>
                                            <TextInput
                                                className="w-full mb-5 block"
                                                placeholder="Pilih Id NPK"
                                                id="npk"
                                                name="npk"
                                                value={data.npk}
                                                onChange={handleChange}
                                                // disabled="false"
                                            />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {users.map((user) => (
                                                <Dropdown.Link
                                                    key={user.id}
                                                    value={user.npk}
                                                >
                                                    {user.npk}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown> */}

                                        <InputLabel value="Name" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={data.fullname}
                                            readOnly
                                        />
                                        <InputError message={errors.fullname} />

                                        <InputLabel value="Date" />
                                        <TextInput
                                            type="date"
                                            className="mb-5 block w-full"
                                            value={data.date}
                                            onChange={handleChange}
                                            disabled="true"
                                        />
                                        <InputError message={errors.date} />

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
                                                <InputError
                                                    message={errors.shift}
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
                                                <InputError
                                                    message={errors.group}
                                                />
                                            </div>
                                        </div>
                                        <InputLabel value="Drawing Number" />
                                        <select
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
                                                    {product.drw_no}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <TextInput className="mb-5 block w-full" /> */}
                                    </div>

                                    <div className="mx-10 my-2">
                                        <InputLabel value="Product Name" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            name="product_id"
                                            value={data.product_name}
                                        />
                                        <InputError
                                            message={errors.product_name}
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
                                                <InputError
                                                    message={errors.spring_lot}
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
                                                <InputError
                                                    message={errors.product_lot}
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
                                                <InputError
                                                    message={errors.total_lot}
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
                                                <InputError
                                                    message={errors.qty}
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
                                        <InputError message={errors.remarks} />

                                        <InputLabel value="Customer Id" />
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
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mx-10 my-2">
                                    <ButtonRed>Cancel</ButtonRed>
                                    <ButtonGreen disabled={submitting}>
                                        {submitting ? "Saving..." : "Save"}
                                    </ButtonGreen>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </OperatorLayout>
        </>
    );
}

// import Nav from "@/Components/Nav";
// import { Link, useForm } from "@inertiajs/react";
// import { useState, useEffect } from "react";

// export default function CreateAchievement({ users, products }) {

//   const { data, setData, post, errors } = useForm({
//     shift: "",
//     group: "",
//     proses: "",
//     npk: "",
//     date: new Date().toISOString().slice(0, 10),
//     product_id: "",
//     spring_lot: "",
//     product_lot: "",
//     total_lot: "",
//     qty: "",
//     remarks: "",

//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [date, setDate] = useState();
//   const handleChange = (e) => {
//     const key = e.target.name;
//     const value = e.target.value;

//     if (key === "npk") {
//       // Look up the corresponding fullname from the users array
//       const user = users.find((user) => user.npk === value);
//       const fullname = user ? user.fullname : "";
//       const group = user ? user.group : "";
//       setData((data) => ({ ...data, npk: value, fullname,group }));
//     } else if (key === "drw_no") {

//       // Look up the corresponding product name from the products array
//       const product = products.find((product) => product.drw_no === value);
//       const product_name = product ? product.product_name : "";
//       const customer_id = product ? product.customer_id : "";
//       const customer_name = product ? product.customer_name : "";
//       setData((data) => ({ ...data, drw_no: value, product_name,customer_id,customer_name }));

//     } else {
//       setData((data) => ({ ...data, [key]: value }));
//     }

//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route('achievementStore'),data);
//   };
//     return (
//         <>
//         <div className="">Halaman Operator Create Achievement</div>
//         <ul>
//             {products.map((product) => (
//                 <li>{product.drw_no} {product.product_type}</li>
//             ))}

//               {users.map((user) => (
//                 <li>{user.fullname} {user.npk}</li>
//             ))}
//         </ul>

//         <form onSubmit={handleSubmit}>
//         <div>
//       <label htmlFor="date">Date</label>
//       <input
//         type="date"
//         name="date"
//         disabled={true}
//         value={data.date}
//         onChange={handleChange}
//       />
//     </div>

//      <div>
//        <label htmlFor="shift">Shift</label>
//        <input
//          type="text"
//          name="shift"
//          value={data.shift}
//          onChange={handleChange}
//          className={errors.shift ? "border-red-500" : ""}
//        />
//        {errors.shift && (
//          <div className="text-red-500">{errors.shift}</div>
//        )}
//      </div>

//      <div>
//           <label htmlFor="group">Group</label>
//           <input
//             type="text"
//             name="group"
//             value={data.group}
//             onChange={handleChange}
//             className={errors.group ? "border-red-500" : ""}
//           />
//           {errors.group && (
//             <div className="text-red-500">{errors.group}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="proses">Proses</label>
//           <input
//             type="text"
//             name="proses"
//             value={data.proses}
//             onChange={handleChange}
//             className={errors.proses ? "border-red-500" : ""}
//           />
//           {errors.proses && (
//             <div className="text-red-500">{errors.proses}</div>
//           )}
//         </div>

//         <div>
//       <label htmlFor="npk">NPK:</label>
//       <select id="npk" name="npk" value={data.npk} onChange={handleChange}>
//         <option value="">Pilih Id NPK</option>
//         {users.map((user) => (
//           <option key={user.id} value={user.npk}>
//             {user.npk}
//           </option>
//         ))

//         }
//       </select>
//       <div>
//       <label htmlFor="fullname">Full Name:</label>
//       <input id="fullname" name="fullname" value={data.fullname} readOnly />
//       {/* other form fields */}
//     </div>
//     <div>
//       <label htmlFor="group">group:</label>
//       <input id="group" name="group" value={data.group} readOnly />
//       {/* other form fields */}
//     </div>

//       {/* other form fields */}
//     </div>
//     ////////////////////////////////////
//     <div>
//       <label htmlFor="drw_no">drw_no:</label>
//       <select id="drw_no" name="drw_no" value={data.drw_no} onChange={handleChange}>
//         <option value="">Pilih Id drw_no</option>
//         {products.map((product) => (
//           <option key={product.id} value={product.drw_no}>
//             {product.drw_no}
//           </option>
//         ))

//         }
//       </select>
//       <div>
//       <label htmlFor="product_name">Product Name:</label>
//       <input id="product_name" name="product_name" value={data.product_name} readOnly />
//       {/* other form fields */}
//     </div>
//     <div>
//       <label htmlFor="customer_id">Customer ID:</label>
//       <input id="customer_id" name="customer_id" value={data.customer_id} readOnly />
//       {/* other form fields */}
//     </div>
//     <div>
//       <label htmlFor="customer_name">Customer Name:</label>
//       <input id="customer_name" name="customer_name" value={data.customer_name} readOnly />
//       {/* other form fields */}
//     </div>
//       {/* other form fields */}
//     </div>

//         <div>
//           <label htmlFor="product_id">product_id</label>
//           <input
//             type="text"
//             name="product_id"
//             value={data.product_id}
//             onChange={handleChange}
//             className={errors.product_id ? "border-red-500" : ""}

//           />
//           {errors.product_id && (
//             <div className="text-red-500">{errors.product_id}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="spring_lot">Spring Lot</label>
//           <input
//             type="text"
//             name="spring_lot"
//             value={data.spring_lot}
//             onChange={handleChange}
//             className={errors.spring_lot ? "border-red-500" : ""}
//           />
//           {errors.spring_lot && (
//             <div className="text-red-500">{errors.spring_lot}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="product_lot">Product Lot</label>
//           <input
//             type="text"
//             name="product_lot"
//             value={data.product_lot}
//             onChange={handleChange}
//             className={errors.product_lot ? "border-red-500" : ""}
//           />
//           {errors.product_lot && (
//             <div className="text-red-500">{errors.product_lot}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="total_lot">Total Lot</label>
//           <input
//             type="text"
//             name="total_lot"
//             value={data.total_lot}
//             onChange={handleChange}
//             className={errors.total_lot ? "border-red-500" : ""}
//           />
//           {errors.total_lot && (
//             <div className="text-red-500">{errors.total_lot}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="qty">QTY</label>
//           <input
//             type="text"
//             name="qty"
//             value={data.qty}
//             onChange={handleChange}
//             className={errors.qty ? "border-red-500" : ""}
//           />
//           {errors.qty && (
//             <div className="text-red-500">{errors.qty}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="remarks">Remarks</label>
//           <input
//             type="text"
//             name="remarks"
//             value={data.remarks}
//             onChange={handleChange}
//             className={errors.remarks ? "border-red-500" : ""}
//           />
//           {errors.remarks && (
//             <div className="text-red-500">{errors.remarks}</div>
//           )}
//         </div>
//         <div>
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Creating..." : "Create"}
//           </button>
//         </div>
//       </form>
//         </>

//     )
// }
