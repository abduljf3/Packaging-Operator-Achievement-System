import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>List Product</ul>
       
        </>
    )
}