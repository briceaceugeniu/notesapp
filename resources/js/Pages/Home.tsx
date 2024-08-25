import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Note, PageProps, Project } from "@/types";
import GreetingText from "@/Components/GreetingText";
import React from "react";
import FilledStar from "@/Pages/Note/Partials/FilledStar";
import EmptyStar from "@/Pages/Note/Partials/EmptyStar";
import NoteTags from "@/Pages/Note/Partials/NoteTags";
import CurrentProjectArea from "@/Components/CurrentProjectArea";
import AboutMe from "@/Components/AboutMe";

function Home({
    auth,
    favoriteNotes,
    lastActivity,
}: PageProps<{ favoriteNotes: Note[]; lastActivity: Project }>) {
    return (
        <>
            <Head title="Home" />
            <Layout user={auth.user} header={<GreetingText />}>
                <div className="py-2">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-rows-3 lg:grid-flow-col gap-4 lg:h-80vh">
                            {/*About me*/}
                            <AboutMe className="row-span-1 sm:row-span-1 md:row-span-3" />

                            {/*Current project / Success*/}
                            <CurrentProjectArea
                                lastActivity={lastActivity}
                                cls="col-span-1 sm:col-span-1 md:col-span-2 min-h-44"
                            />

                            {/*Favorite Notes*/}
                            <div className="row-span-1 sm:row-span-1 md:row-span-2 col-span-1 sm:col-span-2 md:col-span-2 p-2 shadow bg-ct2">
                                <h4 className="text-lg font-mono font-bold">
                                    Favorite Notes
                                </h4>
                                <div className="text-gray-500 dark:text-neutral-400 font-mono">
                                    {favoriteNotes &&
                                        favoriteNotes.map((note: Note) => (
                                            <div key={note.id}>
                                                <Link
                                                    href={`notes/${note.id}`}
                                                    className="block m-2"
                                                >
                                                    <div className="p-3 bg-gray-100 rounded shadow-sm hover:shadow-md hover:bg-gray-200">
                                                        <div>
                                                            <div className="flex flex-row justify-between">
                                                                <div className="text-xl font-medium text-black">
                                                                    {note.title}
                                                                </div>
                                                                <div>
                                                                    {note.favorite ? (
                                                                        <FilledStar />
                                                                    ) : (
                                                                        <EmptyStar />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <NoteTags
                                                                tags={note.tags}
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <hr />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Home;
