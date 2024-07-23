import React from "react";
import { Tag } from "@/types";

const NoteTags = ({ tags, className }: { tags: Tag[]; className?: string }) => {
    return (
        <div>
            {tags &&
                tags.map((tag) => (
                    <span
                        key={tag.id}
                        className={`inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-1
                                        text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 ${
                                            className ?? ""
                                        }`}
                    >
                        {tag.name}
                    </span>
                ))}
        </div>
    );
};

export default NoteTags;
