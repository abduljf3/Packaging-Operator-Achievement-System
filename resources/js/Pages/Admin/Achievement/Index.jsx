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

// import Authenticated from "@/Layouts/AuthenticatedLayout";
// import ButtonRed from "@/Components/ButtonRed";
// import Table from "@/Components/Table";
// import { Link } from "@inertiajs/react";

// export default function index({ props, users, auth }) {
//     return (
//         <>
//             <Authenticated>
//                 <div className="flex container justify-end w-full px-10 mx-auto mb-5 bg-red-300 py-3">
//                     <ButtonRed>
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="w-6 h-6"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                         Add Achivement
//                     </ButtonRed>
//                 </div>
//                 <div>
//                     <Table />
//                 </div>
//             </Authenticated>
//         </>
//     );
// }
