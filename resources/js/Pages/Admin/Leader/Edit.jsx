import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({users,auth}) {
    console.log(users);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>Edit Product</ul>
      {users.name}
        </>
    )
}
