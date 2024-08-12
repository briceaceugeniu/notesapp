import React, { HTMLAttributes, useEffect, useState } from "react";
import { Project } from "@/types";
import InProgressProject from "@/Pages/Hall/Partials/InProgressProject";

const CurrentProjectArea = ({
    cls,
    lastActivity,
}: {
    cls: string;
    lastActivity: Project;
}) => {
    const [visibleDiv, setVisibleDiv] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleDiv((prevDiv) => (prevDiv === 1 ? 2 : 1));
        }, 4000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className={`${cls} shadow p-2 bg-ct2`}>
            <div className="relative">
                <div
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        visibleDiv === 1 ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h4 className="text-lg font-mono font-bold">
                        Currently, I am working on…
                    </h4>
                    <div className="text-gray-500 dark:text-neutral-400 font-mono">
                        .. making this website look decent!
                    </div>
                </div>

                <div
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        visibleDiv === 2 ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h4 className="text-lg font-mono font-bold">
                        Last activities..
                    </h4>
                    <div className="text-gray-500 dark:text-neutral-400 font-mono">
                        updated: {timeSince(lastActivity.updated_at)}
                    </div>
                    <InProgressProject project={lastActivity} />
                </div>
            </div>
        </div>
    );
};

function timeSince(datetime: string): string {
    const now: Date = new Date();
    const past: Date = new Date(datetime);
    const diffInMs: number = now.getTime() - past.getTime();

    const msInMinute: number = 60 * 1000;
    const msInHour: number = 60 * msInMinute;
    const msInDay: number = 24 * msInHour;

    const days: number = Math.floor(diffInMs / msInDay);
    const hours: number = Math.floor((diffInMs % msInDay) / msInHour);
    const minutes: number = Math.floor((diffInMs % msInHour) / msInMinute);

    let result: string = "";

    if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""}`;
    }
    if (hours > 0) {
        if (result) result += ", ";
        result += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
        if (result) result += ", ";
        result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return result ? `${result} ago` : "Just now";
}

export default CurrentProjectArea;
