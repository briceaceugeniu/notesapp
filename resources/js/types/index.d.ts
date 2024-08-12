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
    id: string;
    title: string;
    content: string;
    tags: Tag[];
    favorite: boolean;
}

export interface OptionType {
    value: number;
    label: string;
}

export interface Project {
    id: number;
    title: string;
    currentAt: number;
    finishAt: number;
    icon: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
