import LeaderLayout from "@/Layouts/LeaderLayout";
import Table from  "@/Components/Table";
import FilterButton from "@/Components/FilterButton";
import EksporButton from "@/Components/EksporButton";
import PdfButton from "@/Components/PdfButton";
import PrintrButton from "@/Components/PrintButton";
import InputTanggal1 from "@/Components/InputTanggal1";
import InputTanggal2 from "@/Components/InputTanggal2";
import { Link, Head } from "@inertiajs/react";

export default function ReportLeader(props) {
    return (
        <>
            <Head title="Report Rekapitulasi" />
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
                <div class="flex justify-between px-10  pt-3 pb-5">
                    <div class="mt-5 ml-10 mb-5">
                        <a class="font-bold justify-start text-2xl ml-6 text-black">Rekapitulasi</a>
                    </div>
                    <div class="flex items-center gap-3">
                        <PrintrButton>PRINT</PrintrButton>
                        <EksporButton>EKSPOR</EksporButton>
                    </div>
                </div>
                <Table/>
                {/* content END */}
            </LeaderLayout>
        </>
    );
}
