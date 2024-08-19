import React from "react";
import { PageProps, Project, User } from "@/types";
import { Link } from "@inertiajs/react";

const InProgressProject = ({
    user,
    project,
}: {
    user?: User;
    project: Project;
}) => {
    const percentage = Math.round((project.currentAt / project.finishAt) * 100);

    return (
        <div className="flex flex-row relative my-2 p-2 border-dashed border-4 border-indigo-500/50 rounded">
            <div className="mr-2">
                <div className="flex justify-center items-center inline-block size-[46px] text-3xl rounded-lg">
                    {project.icon}
                </div>
            </div>

            <div className="w-full">
                <div className="mb-2 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                        {project.title}
                    </h3>
                    <span className="text-sm text-gray-800 dark:text-white">
                        <span className="text-xs font-mono mr-3">
                            [updated: {timeSince(project.updated_at)}]
                        </span>
                        <span className="font-bold">{percentage}%</span>
                    </span>
                </div>

                {/*@ts-ignore*/}
                <div
                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                        style={{
                            width: `${percentage}%`,
                        }}
                    ></div>
                </div>
            </div>

            {user && (
                <div className="absolute bottom-0 right-0 pr-1">
                    <Link
                        href={`${route("hall.edit", {
                            project: project.id,
                        })}`}
                    >
                        <span className="inline-flex justify-center items-center size-[24px] rounded-full bg-blue-200 hover:bg-blue-300 text-white dark:bg-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M18.36 2.64a2.5 2.5 0 0 1 3.54 3.54l-12 12L3 21l2.82-6.82z" />
                            </svg>
                        </span>
                    </Link>
                </div>
            )}
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

export default InProgressProject;
