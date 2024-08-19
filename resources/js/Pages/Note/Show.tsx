import React, { useState } from "react";
import { Note, PageProps } from "@/types";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MarkdownEditor from "@uiw/react-markdown-editor";
import NoteTags from "@/Pages/Note/Partials/NoteTags";
import ShowHeader from "@/Pages/Note/Partials/ShowHeader";
import SecondaryButton from "@/Components/SecondaryButton";
import FilledStar from "@/Pages/Note/Partials/FilledStar";
import EmptyStar from "@/Pages/Note/Partials/EmptyStar";
import axios from "axios";

const Show = ({ auth, note }: PageProps<{ note: Note }>) => {
    const { delete: destroy } = useForm();
    const [favorite, setFavorite] = useState(note.favorite);

    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsVisible(true), 10); // Start animation after rendering
    };

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200); // Delay hiding until animation completes
    };

    const deleteNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        destroy(`/notes/${note.id}`);
    };

    const handleFavoriteStarClicked = async () => {
        const response = await axios.patch(`/notes/${note.id}/favorite`);
        if (response.data.success) {
            setFavorite(response.data.favorite);
        }
    };

    const handleDeleteModal = () => {
        openModal();
    };

    return (
        <>
            <Head title={note.title} />
            <Layout user={auth.user} header={<ShowHeader note={note} />}>
                <div className="py-4 shadow p-2 bg-ct2">
                    <div className="flex flex-row justify-between mb-2">
                        <SecondaryButton
                            type="button"
                            className="h-7"
                            onClick={() => router.visit(`/notes`)}
                        >
                            Go back
                        </SecondaryButton>
                        {auth.user ? (
                            <div className="flex align-center">
                                <span className="flex mr-4 ">
                                    <button
                                        onClick={() =>
                                            handleFavoriteStarClicked()
                                        }
                                    >
                                        {favorite ? (
                                            <FilledStar className="cursor-pointer hover:opacity-100" />
                                        ) : (
                                            <EmptyStar className="cursor-pointer hover:opacity-100" />
                                        )}
                                    </button>
                                </span>
                                <Link
                                    href={`/notes/${note.id}/edit`}
                                    className="py-1 px-3 bg-cyan-400 text-white text-sm text-center inline-block font-semibold rounded-md w-16 shadow-md shadow-cyan-400/40 hover:shadow-cyan-500/50 hover:bg-cyan-500"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDeleteModal}
                                    type="submit"
                                    className="py-1 px-3 ml-3 bg-red-400 text-white text-sm font-semibold rounded-md w-16 shadow-md shadow-red-400/40 hover:shadow-red-500/50 hover:bg-red-500"
                                >
                                    Delete
                                </button>
                                <form
                                    onSubmit={(e) => deleteNote(e)}
                                    id="delete_note"
                                    hidden
                                ></form>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <hr />
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6 mt-2">
                        <div className="flex flex-row justify-between">
                            <NoteTags tags={note.tags} className="mb-1" />
                            {!auth.user &&
                                (favorite ? <FilledStar /> : <EmptyStar />)}
                        </div>

                        <MarkdownEditor.Markdown
                            source={note.content}
                            className="p-2"
                        />
                    </div>

                    {isOpen && (
                        <div
                            className={`fixed inset-0 z-10 ${
                                isVisible ? "opacity-100" : "opacity-0"
                            } bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div
                                        className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ease-out duration-300 sm:my-8 sm:w-full sm:max-w-lg ${
                                            isVisible
                                                ? "opacity-100 translate-y-0 sm:scale-100"
                                                : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        }`}
                                    >
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <svg
                                                        className="h-6 w-6 text-red-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <h3
                                                        className="text-base font-semibold leading-6 text-gray-900"
                                                        id="modal-title"
                                                    >
                                                        Delete Note
                                                    </h3>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Are you sure you
                                                            want to delete Note:
                                                            [ {note.title} ]?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                form="delete_note"
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Show;
