import { Head, useForm } from "@inertiajs/react";
import ButtonRed from "@/Components/ButtonRed";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonOrange from "@/Components/ButtonOrange";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Dropdown from "@/Components/Dropdown";

export default function index({ users, auth }) {
    const data = {};
    const [filterText, setFilterText] = useState("");

    const handleFilter = (event) => {
        const value = event.target.value || "";
        setFilterText(value);
    };

    const filteredData = filterText
        ? users.filter(
              (row) =>
                  row.fullname
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                  row.npk?.toLowerCase().includes(filterText.toLowerCase()) ||
                  row.status
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                  row.group?.toLowerCase().includes(filterText.toLowerCase()) ||
                  row.roles?.toLowerCase().includes(filterText.toLowerCase())
          )
        : users;

    const [deleting, setDeleting] = useState(false);
    // handle delete action
    const handleDelete = async (id) => {
        setDeleting(true);
        const url = route("admin.employee.index");
        window.location.href = url;
        await Inertia.delete(`/admin/employee/${id}`);
        setDeleting(false);
    };
    const cetak_pdf_employee = (e) => {
        e.preventDefault();
        const url =
            route("admin.cetak_pdf_employee") +
            "?" +
            new URLSearchParams(data).toString();
        window.location.href = url;
    };
    const cetak_excel_employee = (e) => {
        e.preventDefault();
        const url =
            route("admin.cetak_excel_employee") +
            "?" +
            new URLSearchParams(data).toString();
        window.location.href = url;
    };

    const Print = () => {
        //console.log('print');
        let printContents = document.getElementById("printablediv").innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const columns = [
        {
            name: "No",
            selector: (row) => row.id,
        },

        {
            name: "NPK",
            selector: (row) => row.npk,
        },
        {
            name: "Operator Name",
            selector: (row) => row.fullname,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
        },
        {
            name: "Group",
            selector: (row) => row.group,
        },
        {
            name: "Level",
            selector: (row) => row.roles,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <a
                        href={route("admin.employee.edit", row.id)}
                        className="text-green-500 hover:text-green-900 duration-500 mr-5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
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
            <Head title="Operator" />

            <Authenticated>
                {/* content */}

                <div className="w-screen">
                    <div className="flex justify-end px-10 pt-3 ">
                        <div className="flex mr-0">
                            <div className="flex items-center gap-3">
                                <ButtonOrange onClick={Print}>
                                    Print
                                </ButtonOrange>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <ButtonGreen className="w-15 h-9">
                                            Eksport
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </ButtonGreen>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            onClick={cetak_pdf_employee}
                                            className="w-full flex gap-3 justify-start bg-transparent"
                                        >
                                            <svg
                                                width="17"
                                                height="17"
                                                viewBox="0 0 27 27"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M23.625 23.625V7.59375L16.0312 0H6.75C5.85489 0 4.99645 0.355579 4.36351 0.988515C3.73058 1.62145 3.375 2.47989 3.375 3.375V23.625C3.375 24.5201 3.73058 25.3785 4.36351 26.0115C4.99645 26.6444 5.85489 27 6.75 27H20.25C21.1451 27 22.0035 26.6444 22.6365 26.0115C23.2694 25.3785 23.625 24.5201 23.625 23.625ZM16.0312 5.0625C16.0312 5.73383 16.2979 6.37766 16.7726 6.85236C17.2473 7.32707 17.8912 7.59375 18.5625 7.59375H21.9375V23.625C21.9375 24.0726 21.7597 24.5018 21.4432 24.8182C21.1268 25.1347 20.6976 25.3125 20.25 25.3125H6.75C6.30245 25.3125 5.87322 25.1347 5.55676 24.8182C5.24029 24.5018 5.0625 24.0726 5.0625 23.625V3.375C5.0625 2.92745 5.24029 2.49822 5.55676 2.18176C5.87322 1.86529 6.30245 1.6875 6.75 1.6875H16.0312V5.0625Z"
                                                    fill="#E30000"
                                                />
                                                <path
                                                    d="M7.76802 23.7719C7.43912 23.6404 7.17413 23.3863 7.0289 23.0632C6.69984 22.4084 6.80952 21.7537 7.1639 21.2035C7.49802 20.6855 8.05152 20.245 8.67759 19.8755C9.47061 19.4257 10.3089 19.0609 11.1785 18.787C11.8538 17.573 12.4523 16.3179 12.9706 15.029C12.6607 14.3249 12.4178 13.5932 12.245 12.8437C12.0998 12.1687 12.0441 11.5004 12.1673 10.9267C12.2939 10.3293 12.6297 9.79267 13.2642 9.53785C13.5882 9.40792 13.9392 9.33535 14.2801 9.40792C14.4516 9.44442 14.6127 9.51863 14.752 9.62517C14.8912 9.7317 15.005 9.86789 15.085 10.0239C15.2335 10.3006 15.2875 10.6246 15.2993 10.9317C15.3111 11.249 15.2791 11.6 15.22 11.9679C15.0783 12.8285 14.7644 13.8815 14.3425 14.9952C14.8081 15.9909 15.3615 16.943 15.9963 17.8404C16.7474 17.781 17.5028 17.8093 18.2474 17.9247C18.8616 18.0361 19.486 18.2538 19.8674 18.7094C20.0699 18.9524 20.1931 19.2494 20.2049 19.5835C20.2167 19.9075 20.1256 20.2282 19.972 20.5336C19.839 20.8167 19.6328 21.059 19.3747 21.2356C19.1195 21.402 18.8183 21.4835 18.514 21.4685C17.9555 21.4449 17.4104 21.1377 16.9396 20.7648C16.3671 20.2914 15.8512 19.7535 15.4023 19.1617C14.2611 19.2912 13.1335 19.5204 12.0323 19.8468C11.5281 20.7411 10.9525 21.5932 10.3111 22.3949C9.81834 22.9855 9.2834 23.5019 8.74677 23.723C8.43845 23.8625 8.08873 23.8799 7.76802 23.7719ZM10.0951 20.564C9.81496 20.6922 9.55509 20.8272 9.32052 20.9656C8.76702 21.293 8.40759 21.6119 8.22871 21.8887C8.07009 22.1334 8.06671 22.3105 8.16121 22.4979C8.17809 22.535 8.19496 22.5586 8.20509 22.5721C8.22522 22.5667 8.24496 22.56 8.26415 22.5519C8.49534 22.4574 8.86321 22.1553 9.33571 21.5866C9.60444 21.2576 9.85783 20.9164 10.0951 20.564ZM12.8626 18.3196C13.4261 18.1881 13.9947 18.0794 14.567 17.9939C14.2597 17.5237 13.9726 17.0406 13.7063 16.546C13.4417 17.1444 13.1603 17.7353 12.8626 18.3179V18.3196ZM16.9902 19.079C17.2433 19.354 17.4897 19.5852 17.7243 19.7709C18.1293 20.0915 18.4111 20.1978 18.5647 20.2029C18.6058 20.2082 18.6475 20.1993 18.6828 20.1775C18.753 20.1221 18.8076 20.0494 18.8414 19.9666C18.9014 19.8638 18.9356 19.748 18.941 19.6291C18.94 19.5895 18.9244 19.5516 18.8971 19.5228C18.8093 19.4182 18.5596 19.2663 18.023 19.1701C17.6816 19.113 17.3363 19.0831 16.9902 19.0807V19.079ZM13.6321 13.1626C13.7741 12.7045 13.8868 12.2378 13.9696 11.7654C14.0219 11.4481 14.0421 11.1865 14.0337 10.9807C14.0342 10.8671 14.0159 10.7542 13.9797 10.6465C13.8953 10.657 13.8129 10.6797 13.735 10.714C13.5882 10.7731 13.4684 10.8929 13.4043 11.1916C13.3368 11.5156 13.3536 11.983 13.4819 12.5787C13.5224 12.766 13.573 12.9618 13.6338 13.1626H13.6321Z"
                                                    fill="#E30000"
                                                />
                                            </svg>{" "}
                                            PDF
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            onClick={cetak_excel_employee}
                                            className="container flex gap-3"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="20"
                                                height="20"
                                            >
                                                <path
                                                    fill="#169154"
                                                    d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
                                                />
                                                <path
                                                    fill="#18482a"
                                                    d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
                                                />
                                                <path
                                                    fill="#0c8045"
                                                    d="M14 15.003H29V24.005000000000003H14z"
                                                />
                                                <path
                                                    fill="#17472a"
                                                    d="M14 24.005H29V33.055H14z"
                                                />
                                                <g>
                                                    <path
                                                        fill="#29c27f"
                                                        d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
                                                    />
                                                    <path
                                                        fill="#27663f"
                                                        d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
                                                    />
                                                    <path
                                                        fill="#19ac65"
                                                        d="M29 15.003H44V24.005000000000003H29z"
                                                    />
                                                    <path
                                                        fill="#129652"
                                                        d="M29 24.005H44V33.055H29z"
                                                    />
                                                </g>
                                                <path
                                                    fill="#0c7238"
                                                    d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
                                                />
                                                <path
                                                    fill="#fff"
                                                    d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
                                                />
                                            </svg>
                                            EXCEL
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <Link href={route("admin.employee.create")}>
                                    <ButtonRed className=" h-9 w-15">
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
                                        Add Employee
                                    </ButtonRed>

                                    {/* <Link href={route("employee.leader")}>
                                        leader
                                    </Link> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="printablediv">
                        <div className="pt-4 pb-10 px-10  ">
                            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                                <DataTable
                                    title="Operator"
                                    columns={columns}
                                    data={(users, filteredData)}
                                    // customStyles={customStyles}
                                    pagination
                                    dense
                                    highlightOnHover
                                    actions={
                                        <label className="w-100 h-100 mx-3 my-5 relative text-gray-400 focus-within:text-gray-600 block duration-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5 posistion absolute pointer-events-none ml-3 mt-3"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                onChange={handleFilter}
                                                value={filterText}
                                                className="  bg-white placeholder-gray-400 text-black border-2 border-gray-300 duration-500 appearance-none w-full block pl-10 focus:outline-none rounded-lg "
                                            ></input>
                                        </label>
                                    }
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* content END */}
            </Authenticated>
            {/* <Nav roles={auth.roles}/>

         <ul>ADMIN users INDEX</ul>
          <Link href={route('employee.create')}>Create New Product</Link>
    
         
            {users.map((user) => (
            <li key={user.id} className="flex gap-3">

                <p>{user.id}</p>
                <p>{user.date}</p>
                <p>{user.shift}</p>
                <p>{user.group}</p>
                <p>{user.proses}</p>
                <p>{user.user_id}</p>
                <p>{user.product_id}</p>
                <p>{user.spring_lot}</p>
                <p>{user.product_lot}</p>
                <p>{user.total_lot}</p>
                <p>{user.qty}</p>
                <p>{user.remarks}</p>
                

              <button disabled={deleting} onClick={() => handleDelete(user.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>                 
                <Link href={route('employee.edit',user.id)}>Edit</Link>
               
                
                </li>
        ))} */}
        </>
    );
}
