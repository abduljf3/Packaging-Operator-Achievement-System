import ButtonRed from "@/Components/ButtonRed";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function index({ achievements, auth }) {
    console.log(achievements);
    const [deleting, setDeleting] = useState(false);
    // handle delete action
    const handleDelete = async (id) => {
        setDeleting(true);
        await Inertia.delete(`/operator/operatorachievement/${id}`);
        setDeleting(false);
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
        },

        {
            name: "Date",
            selector: (row) => row.date,
        },
        {
            name: "Nama",
            selector: (row) => row.user.fullname,
            sortable: true,
        },
        {
            name: "Group",
            selector: (row) => row.group,
        },
        {
            name: "NPK",
            selector: (row) => row.npk,
        },
        {
            name: "Drawing Number",
            selector: (row) => row.drw_no,
        },
        {
            name: "Total Lot",
            selector: (row) => row.total_lot,
        },
        {
            name: "Qty (pcs)",
            selector: (row) => row.qty,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <a
                        href={route("achievement.edit", row.id)}
                        class="text-green-500 hover:text-green-900 duration-500 mr-5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </a>

                    <a
                        disabled={deleting}
                        onClick={() => handleDelete(row.id)}
                        className="w-6 h-6 text-red-500 hover:text-red-900 duration-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </a>
                </>
            ),
        },
    ];

    // const customStyles = [
    //     rows: {

    //     },
    // ];

    return (
        <>
            <Authenticated>
                <div className="flex container justify-end w-full px-10 mx-auto mb-5 bg-red-300 py-3">
                    <ButtonRed>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Import Achivement
                    </ButtonRed>
                </div>
                <div className="container px-10 max-w-7xl mx-auto ">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <DataTable
                            title="Achievement"
                            columns={columns}
                            data={achievements}
                            // customStyles={customStyles}
                            pagination
                            dense
                            highlightOnHover
                            className=""
                        />
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
