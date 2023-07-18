import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Print({ products}) {
    useEffect(() => {
        window.document.title = "Data Product";
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
            <h1 className="text-gray-800 text-3xl font-semibold text-center w-full mb-5">Data Product</h1>  
            <table class="border-collapse border border-slate-400 table-auto w-full">
            <thead>
                <tr>
                    <th class="border border-slate-400">No</th>
                    <th class="border border-slate-400">Drawing No.</th>
                    <th class="border border-slate-400">Product Name</th>
                    <th class="border border-slate-400">Type</th>
                    <th class="border border-slate-400">Target (pcs)</th>
                    <th class="border border-slate-400">Cust. Code</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index) => (
                    <tr key={product.id}>
                        <td class="px-2 text-center border border-slate-400">{index+1}</td>
                        <td class="px-2 text-center border border-slate-400">{product.drw_no}</td>
                        <td class="px-2 text-center border border-slate-400">{product.product_name}</td>
                        <td class="px-2 text-center border border-slate-400">{product.product_type}</td>
                        <td class="px-2 text-center border border-slate-400">{parseFloat(product.target).toLocaleString("id-ID")}</td>
                        <td class="px-2 text-center border border-slate-400">{product.customer.customer_code}</td>
                    </tr>
                ))}
            </tbody>
            </table>     
        </div>
    );
}
