import React from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

const Header = ({ user }: { user: User }) => {
    console.log(user);

    return (
        <div className="flex flex-row justify-between">
            <span>📝</span>
            {user ? (
                <Link
                    href={route("notes.create")}
                    className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Create new Note
                </Link>
            ) : (
                ""
            )}
        </div>
    );
};

export default Header;
