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
                                    form="delete_note"
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
                </div>
            </Layout>
        </>
    );
};

export default Show;
