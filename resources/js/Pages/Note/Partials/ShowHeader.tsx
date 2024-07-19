import React from "react";
import { Note } from "@/types";

const ShowHeader = ({ note }: { note: Note }) => {
    return (
        <div>
            <span>
                Note: <i>{note.title}</i>
            </span>
        </div>
    );
};

export default ShowHeader;
