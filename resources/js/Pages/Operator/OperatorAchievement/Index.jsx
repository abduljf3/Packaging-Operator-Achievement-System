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

    function handleExport() {
        exportToExcel(data, "users");
    }
    return (
        <>
            <div>
                <button onClick={handleExport}>Export to Excel</button>
            </div>
            <Nav roles={auth.roles} />

            <ul>OPERATOR achievements INDEX</ul>
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
