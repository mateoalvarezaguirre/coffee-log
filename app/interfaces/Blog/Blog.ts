import { BlogContent } from "./BlogContent";

export interface Blog {
    uid: string;
    title: string;
    subtitle: string;
    image: string;
    slug: string;
    category: string;
    categorySlug: string;
    date: string;
    readingTime: string;
    content: BlogContent[];
    status: string;
}