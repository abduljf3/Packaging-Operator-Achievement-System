import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({achievements,auth}) {
    console.log(auth);
    return(
        <>
     
        
        <Nav roles={auth.roles}/>
        <Link href={route('leader.create')}>Create New user</Link>
 
        <ul>List user</ul>
        {users.map((user) => (
            <li key={user.id} className="flex gap-3">
                <p>{user.drw_no}</p>
                <p>{user.user_name}</p>
                <p>{user.id_type}</p>
                <Link href={route('leader.edit',user.id)}>Edit</Link>
              
                <button disabled={deleting} onClick={() => handleDelete(user.id)}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>  
       
                  </li>
                  
        ))}
        </>
    )
}
