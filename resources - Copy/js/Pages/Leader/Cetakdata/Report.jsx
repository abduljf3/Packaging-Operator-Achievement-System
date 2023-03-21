import LeaderLayout from "@/Layouts/LeaderLayout";
import TableLeader from  "@/Components/TableLeader";
import FilterButton from "@/Components/FilterButton";
import InputTanggal1 from "@/Components/InputTanggal1";
import InputTanggal2 from "@/Components/InputTanggal2";
import { Link, Head } from "@inertiajs/react";

export default function ReportLeader(props) {
    return (
        <>
            <Head title="Report" />
           <LeaderLayout>
               {/* content */}
               <div class="pt-2 pb-2 px-10 bg-red-300">
                    <div class="flex items-center gap-2">
                        <InputTanggal1/>
                        <h1>-</h1>
                        <InputTanggal2/>
                        <FilterButton>FILTER</FilterButton>
                    </div>
               </div>
               <div class="flex items-center mt-10">
                    <TableLeader/>
                </div>
                {/* content END */}
            </LeaderLayout>
        </>
    );
}
