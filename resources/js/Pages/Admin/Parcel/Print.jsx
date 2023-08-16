import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Print({ customers}) {
    useEffect(() => {
        window.document.title = "Data Customer";
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
            <h1 className="text-gray-800 text-3xl font-semibold text-center w-full mb-5">Data Customer</h1>  
            <table class="border-collapse border border-slate-400 table-auto w-full">
            <thead>
                <tr>
                    <th class="border border-slate-400">No</th>
                    <th class="border border-slate-400">Customer Code</th>
                    <th class="border border-slate-400">Customer Name</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer,index) => (
                    <tr key={customer.id}>
                        <td class="px-2 text-center border border-slate-400">{index+1}</td>
                        <td class="px-2 text-center border border-slate-400">{customer.customer_code}</td>
                        <td class="px-2 text-center border border-slate-400">{customer.customer_name}</td>
                    </tr>
                ))}
            </tbody>
            </table>     
        </div>
    );
}
