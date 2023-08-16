import React from "react";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";

export default function Navbar({ roles }) {
    if (roles == "Admin") {
        return (
            <div className="w-full bg-white shadow-md py-2">
                <nav className="container flex items-center justify-between mx-auto">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <ApplicationLogo className=""/>
                        <div className="md:flex flex-col font-bold text-black hidden">
                            <div className="">
                                Self Service
                            </div>
                            <div className="">
                                Achievement Packaging
                            </div>
                        </div>
                    </Link>
                    <ul className="flex items-center justify-between space-x-3">
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("dashboard") &&
                                    "text-red-600 underline underline-offset-4 decoration-2"
                                } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                href={route("dashboard")}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Trigger>
                                <div
                                    className={`flex items-center px-3 py-2 font-bold leading-snug duration-500 cursor-pointer ${
                                    route().current("admin.achievement.*") || route().current("admin.recapitulation.*")
                                        ? "text-red-600 underline underline-offset-4 decoration-2"
                                        : "hover:text-red-600 hover:underline hover:decoration-2 hover:underline-offset-4"
                                    }`}
                                >Achievement
                                </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("admin.achievement.index")} className={`block font-semibold ${route().current('admin.achievement.index') && 'text-red-600'} hover:text-red-600`}>
                                        Detail
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("admin.recapitulation.index")} className={`block font-semibold ${route().current('admin.recapitulation.index') && 'text-red-600'} hover:text-red-600`}>
                                        Rekapitulasi
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("admin.employee.*") &&
                                    "text-red-600 underline underline-offset-4 decoration-2"
                                } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                href={route("admin.employee.index")}
                            >
                                Employee
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("admin.products.*") &&
                                    "text-red-600 underline underline-offset-4 decoration-2"
                                } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                href={route("admin.products.index")}
                            >
                                Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("admin.parcel.*") &&
                                    "text-red-600 underline underline-offset-4 decoration-2"
                                } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                href={route("admin.parcel.index")}
                            >
                                Parcel
                            </Link>
                        </li>
                        <li className="cursor-pointer">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <img
                                        className={`${
                                            route().current(
                                                "admin.profile.*"
                                            ) &&
                                            "w-10 rounded-full outline outline-red-500"
                                        } w-10 duration-100 rounded-full hover:outline outline-red-500 `}
                                        href={route("admin.profile.index")}
                                        src="/profil.png"
                                    ></img>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route("admin.profile.index")} className="hover:text-red-600"
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        method="post"
                                        href={route("logout")} className="hover:text-red-600" as="button"
                                    >
                                        Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </div>    
        );
    } else if (roles == "Leader") {
        return (
            <div className="w-full bg-white shadow-md py-2">
                <nav className="container flex items-center justify-between mx-auto">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <ApplicationLogo className=""/>
                        <div className="md:flex flex-col font-bold text-black hidden">
                            <div className="">
                                Self Service
                            </div>
                            <div className="">
                                Achievement Packaging
                            </div>
                        </div>
                    </Link>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("dashboard") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("dashboard")}
                                >
                                    
                                    Dashboard
                                </a>
                            </li>

                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                    <div
                                        className={`flex items-center px-3 py-2 font-bold leading-snug duration-500 cursor-pointer ${
                                        route().current("leader.achievement.*") || route().current("leader.recapitulation.*")
                                            ? "text-red-600 underline underline-offset-4 decoration-2"
                                            : "hover:text-red-600 hover:underline hover:decoration-2 hover:underline-offset-4"
                                        }`}
                                    >Achievement
                                    </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("leader.achievement.index")} className={`block font-semibold ${route().current('leader.achievement.index') && 'text-red-600'} hover:text-red-600`}>
                                            Detail
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route("leader.recapitulation.index")} className={`block font-semibold ${route().current('leader.recapitulation.index') && 'text-red-600'} hover:text-red-600`}>
                                            Rekapitulasi
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                            <li className="cursor-pointer">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <img
                                            className={`${
                                                route().current(
                                                    "leader.profile.*"
                                                ) &&
                                                "w-10 rounded-full outline outline-red-500"
                                            } w-10 duration-100 rounded-full hover:outline outline-red-500 `}
                                            href={route("leader.profile.index")}
                                            src="/profil.png"
                                        ></img>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("leader.profile.index")} className="hover:text-red-600"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            method="post"
                                            href={route("logout")} className="hover:text-red-600"
                                            as="button"
                                        >
                                            Logout
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    } else  {
        return (
            <div className="w-full bg-white shadow-md py-2">
                <nav className="container flex items-center justify-between mx-auto">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                            <ApplicationLogo className=""/>
                            <div className="md:flex flex-col font-bold text-black hidden">
                                <div className="">
                                    Self Service
                                </div>
                                <div className="">
                                    Achievement Packaging
                                </div>
                            </div>
                        </Link>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a
                                    className={`flex items-center px-3 py-2 font-bold leading-snug duration-500 text-navbar hover:text-red-600 hover:underline hover:decoration-2 hover:underline-offset-4 ${
                                        route().current("dashboard")
                                            ? "text-red-600 underline"
                                            : ""
                                    }`}
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`flex items-center px-3 py-2 font-bold leading-snug duration-500 text-navbar hover:text-red-600 hover:underline hover:decoration-2 hover:underline-offset-4 ${
                                        route().current("achievement.create")
                                            ? "text-red-600 underline"
                                            : ""
                                    }`}
                                    href={route("achievement.create")}
                                >
                                    Achievement
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`flex items-center px-3 py-2 font-bold leading-snug duration-500 text-navbar hover:text-red-600 hover:underline hover:decoration-2 hover:underline-offset-4 ${
                                        route().current("login")
                                            ? "text-red-600 underline"
                                            : ""
                                    }`}
                                    href={route("login")}
                                >
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
