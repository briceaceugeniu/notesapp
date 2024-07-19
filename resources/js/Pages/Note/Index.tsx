import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Note, PageProps, Tag } from "@/types";
import Header from "@/Pages/Note/Partials/Header";
import NoteTags from "@/Pages/Note/Partials/NoteTags";

const Index = ({
    auth,
    notes,
    tags,
    filterTags,
}: PageProps<{ tags: Tag[]; notes: Note[]; filterTags: number[] }>) => {
    return (
        <>
            <Head title="Notes" />
            <Layout user={auth.user} header={<Header user={auth.user} />}>
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="flex flex-col-reverse gap-12 pb-10 lg:flex-row lg:justify-center xl:gap-x-16">
                            <div className="flex-1">
                                {/*Search Note*/}
                                <div
                                    style={{ boxShadow: "0 0 10px 10px #fff" }}
                                    className="m-2 sticky top-[10px] self-start min-w-[300px] xl:min-w-[350px]"
                                >
                                    <form method="get">
                                        <label
                                            htmlFor="hs-trailing-button-add-on-with-icon-and-button"
                                            className="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative flex rounded-lg shadow-sm">
                                            <input
                                                required
                                                type="search"
                                                id="hs-trailing-button-add-on-with-icon-and-button"
                                                name="search"
                                                className="py-2 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            />
                                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                                <svg
                                                    className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle
                                                        cx="11"
                                                        cy="11"
                                                        r="8"
                                                    ></circle>
                                                    <path d="m21 21-4.3-4.3"></path>
                                                </svg>
                                            </div>
                                            <button
                                                type="submit"
                                                className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/*Notes*/}
                                {notes &&
                                    notes.map((note, index) => (
                                        <Link
                                            key={note.id}
                                            href={`notes/${note.id}`}
                                            className="block m-2"
                                        >
                                            <div className="p-3 bg-gray-100 rounded shadow-sm hover:shadow-md hover:bg-gray-200">
                                                <div>
                                                    <div className="text-xl font-medium text-black">
                                                        {note.title}
                                                    </div>
                                                    <NoteTags
                                                        tags={note.tags}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <aside
                                className="xl:sticky xl:top-[10px] xl:self-start xl:min-w-[350px] hidden lg:block"
                                style={{ flex: "0 1 0" }}
                            >
                                <h3 className="text-2xl dark:text-white mb-4">
                                    Tag Filter
                                </h3>
                                <div className="">
                                    <form method="get">
                                        <div className="grid space-y-2">
                                            {tags &&
                                                tags.map((tag: Tag) => (
                                                    <label
                                                        key={tag.id}
                                                        htmlFor="tag-filter-{{ $tag->id }}"
                                                        className="cursor-pointer drop-shadow-sm hover:drop-shadow max-w-xs flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                                    >
                                                        <input
                                                            // checked={filterTags.includes(tag.id)}
                                                            type="checkbox"
                                                            name="tag-filter[{{ $tag->id }}]"
                                                            className="filter-tag shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            id="tag-filter-{{ $tag->id }}"
                                                        />
                                                        <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                            {tag.name}
                                                        </span>
                                                    </label>
                                                ))}
                                        </div>
                                    </form>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Index;
