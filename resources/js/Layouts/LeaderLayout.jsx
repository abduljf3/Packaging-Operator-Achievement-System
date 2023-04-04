import Dropdown from "@/Components/Dropdown";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";

export default function Leader({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar roles="leader"/>

                {header && (
                    <header className="bg-white shadow">
                        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
            <Footer/>
        </>
    );
}
