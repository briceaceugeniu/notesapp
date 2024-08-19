import React from "react";
import { Note } from "@/types";

const ShowHeader = ({ note }: { note: Note }) => {
    return (
        <div>
            <span>
                Note: <code>[ {note.title} ]</code>
            </span>
        </div>
    );
};

export default ShowHeader;
