import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {PageProps} from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

const Create = ({auth}: PageProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        tag: []
    });

    return (
        <>
            <Head title="Create Note" />
            <Layout user={auth.user}>
                <InputLabel htmlFor="title" value="Title" />

                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                />

                <InputError message={errors.title} className="mt-2" />
            </Layout>
        </>
    );
};

export default Create;
