import React, { useEffect, useState } from "react";
import {
    Head,
    Link,
    router,
    useForm,
    InertiaLinkProps,
    usePage,
} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Note, PageProps, PaginatedResponse, Tag } from "@/types";
import IndexHeader from "@/Pages/Note/Partials/IndexHeader";
import NoteTags from "@/Pages/Note/Partials/NoteTags";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import FilledStar from "@/Pages/Note/Partials/FilledStar";
import EmptyStar from "@/Pages/Note/Partials/EmptyStar";

interface NotesProps {
    notes: PaginatedResponse<Note>;
}

const Index = ({
    auth,
    tags,
    filterSearch,
    filterTags,
}: PageProps<{
    tags: Tag[];
    notes: any;
    filterTags: number[];
    filterSearch: string;
}>) => {
    const { data, setData, get, processing, errors, reset } = useForm({
        search: filterSearch,
    });
    const [mobileFilter, setMobileFilter] = useState(false);
    const [filters, setFilters] = useState<number[]>(filterTags);
    // @ts-ignore
    const { notes: initialNotes } = usePage<NotesProps>().props;
    const [notes, setNotes] = useState<Note[]>(initialNotes.data);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(
        initialNotes.next_page_url
    );
    const [loading, setLoading] = useState<boolean>(false);

    const loadMore = async () => {
        if (loading || !nextPageUrl) return;

        setLoading(true);

        try {
            const response = await axios.get<PaginatedResponse<Note>>(
                nextPageUrl
            );
            setNotes((prevNotes) => [...prevNotes, ...response.data.data]);
            setNextPageUrl(response.data.next_page_url);
        } catch (error) {
            console.error("Error fetching more notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;

        if (loading || nextPageUrl === null) return;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loadMore();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [nextPageUrl, loading]);

    const submitTagsFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get("/notes/", { filterTags: filters });
    };

    const changeTagsFilter = (
        e: React.ChangeEvent<HTMLInputElement>,
        tagId: number
    ) => {
        setFilters((prevFilters) => {
            let newFilters = [...prevFilters];

            if (e.target.checked) {
                newFilters.push(tagId);
            } else {
                newFilters = newFilters.filter((id) => id !== tagId);
            }
            return newFilters;
        });
    };

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get("/notes/");
    };

    return (
        <>
            <Head title="Notes" />
            <Layout user={auth.user} header={<IndexHeader user={auth.user} />}>
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="flex flex-col-reverse gap-12 pb-10 lg:flex-row lg:justify-center xl:gap-x-16">
                            <div className="flex-1">
                                {/*Search Note*/}
                                <div
                                    style={{ boxShadow: "0 0 10px 10px #fff" }}
                                    className="m-2 sticky top-[10px] self-start min-w-[300px] xl:min-w-[350px]"
                                >
                                    <form method="get" onSubmit={submitSearch}>
                                        <label
                                            htmlFor="notes-search"
                                            className="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative flex rounded-lg shadow-sm">
                                            <input
                                                type="search"
                                                id="notes-search"
                                                value={data.search}
                                                onChange={(e) =>
                                                    setData(
                                                        "search",
                                                        e.target.value
                                                    )
                                                }
                                                name="search"
                                                minLength={3}
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
                                                disabled={processing}
                                                type="submit"
                                                className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Notes */}
                                {notes &&
                                    notes.map((note: Note) => (
                                        <Link
                                            key={note.id}
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
                                    ))}

                                {loading && <div>Loading more notes...</div>}
                            </div>

                            {/* Filter Notes LG */}
                            <aside
                                className="lg:sticky lg:top-[10px] lg:self-start lg:min-w-[250px] hidden lg:block"
                                style={{ flex: "0 1 0" }}
                            >
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-2xl dark:text-white mb-4">
                                        Tag Filter
                                    </h3>
                                    <div>
                                        <PrimaryButton
                                            form="filterTagsForm"
                                            type="submit"
                                        >
                                            Filter
                                        </PrimaryButton>
                                        <SecondaryButton
                                            className="px-2 ml-1"
                                            onClick={() =>
                                                router.visit(`/notes`)
                                            }
                                        >
                                            X
                                        </SecondaryButton>
                                    </div>
                                </div>

                                <div>
                                    <form
                                        id="filterTagsForm"
                                        method="GET"
                                        onSubmit={submitTagsFilter}
                                    >
                                        <div className="grid space-y-2">
                                            {tags &&
                                                tags.map((tag: Tag) => (
                                                    <label
                                                        key={tag.id}
                                                        htmlFor={`tag-filter-${tag.id}`}
                                                        className="cursor-pointer drop-shadow-sm hover:drop-shadow max-w-xs flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                                    >
                                                        <input
                                                            checked={filters.includes(
                                                                tag.id
                                                            )}
                                                            onChange={(e) => {
                                                                changeTagsFilter(
                                                                    e,
                                                                    tag.id
                                                                );
                                                            }}
                                                            type="checkbox"
                                                            name={`tagFilter[${tag.id}]`}
                                                            className="filter-tag shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            id={`tag-filter-${tag.id}`}
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
                            <div className="block lg:hidden fixed bottom-8 end-6 z-10 rounded-lg dark:bg-neutral-600">
                                <button
                                    onClick={() =>
                                        setMobileFilter(!mobileFilter)
                                    }
                                    className="filter-tags-icon"
                                >
                                    <span className="inline-flex justify-center items-center size-[46px] rounded-full bg-indigo-500 text-white dark:bg-indigo-400">
                                        <svg
                                            className="flex-shrink-0 size-5"
                                            height="24"
                                            version="1.1"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g transform="translate(0 -1028.4)">
                                                <path
                                                    d="m10 11v10l4 3v-13h-4z"
                                                    fill="#bdc3c7"
                                                    transform="translate(0 1028.4)"
                                                />
                                                <path
                                                    d="m10 11v10l2 1.5v-11.5h-2z"
                                                    fill="#95a5a6"
                                                    transform="translate(0 1028.4)"
                                                />
                                                <path
                                                    d="m1 1028.4 9 11h4l9-11z"
                                                    fill="#95a5a6"
                                                />
                                                <path
                                                    d="m1 1028.4 9 11h2v-11z"
                                                    fill="#7f8c8d"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            {/* Filter Notes SM */}
                            <div
                                className={`filter-tags-popup ${
                                    mobileFilter ? "" : "hidden"
                                } bg-green-200 top-0 left-0 w-full h-full fixed z-20 flex flex-col`}
                            >
                                <header className="flex flex-row items-center justify-between h-10 bg-gray-700 text-white">
                                    <PrimaryButton
                                        className="tags-filter-popup-close ml-3"
                                        onClick={() =>
                                            setMobileFilter(!mobileFilter)
                                        }
                                    >
                                        X
                                    </PrimaryButton>
                                    <label> Tags Filter</label>
                                    <SecondaryButton
                                        className="px-2 mr-3"
                                        onClick={() => router.visit(`/notes`)}
                                    >
                                        Clear
                                    </SecondaryButton>
                                </header>

                                <div className="flex-1 overflow-y-auto bg-gray-100">
                                    <form
                                        id="popupFilterTagsForm"
                                        method="GET"
                                        onSubmit={submitTagsFilter}
                                        className="space-y-2 p-2"
                                    >
                                        {tags &&
                                            tags.map((tag: Tag) => (
                                                <label
                                                    key={tag.id}
                                                    htmlFor={`tag-filter-${tag.id}`}
                                                    className="cursor-pointer drop-shadow-sm hover:drop-shadow flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <input
                                                        checked={filters.includes(
                                                            tag.id
                                                        )}
                                                        onChange={(e) => {
                                                            changeTagsFilter(
                                                                e,
                                                                tag.id
                                                            );
                                                        }}
                                                        type="checkbox"
                                                        name={`tagFilter[${tag.id}]`}
                                                        className="filter-tag shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                        id={`tag-filter-${tag.id}`}
                                                    />
                                                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                        {tag.name}
                                                    </span>
                                                </label>
                                            ))}
                                    </form>
                                </div>
                                <button
                                    form="popupFilterTagsForm"
                                    type="submit"
                                    className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Index;
