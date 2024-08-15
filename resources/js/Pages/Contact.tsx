import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import LinkedInLink from "@/Components/LinkedInLink";
import GutHubLink from "@/Components/GutHubLink";
import SecondaryButton from "@/Components/SecondaryButton";

const Contact = ({ auth }: PageProps) => {
    const [copied, setCopied] = useState(false);
    const contactEmail = "recalls-analogues0x@icloud.com";

    const handleCopyClicked = async () => {
        try {
            await navigator.clipboard.writeText(contactEmail);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {}
    };

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
                        <div className="flex flex-row ">
                            <span className="shadow p-2 rounded min-w-[278px]">
                                📨 {contactEmail}
                            </span>
                            <SecondaryButton
                                className="ml-1"
                                onClick={handleCopyClicked}
                            >
                                {copied ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-check2"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-copy"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                                        />
                                    </svg>
                                )}
                            </SecondaryButton>
                        </div>
                        <div className="flex flex-row pt-3">
                            <LinkedInLink />
                            <GutHubLink />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Contact;
