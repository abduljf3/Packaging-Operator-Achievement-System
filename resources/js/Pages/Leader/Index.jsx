import LeaderLayout from "@/Layouts/LeaderLayout";
import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <LeaderLayout>
            {/* content */}

            <div className="container w-full px-10 mx-auto bg-gray-100 py-14">
                <div className="flex justify-between gap-5 mb-10">
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Seal
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            O-Ring
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Rubber Part
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Joint Carburator
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Level Gauge
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2">
                        <span className="text-base font-semibold">
                            Daily Chart
                            <img src="grafik1.jpeg" className="w-full" />
                        </span>
                    </div>
                    <div className="w-1/2">
                        <span className="text-base font-semibold">
                            Weekly Chart
                            <img src="grafik1.jpeg" className="w-full" />
                        </span>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2">
                        <span className="text-base font-semibold">
                            Monthly Chart
                            <img src="grafik1.jpeg" className="w-full" />
                        </span>
                    </div>
                    <div className="w-1/2">
                        <span className="text-base font-semibold">
                            Shif Chart
                            <img src="grafik1.jpeg" className="w-full" />
                        </span>
                    </div>
                </div>
                <div className="flex w-1/2 container mx-auto justify-between items-center">
                        <span className="text-base font-semibold">
                            Person Chart
                            <img src="grafik1.jpeg" className="w-full" />
                        </span>
                </div>
            </div>
            {/* content END */}
            </LeaderLayout>
       </>
    );
}
  