import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";

export default function Home({ users }) {
    return (
        <>
            <Navbar props={users} />
          
        </>
    );
}
