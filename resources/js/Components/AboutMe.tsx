import React, { HTMLAttributes, useState } from "react";

const AboutMe = (props: HTMLAttributes<HTMLDivElement>) => {
    const [showContent, setShowContent] = useState(false);
    function handleShowContent() {
        setShowContent(!showContent);
    }

    return (
        <div
            className={`${props.className} p-2 shadow bg-ct2 overflow-auto custom-scrollbar`}
        >
            <h4 className="text-lg font-mono font-bold">About me 😊</h4>
            <p className="text-gray-500 dark:text-neutral-400 font-mono">
                I am a father, a husband and a software developer.
            </p>
            <div
                className={`w-full overflow-hidden transition-all duration-500 ${
                    showContent ? "opacity-100" : "opacity-0 max-h-0"
                }`}
            >
                <p className="text-gray-500 dark:text-neutral-400 font-mono">
                    My main area of expertise is web development (full stack)
                    and I also have some C#/WPF professional experience.
                </p>
                <p className="text-gray-500 dark:text-neutral-400 font-mono">
                    Also, as you've probably already realised, I think emojis
                    are funny and cool.
                </p>
                <div className="my-3">
                    <span className="mr-1">⚠</span>
                    <span className="text-gray-500 dark:text-neutral-400 font-mono underline ">
                        From hier only serious stuff
                    </span>
                    <span className="ml-1">⚠</span>
                </div>

                <div className="text-gray-500 dark:text-neutral-400 font-mono">
                    Tech stacks:
                    <ul className="mb-2">
                        <li>PHP, Laravel (this website)</li>
                        <li>HTML, CSS, JavaScript, React</li>
                        <li>C#/.NET - WPF</li>
                        <li>MySQL, MSSQL(a little bit)</li>
                        <li>Git, Docker</li>
                    </ul>
                    Education:
                    <ul className="mb-2">
                        <li>
                            Apprenticeship - Application Developer (4 years)
                        </li>
                        <li>Bachelor - Sociology 😜</li>
                    </ul>
                    Hobbies:
                    <ul>
                        <li>Cybersecurity (Top 3 % on TryHackMe)</li>
                        <li>Hiking, Cycling</li>
                    </ul>
                </div>
            </div>
            <p className="mt-2">
                <button
                    onClick={handleShowContent}
                    type="button"
                    className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                    id="hs-show-hide-collapse"
                    data-hs-collapse="#hs-show-hide-collapse-heading"
                >
                    {showContent ? (
                        <span className="hs-collapse-open">
                            I've seen enough
                        </span>
                    ) : (
                        <span className="hs-collapse-open">Tell me more</span>
                    )}
                    <svg
                        className={`flex-shrink-0 size-4 ${
                            !showContent ? "" : "rotate-180"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </button>
            </p>
        </div>
    );
};

export default AboutMe;
