import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import Destroy from "./Destroy";
//import React
import React from "react";

import { useState } from "react";
//import inertia adapter
import { Inertia } from "@inertiajs/inertia";

export default function index({ achievements, auth }) {
    console.log(auth);
    const [deleting, setDeleting] = useState(false);
    // handle delete action
    const handleDelete = async (id) => {
        setDeleting(true);
        await Inertia.delete(`/operator/operatorachievement/${id}`);
        setDeleting(false);
    };
    return (
        <>
            <Nav roles={auth.roles} />

            <ul>ADMIN achievements INDEX</ul>
            <Link href={route("operatorachievement.create")}>
                Create New Product
            </Link>

            {achievements.map((achievement) => (
                <li key={achievement.id} className="flex gap-3">
                    <p>{achievement.id}</p>
                    <p>{achievement.date}</p>
                    <p>{achievement.shift}</p>
                    <p>{achievement.group}</p>
                    <p>{achievement.proses}</p>
                    <p>{achievement.user_id}</p>
                    <p>{achievement.product_id}</p>
                    <p>{achievement.spring_lot}</p>
                    <p>{achievement.product_lot}</p>
                    <p>{achievement.total_lot}</p>
                    <p>{achievement.qty}</p>
                    <p>{achievement.remarks}</p>

                    <button
                        disabled={deleting}
                        onClick={() => handleDelete(achievement.id)}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                    <Link
                        href={route("operatorachievement.edit", achievement.id)}
                    >
                        Edit
                    </Link>
                </li>
            ))}
        </>
    );
}

// import React from "react";
// import ButtonRed from "@/Components/ButtonRed";
// import ButtonGreen from "@/Components/ButtonGreen";
// import TextInput from "@/Components/TextInput";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import Dropdown from "@/Components/Dropdown";
// import OperatorLayout from "@/Layouts/OperatorLayout";
// import Modal from "@/Components/Modal";

// import { Link, Head, useForm } from "@inertiajs/react";

// export default function achievement(props) {
//     return (
//         <>
//             <Head title="Achievement" />
//             <OperatorLayout>
//                 <div className="py-5">
//                     <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
//                         <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
//                             <form className="flex justify-between">
//                                 <div className=" mx-10 my-2">
//                                     <InputLabel value="NPK" />
//                                     <TextInput className="mb-5 block w-full " />
//                                     <InputLabel value="Nama" />
//                                     <TextInput className="mb-5 block w-full" />
//                                     <InputLabel value="Date" />
//                                     <TextInput
//                                         type="date"
//                                         className="mb-5 block w-full"
//                                     />

//                                     <div class="flex gap-4">
//                                         <div class="mb-5">
//                                             <InputLabel value="Shift" />
//                                             <TextInput className="" />
//                                         </div>
//                                         <div class="mb-5">
//                                             <InputLabel value="Group" />
//                                             <TextInput className="" />
//                                         </div>
//                                     </div>
//                                     <InputLabel value="Drawing Number" />
//                                     <TextInput className="mb-5 block w-full" />
//                                 </div>
//                                 <div className="mx-10 my-2">
//                                     <InputLabel value="Product Name" />
//                                     <TextInput className="mb-5 block w-full" />
//                                     <div class="flex gap-4">
//                                         <div class="mb-5">
//                                             <InputLabel value="Spring Lot No" />
//                                             <TextInput className="" />
//                                         </div>
//                                         <div class="mb-5">
//                                             <InputLabel value="Product Lot No" />
//                                             <TextInput className="" />
//                                         </div>
//                                     </div>
//                                     <div class="flex gap-4">
//                                         <div class="mb-5">
//                                             <InputLabel value="Total Lot" />
//                                             <TextInput className="" />
//                                         </div>
//                                         <div class="mb-5">
//                                             <InputLabel value="Qty(pcs)" />
//                                             <TextInput className="" />
//                                         </div>
//                                     </div>

//                                     <InputLabel value="Remaks" />
//                                     <TextInput className="mb-5 block w-full" />
//                                     <InputLabel value="Customer Id" />
//                                     <TextInput className="mb-5 block" />
//                                 </div>
//                             </form>
//                             <div className="flex justify-end gap-4 mx-10 my-2">
//                                 <ButtonRed>Cancel</ButtonRed>
//                                 <ButtonGreen>Save</ButtonGreen>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </OperatorLayout>
//         </>
//     );
// }
