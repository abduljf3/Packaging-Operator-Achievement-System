import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Print({ users}) {
    useEffect(() => {
        window.document.title = "Data Employee";
        window.print();
    }, []);

    return (
        <div className="w-full container mx-auto">
            <Head title="Employee" />
            <div className="w-full flex justify-between">
                <div className="flex w-fit items-center">
                    <ApplicationLogo className="h-10"/>
                    <div className="flex flex-col gap-0">
                        <div className="font-semibold text-gray-800 text-sm">PT. Arai Rubeer Seal Indonesia</div>
                        <div className="text-xs text-gray-800">Packaging Section</div>
                    </div>
                </div>
            </div>
            <h1 className="text-gray-800 text-3xl font-semibold text-center w-full mb-5">Data Employee</h1>  
            <table class="border-collapse border border-slate-400 table-auto w-full">
            <thead>
                <tr>
                    <th class="border border-slate-400">No</th>
                    <th class="border border-slate-400">NPK</th>
                    <th class="border border-slate-400">Name</th>
                    <th class="border border-slate-400">Status</th>
                    <th class="border border-slate-400">Group</th>
                    <th class="border border-slate-400">Level</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index) => (
                    <tr key={user.id}>
                        <td class="px-2 text-center border border-slate-400">{index+1}</td>
                        <td class="px-2 text-center border border-slate-400">{user.npk}</td>
                        <td class="px-2 text-center border border-slate-400">{user.fullname}</td>
                        <td class="px-2 text-center border border-slate-400">{user.status}</td>
                        <td class="px-2 text-center border border-slate-400">{user.group}</td>
                        <td class="px-2 text-center border border-slate-400">{user.roles}</td>
                    </tr>
                ))}
            </tbody>
            </table>     
        </div>
    );
}
