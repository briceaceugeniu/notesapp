import React from "react";
import { Note, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MarkdownEditor from "@uiw/react-markdown-editor";

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
                    {note.tags &&
                        note.tags.map((tag: any) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1
                                        text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                            >
                                {tag.name}
                            </span>
                        ))}
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
