import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({operators,auth}) {
    console.log(operators);
    return(
        <>
        
        <Nav roles={auth.roles}/>

        <ul>Input Achievement Operator</ul>
      {operators.date}
        </>
    )
}
