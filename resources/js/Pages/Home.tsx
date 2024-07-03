import { Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout";
import {PageProps} from "@/types";
import GreetingText from "@/Components/GreetingText";
import {useState} from "react";

function Home({ auth }: PageProps) {
    const [showContent, setShowContent] = useState(false);

    function handleShowContent() {
        setShowContent(!showContent);
    }

    return (
        <>
            <Head title="Home" />
            <Layout
                user={auth.user}
                header={<GreetingText/>}
            >
                <div className="py-4">
                    <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-rows-3 lg:grid-flow-col gap-4 lg:h-80vh">

                            {/*About me*/}
                            <div className="row-span-1 sm:row-span-1 md:row-span-3 p-2 shadow bg-ct2">
                                <h4 className="text-lg font-mono font-bold">About me 😊</h4>
                                <p className="text-gray-500 dark:text-neutral-400 font-mono">
                                    I am a father, a husband and a software developer.
                                </p>
                                <div className={`w-full overflow-hidden transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0 max-h-0'}`}>

                                    <p className="text-gray-500 dark:text-neutral-400 font-mono">As you've probably already realised, I think the emojis are funny and cool.</p>
                                    <div className="my-3">
                                        <span className="">⚠</span> <span className="text-gray-500 dark:text-neutral-400 font-mono underline ">From hier only serious stuff</span> <span className="">⚠</span>
                                    </div>

                                    <div className="text-gray-500 dark:text-neutral-400 font-mono">
                                        Tech stacks:
                                        <ul className="mb-2">
                                            <li>PHP, Laravel (this website)</li>
                                            <li>HTML, CSS, JavaScript, React</li>
                                            <li>MySQL, MSSQL(a little bit)</li>
                                            <li>Git, Docker</li>
                                        </ul>

                                        Education:
                                        <ul className="mb-2">
                                            <li>Apprenticeship - Application Developer (4 years)</li>
                                            <li>Bachelor - Sociology 😜</li>
                                        </ul>

                                        Hobbies:
                                        <ul>
                                            <li>Cybersecurity (Top 2 % on TryHackMe)</li>
                                            <li>Hiking, Cycling</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="mt-2">
                                    <button onClick={handleShowContent} type="button" className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" id="hs-show-hide-collapse" data-hs-collapse="#hs-show-hide-collapse-heading">
                                        {showContent ? (
                                            <span className="hs-collapse-open">I've seen enough</span>
                                        ) : (
                                            <span className="hs-collapse-open">Tell me more</span>
                                        )}
                                        <svg className={`flex-shrink-0 size-4 ${!showContent ? '' : 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </p>
                            </div>

                            {/*Current project / Success*/}
                            <div className="col-span-1 sm:col-span-1 md:col-span-2 shadow p-2 bg-ct2">
                                <h4 className="text-lg font-mono font-bold">Currently, I am working on…</h4>
                                <div className="text-gray-500 dark:text-neutral-400 font-mono">
                                    .. making this website look decent!
                                </div>
                            </div>

                            {/*Favorite Notes*/}
                            <div className="row-span-1 sm:row-span-1 md:row-span-2 col-span-1 sm:col-span-2 md:col-span-2 p-2 shadow bg-ct2">
                                <h4 className="text-lg font-mono font-bold">Favorite Notes</h4>
                                <div className="text-gray-500 dark:text-neutral-400 font-mono">
                                    Your advertisement could be placed here!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Home;
