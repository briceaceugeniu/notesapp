import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { PageProps, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import HallIndexHeader from "@/Pages/Hall/Partials/HallIndexHeader";
import InProgressProject from "@/Pages/Hall/Partials/InProgressProject";
import TryHackMeLiveTracking from "@/Pages/Hall/Partials/TryHackMeLiveTracking";

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
                <div>
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="container mx-auto mt-3">
                            <div className="flex flex-col">
                                <div className="max-h-[40vh] md:max-h-[50vh] lg:max-h-[40vh] shadow p-2 pt-0 overflow-auto custom-scrollbar bg-ct2">
                                    <h4 className="text-lg font-mono font-bold top-0 z-20 sticky bg-ct1 shadow-ct1">
                                        Things started and not (yet) finished :(
                                    </h4>
                                    <div className="lg:mx-16 mt-2 p-1">
                                        {inProgress && inProgress.length > 0 ? (
                                            inProgress.map(
                                                (project: Project) => (
                                                    <div key={project.id}>
                                                        <InProgressProject
                                                            user={auth.user}
                                                            project={project}
                                                        />
                                                    </div>
                                                )
                                            )
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
                                            <TryHackMeLiveTracking />
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
                                                                <div
                                                                    data-tooltip-id={`my-tooltip-${project.id}`}
                                                                    className="flex justify-center items-center inline-block size-[46px] text-3xl rounded-lg"
                                                                >
                                                                    {
                                                                        project.icon
                                                                    }
                                                                </div>

                                                                <ReactTooltip
                                                                    id={`my-tooltip-${project.id}`}
                                                                    place="top"
                                                                    variant="info"
                                                                    content={
                                                                        project.title
                                                                    }
                                                                />
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
