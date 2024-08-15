import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import LinkedInLink from "@/Components/LinkedInLink";
import GutHubLink from "@/Components/GutHubLink";

const Contact = ({ auth }: PageProps) => {
    return (
        <>
            <Head title="Update Project" />
            <Layout
                user={auth.user}
                header={
                    <span>
                        <small className="text-sm">Get in touch!</small>
                    </span>
                }
            >
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <span className="shadow p-2 rounded">
                            📨 recalls-analogues0x@icloud.com
                        </span>
                        <LinkedInLink />
                        <GutHubLink />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Contact;
