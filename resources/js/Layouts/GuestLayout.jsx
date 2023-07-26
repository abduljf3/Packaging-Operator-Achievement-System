import Calendar from "@/Components/Calendar";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100">
            <Head>
                <link rel="icon" href="/logo.png" type="image/x-icon"/>
            </Head>

            <Navbar roles="login" />
            <Calendar/>
            <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0  grow">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
