import React from "react";
import { Note, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MarkdownEditor from "@uiw/react-markdown-editor";
import NoteTags from "@/Pages/Note/Partials/NoteTags";

const Show = ({ auth, note }: PageProps<{ note: Note }>) => {
    return (
        <>
            <Head title="Show" />
            <Layout
                user={auth.user}
                header={
                    <span>
                        Note: <i>{note.title}</i>
                    </span>
                }
            >
                <div className="py-4 shadow p-2 bg-ct2">
                    <NoteTags tags={note.tags} />
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
