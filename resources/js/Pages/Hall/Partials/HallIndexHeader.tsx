import React from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

const HallIndexHeader = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-row justify-between">
            <div>
                <div className="font-mono inline-block sm:hidden">
                    Hall of Fame..
                </div>
                <div className="font-mono">..and Shame!</div>
            </div>
            {user ? (
                <Link
                    href={route("hall.create")}
                    className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Create Project
                </Link>
            ) : (
                ""
            )}
        </div>
    );
};

export default HallIndexHeader;
