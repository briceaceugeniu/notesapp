import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
    favorite: boolean;
}

export interface OptionType {
    value: number;
    label: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
