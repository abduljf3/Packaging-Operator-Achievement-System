import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import ButtonRed from "@/Components/ButtonRed";
import { Inertia } from "@inertiajs/inertia";

export default function index({ products, auth }) {
    console.log(products);
    const [filterText, setFilterText] = useState("");
    const handleFilter = (event) => {
        const value = event.target.value || "";
        setFilterText(value);
    };

    const filteredData = products.filter((row) =>
        row.product_name.toLowerCase().includes(filterText.toLowerCase())
    );
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (id) => {
        setDeleting(true);
        await Inertia.delete(`/admin/products/${id}`);
        setDeleting(false);
    };
    const columns = [
        {
            name: "No",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Customer Id",
            selector: (row) => row.customer_id,
            sortable: true,
        },
        {
            name: "Customer Name",
            selector: (row) => row.customer_name,
            sortable: true,
        },
        {
            name: "Drawing Number",
            selector: (row) => row.drw_no,
            sortable: true,
        },
        {
            name: "Product Name",
            selector: (row) => row.product_name,
            sortable: true,
        },
        {
            name: "Product Type",
            selector: (row) => row.product_type,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <a
                        href={route("admin.products.edit", row.id)}
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

    return (
        <>
            <Authenticated>
                <div className="">
                    <div className="flex justify-between  px-10 pt-3 ">
                        <label className="relative text-gray-400 focus-within:text-gray-600 block duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-5 h-5 posistion absolute pointer-events-none ml-3 mt-4"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clip-rule="evenodd"
                                />
                            </svg>

                            <input
                                placeholder="Search Product..."
                                onChange={handleFilter}
                                value={filterText}
                                className="  py-3 px-4 bg-white placeholder-gray-400 text-black border-2 border-gray-300 duration-500 appearance-none w-full block pl-10 focus:outline-none rounded-lg "
                            ></input>
                        </label>
                        <Link href={route("products.create")}>
                            <ButtonRed>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 flex"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Add Product
                            </ButtonRed>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="flex w-full px-10 pb-10 py-3">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg">
                            <DataTable
                                title="List Product"
                                columns={columns}
                                data={filteredData}
                                pagination
                                dense
                                highlightOnHover
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
