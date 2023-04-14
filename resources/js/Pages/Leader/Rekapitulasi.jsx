import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import LeaderLayout from "@/Layouts/LeaderLayout";
import { Head, useForm } from "@inertiajs/react";
import DataTable from "react-data-table-component";


export default function Index({ achievements, from, to,auth }) {
    console.log(achievements);
    const { data, setData, get, processing, errors, reset } = useForm({
        from_date:from ,
        to_date: to,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,event.target.value
        );
    };

    const Print = () =>{
        //console.log('print');
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
       document.body.innerHTML = originalContents;
      }

    const submit = (e) => {
        e.preventDefault();
        get(route("leader.rekapitulasi"));
    };
    const pdfSubmit = (e) => {
        e.preventDefault();
        const url = route("leader.cetak_pdf") + "?" + new URLSearchParams(data).toString();
        window.location.href = url;
    };
    const cetak_excel = (e) =>{
        e.preventDefault();
        const url = route("leader.cetak_excel") + "?" + new URLSearchParams(data).toString();
        window.location.href = url;
    };

    const columns = [
        {
            name : 'No',
            selector : (row) => row.id,
            sortable: true,
        },
        {
            name: 'Drawing Number',
            selector:  (row) => row.drw_no,
            sortable: true,
        },
        {
            name : 'LOT',
            selector : (row) => row.totalLot,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: (row) => row.totalQty,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row) => row.product.product_type,
            sortable: true,
        },
    ];

    return (
        <>
            <Head title="Report Rekapitulasi" />
           <LeaderLayout>
               {/* content */}
               <div className="w-screen">
                    <div className="flex justify-between px-10 pt-2 ">
                        <form className="flex items-center gap-2" onSubmit={submit}>
                            <TextInput type="date" value={from} name="from_date" onChange={handleOnChange} className="w-34"/>
                            <h1>-</h1>
                            <TextInput type="date" value={to} name="to_date" onChange={handleOnChange} className="w-34"/>
                            <PrimaryButton type ="submit" className="bg-green-500 hover:bg-green-500 focus:bg-green-600 active:bg-green-600 focus:ring-lime-500" text="FILTER"/>
                        </form>
                        {achievements && (
                            <div className="flex mr-0">
                            <div className="flex items-center gap-3">
                                <PrimaryButton
                                    onClick={Print}
                                    type="submit" className="bg-orange-500 hover:bg-orange-500 focus:bg-orange-600 active:bg-orange-600 focus:ring-orange-400" text="PRINT"/>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div className=" flex items-center bg-green-500 rounded ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>

                                            <PrimaryButton className="bg-green-500 hover:bg-green-500 focus:bg-green-600 active:bg-green-600 focus:ring-lime-500" text="EKSPOR"/>
                                            </div>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                >
                                                <div className="flex container flex gap-3S bg-red-500 hover:bg-red-600">
                                                    {/* <svg width="26" height="26" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M23.625 23.625V7.59375L16.0312 0H6.75C5.85489 0 4.99645 0.355579 4.36351 0.988515C3.73058 1.62145 3.375 2.47989 3.375 3.375V23.625C3.375 24.5201 3.73058 25.3785 4.36351 26.0115C4.99645 26.6444 5.85489 27 6.75 27H20.25C21.1451 27 22.0035 26.6444 22.6365 26.0115C23.2694 25.3785 23.625 24.5201 23.625 23.625ZM16.0312 5.0625C16.0312 5.73383 16.2979 6.37766 16.7726 6.85236C17.2473 7.32707 17.8912 7.59375 18.5625 7.59375H21.9375V23.625C21.9375 24.0726 21.7597 24.5018 21.4432 24.8182C21.1268 25.1347 20.6976 25.3125 20.25 25.3125H6.75C6.30245 25.3125 5.87322 25.1347 5.55676 24.8182C5.24029 24.5018 5.0625 24.0726 5.0625 23.625V3.375C5.0625 2.92745 5.24029 2.49822 5.55676 2.18176C5.87322 1.86529 6.30245 1.6875 6.75 1.6875H16.0312V5.0625Z" fill="#E30000"/>
                                                        <path d="M7.76802 23.7719C7.43912 23.6404 7.17413 23.3863 7.0289 23.0632C6.69984 22.4084 6.80952 21.7537 7.1639 21.2035C7.49802 20.6855 8.05152 20.245 8.67759 19.8755C9.47061 19.4257 10.3089 19.0609 11.1785 18.787C11.8538 17.573 12.4523 16.3179 12.9706 15.029C12.6607 14.3249 12.4178 13.5932 12.245 12.8437C12.0998 12.1687 12.0441 11.5004 12.1673 10.9267C12.2939 10.3293 12.6297 9.79267 13.2642 9.53785C13.5882 9.40792 13.9392 9.33535 14.2801 9.40792C14.4516 9.44442 14.6127 9.51863 14.752 9.62517C14.8912 9.7317 15.005 9.86789 15.085 10.0239C15.2335 10.3006 15.2875 10.6246 15.2993 10.9317C15.3111 11.249 15.2791 11.6 15.22 11.9679C15.0783 12.8285 14.7644 13.8815 14.3425 14.9952C14.8081 15.9909 15.3615 16.943 15.9963 17.8404C16.7474 17.781 17.5028 17.8093 18.2474 17.9247C18.8616 18.0361 19.486 18.2538 19.8674 18.7094C20.0699 18.9524 20.1931 19.2494 20.2049 19.5835C20.2167 19.9075 20.1256 20.2282 19.972 20.5336C19.839 20.8167 19.6328 21.059 19.3747 21.2356C19.1195 21.402 18.8183 21.4835 18.514 21.4685C17.9555 21.4449 17.4104 21.1377 16.9396 20.7648C16.3671 20.2914 15.8512 19.7535 15.4023 19.1617C14.2611 19.2912 13.1335 19.5204 12.0323 19.8468C11.5281 20.7411 10.9525 21.5932 10.3111 22.3949C9.81834 22.9855 9.2834 23.5019 8.74677 23.723C8.43845 23.8625 8.08873 23.8799 7.76802 23.7719ZM10.0951 20.564C9.81496 20.6922 9.55509 20.8272 9.32052 20.9656C8.76702 21.293 8.40759 21.6119 8.22871 21.8887C8.07009 22.1334 8.06671 22.3105 8.16121 22.4979C8.17809 22.535 8.19496 22.5586 8.20509 22.5721C8.22522 22.5667 8.24496 22.56 8.26415 22.5519C8.49534 22.4574 8.86321 22.1553 9.33571 21.5866C9.60444 21.2576 9.85783 20.9164 10.0951 20.564ZM12.8626 18.3196C13.4261 18.1881 13.9947 18.0794 14.567 17.9939C14.2597 17.5237 13.9726 17.0406 13.7063 16.546C13.4417 17.1444 13.1603 17.7353 12.8626 18.3179V18.3196ZM16.9902 19.079C17.2433 19.354 17.4897 19.5852 17.7243 19.7709C18.1293 20.0915 18.4111 20.1978 18.5647 20.2029C18.6058 20.2082 18.6475 20.1993 18.6828 20.1775C18.753 20.1221 18.8076 20.0494 18.8414 19.9666C18.9014 19.8638 18.9356 19.748 18.941 19.6291C18.94 19.5895 18.9244 19.5516 18.8971 19.5228C18.8093 19.4182 18.5596 19.2663 18.023 19.1701C17.6816 19.113 17.3363 19.0831 16.9902 19.0807V19.079ZM13.6321 13.1626C13.7741 12.7045 13.8868 12.2378 13.9696 11.7654C14.0219 11.4481 14.0421 11.1865 14.0337 10.9807C14.0342 10.8671 14.0159 10.7542 13.9797 10.6465C13.8953 10.657 13.8129 10.6797 13.735 10.714C13.5882 10.7731 13.4684 10.8929 13.4043 11.1916C13.3368 11.5156 13.3536 11.983 13.4819 12.5787C13.5224 12.766 13.573 12.9618 13.6338 13.1626H13.6321Z" fill="#E30000"/>
                                                    </svg> */}
                                                    <PrimaryButton
                                                        onClick={pdfSubmit}
                                                        className="flex justify-center bg-red-500 hover:bg-red-600 w-full focus:bg-red-600 active:bg-red-600 focus:ring-red-500" text="PDF" />
                                                </div>
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                            >

                                               <PrimaryButton
                                                        onClick={cetak_excel}
                                                        className="flex justify-center bg-green-500 hover:bg-green-600 w-full" text="EXCEL" />
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        )}
                    </div>
                    <div  id='printablediv'>
                    <div className="px-10 pt-4">
                        {achievements ? (
                            <DataTable
                            title="Report Rekapitulasi"
                            columns={columns}
                            data={achievements}
                            // customStyles={customStyles}
                            pagination
                            dense
                            highlightOnHover
                            className=""
                        />
                        ):(
                            <p className="w-full py-6 text-center text-white bg-red-500">Filter terlebih dahulu</p>
                        )}
                    </div>
                </div></div>
                {/* content END */}
            </LeaderLayout>
    </>
    );
}
