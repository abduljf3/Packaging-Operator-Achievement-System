import Authenticated from "@/Layouts/AuthenticatedLayout";
import ButtonRed from "@/Components/ButtonRed";
import Table from "@/Components/Table";

export default function index({ props, users, auth }) {
    return (
        <>
            <Authenticated>
                <div className="flex justify-end w-full px-10 mx-auto mb-5 bg-red-300 py-3">
                    {/* <label className="relative text-gray-400 focus-within:text-gray-600 block duration-500">
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
                            placeholder="Search"
                            className="form-input  py-3 px-4 bg-white placeholder-gray-400 text-gray-500 duration-500 appearance-none w-full block pl-10 focus:outline-none rounded-lg "
                        ></input>
                    </label> */}

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
                        Add Employee
                    </ButtonRed>
                </div>
                <div>
                    <Table />
                </div>
                {/* <ul>ADMIN EMPLOYEE INDEX eqw</ul>
                {users.map((user) => (
                    <li key={user.id} className="flex gap-3">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </li>
                ))} */}
            </Authenticated>
        </>
    );
}
