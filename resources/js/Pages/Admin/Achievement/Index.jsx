import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function index({achievements,auth}) {
    console.log(auth);
    return(
        <>
        
        <Nav roles={auth.roles}/>
        <ul>Admin Achievement Index</ul>
        <ul>List Achievement</ul>
        {achievements.map((achievement) => (
            <li key={achievement.id} className="flex gap-3">
                <p>{achievement.date}</p>
                <p>{achievement.shift}</p>
                <p>{achievement.group}</p>
                <p>{achievement.proses}</p>
                <p>{achievement.user_id}</p>
                <p>{achievement.user_product}</p>
                <p>{achievement.spring_lot}</p>
                <p>{achievement.product_lot}</p>
                <p>{achievement.total_lot}</p>
                <p>{achievement.qty}</p>
                <p>{achievement.remarks}</p>
           


                     </li>
        ))}
        </>
    )
}
