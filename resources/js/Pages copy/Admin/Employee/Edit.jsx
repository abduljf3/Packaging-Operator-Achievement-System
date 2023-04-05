import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({operators,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN EMPOYEE EDIT</ul>
        {operators.map((user) => (
            <li key={user.id} className="flex gap-3">

                <p>{user.id}</p>
                <p>{user.fullname}</p>
                <p>{user.shift}</p>

                <Link href={route('employee.edit',user.id)}>Edit</Link>
            </li>
        ))}
        </>
    )
}