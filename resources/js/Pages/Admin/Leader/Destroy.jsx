import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({users,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN PRODUCT DELETE</ul>
        {users.map((user) => (
            <li key={user.id} className="flex gap-3">

<p>{user.id}</p>
                <p>{user.date}</p>
               
                <p>{user.shift}</p>
                <Link href={route('leader.edit',user.id)}>Edit</Link>
            </li>
        ))}
        </>
    )
}