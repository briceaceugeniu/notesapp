import { HTMLAttributes } from "react";

export default function ApplicationLogo(
    props: HTMLAttributes<HTMLImageElement>
) {
    return (
        <>
            <img
                {...props}
                src="/storage/logo.png"
                alt="app_logo"
                draggable="false"
            />
        </>
    );
}
