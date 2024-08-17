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
                    <InProgressProject project={lastActivity} />
                </div>
            </div>
        </div>
    );
};

export default CurrentProjectArea;
