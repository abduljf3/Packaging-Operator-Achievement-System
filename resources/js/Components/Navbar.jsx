import React from "react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Navbar({ roles, props, auth, header }) {
    if (roles === "operator") {
        return (
            <div class="py-3 border bg-white border-t-neutral-400">
                <nav class="container flex items-center justify-between mx-auto">
                    <div class="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 class="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div class="flex gap-5">
                        <ul class="flex items-center justify-between gap-5">
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("dashboard")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href="#pablo"
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>

                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
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
                        <h1 class="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div class="flex gap-5">
                        <ul class="flex items-center justify-between gap-5">
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("dashboard")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href="#pablo"
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>

                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("login")}
                                >
                                    {" "}
                                    Operator{" "}
                                </a>
                            </li>

                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("login")}
                                >
                                    {" "}
                                    Product{" "}
                                </a>
                            </li>
                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <img
                                            className="w-10 hover:outline outline-red-500 rounded-full duration-100"
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
            <div class="py-3 border bg-white border-t-neutral-400">
                <nav class="container flex items-center justify-between mx-auto">
                    <div class="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 class="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div class="flex gap-5">
                        <ul class="flex items-center justify-between gap-5">
                            <li class="nav-item">
                                <a class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar">
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
            <div class="py-3 border bg-white border-t-neutral-400">
                <nav class="container flex items-center justify-between mx-auto">
                    <div class="flex items-center">
                        <img
                            src="/perusahaan.png"
                            alt="Image"
                            className="h-14"
                        />
                        <h1 class="text-xl font-bold text-black">
                            Packaging Operator<br></br>Achievement System
                        </h1>
                    </div>
                    <div class="flex gap-5">
                        <ul class="flex items-center justify-between gap-5">
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("welcome")}
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
                                    href={route("operatorachievement.create")}
                                >
                                    {" "}
                                    Achievement{" "}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="flex items-center px-3 py-2 font-bold leading-snug duration-500  text-navbar hover:text-red-600 hover:underline hover:decoration-2  hover:underline-offset-4"
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
