import React from "react";
import Dropdown from "@/Components/Dropdown";

export default function Navbar({ roles, props, auth, header }) {
    if (roles === "operator") {
        return (
            <div className="py-3 border bg-white border-t-neutral-400">
                <nav className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 className="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("dashboard") &&
                                        "text-red-600 underline underline-offset-4"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("dashboard")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href="#pablo"
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("login")}
                                >
                                    {" "}
                                    Login{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    } else if (roles == "admin") {
        return (
            <div className="py-3 border bg-white border-t-neutral-400">
                <nav className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 className="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
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
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current(
                                            "admin.achievement.*"
                                        ) &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("admin.achievement.index")}
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("admin.employee.*") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("admin.employee.index")}
                                >
                                    {" "}
                                    Operator{" "}
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("admin.products.*") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("admin.products.index")}
                                >
                                    {" "}
                                    Product{" "}
                                </a>
                            </li>
                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <img
                                            className={`${
                                                route().current(
                                                    "profile.edit"
                                                ) &&
                                                "w-10 rounded-full outline outline-red-500"
                                            } w-10 duration-100 rounded-full hover:outline outline-red-500 `}
                                            href={route("profile.edit")}
                                            src="/profil.png"
                                        ></img>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            method="post"
                                            href={route("logout")}
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
    } else if (roles == "leader") {
        return (
            <div className="py-3 border bg-white border-t-neutral-400">
                <nav className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 className="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("leader.dashboard") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("leader.dashboard")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>

                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <a
                                            className={`${
                                                route().current(
                                                    "leader.detail && leader.rekapitulasi"
                                                ) &&
                                                "text-red-600 underline underline-offset-4 decoration-2"
                                            } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                            href="#"
                                        >
                                            {" "}
                                            Report{" "}
                                        </a>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("leader.rekapitulasi")}
                                        >
                                            Rekapitulasi
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("leader.detail")}
                                        >
                                            Detail
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <img
                                            className={`${
                                                route().current(
                                                    "profile.edit"
                                                ) &&
                                                "w-10 rounded-full outline outline-red-500"
                                            } w-10 duration-100 rounded-full hover:outline outline-red-500 `}
                                            href={route("profile.edit")}
                                            src="/profil.png"
                                        ></img>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            method="post"
                                            href={route("logout")}
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
    } else if (roles == "login") {
        return (
            <div className="py-3 border bg-white border-t-neutral-400">
                <nav className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 className="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a className="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar">
                                    {" "}
                                    Welcome!{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    } else {
        return (
            <div className="py-3 border bg-white border-t-neutral-400">
                <nav className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 className="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div className="flex gap-5">
                        <ul className="flex items-center justify-between gap-5">
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("welcome") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("welcome")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`${
                                        route().current("achievementCreate") &&
                                        "text-red-600 underline underline-offset-4 decoration-2"
                                    } flex items-center px-3 py-2 font-bold leading-snug duration-500  hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4`}
                                    href={route("achievementCreate")}
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("login")}
                                >
                                    {" "}
                                    Login{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
