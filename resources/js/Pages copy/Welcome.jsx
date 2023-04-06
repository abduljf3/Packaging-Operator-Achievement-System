import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link, Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <Navbar roles />
            {/* content */}
            <div class="container w-full px-10 mx-auto bg-gray-100 py-14">
                <div class="flex justify-between gap-5 mb-10">
                    <div class="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            class="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Seal
                        </h1>
                        <h1
                            class="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div class="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            class="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            O-Ring
                        </h1>
                        <h1
                            class="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div class="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            class="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Rubber Part
                        </h1>
                        <h1
                            class="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div class="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            class="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Joint Carburator
                        </h1>
                        <h1
                            class="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div class="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            class="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Level Gauge
                        </h1>
                        <h1
                            class="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                </div>
                <div class="flex gap-5">
                    <div class="w-1/2">
                        <span class="text-base font-semibold">
                            Grafik Harian
                            <img src="grafik1.jpeg" class="w-full" />
                        </span>
                    </div>
                    <div class="w-1/2">
                        <span class="text-base font-semibold">
                            Grafik Mingguan
                            <img src="grafik1.jpeg" class="w-full" />
                        </span>
                    </div>
                </div>
            </div>
            {/* content END */}

            <Footer />
        </>
    );
}
