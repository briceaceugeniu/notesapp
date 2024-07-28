import React from "react";
import { PageProps, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import HallIndexHeader from "@/Pages/Hall/Partials/HallIndexHeader";

const Index = ({
    auth,
    inProgress,
    finished,
}: PageProps<{ inProgress: Project[]; finished: Project[] }>) => {
    return (
        <>
            <Head title="Notes" />
            <Layout
                user={auth.user}
                header={<HallIndexHeader user={auth.user} />}
            >
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="container mx-auto mt-3">
                            <div className="flex flex-col">
                                <div className="max-h-72 shadow p-2 pt-0 overflow-auto bg-ct2">
                                    <h4 className="text-lg font-mono font-bold top-0 z-20 sticky bg-ct1 shadow-ct1">
                                        Things started and not (yet) finished :(
                                    </h4>
                                    <div className="lg:mx-16 mt-2 p-1">
                                        {inProgress ? (
                                            inProgress.map((project) => {
                                                const percentage = Math.round(
                                                    (project.currentAt /
                                                        project.finishAt) *
                                                        100
                                                );
                                                return (
                                                    <div
                                                        key={project.id}
                                                        className="flex flex-row relative my-2 p-2 border-dashed border-4 border-indigo-500/50 rounded"
                                                    >
                                                        <div className="mr-2">
                                                            <div className="flex justify-center items-center inline-block size-[46px] text-3xl rounded-lg">
                                                                {project.icon}
                                                            </div>
                                                        </div>

                                                        <div className="w-full">
                                                            <div className="mb-2 flex justify-between items-center">
                                                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                                                                    {
                                                                        project.title
                                                                    }
                                                                </h3>
                                                                <span className="text-sm text-gray-800 dark:text-white">
                                                                    {percentage}
                                                                    %
                                                                </span>
                                                            </div>

                                                            {/*@ts-ignore*/}
                                                            <div
                                                                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                                                                role="progressbar"
                                                                aria-valuenow={
                                                                    percentage
                                                                }
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

                                                        {auth && (
                                                            <div className="absolute bottom-0 right-0 pr-1">
                                                                <Link
                                                                    href={`${route(
                                                                        "hall.edit",
                                                                        {
                                                                            project:
                                                                                project.id,
                                                                        }
                                                                    )}`}
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
                                            })
                                        ) : (
                                            <div className="mono">Empty..</div>
                                        )}
                                    </div>
                                </div>

                                <div className="h-full shadow mt-3 font-mono bg-ct2">
                                    <div className="h-96 p-2">
                                        <h4 className="text-lg font-mono font-bold">
                                            Achievements 🎉🏆🎆
                                        </h4>

                                        <div className="my-2">
                                            <h6>Live tracking</h6>
                                            <div className="flex flex-row mt-px">
                                                <img
                                                    src="https://tryhackme-badges.s3.amazonaws.com/Karamasow.png"
                                                    alt="TryHackMe"
                                                />
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="my-2">
                                            <h6>Finished!</h6>
                                            <div className="flex flex-row mt-px">
                                                {finished ? (
                                                    finished.map((project) => {
                                                        return (
                                                            <div
                                                                key={project.id}
                                                                className="mr-2 border-double border-4 border-emerald-600 rounded-md bg-emerald-200"
                                                            >
                                                                <div className="hs-tooltip [--placement:top] inline-block">
                                                                    <button
                                                                        type="button"
                                                                        className="hs-tooltip-toggle"
                                                                    >
                                                                        <div className="flex justify-center items-center inline-block size-[46px] text-3xl rounded-lg">
                                                                            {
                                                                                project.icon
                                                                            }
                                                                            <span
                                                                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 mb-1 py-1 px-2 bg-gray-900 text-sm font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                                                                role="tooltip"
                                                                            >
                                                                                {
                                                                                    project.title
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div>Nothing :(</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Index;
