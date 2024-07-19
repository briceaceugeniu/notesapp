import React from "react";
import { Note, PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MarkdownEditor from "@uiw/react-markdown-editor";
import NoteTags from "@/Pages/Note/Partials/NoteTags";
import ShowHeader from "@/Pages/Note/Partials/ShowHeader";

const Show = ({ auth, note }: PageProps<{ note: Note }>) => {
    const { delete: destroy } = useForm();
    const deleteNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        destroy(`/notes/${note.id}`);
    };

    return (
        <>
            <Head title={note.title} />
            <Layout user={auth.user} header={<ShowHeader note={note} />}>
                <div className="py-4 shadow p-2 bg-ct2">
                    <div className="flex flex-row justify-between">
                        <NoteTags tags={note.tags} />
                        {auth.user ? (
                            <div>
                                <Link
                                    href={`/notes/${note.id}/edit`}
                                    className="py-1 px-3 ml-3 bg-cyan-400 text-white text-sm font-semibold rounded-md shadow-md shadow-cyan-400/40 hover:shadow-cyan-500/50 hover:bg-cyan-500"
                                >
                                    Edit
                                </Link>
                                <button
                                    form="delete_note"
                                    type="submit"
                                    className="py-1 px-3 ml-3 bg-red-400 text-white text-sm font-semibold rounded-md shadow-md shadow-red-400/40
                    hover:shadow-red-500/50 hover:bg-red-500"
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
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6 mt-2">
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
