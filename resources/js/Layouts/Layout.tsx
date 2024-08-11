import { useState, PropsWithChildren, ReactNode } from "react";
import NavLink from "@/Components/NavLink";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import assert from "node:assert";

const Layout = ({
    user,
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode; user: User }>) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(
        false
    );

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <div className="flex flex-row flex-shrink-0 items-center unselectable">
                                    <ApplicationLogo className="h-12 w-12" />
                                    <h6 className="text-lg ml-3 font-mono font-bold bg-gradient-to-r from-red-600 via-red-300 to-red-700 text-transparent bg-clip-text">
                                        briceacnotes
                                    </h6>
                                </div>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        href={route("notes.index")}
                                        active={route().current("notes.*")}
                                    >
                                        Notes
                                    </NavLink>
                                    <NavLink
                                        href={route("hall.index")}
                                        active={route().current("hall.*")}
                                    >
                                        Hall of Fame
                                    </NavLink>
                                    <NavLink
                                        href={route("contact")}
                                        active={route().current("contact")}
                                    >
                                        Contact
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <div className="relative ml-3">
                                    <div>
                                        {user ? (
                                            <Link href={route(`dashboard`)}>
                                                <span>🔓</span>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                <span>🔐</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="flex flex-col items-center justify-between">
                        <ResponsiveNavLink
                            href={route("notes.index")}
                            active={route().current("notes.*")}
                        >
                            Notes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("hall.index")}
                            active={route().current("hall.*")}
                        >
                            Hall of Fame
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("contact")}
                            active={route().current("contact")}
                        >
                            Contact
                        </ResponsiveNavLink>
                    </div>
                    <div className="p-1">
                        {user ? (
                            <Link href={route(`dashboard`)}>
                                <span>🔓</span>
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                <span>🔐</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-6">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900">
                            {header}
                        </h3>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
};

export default Layout;
