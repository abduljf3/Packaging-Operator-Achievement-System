import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({auth}) {
   
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>ADMIN PRODUCT CREATE</ul>
      
        </>
    )
}