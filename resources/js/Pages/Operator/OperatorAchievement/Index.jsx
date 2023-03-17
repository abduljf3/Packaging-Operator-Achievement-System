import React from "react";
import ButtonRed from "@/Components/ButtonRed";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import OperatorLayout from "@/Layouts/OperatorLayout";

import { Link, Head, useForm } from "@inertiajs/react";

export default function achievement(props) {
    return (
        <>
            <Head title="Achievement" />
            <OperatorLayout>
                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mx-10 my-2">
                                <InputLabel value="NPK" />
                                <TextInput className="mb-5 block w-1/3" />
                                <InputLabel value="Nama" />
                                <TextInput className="mb-5 block w-1/3" />
                                <InputLabel value="Date" />
                                <TextInput
                                    type="date"
                                    className="mb-5 block w-1/3"
                                />

                                <div class="flex gap-4">
                                    <div class="mb-5">
                                        <InputLabel value="Shift" />
                                        <TextInput className="w-10/12" />
                                    </div>
                                    <div class="mb-5">
                                        <InputLabel value="Group" />
                                        <TextInput className="w-10/12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OperatorLayout>
        </>
    );
}

// import Nav from "@/Components/Nav";
// import { Link } from "@inertiajs/react";
// import Destroy from './Destroy';

// import React from 'react';

// import { useState } from 'react';

// import { Inertia } from '@inertiajs/inertia';

// export default function index({operators,auth}) {
//     console.log(auth);
//     const [deleting, setDeleting] = useState(false);
//   // handle delete action
//   const handleDelete = async (id) => {
//     setDeleting(true);
//     await Inertia.delete(`/operator/operatorachievement/${id}`);
//     setDeleting(false);
//   };
//     return(
//         <>

//         <Nav roles={auth.roles}/>

//          <ul>OPERATOR operators INDEX</ul>

//             {operators.map((operator) => (
//             <li key={operator.id} className="flex gap-3">

//                 <p>{operator.id}</p>
//                 <p>{operator.date}</p>
//                 <p>{operator.shift}</p>
//                 <p>{operator.group}</p>
//                 <p>{operator.proses}</p>
//                 <p>{operator.user_id}</p>
//                 <p>{operator.user_product}</p>
//                 <p>{operator.spring_lot}</p>
//                 <p>{operator.product_lot}</p>
//                 <p>{operator.total_lot}</p>
//                 <p>{operator.qty}</p>
//                 <p>{operator.remarks}</p>

//     <Link href={route('operatorachievement.create')}>Create New Product</Link>
//                 <button disabled={deleting} onClick={() => handleDelete(operator.id)}>
//             {deleting ? 'Deleting...' : 'Delete'}
//           </button>
//                 <Link href={route('operatorachievement.edit',operator.id)}>Edit</Link>

//                 </li>
//         ))}
//         </>
//     )
// }
