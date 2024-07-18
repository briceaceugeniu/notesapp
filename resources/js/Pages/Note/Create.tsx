import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { OptionType, PageProps, Tag } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import MarkdownEditor from "@uiw/react-markdown-editor";
import makeAnimated from "react-select/animated";
import Select, { MultiValue } from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth, tags }: PageProps<{ tags: Tag[] }>) => {
    const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;
    const animatedComponents = makeAnimated();

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: mdStr,
        tags: [],
    });

    const tagsOptions: OptionType[] = tags.map((tag: Tag) => {
        return {
            value: tag.id,
            label: tag.name,
        };
    });

    const handleOptionChange = (values: any) => {
        setData(
            "tags",
            values.map((tag: OptionType) => tag.value)
        );
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        post("/notes/create");
    };

    return (
        <>
            <Head title="Create Note" />
            <Layout user={auth.user}>
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <form onSubmit={submitForm}>
                            {/*Note Title*/}
                            <div className="mt-3">
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    minLength={3}
                                    maxLength={254}
                                    value={data.title}
                                    className="mt-1 block p-1 w-full"
                                    autoComplete="title"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            {/*Note Content*/}
                            <div data-color-mode="light" className="mt-3">
                                <InputLabel htmlFor="content" value="Content" />
                                <MarkdownEditor
                                    className="resize-y mt-1"
                                    value={data.content}
                                    height="200px"
                                    onChange={(value) =>
                                        setData("content", value)
                                    }
                                />

                                <textarea
                                    readOnly={true}
                                    hidden={true}
                                    name="content"
                                    value={data.content}
                                />
                                <InputError
                                    message={errors.content}
                                    className="mt-2"
                                />
                            </div>

                            {/*Note Tags*/}
                            <div className="mt-3">
                                <InputLabel htmlFor="tags" value="Tags" />
                                <Select
                                    name="tags"
                                    onChange={(values) =>
                                        handleOptionChange(values)
                                    }
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    isMulti
                                    className="mt-1"
                                    options={tagsOptions}
                                />
                                <InputError
                                    message={errors.tags}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                disabled={processing}
                                type="submit"
                                className="mt-3"
                            >
                                Save
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Create;
