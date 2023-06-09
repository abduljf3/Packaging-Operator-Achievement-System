import React, { useState } from "react";

export default function ToggleDarkMode({ props, classname }) {
    const [darkMode, setDarkMode] = useState(false);
    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="flex items-center">
            <span className="mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            </span>
            <label
                htmlFor="darkModeToggle"
                className="flex items-center cursor-pointer"
            >
                <div className="relative">
                    <input
                        id="darkModeToggle"
                        type="checkbox"
                        className="sr-only"
                        checked={darkMode}
                        onChange={handleToggle}
                    />
                    <div className="w-10 h-4 mt-1 bg-gray-400 rounded-full shadow-inner"></div>
                    <div
                        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full  transition-transform duration-300 ease-in-out transform ${
                            darkMode ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                </div>
            </label>
            <span className="ml-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>
            </span>
        </div>
    );
}
