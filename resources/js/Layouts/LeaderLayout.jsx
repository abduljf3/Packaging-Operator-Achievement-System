import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";

export default function LeaderLayout({ auth, header, children,className }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div className={`min-h-screen bg-gray-100 flex flex-col ${className}`}>
                <Navbar roles="Leader" />
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}
