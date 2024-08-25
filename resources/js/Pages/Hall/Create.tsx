import React from "react";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth }: PageProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        begin: "",
        finish: "",
        icon: "",
    });

    const submitProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route(`hall.store`));
    };

    return (
        <>
            <Head title="Create Project" />
            <Layout user={auth.user} header={<span>Create new Project</span>}>
                <div>
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="container mx-auto p-2">
                            <form method="POST" onSubmit={submitProject}>
                                {/* Project Title */}
                                <div className="mb-4">
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
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setData("title", e.target.value)}
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Project current position / Project final value */}
                                <div className="flex flex-row justify-between mb-4">
                                    <div className="w-full mr-2">
                                        <InputLabel
                                            htmlFor="begin"
                                            value="Begin at"
                                        />
                                        <TextInput
                                            id="begin"
                                            type="number"
                                            name="begin"
                                            className="mt-1 block p-1 w-full"
                                            min={0}
                                            value={data.begin}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setData("begin", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.begin}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="finish"
                                            value="Ends at"
                                        />
                                        <TextInput
                                            id="finish"
                                            type="number"
                                            name="finish"
                                            className="mt-1 block p-1 w-full"
                                            min={0}
                                            value={data.finish}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setData(
                                                    "finish",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.finish}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Project Emoji */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="icon"
                                        value="Icon / Emoji"
                                    />
                                    <TextInput
                                        id="icon"
                                        type="text"
                                        name="icon"
                                        className="mt-1 block p-1 w-full"
                                        minLength={2}
                                        placeholder="Enter an emoji that represent your project, like 🎨"
                                        value={data.icon}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setData("icon", e.target.value)}
                                    />
                                    <InputError
                                        message={errors.icon}
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
                                <SecondaryButton
                                    type="button"
                                    className="ml-2"
                                    onClick={() =>
                                        router.visit(route(`hall.index`))
                                    }
                                >
                                    Go back
                                </SecondaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Create;
