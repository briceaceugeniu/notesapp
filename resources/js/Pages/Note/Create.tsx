import React from 'react';
import {Head} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {PageProps} from "@/types";

const Create = ({auth}: PageProps) => {
    return (
        <>
            <Head title="Create Note" />
            <Layout user={auth}>
                <div>Create</div>
            </Layout>
        </>
    );
};

export default Create;
