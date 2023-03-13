import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({users,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN EMPLOYEE INDEX</ul>
        {users.map((user) => (
            <li key={user.id} className="flex gap-3">
                <p>{user.name}</p>
                <p>{user.email}</p>
              </li>
        ))}
        </>
    )
}